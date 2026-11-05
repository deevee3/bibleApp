import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';
import { Compass, Clock, Calendar, Lightbulb, BookOpen, Heart, Users, ArrowRight } from 'lucide-react';

export default function SpiritualJourney() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "How to Begin a Spiritual Journey",
        "description": "First steps for seekers and those returning to faith. A practical guide to starting or deepening your spiritual life.",
        "author": { "@type": "Organization", "name": "InspireWrite by Glenride" },
        "publisher": { "@type": "Organization", "name": "InspireWrite by Glenride", "url": "https://inspirewrite.online" }
    };

    return (
        <BibleLayout>
            <Head title="How to Begin a Spiritual Journey | InspireWrite">
                <meta name="description" content="First steps for seekers and those returning to faith. A practical guide to starting or deepening your spiritual life." />
                <meta name="ai-summary" content="First steps for seekers and those returning to faith. A practical guide to starting or deepening your spiritual life." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/guides/how-to-begin-a-spiritual-journey.md" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            <section className="py-20 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-yellow-600 text-sm uppercase tracking-widest mb-4">
                        <Compass size={16} /><span>Spiritual Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        How to Begin a <span className="text-yellow-500">Spiritual Journey</span>
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                        Whether you're exploring faith for the first time or returning after years away, every journey begins with a single step.
                    </p>
                </div>
            </section>

            <section className="py-12 px-6 md:px-12 bg-yellow-500 text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Lightbulb size={24} />The Short Answer</h2>
                    <p className="text-lg leading-relaxed">
                        A spiritual journey begins with curiosity and openness. Start by reading the Gospel of John to understand Jesus. Pray honestly, even if you're not sure anyone is listening. Find a community of believers. Don't expect perfection—spiritual growth is gradual and lifelong.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center">1</span>
                            What Is a Spiritual Journey?
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            A spiritual journey is the process of seeking meaning, purpose, and connection with something greater than yourself. For Christians, it's the lifelong process of growing closer to God through Jesus Christ.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            It's not about becoming perfect or following a rigid set of rules. It's about relationship—with God, with yourself, and with others. Everyone's journey looks different, and that's okay.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center">2</span>
                            Start with Scripture
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            The Bible is the foundation of Christian spirituality. If you're new, start with the Gospel of John—it presents Jesus' identity and mission in accessible language.
                        </p>
                        <div className="bg-[#F5F2EA] p-6 border-l-4 border-yellow-500">
                            <p className="font-bold mb-2">Recommended Starting Points:</p>
                            <ul className="text-gray-700 space-y-2">
                                <li><strong>Gospel of John</strong> — Who is Jesus?</li>
                                <li><strong>Psalms</strong> — Prayers for every emotion</li>
                                <li><strong>Proverbs</strong> — Practical wisdom for life</li>
                            </ul>
                        </div>
                        <p className="text-gray-700 mt-4">
                            <Link href="/bible/jn/1" className="text-yellow-600 hover:underline">Start reading John →</Link>
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center">3</span>
                            Learn to Pray
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Prayer is simply talking to God. You don't need fancy words or a specific formula. Be honest about your doubts, fears, and hopes. Even "God, if you're real, help me find You" is a valid prayer.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Start with just a minute or two each day. Tell God what you're thankful for, what worries you, and ask for guidance. As you grow, your prayer life will naturally deepen.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center">4</span>
                            Find Community
                        </h2>
                        <div className="flex gap-4 items-start p-5 bg-[#F5F2EA] border-l-4 border-yellow-500 mb-4">
                            <Users className="text-yellow-500 shrink-0 mt-1" size={24} />
                            <p className="text-gray-700">Spiritual growth happens best in community. Look for a local church, Bible study group, or Christian community where you feel welcomed and can ask questions.</p>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Don't expect to find perfect people—churches are full of imperfect people seeking God together. The goal is to walk alongside others who can encourage, challenge, and support your journey.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center">5</span>
                            Build Spiritual Habits
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">Small, consistent practices build a strong spiritual life:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 border border-gray-200">
                                <BookOpen className="text-yellow-500 mb-2" size={20} />
                                <p className="font-bold">Daily Reading</p>
                                <p className="text-gray-600 text-sm">Even 5 minutes in Scripture daily</p>
                            </div>
                            <div className="p-4 border border-gray-200">
                                <Heart className="text-yellow-500 mb-2" size={20} />
                                <p className="font-bold">Daily Prayer</p>
                                <p className="text-gray-600 text-sm">Morning, evening, or throughout the day</p>
                            </div>
                            <div className="p-4 border border-gray-200">
                                <Users className="text-yellow-500 mb-2" size={20} />
                                <p className="font-bold">Weekly Gathering</p>
                                <p className="text-gray-600 text-sm">Church service or Bible study</p>
                            </div>
                            <div className="p-4 border border-gray-200">
                                <Compass className="text-yellow-500 mb-2" size={20} />
                                <p className="font-bold">Regular Reflection</p>
                                <p className="text-gray-600 text-sm">Journaling your spiritual insights</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] text-white p-10 text-center">
                        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>Start Your Journey Today</h2>
                        <p className="text-gray-300 mb-8">InspireWrite is designed to support your spiritual growth every step of the way.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/bible/jn/1" className="inline-flex items-center justify-center gap-2 bg-yellow-500 px-8 py-4 text-sm uppercase tracking-widest hover:bg-yellow-600">
                                <BookOpen size={18} />Read the Gospel of John
                            </Link>
                            <Link href="/register" className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white/10">
                                Create Free Account<ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </BibleLayout>
    );
}
