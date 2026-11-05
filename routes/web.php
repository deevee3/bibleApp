<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AffiliateAdminController;
use App\Http\Controllers\AffiliateDashboardController;
use App\Http\Controllers\BibleController;
use App\Http\Controllers\BibleInteractionController;
use App\Http\Controllers\BibleSearchController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LlmsController;
use App\Http\Controllers\MarkdownController;
use App\Http\Controllers\ReferralController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SermonController;
use App\Models\BibleVersion;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [BibleController::class, 'index'])->name('home');

// Public referral-link entry point: /r/{code} -> records click, sets the
// attribution cookie, redirects to registration.
Route::get('/r/{code}', [ReferralController::class, 'redirect'])->where('code', '[A-Z0-9]+')->name('affiliate.redirect');
Route::get('/about', function () { return Inertia::render('About'); })->name('about');
Route::get('/pricing', function () { return Inertia::render('Pricing'); })->name('pricing');
Route::get('/for-llms', function () { return Inertia::render('ForLlms'); })->name('for-llms');
Route::get('/contact', function () { return Inertia::render('Contact'); })->name('contact');
Route::get('/privacy', function () { return Inertia::render('Privacy'); })->name('privacy');
Route::get('/terms', function () { return Inertia::render('Terms'); })->name('terms');
Route::get('/faq', function () { return Inertia::render('FAQ'); })->name('faq');

// Pillar Guides
Route::get('/guides/how-to-read-the-bible', function () { return Inertia::render('guides/HowToReadBible'); })->name('guides.read-bible');
Route::get('/guides/how-to-pray-when-you-feel-stuck', function () { return Inertia::render('guides/HowToPray'); })->name('guides.pray');
Route::get('/guides/how-to-begin-a-spiritual-journey', function () { return Inertia::render('guides/SpiritualJourney'); })->name('guides.spiritual-journey');
Route::get('/guides/how-to-use-ai-for-bible-study', function () { return Inertia::render('guides/AIBibleStudy'); })->name('guides.ai-bible-study');

// Resource Roundups
Route::get('/resources/best-bible-reading-plans', function () { return Inertia::render('resources/BibleReadingPlans'); })->name('resources.reading-plans');
Route::get('/resources/journaling-prompts-for-spiritual-growth', function () { return Inertia::render('resources/JournalingPrompts'); })->name('resources.journaling-prompts');

// NOTE: /bible/search must be registered before /bible/{book}/{chapter?},
// otherwise "search" is captured as a book abbreviation.
Route::get('/bible/search', [BibleSearchController::class, 'search'])->name('bible.search');
Route::get('/bible', [BibleController::class, 'bibleIndex'])->name('bible.index');

// Version-prefixed Bible URLs (additive only). Registered before
// /bible/{book}/{chapter?} so a version slug is never captured as a book
// abbreviation. The unprefixed routes below are untouched: they remain the
// canonical KJV URLs and must never redirect.
Route::get('/bible/{version}/{book}/{chapter?}', [BibleController::class, 'showVersioned'])
    ->where('version', implode('|', array_keys(BibleVersion::VERSION_SLUGS)))
    ->whereNumber('chapter')
    ->name('bible.version.chapter');

Route::get('/bible/{book}/{chapter?}', [BibleController::class, 'show'])->whereNumber('chapter')->name('bible.chapter');

Route::get('/shared/{token}', [SermonController::class, 'shared'])->where('token', '[A-Za-z0-9]+')->name('sermons.shared');

// ---------------------------------------------------------------------------
// AI-readable site (ScrollLaunch Prompt 1) + citation research (Prompt 2).
// Generated-from-code discovery files replace the old hand-written static
// public/llms.txt and public/robots.txt, which are deleted so these routes
// are what actually serves. Markdown versions live at /{path}.md and via
// Accept: text/markdown (see PreferMarkdown middleware); /api/md/* is the
// explicit debugging endpoint and catalog. Nothing here is committed or
// deployed by the agent — review the diff first.
// ---------------------------------------------------------------------------
Route::get('/llms.txt', [LlmsController::class, 'llms'])->name('llms');
Route::get('/llms-full.txt', [LlmsController::class, 'llmsFull'])->name('llms-full');
Route::get('/ai.txt', [LlmsController::class, 'aiTxt'])->name('ai-txt');
Route::get('/robots.txt', [LlmsController::class, 'robots'])->name('robots');

Route::get('/research', [ResearchController::class, 'index'])->name('research.index');
Route::get('/research/bible-coverage', [ResearchController::class, 'bibleCoverage'])->name('research.bible-coverage');

