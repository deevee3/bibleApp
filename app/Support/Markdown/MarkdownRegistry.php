<?php

namespace App\Support\Markdown;

use App\Models\BibleVersion;
use App\Models\Book;
use App\Models\Sermon;
use App\Support\BibleCoverage;
use App\Support\Site;
use Illuminate\Support\Facades\File;

/**
 * Renderer registry: every public route → one renderer function.
 *
 * Adding a new public page takes exactly one step: register it here.
 * llms.txt, llms-full.txt and /api/md/_catalog are all generated from
 * this registry, so they can never go stale independently.
 *
 * Dynamic pages (Bible chapters, shared sermons) are pattern renderers
 * that load the same data the HTML page uses — no duplicate queries, no
 * file per chapter.
 *
 * Explicit skip list (with reasons) for public-looking routes that must
 * NEVER get a markdown version — the coverage test enforces this list
 * against the route table.
 */
final class MarkdownRegistry
{
    /** @var array<string, string> path => reason it has no renderer */
    public const SKIPS = [
        'r/{code}' => 'Redirect to registration with affiliate attribution; no content of its own.',
        'login' => 'Auth page; logged-in-only flow, never exposed as content.',
        'register' => 'Auth page; logged-in-only flow, never exposed as content.',
        'forgot-password' => 'Auth page.',
        'reset-password/{token}' => 'Auth page.',
        'email/verify' => 'Email verification prompt; auth-gated Fortify page.',
        'email/verify/{id}/{hash}' => 'Signed email verification link; not site content.',
        'two-factor-challenge' => 'Two-factor login challenge; auth flow, never exposed as content.',
        'user/confirm-password' => 'Password confirmation; auth flow.',
        'user/confirmed-password-status' => 'Password confirmation status; auth flow.',
        'user/two-factor-qr-code' => 'Two-factor setup data; auth-gated, per-user.',
        'user/two-factor-recovery-codes' => 'Two-factor recovery codes; auth-gated, per-user.',
        'user/two-factor-secret-key' => 'Two-factor secret; auth-gated, per-user.',
        'stripe/payment/{id}' => 'Stripe payment confirmation page (Cashier); not site content.',
        'storage/{path}' => 'Public file serving (storage); not a page.',
        'logout' => 'Auth action, not a page.',
        'dashboard' => 'Logged-in-only dashboard.',
        'search' => 'Logged-in-only search (distinct from public /bible/search).',
        'checkout/{plan}' => 'Logged-in-only checkout.',
        'billing-portal' => 'Logged-in-only billing.',
        'lessons' => 'Logged-in-only user content.',
        'lessons/{lesson}' => 'Logged-in-only user content.',
        'sermons/{sermon}' => 'Logged-in-only user content (public shares live at /shared/{token}).',
        'shared-with-me' => 'Logged-in-only.',
        'affiliate' => 'Logged-in-only creator dashboard.',
        'settings' => 'Logged-in-only settings.',
        'settings/profile' => 'Logged-in-only settings.',
        'settings/password' => 'Logged-in-only settings.',
        'settings/appearance' => 'Logged-in-only settings.',
        'settings/two-factor' => 'Logged-in-only settings.',
        'settings/subscription' => 'Logged-in-only settings.',
        'admin' => 'Admin-only.',
        'admin/affiliates' => 'Admin-only.',
        'admin/users' => 'Admin-only user management.',
        'admin/trials' => 'Admin-only trial management.',
        'admin/affiliates/{affiliate}' => 'Admin-only affiliate record.',
        'api' => 'API endpoints, not pages (except /api/md/*, which serves markdown).',
        'up' => 'Health check endpoint.',
    ];

