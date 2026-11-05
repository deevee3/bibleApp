import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Calendar, Clock, Target, CheckCircle, ArrowRight } from 'lucide-react';

export default function BibleReadingPlans() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Best Bible Reading Plans for 2026",
        "description": "Discover the best Bible reading plans for new believers, busy professionals, and deep study. Find the perfect plan for your spiritual goals.",
        "author": { "@type": "Organization", "name": "InspireWrite by Glenride" },
        "publisher": { "@type": "Organization", "name": "InspireWrite by Glenride", "url": "https://inspirewrite.online" }
    };

    const plans = [
        {
            name: "Bible in a Year",
            duration: "365 days",
            perDay: "~15 minutes",
            bestFor: "Comprehensive overview",
            description: "Read the entire Bible in one year with daily Old Testament, New Testament, Psalms, and Proverbs readings. Great for getting the full scope of Scripture.",
            color: "yellow"
        },
        {
            name: "Gospels First",
            duration: "30 days",
            perDay: "~10 minutes",
            bestFor: "New believers",
            description: "Start with Matthew, Mark, Luke, and John to understand Jesus' life and teachings before exploring the rest of the Bible.",
            color: "green"
        },
        {
            name: "Psalms & Proverbs",
            duration: "62 days",
            perDay: "~5 minutes",
            bestFor: "Devotional reading",
            description: "One Psalm and one chapter of Proverbs daily. Perfect for building wisdom and a prayer vocabulary.",
            color: "blue"
        },
        {
            name: "New Testament Sprint",
            duration: "90 days",
            perDay: "~10 minutes",
            bestFor: "Understanding Christianity",
            description: "Focus on the New Testament to understand the foundation of Christian faith, from the Gospels through Revelation.",
            color: "purple"
        },
        {
            name: "Deep Study Plan",
            duration: "Varies",
            perDay: "~30 minutes",
            bestFor: "Serious students",
            description: "One book at a time, slowly. Read a chapter multiple times, take extensive notes, and research context before moving on.",
            color: "amber"
        }
    ];

    return (
        <BibleLayout>
            <Head title="Best Bible Reading Plans | InspireWrite">
                <meta name="description" content="Discover the best Bible reading plans for new believers, busy professionals, and deep study. Find the perfect plan for your spiritual goals." />
                <meta name="ai-summary" content="Discover the best Bible reading plans for new believers, busy professionals, and deep study. Find the perfect plan for your spiritual goals." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/resources/best-bible-reading-plans.md" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            <section className="py-20 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-yellow-600 text-sm uppercase tracking-widest mb-4">
                        <Calendar size={16} /><span>Resource Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        Best Bible Reading <span className="text-yellow-500">Plans</span>
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                        The best reading plan is one you'll actually follow. Here are five proven approaches to help you engage with Scripture consistently.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {plans.map((plan, i) => (
                            <div key={i} className={`p-8 border-l-4 border-${plan.color}-500 bg-${plan.color}-50/30 border border-gray-100`}>
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>{plan.name}</h2>
                                        <p className="text-yellow-600 text-sm font-medium mt-1">Best for: {plan.bestFor}</p>
                                    </div>
                                    <div className="flex gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><Calendar size={14} />{plan.duration}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} />{plan.perDay}/day</span>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{plan.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-8 bg-[#F5F2EA] border-l-4 border-yellow-500">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>Tips for Success</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex gap-3"><CheckCircle className="text-yellow-500 shrink-0 mt-1" size={18} /><span><strong>Same time, same place</strong> — Anchor reading to an existing habit like morning coffee</span></li>
                            <li className="flex gap-3"><CheckCircle className="text-yellow-500 shrink-0 mt-1" size={18} /><span><strong>Start small</strong> — It's better to read 5 minutes daily than 30 minutes sporadically</span></li>
                            <li className="flex gap-3"><CheckCircle className="text-yellow-500 shrink-0 mt-1" size={18} /><span><strong>Use InspireWrite's bookmarks</strong> — Never lose your place</span></li>
                            <li className="flex gap-3"><CheckCircle className="text-yellow-500 shrink-0 mt-1" size={18} /><span><strong>Grace for missed days</strong> — Just pick up where you left off</span></li>
                        </ul>
                    </div>

                    <div className="mt-16 bg-[#1a1a1a] text-white p-10 text-center">
                        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>Start Reading Today</h2>
                        <p className="text-gray-300 mb-8">InspireWrite makes Bible reading beautiful and distraction-free.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/bible/jn/1" className="inline-flex items-center justify-center gap-2 bg-yellow-500 px-8 py-4 text-sm uppercase tracking-widest hover:bg-yellow-600">
                                <BookOpen size={18} />Start with John
                            </Link>
                            <Link href="/guides/how-to-read-the-bible" className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white/10">
                                Reading Guide<ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </BibleLayout>
    );
}
