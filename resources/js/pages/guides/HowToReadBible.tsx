import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, Clock, Target, Lightbulb, CheckCircle, ArrowRight, Quote, BookMarked, Calendar, Coffee } from 'lucide-react';

export default function HowToReadBible() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "How to Read the Bible: A Complete Guide for Beginners",
        "description": "Learn how to start reading the Bible effectively. Practical tips for developing a consistent Bible reading habit, understanding Scripture, and growing spiritually.",
        "author": {
            "@type": "Organization",
            "name": "InspireWrite by Glenride"
        },
        "publisher": {
            "@type": "Organization",
            "name": "InspireWrite by Glenride",
            "url": "https://inspirewrite.online"
        },
        "datePublished": "2026-01-01",
        "dateModified": "2026-01-22"
    };

    return (
        <BibleLayout>
            <Head title="How to Read the Bible: A Complete Guide | InspireWrite">
                <meta name="description" content="Learn how to start reading the Bible effectively. Practical tips for developing a consistent Bible reading habit, understanding Scripture, and growing spiritually." />
                <meta name="ai-summary" content="Learn how to start reading the Bible effectively. Practical tips for developing a consistent Bible reading habit, understanding Scripture, and growing spiritually." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/guides/how-to-read-the-bible.md" />
                <meta name="keywords" content="how to read Bible, Bible reading guide, start reading Bible, Bible for beginners, Bible study tips" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            {/* Hero */}
            <section className="py-20 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-yellow-600 text-sm uppercase tracking-widest mb-4">
                        <BookOpen size={16} />
                        <span>Spiritual Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        How to Read the Bible: A Complete <span className="text-yellow-500">Guide</span>
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                        Whether you're opening the Bible for the first time or returning after a long break, this guide will help you develop a meaningful, consistent practice of engaging with God's Word.
                    </p>
                    <div className="flex items-center gap-6 mt-8 text-gray-500 text-sm">
                        <span className="flex items-center gap-2"><Clock size={16} /> 12 min read</span>
                        <span className="flex items-center gap-2"><Calendar size={16} /> Updated Jan 2026</span>
                    </div>
                </div>
            </section>

            {/* Quick Answer */}
            <section className="py-12 px-6 md:px-12 bg-yellow-500 text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Lightbulb size={24} />
                        The Short Answer
                    </h2>
                    <p className="text-lg leading-relaxed">
                        Start with the Gospel of John to understand Jesus. Read just one chapter per day at the same time each day. Use highlighting and notes to engage actively. Don't worry about understanding everything—consistency matters more than comprehension when building a habit. God meets you where you are.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none mb-16">
                        <p className="text-xl text-gray-700 leading-relaxed">
                            The Bible is the most influential book in human history—and it can feel overwhelming. 66 books, multiple authors, thousands of years of history. Where do you even start? How do you make sense of it all?
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Here's the good news: <strong>you don't need to be a scholar to read the Bible.</strong> Millions of ordinary people have found life-changing wisdom in its pages. This guide will show you exactly how to begin your journey with Scripture—and how to make it stick.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center text-lg font-bold">1</span>
                            Where Should I Start Reading?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-700">
                            <p>
                                Don't start at Genesis page one and try to read straight through. That approach often leads to getting stuck in Leviticus (the third book) and giving up. Instead, choose a strategic starting point:
                            </p>

                            <div className="bg-[#F5F2EA] p-6 my-6 border-l-4 border-yellow-500">
                                <h3 className="font-bold text-lg mb-3">Best Starting Points for New Readers:</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li><strong>Gospel of John</strong> — The clearest introduction to who Jesus is and why he matters. Start here if you want to understand Christianity's core.</li>
                                    <li><strong>Gospel of Mark</strong> — The shortest Gospel, fast-paced and action-oriented. Great if you want a quick overview of Jesus' life.</li>
                                    <li><strong>Psalms</strong> — Ancient poetry about every human emotion. Perfect for when you need comfort, praise, or words to pray.</li>
                                    <li><strong>Proverbs</strong> — Practical wisdom for daily life. One chapter per day for a month.</li>
                                    <li><strong>Genesis</strong> — The origin story. Best after you've read a Gospel so you understand the bigger picture.</li>
                                </ul>
                            </div>

                            <p>
                                <Link href="/bible/jn/1" className="text-yellow-600 hover:underline font-medium">Start reading John chapter 1 now →</Link>
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center text-lg font-bold">2</span>
                            How Often Should I Read?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-700">
                            <p>
                                <strong>Consistency beats quantity.</strong> Reading 5 minutes every day is far better than reading an hour once a week. The goal is to build a habit that becomes as automatic as brushing your teeth.
                            </p>

                            <div className="grid md:grid-cols-3 gap-4 my-6">
                                <div className="bg-green-50 border border-green-200 p-4 text-center">
                                    <Coffee className="text-green-600 mx-auto mb-2" size={24} />
                                    <div className="font-bold text-green-800">Beginner</div>
                                    <div className="text-green-700 text-sm">5-10 min/day</div>
                                    <div className="text-green-600 text-xs mt-1">A few verses or 1 chapter</div>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 p-4 text-center">
                                    <BookOpen className="text-blue-600 mx-auto mb-2" size={24} />
                                    <div className="font-bold text-blue-800">Intermediate</div>
                                    <div className="text-blue-700 text-sm">15-20 min/day</div>
                                    <div className="text-blue-600 text-xs mt-1">1-2 chapters with notes</div>
                                </div>
                                <div className="bg-purple-50 border border-purple-200 p-4 text-center">
                                    <BookMarked className="text-purple-600 mx-auto mb-2" size={24} />
                                    <div className="font-bold text-purple-800">Deep Study</div>
                                    <div className="text-purple-700 text-sm">30+ min/day</div>
                                    <div className="text-purple-600 text-xs mt-1">Study with cross-references</div>
                                </div>
                            </div>

                            <p>
                                <strong>Pro tip:</strong> Anchor your reading to an existing habit. Read your Bible right after your morning coffee, during lunch, or before bed. The same time and place each day helps cement the habit.
                            </p>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center text-lg font-bold">3</span>
                            What If I Don't Understand Something?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-700">
                            <p>
                                <strong>You won't understand everything—and that's okay.</strong> The Bible was written over 1,500 years across different cultures and languages. Even scholars spend lifetimes studying it.
                            </p>

                            <p>When you hit a confusing passage:</p>
                            <ul>
                                <li><strong>Keep reading.</strong> Context often clarifies things. A confusing verse in chapter 2 might make sense by chapter 5.</li>
                                <li><strong>Write down your questions.</strong> Use InspireWrite's notes feature to track what confuses you. Questions are a sign of engagement.</li>
                                <li><strong>Look for the main point.</strong> Every passage has a central message. Focus on what's clear before worrying about what's obscure.</li>
                                <li><strong>Ask for help.</strong> Talk to a pastor, join a Bible study, or use a study Bible with explanatory notes.</li>
                            </ul>

                            <div className="bg-[#1a1a1a] text-white p-6 my-6">
                                <Quote className="text-yellow-500 mb-3" size={28} />
                                <p className="italic text-lg" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                                    "The Bible is shallow enough for a child to wade in, yet deep enough for an elephant to drown."
                                </p>
                                <p className="text-gray-400 text-sm mt-2">— Often attributed to various theologians</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center text-lg font-bold">4</span>
                            How Do I Get More from My Reading?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-700">
                            <p>
                                Active reading transforms Bible time from passive consumption to life-changing encounter. Here's how to engage more deeply:
                            </p>

                            <div className="space-y-4 my-6">
                                <div className="flex gap-4 items-start p-4 bg-yellow-50 border border-yellow-200">
                                    <CheckCircle className="text-yellow-600 shrink-0 mt-1" size={20} />
                                    <div>
                                        <strong>Highlight key verses.</strong> In InspireWrite, use different colors for different categories: promises in green, commands in blue, truths about God in yellow.
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start p-4 bg-yellow-50 border border-yellow-200">
                                    <CheckCircle className="text-yellow-600 shrink-0 mt-1" size={20} />
                                    <div>
                                        <strong>Write personal notes.</strong> Record your thoughts, questions, and how a verse applies to your life. Journaling deepens retention and insight.
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start p-4 bg-yellow-50 border border-yellow-200">
                                    <CheckCircle className="text-yellow-600 shrink-0 mt-1" size={20} />
                                    <div>
                                        <strong>Pray as you read.</strong> Turn verses into prayers. If you read "The Lord is my shepherd," pray "Lord, be my shepherd today in [specific situation]."
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start p-4 bg-yellow-50 border border-yellow-200">
                                    <CheckCircle className="text-yellow-600 shrink-0 mt-1" size={20} />
                                    <div>
                                        <strong>Look for application.</strong> Ask: "What does this passage call me to believe, do, or change?"
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center text-lg font-bold">5</span>
                            What If I Fall Behind or Miss Days?
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-700">
                            <p>
                                <strong>Grace applies to Bible reading too.</strong> If you miss a day (or a week, or a month), don't pile on guilt. Don't try to "catch up" by cramming. Simply start fresh where you left off.
                            </p>
                            <p>
                                Missing days doesn't erase the time you've spent in Scripture. Every moment with God's Word matters. The goal is a lifetime relationship with the Bible, not a perfect streak.
                            </p>
                            <p>
                                If you find yourself consistently struggling, consider:
                            </p>
                            <ul>
                                <li>Reading for less time (even 2 minutes counts)</li>
                                <li>Switching to a different book or translation</li>
                                <li>Joining a study group for accountability</li>
                                <li>Using InspireWrite's bookmarking to never lose your place</li>
                            </ul>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-[#1a1a1a] text-white p-10 text-center">
                        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            Ready to Start?
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                            The best time to start reading the Bible was years ago. The second best time is right now. Begin your journey with InspireWrite today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/bible/jn/1"
                                className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-yellow-600 transition-colors"
                            >
                                <BookOpen size={18} />
                                Start Reading John
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
                            >
                                Create Free Account
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Guides */}
            <section className="py-12 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-6">Related Guides</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href="/guides/how-to-pray-when-you-feel-stuck"
                            className="p-6 bg-white border border-gray-100 hover:border-yellow-500 hover:shadow-lg transition-all group"
                        >
                            <h4 className="font-bold group-hover:text-yellow-600 transition-colors">How to Pray When You Feel Stuck</h4>
                            <p className="text-gray-600 text-sm mt-1">Practical strategies when prayer feels difficult</p>
                        </Link>
                        <Link
                            href="/resources/best-bible-reading-plans"
                            className="p-6 bg-white border border-gray-100 hover:border-yellow-500 hover:shadow-lg transition-all group"
                        >
                            <h4 className="font-bold group-hover:text-yellow-600 transition-colors">Best Bible Reading Plans</h4>
                            <p className="text-gray-600 text-sm mt-1">Structured plans for different goals and schedules</p>
                        </Link>
                    </div>
                </div>
            </section>
        </BibleLayout>
    );
}
