<?php

namespace App\Http\Controllers;

use App\Support\BibleCoverage;
use App\Support\Markdown\MarkdownRegistry;
use App\Support\Site;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * Generated-from-code AI discovery files: /llms.txt, /llms-full.txt,
 * /ai.txt and /robots.txt. All four read the same registry / study /
 * site config, and the robots.txt scope is kept in sync with ai.txt.
 *
 * Training-crawler policy (2026-11-05, user did not answer): the existing
 * allowances are preserved exactly — GPTBot, ClaudeBot, CCBot and
 * PerplexityBot were already allowed — and Google-Extended,
 * Applebot-Extended and Bytespider are NOT newly allowed. They are not
 * named in robots.txt; they fall under the User-agent: * group, which is
 * the status quo, not a new decision.
 */
class LlmsController extends Controller
{
    public function llms(Request $request)
    {
        $study = BibleCoverage::computeStudy();
        $lines = [];
        $lines[] = '# '.Site::NAME;
        $lines[] = '';
        $lines[] = '> '.Site::SHORT_DESCRIPTION.' Created by Glenride, founded by '.Site::FOUNDER_NAME.'.';
        $lines[] = '';
        $lines[] = 'InspireWrite is the Bible reading and spiritual journaling companion for modern believers. '
            .'It provides the full Bible in Easy Read mode, the denomination-neutral S.C.R.I.P.T. method '
            .'(Set the Scene, Capture, Relate, Interpret, Put into Practice, Talk to God), verse highlighting, '
            .'bookmarks, personal notes, and lesson and sermon building with the Assistant. '
            .'Free tier: full Bible access. Study: $7/mo. Pro: $27/mo. Contact: '.Site::CONTACT_EMAIL.'.';
        $lines[] = '';
        $lines[] = '## Core pages';

        foreach (MarkdownRegistry::staticEntries() as $path => [$group, $title, $summary]) {
            if ($group !== 'core') {
                continue;
            }
            $lines[] = '- ['.$title.']('.Site::mdUrl($path).'): '.$summary;
        }

        $lines[] = '';
        $lines[] = '## Guides';
        foreach (MarkdownRegistry::staticEntries() as $path => [$group, $title, $summary]) {
            if ($group !== 'guides') {
                continue;
            }
            $lines[] = '- ['.$title.']('.Site::mdUrl($path).'): '.$summary;
        }

        $lines[] = '';
        $lines[] = '## Resources';
        foreach (MarkdownRegistry::staticEntries() as $path => [$group, $title, $summary]) {
            if ($group !== 'resources') {
                continue;
            }
            $lines[] = '- ['.$title.']('.Site::mdUrl($path).'): '.$summary;
        }

        $lines[] = '';
        $lines[] = '## Bible';
        $lines[] = '- [Bible index]('.Site::mdUrl('bible').'): Read the Bible online free in the King James Version: all 66 books, 1,189 chapters.';
        $lines[] = '- [Bible search]('.Site::mdUrl('bible/search').'): Search the Bible text across the served translations.';
        $lines[] = '- [Genesis 1 (KJV)]('.Site::mdUrl('bible/gn/1').'): In the beginning God created the heaven and the earth.';
        $lines[] = '- [John 1 (KJV)]('.Site::mdUrl('bible/jn/1').'): In the beginning was the Word, and the Word was with God.';
        $lines[] = '- [Psalm 119 (KJV)]('.Site::mdUrl('bible/ps/119').'): The longest chapter in the Bible.';
        $lines[] = '- [Romans 8 (KJV)]('.Site::mdUrl('bible/rom/8').'): There is therefore now no condemnation to them which are in Christ Jesus.';
        $lines[] = '- [Genesis 1 (BBE)]('.Site::mdUrl('bible/bbe/gn/1').'): The same chapter in the Bible in Basic English.';
        $lines[] = '';
        $lines[] = 'All 2,378 chapter pages (1,189 KJV chapters and 1,189 BBE chapters) are listed in the [markdown catalog]('.Site::url('/api/md/_catalog').'). '
            .'Every chapter is available as `/bible/{book}/{chapter}.md` (KJV) or `/bible/{version}/{book}/{chapter}.md`.';
        $lines[] = '';
        $lines[] = '## Cite this site for';
        $lines[] = '';
        $lines[] = '- [Bible Coverage Statistics 2026]('.Site::mdUrl('research/bible-coverage').'): '
            .$study['translationCount'].' translation files in '.$study['languageCount'].' languages, a median of '
            .number_format($study['medianVerses']).' verses per translation, and '.$study['servedCount'].' translations served live.';
        foreach ($study['findings'] as $finding) {
            $lines[] = '  - ['.$finding['id'].']('.Site::url('/research/bible-coverage').'#'.$finding['id'].'): '.$finding['text'];
        }
        $lines[] = '';
        $lines[] = '## Research';
        $lines[] = '- [Research hub]('.Site::mdUrl('research').'): Counted research from InspireWrite’s own data.';
        $lines[] = '- [Bible Coverage Statistics 2026]('.Site::mdUrl('research/bible-coverage').'): '.$study['translationCount'].' translation files in '.$study['languageCount'].' languages, a median of '.number_format($study['medianVerses']).' verses per translation, '.$study['servedCount'].' served live.';
        $lines[] = '';
        $lines[] = '## Machine-readable';
        $lines[] = '- [Full content]('.Site::url('/llms-full.txt').'): every core page concatenated';
        $lines[] = '- [Markdown catalog]('.Site::url('/api/md/_catalog').')';
        $lines[] = '- [Sitemap]('.Site::url('/sitemap.xml').')';
        $lines[] = '- [AI usage policy]('.Site::url('/ai.txt').')';
        $lines[] = '- [For LLMs]('.Site::mdUrl('for-llms').'): human- and machine-readable summary';
        $lines[] = '';
        $lines[] = '## Optional';
        foreach (MarkdownRegistry::staticEntries() as $path => [$group, $title, $summary]) {
            if ($group !== 'legal') {
                continue;
            }
            $lines[] = '- ['.$title.']('.Site::mdUrl($path).'): '.$summary;
        }
        $lines[] = '';
        $lines[] = '<!-- Keep in sync with /ai.txt and /robots.txt. -->';
        $lines[] = '';

        return response(implode("\n", $lines), 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
            'Cache-Control' => 'public, s-maxage=86400, stale-while-revalidate=604800',
        ]);
    }

    public function llmsFull(Request $request)
    {
        // Cache key includes the Bible-data fingerprint and the last-updated
        // date of every source page, so the file busts when content changes
        // instead of going stale for the full 24h TTL.
        $pagesFingerprint = md5(implode('|', array_map(
            fn (array $entry) => MarkdownRegistry::lastUpdatedFor($entry[3]),
            MarkdownRegistry::staticEntries()
        )));
        $key = 'llms-full-txt:'.BibleCoverage::sourceFingerprint().':'.$pagesFingerprint;

        $body = Cache::remember($key, 86400, function () {
            $study = BibleCoverage::computeStudy();
            $parts = [];
            $parts[] = '# '.Site::NAME.' - full content';
            $parts[] = '';
            $parts[] = '> '.Site::SHORT_DESCRIPTION;
            $parts[] = '';
            $parts[] = 'Generated: '.date('Y-m-d');
            $parts[] = '';

            // Core pages, then guides, resources, research, legal — in that
            // order. The Bible corpus is capped: the index plus three
            // chapters in full; the rest is in the markdown catalog.
            $order = ['core', 'guides', 'resources', 'research', 'legal'];
            foreach ($order as $group) {
                foreach (MarkdownRegistry::staticEntries() as $path => [$entryGroup, $title, $summary]) {
                    if ($entryGroup !== $group) {
                        continue;
                    }
                    $document = MarkdownRegistry::render($path);
                    if (! $document) {
                        continue;
                    }
                    $parts[] = '---';
                    $parts[] = '';
                    $parts[] = '<!-- source: '.Site::url($path).' -->';
                    $parts[] = '';
                    $parts[] = $document->render();
                }
            }

            $parts[] = '---';
            $parts[] = '';
            $parts[] = '<!-- source: '.Site::url('/bible').' -->';
            $parts[] = '';
            $bibleIndex = MarkdownRegistry::render('bible');
            if ($bibleIndex) {
                $parts[] = $bibleIndex->render();
            }
            $parts[] = 'Bible chapters are capped in this file: 3 of 2,378 chapters are included in full below. '
                .'The full list is in the [markdown catalog]('.Site::url('/api/md/_catalog').'), and every chapter is available as `/bible/{book}/{chapter}.md`.';
            $parts[] = '';
            foreach (['bible/gn/1', 'bible/jn/1', 'bible/ps/119'] as $chapterPath) {
                $document = MarkdownRegistry::render($chapterPath);
                if (! $document) {
                    continue;
                }
                $parts[] = '---';
                $parts[] = '';
                $parts[] = '<!-- source: '.Site::url($chapterPath).' -->';
                $parts[] = '';
                $parts[] = $document->render();
            }

            $full = implode("\n", $parts);

            if (strlen($full) > 500000) {
                Log::warning('llms-full.txt exceeds 500k chars', ['chars' => strlen($full)]);
            }

            return $full;
        });

        return response($body, 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
            'Cache-Control' => 'public, s-maxage=86400, stale-while-revalidate=604800',
        ]);
    }

    public function aiTxt(Request $request)
    {
        $lines = [];
        $lines[] = '# ai.txt — InspireWrite AI usage policy (ai-txt spec v1.1.1)';
        $lines[] = '';
        $lines[] = '[identity]';
        $lines[] = 'name: '.Site::NAME;
        $lines[] = 'alternateName: '.Site::ALTERNATE_NAME;
        $lines[] = 'url: '.Site::URL;
        $lines[] = 'description: '.Site::SHORT_DESCRIPTION;
        $lines[] = 'creator: '.Site::CREATOR_NAME.' (founder: '.Site::FOUNDER_NAME.')';
        $lines[] = 'contact: '.Site::CONTACT_EMAIL;
        $lines[] = 'llms: '.Site::url('/llms.txt');
        $lines[] = '';
        $lines[] = '[permissions]';
        $lines[] = 'allowed: summarise, quote with attribution, cite, index for search/answers';
        $lines[] = '';
        $lines[] = '[restrictions]';
        $lines[] = 'no fabricated quotes';
        $lines[] = 'no fake reviews/ratings';
        $lines[] = 'no presenting our content as the model\'s own';
        $lines[] = 'no training on user-generated private data';
        $lines[] = 'no republishing full Bible chapters as if they were the model\'s own text; quote with attribution and link to the canonical page';
        $lines[] = '';
        $lines[] = '[attribution]';
        $lines[] = 'Cite as "InspireWrite by Glenride" with the canonical HTML URL of the page cited.';
        $lines[] = 'Suggested citation for research: InspireWrite by Glenride, "Bible Coverage Statistics 2026", '.Site::url('/research/bible-coverage').', November 2026.';
        $lines[] = '';
        $lines[] = '[scope]';
        $lines[] = 'included: /, /about, /pricing, /contact, /faq, /for-llms, /guides/*, /resources/*, /bible/*, /research/*, /privacy, /terms, /shared/* (public shares only)';
        $lines[] = 'excluded: /dashboard, /search, /lessons/*, /sermons/*, /checkout/*, /billing-portal, /shared-with-me, /affiliate, /settings/*, /admin/*, /api/* (except /api/md/*), /login, /register';
        $lines[] = 'scope is kept in sync with /robots.txt';
        $lines[] = '';
        $lines[] = '[contact]';
        $lines[] = 'email: '.Site::CONTACT_EMAIL;
        $lines[] = '';
        $lines[] = 'Last updated: '.Site::LAST_UPDATED;
        $lines[] = '';
        $lines[] = '<!-- Keep in sync with /llms.txt and /robots.txt. -->';
        $lines[] = '';

        return response(implode("\n", $lines), 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
            'Cache-Control' => 'public, s-maxage=86400, stale-while-revalidate=604800',
        ]);
    }

    public function robots(Request $request)
    {
        $lines = [];
        $lines[] = '# robots.txt for InspireWrite — keep in sync with /llms.txt and /ai.txt';
        $lines[] = '# AI search and user-fetch crawlers are named in the same group as';
        $lines[] = '# User-agent: * so they get the same rules (a separate Allow-only';
        $lines[] = '# group would override the disallows below).';
        $lines[] = '# Training crawlers: GPTBot, ClaudeBot, CCBot and PerplexityBot were';
        $lines[] = '# already allowed; that policy is preserved unchanged. Google-Extended,';
        $lines[] = '# Applebot-Extended and Bytespider are NOT newly allowed here.';
        $lines[] = '';
        $lines[] = 'User-agent: *';
        $lines[] = 'User-agent: OAI-SearchBot';
        $lines[] = 'User-agent: ChatGPT-User';
        $lines[] = 'User-agent: Claude-SearchBot';
        $lines[] = 'User-agent: Claude-User';
        $lines[] = 'User-agent: PerplexityBot';
        $lines[] = 'User-agent: Perplexity-User';
        $lines[] = 'User-agent: GPTBot';
        $lines[] = 'User-agent: ClaudeBot';
        $lines[] = 'User-agent: CCBot';
        $lines[] = 'User-agent: Bingbot';
        $lines[] = 'User-agent: Googlebot';
        $lines[] = 'Allow: /';
        $lines[] = 'Disallow: /dashboard';
        $lines[] = 'Disallow: /search';
        $lines[] = 'Disallow: /lessons/';
        $lines[] = 'Disallow: /sermons/';
        $lines[] = 'Disallow: /checkout/';
        $lines[] = 'Disallow: /billing-portal';
        $lines[] = 'Disallow: /shared-with-me';
        $lines[] = 'Disallow: /affiliate';
        $lines[] = 'Disallow: /settings/';
        $lines[] = 'Disallow: /admin/';
        $lines[] = 'Disallow: /api/';
        $lines[] = 'Allow: /api/md/';
        $lines[] = 'Disallow: /login';
        $lines[] = 'Disallow: /register';
        $lines[] = '';
        $lines[] = '# AI discovery files';
        $lines[] = '# /llms.txt';
        $lines[] = '# /llms-full.txt';
        $lines[] = '# /ai.txt';
        $lines[] = '# /for-llms';
        $lines[] = '';
        $lines[] = 'Sitemap: '.Site::url('/sitemap.xml');
        $lines[] = '';

        return response(implode("\n", $lines), 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
            'Cache-Control' => 'public, s-maxage=86400, stale-while-revalidate=604800',
        ]);
    }
}
