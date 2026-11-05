<?php

namespace App\Console\Commands;

use App\Models\BibleVersion;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap.xml file';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating sitemap...');

        $baseUrl = config('app.url');
        $sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
        $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Home
        $sitemap .= $this->addUrl($baseUrl.'/', 'daily', '1.0');

        // Static public pages + research. lastmod is the source file's
        // modification date (when the data/page last changed), never "now".
        // Markdown (.md) URLs are deliberately left OUT of the sitemap:
        // they are noindex alternates, and the HTML page stays canonical.
        $staticPages = [
            '/about' => 'resources/js/pages/About.tsx',
            '/pricing' => 'resources/js/pages/Pricing.tsx',
            '/contact' => 'resources/js/pages/Contact.tsx',
            '/privacy' => 'resources/js/pages/Privacy.tsx',
            '/terms' => 'resources/js/pages/Terms.tsx',
            '/faq' => 'resources/js/pages/FAQ.tsx',
            '/for-llms' => 'resources/js/pages/ForLlms.tsx',
            '/guides/how-to-read-the-bible' => 'resources/js/pages/guides/HowToReadBible.tsx',
            '/guides/how-to-pray-when-you-feel-stuck' => 'resources/js/pages/guides/HowToPray.tsx',
            '/guides/how-to-begin-a-spiritual-journey' => 'resources/js/pages/guides/SpiritualJourney.tsx',
            '/guides/how-to-use-ai-for-bible-study' => 'resources/js/pages/guides/AIBibleStudy.tsx',
            '/resources/best-bible-reading-plans' => 'resources/js/pages/resources/BibleReadingPlans.tsx',
            '/resources/journaling-prompts-for-spiritual-growth' => 'resources/js/pages/resources/JournalingPrompts.tsx',
            '/bible' => 'resources/js/pages/Bible/Index.tsx',
            '/research' => 'resources/js/pages/Research/Index.tsx',
            '/research/bible-coverage' => 'resources/js/pages/Research/BibleCoverage.tsx',
        ];

        foreach ($staticPages as $path => $source) {
            $sitemap .= $this->addUrl(
                $baseUrl.$path,
                'weekly',
                str_starts_with($path, '/research') ? '0.8' : '0.6',
                $this->lastModified($source)
            );
        }

        // Bible Chapters, for every imported version.
        // The default version (KJV) keeps the canonical unprefixed URLs;
        // alternate versions get additive prefixed URLs (e.g. /bible/bbe/gen/1).
        // These are genuinely different translated texts, not duplicate content.
        foreach (BibleVersion::VERSION_SLUGS as $slug => $abbreviation) {
            $version = BibleVersion::where('abbreviation', $abbreviation)->first();

            if (! $version) {
                continue;
            }

            $prefix = $slug === 'kjv' ? '' : '/' . $slug;
            $books = $version->books()->with('chapters')->get();
            $chapterLastmod = $this->lastModified("bible/json/{$abbreviation}.json");

            foreach ($books as $book) {
                // Book Index (if exists) or just chapters
                $sitemap .= $this->addUrl($baseUrl . "/bible{$prefix}/{$book->abbreviation}", 'weekly', '0.8', $chapterLastmod);

                foreach ($book->chapters as $chapter) {
                    $sitemap .= $this->addUrl($baseUrl . "/bible{$prefix}/{$book->abbreviation}/{$chapter->number}", 'monthly', '0.7', $chapterLastmod);
                }
            }
        }

        $sitemap .= '</urlset>';

        File::put(public_path('sitemap.xml'), $sitemap);

        $this->info('Sitemap generated successfully at public/sitemap.xml');
    }

    private function addUrl($loc, $freq, $priority, ?string $lastmod = null)
    {
        $lastmodXml = $lastmod ? "\n        <lastmod>{$lastmod}</lastmod>" : '';

        return "
    <url>
        <loc>{$loc}</loc>{$lastmodXml}
        <changefreq>{$freq}</changefreq>
        <priority>{$priority}</priority>
    </url>";
    }

    /** Last-modified date of a source file (Y-m-d), or null if absent. */
    private function lastModified(string $relativePath): ?string
    {
        $full = base_path($relativePath);

        return File::exists($full) ? date('Y-m-d', File::lastModified($full)) : null;
    }
}