    /**
     * Static route table: path => [group, title, summary, tsx, renderer].
     * `tsx` is the source page file; its mtime is the page's last-updated
     * date, so "updated" means the page changed, not that it was rebuilt.
     */
    public static function staticEntries(): array
    {
        return [
            '' => ['core', 'Home', Site::SHORT_DESCRIPTION, 'resources/js/pages/Welcome.tsx', fn () => StaticPages::home(self::bookList())],
            'about' => ['core', 'About', 'Learn about InspireWrite by Glenride — the Bible reading and spiritual journaling companion featuring the denomination-neutral S.C.R.I.P.T. method.', 'resources/js/pages/About.tsx', fn () => StaticPages::about()],
            'pricing' => ['core', 'Pricing', 'Simple, transparent pricing. Free, Study at $7/mo, and Pro at $27/mo.', 'resources/js/pages/Pricing.tsx', fn () => StaticPages::pricing()],
            'contact' => ['core', 'Contact', 'Contact InspireWrite by Glenride.', 'resources/js/pages/Contact.tsx', fn () => StaticPages::contact()],
            'faq' => ['core', 'FAQ', 'Find answers to common questions about InspireWrite. Learn how to read the Bible, study with the Assistant, manage your subscription, and grow spiritually.', 'resources/js/pages/FAQ.tsx', fn () => StaticPages::faq(BibleCoverage::computeStudy())],
            'for-llms' => ['core', 'For LLMs', 'Machine-readable summary of InspireWrite: what it is, what it offers, its pricing, and how to cite it.', 'resources/js/pages/ForLlms.tsx', fn () => StaticPages::forLlms()],
            'guides/how-to-read-the-bible' => ['guides', 'How to Read the Bible', 'Learn how to start reading the Bible effectively. Practical tips for developing a consistent Bible reading habit, understanding Scripture, and growing spiritually.', 'resources/js/pages/guides/HowToReadBible.tsx', fn () => StaticPages::guideReadBible()],
            'guides/how-to-pray-when-you-feel-stuck' => ['guides', 'How to Pray When You Feel Stuck', 'Practical strategies for prayer when prayer feels difficult.', 'resources/js/pages/guides/HowToPray.tsx', fn () => StaticPages::guidePray()],
            'guides/how-to-begin-a-spiritual-journey' => ['guides', 'How to Begin a Spiritual Journey', 'First steps for seekers beginning a spiritual journey.', 'resources/js/pages/guides/SpiritualJourney.tsx', fn () => StaticPages::guideJourney()],
            'guides/how-to-use-ai-for-bible-study' => ['guides', 'How to Use AI for Bible Study', 'Responsible study with the Assistant.', 'resources/js/pages/guides/AIBibleStudy.tsx', fn () => StaticPages::guideAiStudy()],
            'resources/best-bible-reading-plans' => ['resources', 'Best Bible Reading Plans', 'Structured Bible reading plans for different goals and schedules.', 'resources/js/pages/resources/BibleReadingPlans.tsx', fn () => StaticPages::resourceReadingPlans()],
            'resources/journaling-prompts-for-spiritual-growth' => ['resources', 'Journaling Prompts for Spiritual Growth', 'Journaling prompts for spiritual growth.', 'resources/js/pages/resources/JournalingPrompts.tsx', fn () => StaticPages::resourceJournaling()],
            'bible' => ['bible', 'Bible Index', 'Read the Bible online free in the King James Version: all 66 books, 1,189 chapters.', 'resources/js/pages/Bible/Index.tsx', fn () => self::bibleIndexDocument()],
            'bible/search' => ['bible', 'Search Scripture', 'Search the Bible text across the served translations.', 'resources/js/pages/Bible/Search.tsx', fn () => StaticPages::bibleSearch()],
            'research' => ['research', 'Research', 'Counted research from InspireWrite’s own data: Bible coverage statistics, with methodology.', 'resources/js/pages/Research/Index.tsx', fn () => self::researchHubDocument()],
            'research/bible-coverage' => ['research', 'Bible Coverage Statistics 2026', 'Counted Bible coverage statistics: translations vendored, languages, and translations served live.', 'resources/js/pages/Research/BibleCoverage.tsx', fn () => self::researchDocument(BibleCoverage::computeStudy())],
            'privacy' => ['legal', 'Privacy Policy', 'How InspireWrite handles your information.', 'resources/js/pages/Privacy.tsx', fn () => StaticPages::privacy()],
            'terms' => ['legal', 'Terms of Use', 'Terms for InspireWrite and its offers.', 'resources/js/pages/Terms.tsx', fn () => StaticPages::terms()],
        ];
    }

