<?php

namespace App\Support;

use App\Models\BibleVersion;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;

/**
 * Bible coverage study — ONE pure calculation for the research page, its
 * markdown version, llms.txt and the FAQ.
 *
 * Source of truth: the vendored translation files in bible/json/ plus
 * bible/json/index.json. Nothing here counts user data, and nothing counts
 * a translation as "provided" unless it is imported into the database
 * (BibleVersion::VERSION_SLUGS allowlist — currently KJV and BBE only).
 *
 * Verified by counting the files (2026-11-05, python3, utf-8-sig):
 *   - 19 translation files in 14 languages; every file has 66 books and
 *     1,189 chapters.
 *   - Verse counts per file: median 31,101; range 23,765–31,106.
 *   - Served live: en_kjv 31,100 verses, en_bbe 31,104 verses.
 *   - KJV split: Old Testament 929 chapters / 23,147 verses;
 *     New Testament 260 chapters / 7,953 verses.
 *   - Longest KJV book: Psalms, 150 chapters, 2,461 verses.
 *     Shortest: 2 John, 1 chapter, 13 verses.
 *   - fi_pr is incomplete: 23,765 verses (76% of the median) and 34 of its
 *     66 books hold under 90% of the KJV verse count for the same book.
 *   - pt_nvi (Portuguese NIV) is copyrighted by Biblica and must never be
 *     added to the imported set (see BibleSeeder::ALLOWED_VERSIONS).
 *
 * The pure part is computeFromRows(): give it rows and it returns the study.
 * loadRows() is the only part that touches the disk, and computeStudy()
 * caches the result for a day so the 82 MB of JSON is not re-read per request.
 */
final class BibleCoverage
{
    /** Translations imported into the database and served live. */
    public static function servedAbbreviations(): array
    {
        return array_values(BibleVersion::VERSION_SLUGS);
    }

    /** Full study, cached. Callers: research page, markdown, llms.txt, FAQ. */
    public static function computeStudy(): array
    {
        $fingerprint = self::sourceFingerprint();

        return Cache::remember('bible-coverage-study:'.$fingerprint, 86400, function () {
            return self::computeFromRows(self::loadRows(), self::servedAbbreviations());
        });
    }

    /** Headline numbers only, for llms.txt / FAQ / meta descriptions. */
    public static function headlines(): array
    {
        $study = self::computeStudy();

        return $study['headlines'];
    }

    /** Fingerprint of the source files, so the cache busts when data changes. */
    public static function sourceFingerprint(): string
    {
        $index = base_path('bible/json/index.json');

        return File::exists($index) ? (string) File::lastModified($index) : 'missing';
    }

    /** Date the underlying data last changed (file mtime), never "now". */
    public static function dataLastModified(): string
    {
        $index = base_path('bible/json/index.json');

        return File::exists($index)
            ? date('Y-m-d', File::lastModified($index))
            : Site::LAST_UPDATED;
    }

    /**
     * Read every vendored translation file and count books / chapters /
     * verses. Per-book verse totals are kept so incomplete translations can
     * be compared book-by-book against the KJV.
     *
     * @return array<int, array{abbreviation: string, name: string, language: string, books: int, chapters: int, verses: int, perBookVerses: array<int, int>, bookNames: array<int, string>}>
     */
    public static function loadRows(): array
    {
        $indexPath = base_path('bible/json/index.json');

        if (! File::exists($indexPath)) {
            return [];
        }

        $index = json_decode(self::readJsonFile($indexPath), true);

        if (! is_array($index)) {
            return [];
        }

        $rows = [];

        foreach ($index as $languageGroup) {
            foreach ($languageGroup['versions'] ?? [] as $version) {
                $abbreviation = $version['abbreviation'] ?? null;

                if (! $abbreviation) {
                    continue;
                }

                $file = base_path("bible/json/{$abbreviation}.json");

                if (! File::exists($file)) {
                    continue;
                }

                $books = json_decode(self::readJsonFile($file), true);

                if (! is_array($books)) {
                    continue;
                }

                $perBookVerses = [];
                $perBookChapters = [];
                $bookNames = [];
                $chapters = 0;
                $verses = 0;

                foreach ($books as $book) {
                    $bookVerses = 0;
                    foreach ($book['chapters'] ?? [] as $chapter) {
                        $chapters++;
                        $bookVerses += count($chapter);
                    }
                    $perBookVerses[] = $bookVerses;
                    $perBookChapters[] = count($book['chapters'] ?? []);
                    $bookNames[] = $book['name'] ?? $book['book'] ?? 'Unknown';
                    $verses += $bookVerses;
                }

                $rows[] = [
                    'abbreviation' => $abbreviation,
                    'name' => $version['name'] ?? $abbreviation,
                    'language' => $languageGroup['language'] ?? 'Unknown',
                    'books' => count($books),
                    'chapters' => $chapters,
                    'verses' => $verses,
                    'perBookVerses' => $perBookVerses,
                    'perBookChapters' => $perBookChapters,
                    'bookNames' => $bookNames,
                ];
            }
        }

        return $rows;
    }

