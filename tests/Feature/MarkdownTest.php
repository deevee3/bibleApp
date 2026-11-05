<?php

namespace Tests\Feature;

use App\Models\BibleVersion;
use App\Models\Book;
use App\Models\Chapter;
use App\Models\Verse;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class MarkdownTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // No Vite build exists in this checkout; Inertia assertions must not
        // require the manifest. The markdown responses under test don't use
        // Vite at all.
        $this->withoutVite();

        $version = BibleVersion::factory()->create([
            'name' => 'King James Version',
            'abbreviation' => 'KJV',
            'language' => 'en',
        ]);

        $book = Book::factory()->create([
            'bible_version_id' => $version->id,
            'name' => 'Genesis',
            'abbreviation' => 'gen',
            'position' => 1,
        ]);

        $chapter = Chapter::factory()->create([
            'book_id' => $book->id,
            'number' => 1,
        ]);

        Verse::factory()->create([
            'chapter_id' => $chapter->id,
            'number' => 1,
            'text' => 'In the beginning God created the heaven and the earth.',
        ]);
        Verse::factory()->create([
            'chapter_id' => $chapter->id,
            'number' => 2,
            'text' => 'And the earth was without form, and void; {and darkness} was upon the face of the deep.',
        ]);
        Verse::factory()->create([
            'chapter_id' => $chapter->id,
            'number' => 3,
            'text' => 'And God said, Let there be light: {and there was light: a long translator note explaining the rendering} and God saw the light.',
        ]);
    }

    public function test_static_page_markdown_version(): void
    {
        $response = $this->get('/pricing.md');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/markdown; charset=utf-8');
        $response->assertHeader('X-Robots-Tag', 'noindex, follow');
        $response->assertHeader('Vary', 'Accept');
        $response->assertHeader('Content-Location', 'https://inspirewrite.online/pricing');
        $this->assertNotEmpty($response->headers->get('X-Markdown-Tokens'));
        $this->assertStringContainsString('# Pricing', $response->getContent());
        $this->assertStringContainsString('$7', $response->getContent());
        $this->assertStringContainsString('Canonical: https://inspirewrite.online/pricing', $response->getContent());
    }

    public function test_home_markdown_version(): void
    {
        $response = $this->get('/index.md');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/markdown; charset=utf-8');
        $this->assertStringContainsString('InspireWrite', $response->getContent());
        $this->assertStringContainsString('Genesis', $response->getContent());
    }

    public function test_accept_markdown_negotiation(): void
    {
        $response = $this->get('/pricing', ['Accept' => 'text/markdown']);

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/markdown; charset=utf-8');
        $this->assertStringContainsString('# Pricing', $response->getContent());
    }

    public function test_markdown_loses_to_html_when_html_has_higher_q(): void
    {
        $response = $this->get('/pricing', ['Accept' => 'text/html;q=0.9, text/markdown;q=0.1']);

        $response->assertStatus(200);
        $this->assertNotSame('text/markdown; charset=utf-8', $response->headers->get('Content-Type'));
        $response->assertInertia(fn (Assert $page) => $page->component('Pricing'));
    }

    public function test_wildcard_accept_returns_html(): void
    {
        $response = $this->get('/pricing', ['Accept' => '*/*']);

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Pricing'));
    }

    public function test_html_response_carries_describedby_link_header(): void
    {
        $response = $this->get('/pricing');

        $response->assertStatus(200);
        $link = $response->headers->get('Link', '');
        $this->assertStringContainsString('/llms.txt', $link);
        $this->assertStringContainsString('/llms-full.txt', $link);
        $this->assertStringContainsString('/ai.txt', $link);
        $this->assertStringContainsString('rel="describedby"', $link);
    }

    public function test_dynamic_bible_chapter_markdown(): void
    {
        $response = $this->get('/bible/gen/1.md');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/markdown; charset=utf-8');
        $content = $response->getContent();
        $this->assertStringContainsString('Genesis 1', $content);
        $this->assertStringContainsString('In the beginning God created the heaven and the earth.', $content);
        // Short {...} segment becomes italics, never raw braces.
        $this->assertStringContainsString('*and darkness*', $content);
        $this->assertStringNotContainsString('{and darkness}', $content);
        // Long note becomes a footnote marker with a Translator notes section.
        $this->assertStringContainsString('Translator notes', $content);
        $this->assertStringContainsString('Verses in this chapter:** 3', $content);
        $this->assertStringContainsString('Canonical: https://inspirewrite.online/bible/gen/1', $content);
    }

    public function test_unknown_markdown_route_returns_markdown_404(): void
    {
        $response = $this->get('/does-not-exist.md');

        $response->assertStatus(404);
        $response->assertHeader('Content-Type', 'text/markdown; charset=utf-8');
        $this->assertStringContainsString('# Not found', $response->getContent());
    }

    public function test_unknown_bible_chapter_returns_markdown_404(): void
    {
        $response = $this->get('/bible/gen/999.md');

        $response->assertStatus(404);
        $response->assertHeader('Content-Type', 'text/markdown; charset=utf-8');
    }

    public function test_private_pages_have_no_markdown_version(): void
    {
        foreach (['/dashboard.md', '/lessons.md', '/sermons.md', '/affiliate.md', '/admin.md', '/checkout/study.md'] as $path) {
            $this->get($path)->assertStatus(404);
        }
    }

    public function test_llms_txt_lists_markdown_links_and_citation_section(): void
    {
        $response = $this->get('/llms.txt');

        $response->assertStatus(200);
        $content = $response->getContent();
        $this->assertStringContainsString('.md', $content);
        $this->assertStringContainsString('Cite this site for', $content);
        $this->assertStringContainsString('/research/bible-coverage', $content);
        $this->assertStringContainsString('/llms-full.txt', $content);
        $this->assertStringContainsString('/ai.txt', $content);
    }

    public function test_llms_full_txt_under_size_budget(): void
    {
        $response = $this->get('/llms-full.txt');

        $response->assertStatus(200);
        $this->assertLessThan(500000, strlen($response->getContent()));
        $this->assertStringContainsString('Genesis 1', $response->getContent());
    }

    public function test_ai_txt_sections(): void
    {
        $response = $this->get('/ai.txt');

        $response->assertStatus(200);
        $content = $response->getContent();
        $this->assertStringContainsString('[identity]', $content);
        $this->assertStringContainsString('[permissions]', $content);
        $this->assertStringContainsString('[restrictions]', $content);
        $this->assertStringContainsString('[attribution]', $content);
        $this->assertStringContainsString('[scope]', $content);
        $this->assertStringContainsString('[contact]', $content);
        $this->assertStringContainsString('hello@inspirewrite.online', $content);
    }

    public function test_robots_txt_names_ai_crawlers_and_disallows_private_paths(): void
    {
        $response = $this->get('/robots.txt');

        $response->assertStatus(200);
        $content = $response->getContent();
        foreach (['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'GPTBot', 'ClaudeBot', 'CCBot'] as $bot) {
            $this->assertStringContainsString($bot, $content);
        }
        $this->assertStringContainsString('Disallow: /dashboard', $content);
        $this->assertStringContainsString('Disallow: /lessons/', $content);
        $this->assertStringContainsString('Disallow: /admin/', $content);
        $this->assertStringContainsString('Allow: /api/md/', $content);
        $this->assertStringContainsString('Sitemap: https://inspirewrite.online/sitemap.xml', $content);
        // Training crawlers are NOT newly allowed.
        $this->assertStringNotContainsString("User-agent: Google-Extended", $content);
        $this->assertStringNotContainsString("User-agent: Applebot-Extended", $content);
        $this->assertStringNotContainsString("User-agent: Bytespider", $content);
    }

    public function test_markdown_catalog_lists_every_static_entry(): void
    {
        $response = $this->get('/api/md/_catalog');

        $response->assertStatus(200);
        $routes = $response->json('routes');
        $this->assertIsArray($routes);
        $paths = array_column($routes, 'path');
        foreach (['', 'pricing', 'faq', 'research/bible-coverage', 'guides/how-to-read-the-bible', 'bible'] as $path) {
            $this->assertContains($path, $paths);
        }
        // Bible pattern entries exist for both served versions.
        $this->assertContains('bible/{book}/{chapter}', $paths);
        $this->assertContains('bible/bbe/{book}/{chapter}', $paths);
    }

    public function test_research_page_renders_with_dataset_json_ld(): void
    {
        $response = $this->get('/research/bible-coverage');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Research/BibleCoverage')
            ->has('study')
            ->has('study.findings')
        );
    }

    public function test_ai_summary_meta_present_in_public_tsx(): void
    {
        // Inertia Head meta is client-rendered, so assert on the source:
        // every public page must carry <meta name="ai-summary">.
        $pages = [
            'resources/js/pages/Welcome.tsx',
            'resources/js/pages/About.tsx',
            'resources/js/pages/Pricing.tsx',
            'resources/js/pages/Contact.tsx',
            'resources/js/pages/Privacy.tsx',
            'resources/js/pages/Terms.tsx',
            'resources/js/pages/FAQ.tsx',
            'resources/js/pages/ForLlms.tsx',
            'resources/js/pages/Bible/Index.tsx',
            'resources/js/pages/Bible/Search.tsx',
            'resources/js/pages/Bible/Chapter.tsx',
            'resources/js/pages/Research/Index.tsx',
            'resources/js/pages/Research/BibleCoverage.tsx',
            'resources/js/pages/guides/HowToReadBible.tsx',
            'resources/js/pages/guides/HowToPray.tsx',
            'resources/js/pages/guides/SpiritualJourney.tsx',
            'resources/js/pages/guides/AIBibleStudy.tsx',
            'resources/js/pages/resources/BibleReadingPlans.tsx',
            'resources/js/pages/resources/JournalingPrompts.tsx',
        ];

        foreach ($pages as $page) {
            $contents = file_get_contents(base_path($page));
            $this->assertStringContainsString('ai-summary', $contents, "Missing ai-summary meta in {$page}");
            $this->assertStringContainsString('rel="alternate"', $contents, "Missing markdown alternate link in {$page}");
        }
    }

    public function test_homepage_json_ld_has_organization_and_website(): void
    {
        $contents = file_get_contents(base_path('resources/js/pages/Welcome.tsx'));
        $this->assertStringContainsString('"@type": "Organization"', $contents);
        $this->assertStringContainsString('"@type": "WebSite"', $contents);
        $this->assertStringContainsString('"@type": "SoftwareApplication"', $contents);
        $this->assertStringContainsString('Glenride', $contents);
    }
}