    /** Every addressable markdown route, for the catalog and llms.txt. */
    public static function listMarkdownRoutes(): array
    {
        $routes = [];

        foreach (self::staticEntries() as $path => [$group, $title, $summary]) {
            $routes[] = [
                'path' => $path,
                'url' => Site::url($path),
                'mdUrl' => Site::mdUrl($path),
                'title' => $title,
                'summary' => $summary,
                'group' => $group,
            ];
        }

        // Dynamic Bible chapters: one pattern entry per served version.
        // The catalog does not enumerate all 2,378 chapter URLs; it points
        // at the pattern and the Bible index instead.
        foreach (BibleVersion::VERSION_SLUGS as $slug => $abbreviation) {
            $routes[] = [
                'path' => $slug === 'kjv' ? 'bible/{book}/{chapter}' : "bible/{$slug}/{book}/{chapter}",
                'url' => Site::url($slug === 'kjv' ? '/bible/gn/1' : "/bible/{$slug}/gn/1"),
                'mdUrl' => Site::mdUrl($slug === 'kjv' ? 'bible/gn/1' : "bible/{$slug}/gn/1"),
                'title' => 'Bible chapter ('.strtoupper($slug).')',
                'summary' => 'A single Bible chapter in the '.strtoupper($slug).' translation, verse by verse.',
                'group' => 'bible',
                'pattern' => true,
            ];
        }

        $routes[] = [
            'path' => 'shared/{token}',
            'url' => Site::url('/shared'),
            'mdUrl' => Site::mdUrl('shared'),
            'title' => 'Shared sermon',
            'summary' => 'A sermon shared publicly by its author.',
            'group' => 'core',
            'pattern' => true,
        ];

        return $routes;
    }

    /** Render the markdown document for a path (no leading slash, no .md), or null. */
    public static function render(string $path): ?MarkdownDocument
    {
        $path = trim($path, '/');

        $entries = self::staticEntries();
        if (isset($entries[$path])) {
            return $entries[$path][4]();
        }

        if (str_starts_with($path, 'bible/')) {
            return self::renderBibleChapter($path);
        }

        if (str_starts_with($path, 'shared/')) {
            return self::renderSharedSermon(substr($path, strlen('shared/')));
        }

        return null;
    }

    /** Is this path a public markdown route (static or dynamic pattern)? */
    public static function isPublicPath(string $path): bool
    {
        $path = trim($path, '/');

        if (isset(self::staticEntries()[$path])) {
            return true;
        }

        if (str_starts_with($path, 'bible/') || str_starts_with($path, 'shared/')) {
            return self::render($path) !== null;
        }

        return false;
    }

    // -- Dynamic renderers -------------------------------------------------

