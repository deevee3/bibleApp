<?php

namespace App\Http\Controllers;

use App\Support\Markdown\MarkdownRegistry;
use App\Support\Markdown\MarkdownResponse;
use Illuminate\Http\Request;

class MarkdownController extends Controller
{
    /** GET /{path}.md — markdown version of a public page. */
    public function show(Request $request, string $path)
    {
        // /index.md is the homepage's markdown version.
        if ($path === 'index') {
            $path = '';
        }

        $document = MarkdownRegistry::render($path);

        if (! $document) {
            return MarkdownResponse::notFound($request, $path);
        }

        return MarkdownResponse::document(
            $request,
            $document,
            str_starts_with($path, 'bible/') ? 86400 : 3600
        );
    }

    /** GET /api/md/{path} — always markdown, for debugging. */
    public function api(Request $request, ?string $path = null)
    {
        if ($path === null || $path === '') {
            return $this->catalog($request);
        }

        return $this->show($request, $path);
    }

    /** GET /api/md/_catalog — every addressable markdown route. */
    public function catalog(Request $request)
    {
        return response()->json([
            'routes' => MarkdownRegistry::listMarkdownRoutes(),
            'generated' => now()->toIso8601String(),
        ], 200, [
            'Cache-Control' => 'public, s-maxage=3600, stale-while-revalidate=86400',
            'Access-Control-Allow-Origin' => '*',
        ]);
    }
}