Route::get('/api/md/_catalog', [MarkdownController::class, 'catalog'])->name('md.catalog');
Route::get('/api/md/{path}', [MarkdownController::class, 'api'])->where('path', '.*')->name('md.api');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/checkout/{plan}', [CheckoutController::class, 'subscribe'])->where('plan', 'price_[A-Za-z0-9]+')->name('checkout');

    Route::get('/billing-portal', function () {
        return auth()->user()->redirectToBillingPortal(route('subscription.edit'));
    })->name('billing-portal');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/search', [SearchController::class, 'index'])->name('search');

    Route::post('/bible/highlight', [BibleInteractionController::class, 'toggleHighlight'])->name('bible.highlight');
    Route::post('/bible/favorite', [BibleInteractionController::class, 'toggleFavorite'])->name('bible.favorite');
    Route::post('/bible/bookmark', [BibleInteractionController::class, 'toggleBookmark'])->name('bible.bookmark');

    Route::get('/lessons', [LessonController::class, 'index'])->name('lessons.index');
    Route::get('/lessons/{lesson}', [LessonController::class, 'show'])->name('lessons.show');
    Route::post('/lessons/generate', [LessonController::class, 'generate'])->name('lessons.generate');
    Route::delete('/lessons/{lesson}', [LessonController::class, 'destroy'])->name('lessons.destroy');

    Route::get('/sermons/{sermon}', [SermonController::class, 'show'])->name('sermons.show');
    Route::post('/sermons/generate', [SermonController::class, 'generate'])->name('sermons.generate');
    Route::post('/sermons/from-lessons', [SermonController::class, 'createFromLessons'])->name('sermons.from-lessons');
    Route::put('/sermons/{sermon}', [SermonController::class, 'update'])->name('sermons.update');
    Route::delete('/sermons/{sermon}', [SermonController::class, 'destroy'])->name('sermons.destroy');
    Route::post('/sermons/{sermon}/share', [SermonController::class, 'share'])->name('sermons.share');
    Route::post('/sermons/{sermon}/toggle-public', [SermonController::class, 'togglePublic'])->name('sermons.toggle-public');
    Route::post('/sermons/{sermon}/add-lesson', [SermonController::class, 'addLesson'])->name('sermons.add-lesson');
    Route::post('/sermons/{sermon}/remove-lesson', [SermonController::class, 'removeLesson'])->name('sermons.remove-lesson');
    Route::get('/shared-with-me', [SermonController::class, 'sharedWithMe'])->name('sermons.shared-with-me');

    // Creator affiliate dashboard (only renders for users with an affiliate record).
    Route::get('/affiliate', [AffiliateDashboardController::class, 'show'])->name('affiliate.dashboard');

    // Admin routes
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/users', [AdminController::class, 'index'])->name('admin.users');
        Route::post('/users/{user}/make-admin', [AdminController::class, 'makeAdmin'])->name('admin.make-admin');
        Route::post('/users/{user}/remove-admin', [AdminController::class, 'removeAdmin'])->name('admin.remove-admin');
        Route::post('/users/{user}/assign-trial', [AdminController::class, 'assignTrial'])->name('admin.assign-trial');
        Route::post('/users/{user}/cancel-subscription', [AdminController::class, 'cancelSubscription'])->name('admin.cancel-subscription');
        Route::post('/users/{user}/toggle-beta', [AdminController::class, 'toggleBetaTester'])->name('admin.toggle-beta');
        Route::post('/users/{user}/remove-beta', [AdminController::class, 'removeBetaTester'])->name('admin.remove-beta');

        // Trials management
        Route::get('/trials', [AdminController::class, 'trials'])->name('admin.trials');
        Route::post('/users/{user}/extend-trial', [AdminController::class, 'extendTrial'])->name('admin.extend-trial');
        Route::post('/users/{user}/revoke-trial', [AdminController::class, 'revokeTrial'])->name('admin.revoke-trial');
        Route::post('/trials/bulk-extend', [AdminController::class, 'bulkExtendTrials'])->name('admin.bulk-extend-trials');
        Route::post('/trials/bulk-revoke', [AdminController::class, 'bulkRevokeTrials'])->name('admin.bulk-revoke-trials');
    });
});

// ---------------------------------------------------------------------------
// Affiliate admin module.
// ---------------------------------------------------------------------------
Route::middleware(['auth', 'verified', 'is_admin'])->prefix('admin/affiliates')->name('admin.affiliates.')->group(function () {
    Route::get('/', [AffiliateAdminController::class, 'index'])->name('index');
    Route::post('/invite', [AffiliateAdminController::class, 'invite'])->name('invite');
    Route::get('/{affiliate}', [AffiliateAdminController::class, 'show'])->name('show');
    Route::patch('/{affiliate}', [AffiliateAdminController::class, 'update'])->name('update');
    Route::patch('/{affiliate}/status', [AffiliateAdminController::class, 'updateStatus'])->name('status');
    Route::post('/{affiliate}/payouts', [AffiliateAdminController::class, 'storePayout'])->name('payouts.store');
    Route::post('/{affiliate}/adjustments', [AffiliateAdminController::class, 'storeAdjustment'])->name('adjustments.store');
});

require __DIR__.'/settings.php';

// Markdown versions of every public page: GET /{path}.md. Registered last
// so no real route is shadowed; unknown paths get a markdown 404, never HTML.
Route::get('{path}.md', [MarkdownController::class, 'show'])->where('path', '.*')->name('md.show');