    private static function renderBibleChapter(string $path): ?MarkdownDocument
    {
        $segments = explode('/', $path);
        // bible/{book}/{chapter} | bible/{version}/{book}/{chapter}
        array_shift($segments);

        $versionSlug = 'kjv';
        if (count($segments) === 3) {
            $versionSlug = strtolower(array_shift($segments));
        }

        if (count($segments) < 1 || count($segments) > 2) {
            return null;
        }

        $bookAbbrev = strtolower($segments[0]);
        $chapterNumber = isset($segments[1]) ? (int) $segments[1] : 1;

        $version = BibleVersion::resolveSlug($versionSlug);
        if (! $version) {
            return null;
        }

        $book = $version->books()->where('abbreviation', $bookAbbrev)->first();
        if (! $book) {
            return null;
        }

        $chapter = $book->chapters()->where('number', $chapterNumber)->with('verses')->first();
        if (! $chapter) {
            return null;
        }

        $versionLabel = BibleVersion::VERSION_LABELS[$versionSlug] ?? strtoupper($versionSlug);
        $canonical = $versionSlug === 'kjv'
            ? Site::url("/bible/{$book->abbreviation}/{$chapter->number}")
            : Site::url("/bible/{$versionSlug}/{$book->abbreviation}/{$chapter->number}");

        $firstVerse = $chapter->verses->first();
        $notes = [];
        $firstVerseText = $firstVerse
            ? MarkdownResponse::formatVerseText($firstVerse->text, $notes)
            : '';
        $summary = "Read {$book->name} chapter {$chapter->number} online free in the {$version->name}."
            . ($firstVerseText !== '' ? ' '.$firstVerseText : '');

        $body = "## At a glance\n\n"
            . "- **Book:** {$book->name}\n"
            . "- **Chapter:** {$chapter->number} of ".$book->chapters()->count()."\n"
            . "- **Verses in this chapter:** ".$chapter->verses->count()."\n"
            . "- **Translation:** {$version->name} ({$versionLabel})\n"
            . "- **Testament:** ".($book->position <= 39 ? 'Old Testament' : 'New Testament')."\n"
            . "- **Bible coverage:** [Bible Coverage Statistics 2026](".Site::url('/research/bible-coverage').")\n\n"
            . "## {$book->name} {$chapter->number}\n\n";

        $allNotes = [];
        $paragraph = [];
        foreach ($chapter->verses->sortBy('number') as $verse) {
            $text = MarkdownResponse::formatVerseText($verse->text, $allNotes);
            $paragraph[] = "**{$verse->number}** {$text}";
            if (count($paragraph) === 5) {
                $body .= implode(' ', $paragraph)."\n\n";
                $paragraph = [];
            }
        }
        if ($paragraph !== []) {
            $body .= implode(' ', $paragraph)."\n\n";
        }

        if ($allNotes !== []) {
            $body .= "## Translator notes\n\n";
            foreach ($allNotes as $i => $note) {
                $body .= '[*'.($i + 1).'] '.$note."\n";
            }
            $body .= "\n";
        }

        $prev = $next = null;
        if ($chapter->number > 1) {
            $prev = $versionSlug === 'kjv'
                ? "/bible/{$book->abbreviation}/".($chapter->number - 1)
                : "/bible/{$versionSlug}/{$book->abbreviation}/".($chapter->number - 1);
        }
        $totalChapters = $book->chapters()->count();
        if ($chapter->number < $totalChapters) {
            $next = $versionSlug === 'kjv'
                ? "/bible/{$book->abbreviation}/".($chapter->number + 1)
                : "/bible/{$versionSlug}/{$book->abbreviation}/".($chapter->number + 1);
        }

        $related = [['label' => 'Bible index', 'url' => Site::url('/bible')]];
        if ($prev) {
            $related[] = ['label' => 'Previous chapter', 'url' => Site::url($prev)];
        }
        if ($next) {
            $related[] = ['label' => 'Next chapter', 'url' => Site::url($next)];
        }

        return new MarkdownDocument(
            title: "{$book->name} {$chapter->number} ({$versionLabel}) — InspireWrite",
            summary: mb_substr($summary, 0, 300),
            canonical: $canonical,
            lastUpdated: BibleCoverage::dataLastModified(),
            body: $body,
            related: $related,
        );
    }

    private static function renderSharedSermon(string $token): ?MarkdownDocument
    {
        if ($token === '') {
            return null;
        }

        $sermon = Sermon::where('share_token', $token)->where('is_public', true)->first();
        if (! $sermon) {
            return null;
        }

        $title = $sermon->title ?: 'Shared sermon';
        $body = '';

        // Fields are the Sermon model's own: description, detected_theme,
        // analysis, big_takeaway, movements, reflection_questions, prayer.
        // The author is never named in markdown — the HTML share page is
        // the author's own link to share, and no user data is exposed here.
        if (! empty($sermon->description)) {
            $body .= "{$sermon->description}\n\n";
        }
        if (! empty($sermon->detected_theme)) {
            $body .= "Theme: {$sermon->detected_theme}\n\n";
        }
        if (! empty($sermon->big_takeaway)) {
            $body .= "## Big takeaway\n\n{$sermon->big_takeaway}\n\n";
        }
        if (! empty($sermon->analysis)) {
            $body .= "## Analysis\n\n{$sermon->analysis}\n\n";
        }
        if (is_array($sermon->movements ?? null) && $sermon->movements !== []) {
            $body .= "## Movements\n\n";
            foreach ($sermon->movements as $movement) {
                if (is_string($movement)) {
                    $body .= '- '.$movement."\n";
                } elseif (is_array($movement)) {
                    $body .= '- '.($movement['title'] ?? $movement['heading'] ?? json_encode($movement))."\n";
                    if (! empty($movement['content'])) {
                        $body .= '  '.$movement['content']."\n";
                    }
                }
            }
            $body .= "\n";
        }
        if (is_array($sermon->reflection_questions ?? null) && $sermon->reflection_questions !== []) {
            $body .= "## Reflection questions\n\n";
            foreach ($sermon->reflection_questions as $question) {
                $body .= '- '.(is_string($question) ? $question : json_encode($question))."\n";
            }
            $body .= "\n";
        }
        if (! empty($sermon->prayer)) {
            $body .= "## Prayer\n\n{$sermon->prayer}\n\n";
        }
        if ($body === '') {
            $body = "A sermon shared publicly by its author on InspireWrite.\n";
        }

        return new MarkdownDocument(
            title: $title.' — Shared Sermon | InspireWrite',
            summary: 'A sermon shared publicly by its author on InspireWrite.',
            canonical: Site::url('/shared/'.$token),
            lastUpdated: $sermon->updated_at ? $sermon->updated_at->format('Y-m-d') : Site::LAST_UPDATED,
            body: $body,
            related: [
                ['label' => 'Bible index', 'url' => Site::url('/bible')],
                ['label' => 'About', 'url' => Site::url('/about')],
            ],
        );
    }

