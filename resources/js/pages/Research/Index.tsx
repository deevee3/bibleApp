import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';

interface Report {
    slug: string;
    url: string;
    title: string;
    summary: string;
    dataLastModified: string;
}

interface Props {
    reports: Report[];
}

export default function Index({ reports }: Props) {
    return (
        <BibleLayout>
            <Head title="Research — InspireWrite">
                <meta
                    name="description"
                    content="Counted research from InspireWrite’s own data: Bible coverage statistics, with methodology."
                />
                <meta
                    name="ai-summary"
                    content="InspireWrite’s research hub. Counted research from InspireWrite’s own data, starting with Bible coverage statistics for the vendored translation files."
                />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/research.md" />
            </Head>

            <section className="py-20 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <h1
                        className="text-5xl font-bold uppercase tracking-wider"
                        style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}
                    >
                        Research.
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mt-6">
                        Counted research from InspireWrite’s own data — numbers we can show our
                        working for. Every report states its source, its denominator, and when
                        the data last changed.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto space-y-8">
                    {reports.map((report) => (
                        <article key={report.slug} className="border border-gray-100 bg-[#F5F2EA]/30 p-8">
                            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                                <Link href="/research/bible-coverage" className="hover:text-yellow-600 transition-colors">
                                    {report.title}
                                </Link>
                            </h2>
                            <p className="text-gray-700 leading-relaxed mt-3">{report.summary}</p>
                            <p className="text-sm text-gray-500 mt-4">Data last changed: {report.dataLastModified}</p>
                            <p className="mt-4">
                                <Link href="/research/bible-coverage" className="text-yellow-600 hover:underline font-medium">
                                    Read the report →
                                </Link>
                                {' · '}
                                <a href="https://inspirewrite.online/research/bible-coverage.md" className="text-yellow-600 hover:underline font-medium">
                                    View as Markdown
                                </a>
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </BibleLayout>
    );
}
