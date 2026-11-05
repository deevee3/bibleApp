<?php

namespace Tests\Unit;

use App\Support\BibleCoverage;
use Tests\TestCase;

class BibleCoverageStudyTest extends TestCase
{
    /**
     * 25 synthetic translation rows mirroring the real corpus shape:
     * KJV 31,100 verses with a 66-book split (OT 23,147 / NT 7,953),
     * BBE 31,104, one incomplete Finnish file (23,765), the rest clustered
     * near the median.
     */
    private function rows(int $bbeVerses = 31104, bool $withIncomplete = true): array
    {
        $perBookVerses = array_fill(0, 66, 400);
        // Spread the OT adjustment (OT must sum to 23,147) across books 1-17
        // and 19, so no single book outranks Psalms (2,461).
        for ($i = 1; $i <= 17; $i++) {
            $perBookVerses[$i] = 722;
        }
        $perBookVerses[19] = 412;
        $perBookVerses[18] = 2461;  // Psalms, longest book
        $perBookVerses[62] = 13;    // 2 John, shortest book
        for ($i = 39; $i < 48; $i++) {
            $perBookVerses[$i] = 127;
        }
        $perBookVerses[48] = 397;   // adjusted so NT sums to 7,953

        $perBookChapters = array_fill(0, 66, 20);
        $perBookChapters[0] = 39;
        $perBookChapters[18] = 150;
        for ($i = 39; $i < 66; $i++) {
            $perBookChapters[$i] = 10;
        }
        $perBookChapters[39] = 9;
        $perBookChapters[62] = 1;

        $bookNames = [];
        for ($i = 0; $i < 66; $i++) {
            $bookNames[$i] = 'Book '.($i + 1);
        }
        $bookNames[0] = 'Genesis';
        $bookNames[18] = 'Psalms';
        $bookNames[62] = '2 John';

        $rows = [
            [
                'abbreviation' => 'en_kjv',
                'name' => 'King James Version',
                'language' => 'English',
                'books' => 66,
                'chapters' => 1189,
                'verses' => 31100,
                'perBookVerses' => $perBookVerses,
                'perBookChapters' => $perBookChapters,
                'bookNames' => $bookNames,
            ],
            [
                'abbreviation' => 'en_bbe',
                'name' => 'Bible in Basic English',
                'language' => 'English',
                'books' => 66,
                'chapters' => 1189,
                'verses' => $bbeVerses,
                'perBookVerses' => $perBookVerses,
                'perBookChapters' => $perBookChapters,
                'bookNames' => $bookNames,
            ],
        ];

        if ($withIncomplete) {
            $rows[] = [
                'abbreviation' => 'fi_pr',
                'name' => 'Finnish Pyhä Raamattu',
                'language' => 'Finnish',
                'books' => 66,
                'chapters' => 1189,
                'verses' => 23765,
                'perBookVerses' => [],
                'perBookChapters' => [],
                'bookNames' => [],
            ];
        }

        $languages = ['Arabic', 'Chinese', 'French', 'German', 'Korean', 'Portuguese', 'Russian', 'Spanish'];
        for ($i = 0; $i < 22; $i++) {
            $rows[] = [
                'abbreviation' => 'xx_test'.$i,
                'name' => 'Test Translation '.$i,
                'language' => $languages[$i % count($languages)],
                'books' => 66,
                'chapters' => 1189,
                'verses' => 31000 + ($i * 4),
                'perBookVerses' => [],
                'perBookChapters' => [],
                'bookNames' => [],
            ];
        }

        return $rows;
    }

    private function finding(array $study, string $id): ?array
    {
        foreach ($study['findings'] as $finding) {
            if ($finding['id'] === $id) {
                return $finding;
            }
        }

        return null;
    }

    public function test_full_corpus_produces_all_findings(): void
    {
        $study = BibleCoverage::computeFromRows($this->rows(), ['en_kjv', 'en_bbe']);

        $this->assertSame(25, $study['translationCount']);
        $this->assertSame(2, $study['servedCount']);
        $this->assertSame(31100, $study['kjvVerses']);
        $this->assertSame(31104, $study['bbeVerses']);

        foreach (['coverage-files', 'served-vs-vendored', 'verse-count-consistency', 'served-translations-agree', 'old-new-testament-split', 'longest-shortest-book', 'incomplete-translation-fi-pr'] as $id) {
            $this->assertNotNull($this->finding($study, $id), "Missing finding '{$id}'");
        }
    }

    public function test_every_finding_states_a_denominator(): void
    {
        $study = BibleCoverage::computeFromRows($this->rows(), ['en_kjv', 'en_bbe']);

        foreach ($study['findings'] as $finding) {
            $this->assertNotEmpty($finding['denominator'], "Finding '{$finding['id']}' has no denominator");
            $this->assertNotEmpty($finding['text']);
        }
    }

    public function test_finding_ids_are_unique(): void
    {
        $study = BibleCoverage::computeFromRows($this->rows(), ['en_kjv', 'en_bbe']);

        $ids = array_column($study['findings'], 'id');
        $this->assertSame($ids, array_unique($ids));
    }