    private static function bibleIndexDocument(): MarkdownDocument
    {
        $version = BibleVersion::resolveSlug('kjv') ?? BibleVersion::first();

        if (! $version) {
            return new MarkdownDocument(
                title: 'Bible Index — InspireWrite',
                summary: 'Read the Bible online free in the King James Version: all 66 books, 1,189 chapters.',
                canonical: Site::url('/bible'),
                lastUpdated: Site::LAST_UPDATED,
                body: "The Bible index is unavailable right now.\n",
            );
        }

        $books = $version->books()->orderBy('position')->withCount('chapters')->get();
        $totalChapters = $books->sum('chapters_count');

        $body = "## At a glance\n\n"
            . "- **Translation:** {$version->name}\n"
            . "- **Books:** ".$books->count()."\n"
            . "- **Chapters:** ".number_format($totalChapters)."\n"
            . "- **Also available:** Bible in Basic English (BBE) at [/bible/bbe/gn/1](".Site::url('/bible/bbe/gn/1').")\n"
            . "- **Bible coverage:** [Bible Coverage Statistics 2026](".Site::url('/research/bible-coverage').")\n\n";

        $body .= "## Old Testament\n\n";
        foreach ($books->filter(fn ($b) => $b->position <= 39) as $book) {
            $body .= '- ['.$book->name.' ('.$book->chapters_count.' chapters)]('.Site::url("/bible/{$book->abbreviation}/1").")\n";
        }
        $body .= "\n## New Testament\n\n";
        foreach ($books->filter(fn ($b) => $b->position >= 40) as $book) {
            $body .= '- ['.$book->name.' ('.$book->chapters_count.' chapters)]('.Site::url("/bible/{$book->abbreviation}/1").")\n";
        }

        return new MarkdownDocument(
            title: 'Bible Index — Read the Bible Online | InspireWrite',
            summary: "Read the Bible online free in the {$version->name}: all {$books->count()} books, ".number_format($totalChapters).' chapters.',
            canonical: Site::url('/bible'),
            lastUpdated: BibleCoverage::dataLastModified(),
            body: $body,
            related: [
                ['label' => 'Genesis 1', 'url' => Site::url('/bible/gn/1')],
                ['label' => 'John 1', 'url' => Site::url('/bible/jn/1')],
                ['label' => 'Bible coverage research', 'url' => Site::url('/research/bible-coverage')],
            ],
        );
    }

    private static function researchHubDocument(): MarkdownDocument
    {
        $study = BibleCoverage::computeStudy();

        return new MarkdownDocument(
            title: 'Research — InspireWrite',
            summary: 'Counted research from InspireWrite’s own data: Bible coverage statistics, with methodology.',
            canonical: Site::url('/research'),
            lastUpdated: $study['dataLastModified'],
            body: "InspireWrite publishes counted research from its own data — numbers we can show our working for.\n\n"
                . "## Reports\n\n"
                . "- [Bible Coverage Statistics 2026: {$study['translationCount']} Translations, {$study['servedCount']} Served Live](".Site::url('/research/bible-coverage')."): "
                . "{$study['translationCount']} translation files in {$study['languageCount']} languages, a median of "
                . number_format($study['medianVerses'])." verses per translation, and {$study['servedCount']} translations served live.\n",
            related: [
                ['label' => 'Bible Coverage Statistics 2026', 'url' => Site::url('/research/bible-coverage')],
                ['label' => 'Bible index', 'url' => Site::url('/bible')],
            ],
        );
    }