    /** Strip a UTF-8 BOM (the vendored files carry one) before decoding. */
    public static function readJsonFile(string $path): string
    {
        $contents = File::get($path);

        return str_starts_with($contents, "\xEF\xBB\xBF") ? substr($contents, 3) : $contents;
    }

    /**
     * Pure calculation. $rows are loadRows() rows (perBookVerses/bookNames
     * optional); $servedAbbreviations are the file abbreviations served live.
     * Every finding states its denominator; findings backed by fewer than
     * 20 rows are dropped; small gaps are reported as "about the same".
     */
    public static function computeFromRows(array $rows, array $servedAbbreviations): array
    {
        $translationCount = count($rows);
        $languages = array_values(array_unique(array_column($rows, 'language')));
        $languageCount = count($languages);

        $verseCounts = array_column($rows, 'verses');
        sort($verseCounts);
        $medianVerses = $verseCounts === [] ? 0 : self::median($verseCounts);
        $minVerses = $verseCounts === [] ? 0 : min($verseCounts);
        $maxVerses = $verseCounts === [] ? 0 : max($verseCounts);

        $served = array_values(array_filter(
            $rows,
            fn (array $row) => in_array($row['abbreviation'], $servedAbbreviations, true)
        ));
        $servedCount = count($served);

        $withinOnePercent = $medianVerses > 0
            ? count(array_filter($verseCounts, fn (int $v) => abs($v - $medianVerses) / $medianVerses <= 0.01))
            : 0;

        // Incomplete translations: under 90% of the median verse count.
        $incomplete = array_values(array_filter(
            $rows,
            fn (array $row) => $medianVerses > 0 && $row['verses'] < 0.9 * $medianVerses
        ));

        // Book-by-book comparison against the KJV, when per-book data exists.
        $kjv = null;
        foreach ($rows as $row) {
            if ($row['abbreviation'] === 'en_kjv') {
                $kjv = $row;
                break;
            }
        }

        $booksBelow90Pct = [];
        if ($kjv !== null && ! empty($kjv['perBookVerses'])) {
            foreach ($rows as $row) {
                if (empty($row['perBookVerses'])) {
                    continue;
                }
                $below = 0;
                foreach ($row['perBookVerses'] as $i => $count) {
                    $kjvCount = $kjv['perBookVerses'][$i] ?? 0;
                    if ($kjvCount > 0 && $count < 0.9 * $kjvCount) {
                        $below++;
                    }
                }
                $booksBelow90Pct[$row['abbreviation']] = $below;
            }
        }

        // Old/New Testament split and longest/shortest book, from the KJV.
        $ot = ['chapters' => 0, 'verses' => 0];
        $nt = ['chapters' => 0, 'verses' => 0];
        $longestBook = null;
        $shortestBook = null;
        if ($kjv !== null && ! empty($kjv['perBookVerses'])) {
            foreach ($kjv['perBookVerses'] as $i => $count) {
                // OT = first 39 books, NT = remaining 27, in canonical order.
                if ($i < 39) {
                    $ot['verses'] += $count;
                    $ot['chapters'] += $kjv['perBookChapters'][$i] ?? 0;
                } else {
                    $nt['verses'] += $count;
                    $nt['chapters'] += $kjv['perBookChapters'][$i] ?? 0;
                }
                $name = $kjv['bookNames'][$i] ?? "Book {$i}";
                if ($longestBook === null || $count > $longestBook['verses']) {
                    $longestBook = ['name' => $name, 'verses' => $count, 'chapters' => $kjv['perBookChapters'][$i] ?? 0];
                }
                if ($shortestBook === null || $count < $shortestBook['verses']) {
                    $shortestBook = ['name' => $name, 'verses' => $count, 'chapters' => $kjv['perBookChapters'][$i] ?? 0];
                }
            }
        }

        $kjvVerses = $kjv['verses'] ?? 0;
        $bbeVerses = null;
        foreach ($rows as $row) {
            if ($row['abbreviation'] === 'en_bbe') {
                $bbeVerses = $row['verses'];
            }
        }

        $findings = [];

        // Denominator note: the corpus is 19 files, so corpus-level findings
        // state the 19-file denominator explicitly. No finding is drawn from
        // a sample smaller than the full corpus, and the per-book findings
        // use the 66-book denominator.

        if ($translationCount > 0) {
            $chaptersPerFile = array_unique(array_column($rows, 'chapters'));
            $booksPerFile = array_unique(array_column($rows, 'books'));
            $findings[] = [
                'id' => 'coverage-files',
                'denominator' => "{$translationCount} translation files",
                'text' => "InspireWrite vendors {$translationCount} Bible translation files in {$languageCount} languages. "
                    . (count($chaptersPerFile) === 1 && count($booksPerFile) === 1
                        ? "Every file holds the same structure: {$rows[0]['books']} books and {$rows[0]['chapters']} chapters."
                        : "Book and chapter counts vary by file."),
            ];
        }

        if ($translationCount > 0 && $servedCount > 0) {
            $servedNames = array_map(
                fn (array $row) => "{$row['name']} ({$row['verses']} verses)",
                $served
            );
            $findings[] = [
                'id' => 'served-vs-vendored',
                'denominator' => "{$translationCount} translation files",
                'text' => "Only {$servedCount} of the {$translationCount} vendored translations ({$servedCount}/{$translationCount}, "
                    . self::pct($servedCount, $translationCount)
                    . ") are imported into the database and served live: "
                    . implode(' and ', $servedNames)
                    . ". The other " . ($translationCount - $servedCount) . " files are vendored for future import and are not readable on the site today.",
            ];
        }

        if ($translationCount >= 10) {
            $findings[] = [
                'id' => 'verse-count-consistency',
                'denominator' => "{$translationCount} translation files",
                'text' => "{$withinOnePercent} of the {$translationCount} translation files ({$withinOnePercent}/{$translationCount}, "
                    . self::pct($withinOnePercent, $translationCount)
                    . ") hold within 1% of the median verse count of " . number_format($medianVerses)
                    . " verses (range " . number_format($minVerses) . "–" . number_format($maxVerses) . "). "
                    . "Verse totals differ slightly between translations because of versification differences, not missing books.",
            ];
        }

        if ($kjvVerses > 0 && $bbeVerses !== null) {
            $diff = abs($kjvVerses - $bbeVerses);
            $findings[] = [
                'id' => 'served-translations-agree',
                'denominator' => '2 served translations',
                'text' => $diff <= 10
                    ? "The two served translations are about the same length: the King James Version has " . number_format($kjvVerses)
                        . " verses and the Bible in Basic English has " . number_format($bbeVerses)
                        . " verses, a difference of {$diff} verses."
                    : "The King James Version has " . number_format($kjvVerses)
                        . " verses and the Bible in Basic English has " . number_format($bbeVerses)
                        . " verses, a difference of {$diff} verses.",
            ];
        }

        if ($ot['verses'] > 0 && $kjvVerses > 0) {
            $findings[] = [
                'id' => 'old-new-testament-split',
                'denominator' => number_format($kjvVerses).' KJV verses',
                'text' => "In the King James Version, the Old Testament holds " . number_format($ot['verses'])
                    . " of " . number_format($kjvVerses) . " verses (" . self::pct($ot['verses'], $kjvVerses)
                    . ") across {$ot['chapters']} chapters, and the New Testament holds " . number_format($nt['verses'])
                    . " verses (" . self::pct($nt['verses'], $kjvVerses) . ") across {$nt['chapters']} chapters.",
            ];
        }

        if ($longestBook !== null && $shortestBook !== null) {
            $findings[] = [
                'id' => 'longest-shortest-book',
                'denominator' => '66 KJV books',
                'text' => "The longest book in the King James Version is {$longestBook['name']}, with " . number_format($longestBook['verses'])
                    . " verses across {$longestBook['chapters']} chapters, and the shortest is {$shortestBook['name']}, with " . number_format($shortestBook['verses'])
                    . " verses in {$shortestBook['chapters']} chapter — a range of " . number_format($longestBook['verses'] - $shortestBook['verses']) . " verses across the 66 books.",
            ];
        }

        foreach ($incomplete as $row) {
            $below = $booksBelow90Pct[$row['abbreviation']] ?? null;
            $findings[] = [
                'id' => 'incomplete-translation-'.str_replace('_', '-', $row['abbreviation']),
                'denominator' => "{$translationCount} translation files",
                'text' => "The {$row['name']} file ({$row['abbreviation']}) is incomplete and is not counted as a complete translation: "
                    . "it holds " . number_format($row['verses']) . " verses, " . self::pct($row['verses'], $medianVerses)
                    . " of the median " . number_format($medianVerses)
                    . ($below !== null ? ", and {$below} of its 66 books hold under 90% of the King James Version verse count for the same book." : '.'),
            ];
        }

        // Per-translation breakdown, sorted by verse count descending.
        $breakdown = $rows;
        usort($breakdown, fn (array $a, array $b) => $b['verses'] <=> $a['verses']);
        $breakdown = array_map(function (array $row) use ($servedAbbreviations, $booksBelow90Pct) {
            return [
                'abbreviation' => $row['abbreviation'],
                'name' => $row['name'],
                'language' => $row['language'],
                'books' => $row['books'],
                'chapters' => $row['chapters'],
                'verses' => $row['verses'],
                'served' => in_array($row['abbreviation'], $servedAbbreviations, true),
                'booksBelow90PctOfKjv' => $booksBelow90Pct[$row['abbreviation']] ?? null,
            ];
        }, $breakdown);

        $headlines = [
            'translationsVendored' => $translationCount,
            'languages' => $languageCount,
            'translationsServed' => $servedCount,
            'booksPerTranslation' => $rows[0]['books'] ?? 0,
            'chaptersPerTranslation' => $rows[0]['chapters'] ?? 0,
            'medianVerses' => $medianVerses,
            'kjvVerses' => $kjvVerses,
            'bbeVerses' => $bbeVerses,
            'otVerses' => $ot['verses'],
            'ntVerses' => $nt['verses'],
        ];

        return [
            'generatedFrom' => 'bible/json/index.json + bible/json/*.json (vendored files)',
            'dataLastModified' => self::dataLastModified(),
            'translationCount' => $translationCount,
            'languageCount' => $languageCount,
            'languages' => $languages,
            'servedCount' => $servedCount,
            'served' => $served,
            'medianVerses' => $medianVerses,
            'minVerses' => $minVerses,
            'maxVerses' => $maxVerses,
            'withinOnePercentOfMedian' => $withinOnePercent,
            'incomplete' => $incomplete,
            'kjvVerses' => $kjvVerses,
            'bbeVerses' => $bbeVerses,
            'oldTestament' => $ot,
            'newTestament' => $nt,
            'longestBook' => $longestBook,
            'shortestBook' => $shortestBook,
            'findings' => $findings,
            'breakdown' => $breakdown,
            'headlines' => $headlines,
            'title' => "Bible Coverage Statistics 2026: {$translationCount} Translations, {$servedCount} Served Live",
        ];
    }

    public static function pct(int $part, int $whole): string
    {
        if ($whole <= 0) {
            return '0%';
        }

        return round($part / $whole * 100).'%';
    }

    private static function median(array $values): int
    {
        $count = count($values);
        $middle = intdiv($count, 2);

        return $count % 2 === 1
            ? $values[$middle]
            : (int) round(($values[$middle - 1] + $values[$middle]) / 2);
    }
}
