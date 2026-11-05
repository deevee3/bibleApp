<?php

use App\Http\Middleware\EnsureSecurityHeaders;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->trustProxies(at: '*');
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->alias([
            'is_admin' => \App\Http\Middleware\EnsureIsAdmin::class,
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
        ]);

        $middleware->web(append: [
            EnsureSecurityHeaders::class,
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // PreferMarkdown runs FIRST globally (before TrustProxies/HandleCors
        // and the Inertia middleware) so that, on the way back out, its
        // response fix-ups run LAST: Inertia replaces Vary with X-Inertia
        // and HandleCors appends Origin, which would otherwise clobber the
        // markdown Vary: Accept header. Its early return only fires for
        // public GET pages that prefer markdown, so nothing else is touched.
        $middleware->prepend(\App\Http\Middleware\PreferMarkdown::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (! app()->environment(['local', 'testing']) && in_array($response->getStatusCode(), [500, 503, 404, 403])) {
                return Inertia::render('Error', ['status' => $response->getStatusCode()])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            } elseif ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            return $response;
        });
    })->create();