    public static function researchDocument(array $study): MarkdownDocument
    {
        $body = "## At a glance\n\n"
            . "- **Translation files vendored:** {$study['translationCount']}\n"
            . "- **Languages:** {$study['languageCount']}\n"
            . "- **Translations served live:** {$study['servedCount']} of {$study['translationCount']}\n"
            . "- **Median verses per translation:** ".number_format($study['medianVerses'])."\n"
            . "- **Books per translation:** {$study['headlines']['booksPerTranslation']}\n"
            . "- **Chapters per translation:** ".number_format($study['headlines']['chaptersPerTranslation'])."\n"
            . "- **Data last changed:** {$study['dataLastModified']}\n\n";

        $body .= "## Key findings\n\n";
        foreach ($study['findings'] as $finding) {
            $body .= "### {$finding['id']}\n\n";
            $body .= "{$finding['text']}\n\n";
            $body .= "Denominator: {$finding['denominator']}. "
                . "[Link to this finding](".Site::url('/research/bible-coverage').'#'.$finding['id'].")\n\n";
        }

        $body .= "## Breakdown by translation\n\n"
            . "| Translation | Language | Books | Chapters | Verses | Served live |\n"
            . "|---|---|---:|---:|---:|:---:|\n";
        foreach ($study['breakdown'] as $row) {
            $body .= '| '.$row['name'].' (`'.$row['abbreviation'].'`) | '.$row['language']
                . ' | '.$row['books'].' | '.number_format($row['chapters'])
                . ' | '.number_format($row['verses']).' | '.($row['served'] ? 'Yes' : 'No')." |\n";
        }

        $body .= "\n## Methodology\n\n"
            . "- **Source:** vendored translation files in `bible/json/` (`index.json` plus one file per translation), counted directly from the files.\n"
            . "- **What counts as served:** a translation is counted as served only when it is imported into the database (the allowlist in `BibleSeeder::ALLOWED_VERSIONS` — currently KJV and BBE). Vendored files that are not imported are not readable on the site.\n"
            . "- **What counts as complete:** a translation holding under 90% of the median verse count is flagged incomplete and is not counted as a complete translation. The Finnish Pyhä Raamattu file (`fi_pr`) is the only one flagged.\n"
            . "- **Exclusions:** no user data of any kind is counted. Highlights, notes, lessons, sermons, subscriptions, and affiliate records are private and never appear in this research.\n"
            . "- **Refresh:** recomputed when the vendored files change; the data-last-changed date above is the files' modification date, never the page build date.\n"
            . "- **Rounding:** percentages are rounded to the nearest whole percent.\n\n"
            . "## Suggested citation\n\n"
            . "InspireWrite by Glenride, \"Bible Coverage Statistics 2026\", ".Site::url('/research/bible-coverage').", November 2026.\n\n"
            . "## Frequently asked questions\n\n"
            . "### How many Bible translations does InspireWrite provide?\n\n"
            . "InspireWrite serves {$study['servedCount']} Bible translations live out of {$study['translationCount']} vendored translation files. See the [FAQ](https://inspirewrite.online/faq).\n\n"
            . "### Why are some translations vendored but not served?\n\n"
            . "Translations are imported deliberately, one at a time, so each can be checked before it is published. The Portuguese NIV file (`pt_nvi`) is copyrighted by Biblica and must never be imported.\n";

        return new MarkdownDocument(
            title: $study['title'],
            summary: "{$study['translationCount']} translation files in {$study['languageCount']} languages, a median of ".number_format($study['medianVerses'])." verses per translation, and {$study['servedCount']} translations served live.",
            canonical: Site::url('/research/bible-coverage'),
            lastUpdated: $study['dataLastModified'],
            body: $body,
            related: [
                ['label' => 'Research hub', 'url' => Site::url('/research')],
                ['label' => 'Bible index', 'url' => Site::url('/bible')],
                ['label' => 'FAQ', 'url' => Site::url('/faq')],
            ],
        );
    }

    /** Books for the home page, from the default (KJV) version. */
    private static function bookList(): array
    {
        $version = BibleVersion::first();
        if (! $version) {
            return [];
        }

        return $version->books()->orderBy('position')->get(['name', 'abbreviation', 'position'])->toArray();
    }

    /** Last-updated date for a static page = its source file's mtime. */
    public static function lastUpdatedFor(string $tsxPath): string
    {
        $full = base_path($tsxPath);

        return File::exists($full) ? date('Y-m-d', File::lastModified($full)) : Site::LAST_UPDATED;
    }
}
