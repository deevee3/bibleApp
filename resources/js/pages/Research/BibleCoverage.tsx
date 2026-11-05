import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';

interface Finding {
    id: string;
    denominator: string;
    text: string;
}

interface BreakdownRow {
    abbreviation: string;
    name: string;
    language: string;
    books: number;
    chapters: number;
    verses: number;
    served: boolean;
    booksBelow90PctOfKjv: number | null;
}

interface Study {
    title: string;
    translationCount: number;
    languageCount: number;
    servedCount: number;
    medianVerses: number;
    minVerses: number;
    maxVerses: number;
    kjvVerses: number;
    bbeVerses: number | null;
    dataLastModified: string;
    findings: Finding[];
    breakdown: BreakdownRow[];
    oldTestament: { chapters: number; verses: number };
    newTestament: { chapters: number; verses: number };
}

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface Props {
    study: Study;
    faq: FaqItem[];
}

export default function BibleCoverage({ study, faq }: Props) {
    const metaDescription = `${study.translationCount} translation files in ${study.languageCount} languages, a median of ${study.medianVerses.toLocaleString()} verses per translation, and ${study.servedCount} translations served live.`;

    const schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                name: study.title,
                url: 'https://inspirewrite.online/research/bible-coverage',
                description: metaDescription,
                dateModified: study.dataLastModified,
            },
            {
                '@type': 'Dataset',
                name: 'InspireWrite Bible Coverage Statistics 2026',
                description: metaDescription,
                creator: {
                    '@type': 'Organization',
                    name: 'Glenride',
                    url: 'https://inspirewrite.online',
                },
                dateModified: study.dataLastModified,
                variableMeasured: [
                    'translation files vendored',
                    'languages',
                    'books per translation',
                    'chapters per translation',
                    'verses per translation',
                    'translations served live',
                ],
                measurementTechnique: 'Direct count of the vendored translation files in bible/json/ (index.json plus one file per translation).',
                distribution: [
                    {
                        '@type': 'DataDownload',
                        encodingFormat: 'text/markdown',
                        contentUrl: 'https://inspirewrite.online/research/bible-coverage.md',
                    },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: faq.map((item) => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: { '@type': 'Answer', text: item.answer },
                })),
            },
        ],
    };

    return (
        <BibleLayout>
            <Head title={`${study.title} | InspireWrite`}>
                <meta name="description" content={metaDescription} />
                <meta name="ai-summary" content={metaDescription} />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/research/bible-coverage.md" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            <section className="py-20 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <p className="text-yellow-600 text-sm uppercase tracking-widest mb-4">Research · InspireWrite</p>
                    <h1
                        className="text-4xl md:text-5xl font-bold leading-tight"
                        style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}
                    >
                        {study.title}
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mt-6">{metaDescription}</p>
                    <p className="text-sm text-gray-500 mt-4">Data last changed: {study.dataLastModified}</p>
                </div>
            </section>

            <section className="py-12 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold uppercase tracking-wider mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        At a glance
                    </h2>
                    <dl className="grid md:grid-cols-2 gap-4 text-gray-700">
                        <div className="bg-[#F5F2EA] p-4"><dt className="text-sm uppercase tracking-widest text-gray-500">Translation files vendored</dt><dd className="text-2xl font-bold text-gray-900">{study.translationCount}</dd></div>
                        <div className="bg-[#F5F2EA] p-4"><dt className="text-sm uppercase tracking-widest text-gray-500">Languages</dt><dd className="text-2xl font-bold text-gray-900">{study.languageCount}</dd></div>
                        <div className="bg-[#F5F2EA] p-4"><dt className="text-sm uppercase tracking-widest text-gray-500">Translations served live</dt><dd className="text-2xl font-bold text-gray-900">{study.servedCount} of {study.translationCount}</dd></div>
                        <div className="bg-[#F5F2EA] p-4"><dt className="text-sm uppercase tracking-widest text-gray-500">Median verses per translation</dt><dd className="text-2xl font-bold text-gray-900">{study.medianVerses.toLocaleString()}</dd></div>
                        <div className="bg-[#F5F2EA] p-4"><dt className="text-sm uppercase tracking-widest text-gray-500">Old Testament (KJV)</dt><dd className="text-2xl font-bold text-gray-900">{study.oldTestament.verses.toLocaleString()} verses · {study.oldTestament.chapters} chapters</dd></div>
                        <div className="bg-[#F5F2EA] p-4"><dt className="text-sm uppercase tracking-widest text-gray-500">New Testament (KJV)</dt><dd className="text-2xl font-bold text-gray-900">{study.newTestament.verses.toLocaleString()} verses · {study.newTestament.chapters} chapters</dd></div>
                    </dl>
                </div>
            </section>

            <section className="py-12 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold uppercase tracking-wider mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        Key findings
                    </h2>
                    <div className="space-y-8">
                        {study.findings.map((finding) => (
                            <article key={finding.id} id={finding.id} className="border border-gray-100 bg-[#F5F2EA]/30 p-6 scroll-mt-24">
                                <p className="text-lg text-gray-700 leading-relaxed">{finding.text}</p>
                                <p className="text-sm text-gray-500 mt-3">
                                    Denominator: {finding.denominator}
                                    {' · '}
                                    <a href={`#${finding.id}`} className="text-yellow-600 hover:underline">
                                        Link to this finding
                                    </a>
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto overflow-x-auto">
                    <h2 className="text-2xl font-bold uppercase tracking-wider mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        Breakdown by translation
                    </h2>
                    <table className="w-full bg-white text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-left">
                                <th className="p-3">Translation</th>
                                <th className="p-3">Language</th>
                                <th className="p-3 text-right">Books</th>
                                <th className="p-3 text-right">Chapters</th>
                                <th className="p-3 text-right">Verses</th>
                                <th className="p-3 text-center">Served live</th>
                            </tr>
                        </thead>
                        <tbody>
                            {study.breakdown.map((row) => (
                                <tr key={row.abbreviation} className="border-b border-gray-100">
                                    <td className="p-3 font-medium">{row.name} <span className="text-gray-500">({row.abbreviation})</span></td>
                                    <td className="p-3">{row.language}</td>
                                    <td className="p-3 text-right">{row.books}</td>
                                    <td className="p-3 text-right">{row.chapters.toLocaleString()}</td>
                                    <td className="p-3 text-right">{row.verses.toLocaleString()}</td>
                                    <td className="p-3 text-center">{row.served ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-sm text-gray-500 mt-4">
                        Verse totals differ slightly between translations because of versification differences, not missing books — except where flagged incomplete below.
                    </p>
                </div>
            </section>

            <section className="py-12 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold uppercase tracking-wider mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        Methodology
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
                        <li><strong>Source:</strong> vendored translation files in <code>bible/json/</code> (<code>index.json</code> plus one file per translation), counted directly from the files.</li>
                        <li><strong>What counts as served:</strong> a translation is counted as served only when it is imported into the database (the allowlist in <code>BibleSeeder::ALLOWED_VERSIONS</code> — currently KJV and BBE). Vendored files that are not imported are not readable on the site.</li>
                        <li><strong>What counts as complete:</strong> a translation holding under 90% of the median verse count is flagged incomplete and is not counted as a complete translation. The Finnish Pyhä Raamattu file (<code>fi_pr</code>) is the only one flagged.</li>
                        <li><strong>Exclusions:</strong> no user data of any kind is counted. Highlights, notes, lessons, sermons, subscriptions, and affiliate records are private and never appear in this research.</li>
                        <li><strong>Refresh:</strong> recomputed when the vendored files change; the data-last-changed date above is the files’ modification date, never the page build date.</li>
                        <li><strong>Rounding:</strong> percentages are rounded to the nearest whole percent.</li>
                    </ul>

                    <h2 className="text-2xl font-bold uppercase tracking-wider mt-12 mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        Suggested citation
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        InspireWrite by Glenride, “Bible Coverage Statistics 2026”,{' '}
                        <a href="https://inspirewrite.online/research/bible-coverage" className="text-yellow-600 hover:underline">
                            https://inspirewrite.online/research/bible-coverage
                        </a>
                        , November 2026.
                    </p>
                </div>
            </section>

            <section className="py-12 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold uppercase tracking-wider mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        Frequently asked questions
                    </h2>
                    <div className="space-y-6">
                        {faq.map((item) => (
                            <article key={item.id} id={item.id} className="bg-white border border-gray-100 p-6 scroll-mt-24">
                                <h3 className="font-bold text-lg">{item.question}</h3>
                                <p className="text-gray-700 leading-relaxed mt-2">{item.answer}</p>
                                <p className="text-sm mt-3">
                                    <a href={`#${item.id}`} className="text-yellow-600 hover:underline">
                                        Link to this answer
                                    </a>
                                </p>
                            </article>
                        ))}
                    </div>
                    <p className="mt-8 text-sm text-gray-500">
                        <Link href="/research" className="text-yellow-600 hover:underline">All research</Link>
                        {' · '}
                        <Link href="/bible" className="text-yellow-600 hover:underline">Bible index</Link>
                        {' · '}
                        <a href="https://inspirewrite.online/research/bible-coverage.md" className="text-yellow-600 hover:underline">
                            View as Markdown
                        </a>
                    </p>
                </div>
            </section>
        </BibleLayout>
    );
}
