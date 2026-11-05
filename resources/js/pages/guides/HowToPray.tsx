import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';
import { Heart, Clock, Calendar, Lightbulb, Quote, BookOpen, ArrowRight } from 'lucide-react';

export default function HowToPray() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "How to Pray When You Feel Stuck",
        "description": "Practical strategies to revitalize your prayer life when you feel spiritually dry or distant from God.",
        "author": { "@type": "Organization", "name": "InspireWrite by Glenride" },
        "publisher": { "@type": "Organization", "name": "InspireWrite by Glenride", "url": "https://inspirewrite.online" }
    };

    return (
        <BibleLayout>
            <Head title="How to Pray When You Feel Stuck | InspireWrite">
                <meta name="description" content="Feeling spiritually dry? Learn practical strategies to revitalize your prayer life and reconnect with God." />
                <meta name="ai-summary" content="Feeling spiritually dry? Learn practical strategies to revitalize your prayer life and reconnect with God." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/guides/how-to-pray-when-you-feel-stuck.md" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            <section className="py-20 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-yellow-600 text-sm uppercase tracking-widest mb-4">
                        <Heart size={16} /><span>Spiritual Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        How to Pray When You Feel <span className="text-yellow-500">Stuck</span>
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                        Prayer can feel like talking into an empty room. If you're struggling to find words or feeling distant from God, this guide is for you.
                    </p>
                </div>
            </section>

            <section className="py-12 px-6 md:px-12 bg-yellow-500 text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Lightbulb size={24} />The Short Answer</h2>
                    <p className="text-lg leading-relaxed">
                        When prayer feels stuck, don't try harder—try differently. Start with honesty: tell God exactly how you feel. Use Scripture as a script for prayer. Focus on presence, not performance.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center">1</span>
                            Start with Radical Honesty
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">The most powerful prayer is often the most honest one. God already knows what you're thinking—so tell Him the truth:</p>
                        <div className="bg-[#F5F2EA] p-6 border-l-4 border-yellow-500 italic text-gray-700 space-y-2">
                            <p>"God, I don't feel like praying right now."</p>
                            <p>"I'm not sure You're listening."</p>
                            <p>"I don't have any words. I'm just tired."</p>
                        </div>
                        <p className="text-gray-700 leading-relaxed mt-4">This kind of raw honesty is all over the Psalms. Honest struggle is not faithlessness—it's the beginning of deeper faith.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center">2</span>
                            Use Scripture as Your Script
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">When you don't know what to say, let the Bible speak for you. Open a Psalm, read it slowly, then pray it back to God in your own words.</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 border border-blue-200 p-4">
                                <p className="font-bold text-blue-900">Psalm 23</p>
                                <p className="text-blue-800 text-sm italic">"Lord, be my shepherd today..."</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 p-4">
                                <p className="font-bold text-green-900">Psalm 46:10</p>
                                <p className="text-green-800 text-sm italic">"Help me be still and know You are God..."</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center">3</span>
                            Try the ACTS Framework
                        </h2>
                        <div className="space-y-3">
                            {[
                                { letter: 'A', title: 'Adoration', desc: 'Praise God for who He is' },
                                { letter: 'C', title: 'Confession', desc: 'Acknowledge where you\'ve fallen short' },
                                { letter: 'T', title: 'Thanksgiving', desc: 'Express gratitude for what He\'s done' },
                                { letter: 'S', title: 'Supplication', desc: 'Bring your requests for yourself and others' }
                            ].map(item => (
                                <div key={item.letter} className="flex gap-4 p-4 bg-[#F5F2EA] border-l-4 border-yellow-500">
                                    <span className="text-2xl font-bold text-yellow-500">{item.letter}</span>
                                    <div><p className="font-bold">{item.title}</p><p className="text-gray-600 text-sm">{item.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center">4</span>
                            Change Your Posture or Location
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">Sometimes getting unstuck is as simple as changing where or how you pray:</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Take a prayer walk through your neighborhood</li>
                            <li>Pray at a different time of day</li>
                            <li>Speak your prayers out loud</li>
                            <li>Write your prayers in a journal</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center">5</span>
                            Embrace Silence
                        </h2>
                        <div className="bg-[#1a1a1a] text-white p-6">
                            <Quote className="text-yellow-500 mb-3" size={28} />
                            <p className="italic text-lg" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>"Be still, and know that I am God."</p>
                            <p className="text-gray-400 text-sm mt-2">— Psalm 46:10</p>
                        </div>
                        <p className="text-gray-700 leading-relaxed mt-4">Set a timer for 5 minutes. Sit in silence. Just be present with God. This contemplative practice has transformed prayer for millions throughout history.</p>
                    </div>

                    <div className="bg-[#1a1a1a] text-white p-10 text-center">
                        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>Let Scripture Guide Your Prayers</h2>
                        <p className="text-gray-300 mb-8">When words fail, let God's Word speak.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/bible/ps/23" className="inline-flex items-center justify-center gap-2 bg-yellow-500 px-8 py-4 text-sm uppercase tracking-widest hover:bg-yellow-600">
                                <BookOpen size={18} />Read Psalm 23
                            </Link>
                            <Link href="/faq" className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white/10">
                                View FAQ<ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </BibleLayout>
    );
}
