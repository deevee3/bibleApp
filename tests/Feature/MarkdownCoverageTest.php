<?php

namespace Tests\Feature;

use App\Support\Markdown\MarkdownRegistry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class MarkdownCoverageTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // No Vite build exists in this checkout; Inertia assertions must not
        // require the manifest.
        $this->withoutVite();
    }

    /** Machine-readable endpoints that are covered by a controller, not a .md renderer. */
    private const MACHINE_ENDPOINTS = ['llms.txt', 'llms-full.txt', 'ai.txt', 'robots.txt', 'sitemap.xml'];

    /** Routes that are not public pages at all. */
    private const NON_PAGE_ROUTES = ['up', 'api/md/_catalog', 'api/md/{path}', '{path}.md'];

    public function test_every_static_entry_renders(): void
    {
        foreach (MarkdownRegistry::staticEntries() as $path => $entry) {
            $document = MarkdownRegistry::render($path);
            $this->assertNotNull($document, "No markdown renderer output for static path '{$path}'");
            $this->assertNotEmpty($document->title);
            $this->assertNotEmpty($document->summary);
            $this->assertNotEmpty($document->canonical);
        }
    }

    public function test_every_public_get_route_has_a_renderer_or_an_explicit_skip(): void
    {
        $uncovered = [];

        foreach (Route::getRoutes()->getRoutes() as $route) {
            if (! in_array('GET', $route->methods(), true)) {
                continue;
            }

            $uri = $route->uri();

            if (in_array($uri, self::NON_PAGE_ROUTES, true)
                || in_array($uri, self::MACHINE_ENDPOINTS, true)
                || str_starts_with($uri, 'api/')
                || str_starts_with($uri, 'storage/')
            ) {
                continue;
            }

            // Auth-gated routes must be on the skip list, never rendered.
            // Fortify registers some auth routes as auth:web, and some
            // two-factor routes carry password.confirm instead.
            $middleware = $route->middleware();
            $isAuthGated = in_array('auth', $middleware, true)
                || in_array('verified', $middleware, true)
                || in_array('password.confirm', $middleware, true)
                || count(array_filter($middleware, fn ($m) => str_starts_with((string) $m, 'auth:'))) > 0;
            if ($isAuthGated) {
                $this->assertArrayHasKey(
                    $uri,
                    MarkdownRegistry::SKIPS,
                    "Auth route '{$uri}' is not on the markdown skip list"
                );
                continue;
            }

            // Parameterised public patterns (bible chapters, shared sermons,
            // affiliate redirect) are covered by a pattern renderer or a skip.
            if (str_contains($uri, '{')) {
                $this->assertTrue(
                    isset(MarkdownRegistry::SKIPS[$uri])
                        || str_starts_with($uri, 'bible/')
                        || str_starts_with($uri, 'shared/'),
                    "Parameterised route '{$uri}' has no pattern renderer or skip reason"
                );
                continue;
            }

            if (! MarkdownRegistry::isPublicPath($uri) && ! isset(MarkdownRegistry::SKIPS[$uri])) {
                $uncovered[] = $uri;
            }
        }

        $this->assertSame([], $uncovered, 'Public GET routes with no markdown renderer and no skip reason');
    }

    public function test_skip_list_covers_every_auth_gated_path(): void
    {
        foreach (['dashboard', 'search', 'lessons', 'sermons', 'shared-with-me', 'affiliate', 'settings', 'admin', 'checkout', 'billing-portal'] as $prefix) {
            $found = false;
            foreach (MarkdownRegistry::SKIPS as $path => $reason) {
                if ($path === $prefix || str_starts_with($path, $prefix.'/') || str_starts_with($path, $prefix.'/{')) {
                    $this->assertNotEmpty($reason, "Skip for '{$path}' needs a reason");
                    $found = true;
                }
            }
            $this->assertTrue($found, "No skip entry for auth-gated path '{$prefix}'");
        }
    }

    public function test_catalog_paths_match_registry(): void
    {
        $catalog = $this->get('/api/md/_catalog')->json('routes');
        $paths = array_column($catalog, 'path');

        foreach (array_keys(MarkdownRegistry::staticEntries()) as $path) {
            $this->assertContains($path, $paths, "Registry path '{$path}' missing from /api/md/_catalog");
        }
    }

    public function test_finding_and_faq_anchors_are_unique(): void
    {
        $study = \App\Support\BibleCoverage::computeStudy();
        $ids = array_column($study['findings'], 'id');
        $this->assertSame($ids, array_unique($ids), 'Finding ids must be unique');
        $this->assertNotEmpty($ids, 'The study must produce findings');

        // The three research FAQ ids are distinct, stable anchors.
        $this->get('/research/bible-coverage')->assertInertia(fn (Assert $page) => $page
            ->has('faq', 3)
            ->where('faq.0.id', 'how-many-translations')
            ->where('faq.1.id', 'why-not-all-served')
            ->where('faq.2.id', 'how-counted')
        );
    }
}
