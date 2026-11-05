<?php

namespace App\Http\Controllers;

use App\Support\BibleCoverage;
use App\Support\Site;
use Inertia\Inertia;

class ResearchController extends Controller
{
    public function index()
    {
        $study = BibleCoverage::computeStudy();

        return Inertia::render('Research/Index', [
            'reports' => [
                [
                    'slug' => 'bible-coverage',
                    'url' => Site::url('/research/bible-coverage'),
                    'title' => $study['title'],
                    'summary' => "{$study['translationCount']} translation files in {$study['languageCount']} languages, a median of ".number_format($study['medianVerses'])." verses per translation, and {$study['servedCount']} translations served live.",
                    'dataLastModified' => $study['dataLastModified'],
                ],
            ],
        ]);
    }

    public function bibleCoverage()
    {
        $study = BibleCoverage::computeStudy();

        return Inertia::render('Research/BibleCoverage', [
            'study' => $study,
            'faq' => [
                [
                    'id' => 'how-many-translations',
                    'question' => 'How many Bible translations does InspireWrite provide?',
                    'answer' => "InspireWrite serves {$study['servedCount']} Bible translations live: "
                        .implode(' and ', array_map(
                            fn (array $row) => $row['name'].' ('.number_format($row['verses']).' verses)',
                            $study['served']
                        ))
                        .". That is {$study['servedCount']} of {$study['translationCount']} translation files vendored in {$study['languageCount']} languages.",
                ],
                [
                    'id' => 'why-not-all-served',
                    'question' => 'Why are some translations vendored but not served?',
                    'answer' => 'Translations are imported deliberately, one at a time, so each can be checked before it is published. The Portuguese NIV file (pt_nvi) is copyrighted by Biblica and must never be imported.',
                ],
                [
                    'id' => 'how-counted',
                    'question' => 'How were these numbers counted?',
                    'answer' => "By counting the vendored translation files in bible/json/ directly: every file's books, chapters, and verses. No user data of any kind is counted. The data was last changed on {$study['dataLastModified']}.",
                ],
            ],
        ]);
    }
}