    public function test_old_and_new_testament_shares_add_up(): void
    {
        $study = BibleCoverage::computeFromRows($this->rows(), ['en_kjv', 'en_bbe']);

        $this->assertSame(23147, $study['oldTestament']['verses']);
        $this->assertSame(7953, $study['newTestament']['verses']);
        $this->assertSame(
            $study['kjvVerses'],
            $study['oldTestament']['verses'] + $study['newTestament']['verses']
        );
        $this->assertSame(929, $study['oldTestament']['chapters']);
        $this->assertSame(260, $study['newTestament']['chapters']);

        $finding = $this->finding($study, 'old-new-testament-split');
        $this->assertStringContainsString('74%', $finding['text']);
        $this->assertStringContainsString('26%', $finding['text']);
    }

    public function test_longest_and_shortest_books(): void
    {
        $study = BibleCoverage::computeFromRows($this->rows(), ['en_kjv', 'en_bbe']);

        $this->assertSame('Psalms', $study['longestBook']['name']);
        $this->assertSame(2461, $study['longestBook']['verses']);
        $this->assertSame('2 John', $study['shortestBook']['name']);
        $this->assertSame(13, $study['shortestBook']['verses']);
    }

    public function test_small_gap_is_about_the_same_and_flips_with_data(): void
    {
        $agree = BibleCoverage::computeFromRows($this->rows(31104), ['en_kjv', 'en_bbe']);
        $finding = $this->finding($agree, 'served-translations-agree');
        $this->assertStringContainsString('about the same', $finding['text']);
        $this->assertStringContainsString('difference of 4 verses', $finding['text']);

        $different = BibleCoverage::computeFromRows($this->rows(30000), ['en_kjv', 'en_bbe']);
        $finding = $this->finding($different, 'served-translations-agree');
        $this->assertStringNotContainsString('about the same', $finding['text']);
        $this->assertStringContainsString('difference of 1100 verses', $finding['text']);
    }

    public function test_median_and_consistency_band(): void
    {
        $study = BibleCoverage::computeFromRows($this->rows(), ['en_kjv', 'en_bbe']);

        // 25 rows: median is the 13th sorted verse count, inside the cluster.
        $this->assertGreaterThanOrEqual(31000, $study['medianVerses']);
        $this->assertLessThanOrEqual(31110, $study['medianVerses']);
        // 24 of 25 rows sit within 1% of the median; only fi_pr is outside.
        $this->assertSame(24, $study['withinOnePercentOfMedian']);

        $finding = $this->finding($study, 'verse-count-consistency');
        $this->assertStringContainsString('24 of the 25', $finding['text']);
    }

    public function test_incomplete_flag_triggers_under_90_percent_of_median(): void
    {
        $with = BibleCoverage::computeFromRows($this->rows(31104, true), ['en_kjv', 'en_bbe']);
        $this->assertNotNull($this->finding($with, 'incomplete-translation-fi-pr'));
        $this->assertCount(1, $with['incomplete']);

        $without = BibleCoverage::computeFromRows($this->rows(31104, false), ['en_kjv', 'en_bbe']);
        $this->assertNull($this->finding($without, 'incomplete-translation-fi-pr'));
        $this->assertSame([], $without['incomplete']);
    }

    public function test_thin_data_produces_no_consistency_finding(): void
    {
        $thin = array_slice($this->rows(), 0, 5);
        $study = BibleCoverage::computeFromRows($thin, ['en_kjv', 'en_bbe']);

        $this->assertNull($this->finding($study, 'verse-count-consistency'));
        // Corpus-level findings still appear with their (small) denominator.
        $this->assertNotNull($this->finding($study, 'coverage-files'));
        $this->assertStringContainsString('5 translation files', $this->finding($study, 'coverage-files')['denominator']);
    }

    public function test_empty_data_produces_no_findings(): void
    {
        $study = BibleCoverage::computeFromRows([], []);

        $this->assertSame([], $study['findings']);
        $this->assertSame(0, $study['translationCount']);
        $this->assertSame(0, $study['medianVerses']);
    }

    public function test_breakdown_sorted_by_verses_descending(): void
    {
        $study = BibleCoverage::computeFromRows($this->rows(), ['en_kjv', 'en_bbe']);

        $verses = array_column($study['breakdown'], 'verses');
        $sorted = $verses;
        rsort($sorted);
        $this->assertSame($sorted, $verses);
        $this->assertSame('en_bbe', $study['breakdown'][0]['abbreviation']);
        $this->assertSame('fi_pr', $study['breakdown'][count($study['breakdown']) - 1]['abbreviation']);
    }

    public function test_served_share_pct(): void
    {
        $study = BibleCoverage::computeFromRows($this->rows(), ['en_kjv', 'en_bbe']);

        $finding = $this->finding($study, 'served-vs-vendored');
        $this->assertStringContainsString('2/25', $finding['text']);
        $this->assertStringContainsString('8%', $finding['text']);
        $this->assertSame('8%', BibleCoverage::pct(2, 25));
        $this->assertSame('0%', BibleCoverage::pct(1, 0));
    }
}
