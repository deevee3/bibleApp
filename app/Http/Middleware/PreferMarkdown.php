<?php

namespace App\Http\Middleware;

use App\Support\Markdown\MarkdownRegistry;
use App\Support\Markdown\MarkdownResponse;
use App\Support\Site;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Content negotiation + AI discovery headers for public pages.
 *
 * - GET with Accept: text/markdown beating text/html → the markdown
 *   version, from the same registry the .md routes use. A wildcard Accept
 *   header or a missing Accept header always gets HTML, so curl, link
 *   previews and normal browsers never break.
 * - Every HTML response carries a Link header advertising /llms.txt,
 *   /llms-full.txt and /ai.txt (rel="describedby").
 * - Never touches POST, /api/* (except the explicit /api/md/* endpoints),
 *   auth routes, or paths outside the registry.
 */
class PreferMarkdown
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->isMethod('get') && MarkdownResponse::prefersMarkdown($request->header('Accept'))) {
            $path = trim($request->path(), '/');

            if (! str_starts_with($path, 'api/') && MarkdownRegistry::isPublicPath($path)) {
                $document = MarkdownRegistry::render($path);

                if ($document) {
                    return MarkdownResponse::document($request, $document);
                }
            }
        }

        $response = $next($request);

        if (str_starts_with($response->headers->get('Content-Type', ''), 'text/markdown')) {
            // Re-assert Vary: Accept after the response has passed back
            // through the Inertia middleware (which sets Vary: X-Inertia)
            // and HandleCors (which appends Vary: Origin). A markdown
            // response varies on Accept only.
            $response->headers->set('Vary', 'Accept');

            return $response;
        }

        if ($request->isMethod('get') && str_starts_with($response->headers->get('Content-Type', ''), 'text/html')) {
            $response->headers->set('Link', '<'.Site::url('/llms.txt').'>; rel="describedby", <'.Site::url('/llms-full.txt').'>; rel="describedby", <'.Site::url('/ai.txt').'>; rel="describedby"');
        }

        return $response;
    }
}
