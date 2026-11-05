<?php

namespace App\Support\Markdown;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Builds markdown HTTP responses with the headers the ScrollLaunch prompt
 * requires. Never returns HTML from a markdown endpoint.
 */
final class MarkdownResponse
{
    public static function document(Request $request, MarkdownDocument $document, int $maxAge = 3600): Response
    {
        $body = $document->render();

        $response = new Response($body, 200, [
            'Content-Type' => 'text/markdown; charset=utf-8',
            'X-Markdown-Tokens' => (string) $document->tokens(),
            'X-Robots-Tag' => 'noindex, follow',
            'Content-Location' => $document->canonical,
            'Link' => '<'.$document->canonical.'>; rel="canonical"',
            'Vary' => 'Accept',
            'Cache-Control' => "public, s-maxage={$maxAge}, stale-while-revalidate=86400",
            'Last-Modified' => gmdate('D, d M Y H:i:s', strtotime($document->lastUpdated)).' GMT',
            'Access-Control-Allow-Origin' => '*',
        ]);

        if ($request->isMethod('head')) {
            $response->setContent('');
        }

        return $response;
    }

    public static function notFound(Request $request, string $path): Response
    {
        $document = new MarkdownDocument(
            title: 'Not found',
            summary: 'No markdown version exists for this page.',
            canonical: \App\Support\Site::url($path),
            lastUpdated: \App\Support\Site::LAST_UPDATED,
            body: "There is no markdown version of /{$path} on InspireWrite.\n\nSee the [markdown catalog](https://inspirewrite.online/api/md/_catalog) for every available markdown page, or the [home page](https://inspirewrite.online/).",
        );

        $response = self::document($request, $document, 300);
        $response->setStatusCode(404);

        return $response;
    }

    /** Parse an Accept header; markdown wins only when its q beats text/html. */
    public static function prefersMarkdown(?string $accept): bool
    {
        if ($accept === null || $accept === '') {
            return false;
        }

        $q = ['text/markdown' => 0.0, 'text/html' => 0.0];

        foreach (explode(',', $accept) as $part) {
            $segments = explode(';', trim($part));
            $type = strtolower(trim($segments[0]));
            $weight = 1.0;
            foreach (array_slice($segments, 1) as $param) {
                if (str_starts_with(trim($param), 'q=')) {
                    $weight = (float) substr(trim($param), 2);
                }
            }
            if (array_key_exists($type, $q)) {
                $q[$type] = max($q[$type], $weight);
            }
            // */* and anything else must never select markdown.
        }

        return $q['text/markdown'] > 0 && $q['text/markdown'] > $q['text/html'];
    }

    /**
     * Render KJV verse text the way the HTML chapter page does:
     * short {segments} (words added for readability) become italics;
     * longer {translator notes} (contain ":" or are long) become [*] markers
     * collected into $notes. Raw curly braces are never emitted.
     *
     * @param  array<int, string>  $notes  collected translator notes, appended to by reference
     */
    public static function formatVerseText(string $text, array &$notes): string
    {
        $out = '';
        $parts = preg_split('/(\{[^}]*\})/', $text, -1, PREG_SPLIT_DELIM_CAPTURE);

        foreach ($parts as $part) {
            if (strlen($part) > 2 && str_starts_with($part, '{') && str_ends_with($part, '}')) {
                $inner = trim(substr($part, 1, -1));
                if (str_contains($inner, ':') || strlen($inner) > 40) {
                    $notes[] = $inner;
                    $out .= ' [*'.count($notes).']';
                } else {
                    $out .= '*'.$inner.'*';
                }
            } else {
                $out .= $part;
            }
        }

        return preg_replace('/\s+/', ' ', trim($out)) ?? trim($out);
    }
}
