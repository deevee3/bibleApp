import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, Lightbulb, BookOpen, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export default function AIBibleStudy() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "How to Study with the Assistant",
        "description": "A guide to using study assistance responsibly for Bible study, sermon preparation, and spiritual growth while keeping personal discernment central.",
        "author": { "@type": "Organization", "name": "InspireWrite by Glenride" },
        "publisher": { "@type": "Organization", "name": "InspireWrite by Glenride", "url": "https://inspirewrite.online" }
    };

    return (
        <BibleLayout>
            <Head title="How to Study with the Assistant | InspireWrite">
                <meta name="description" content="A guide to using the Assistant responsibly for Bible study, sermon preparation, and spiritual growth." />
                <meta name="ai-summary" content="A guide to using the Assistant responsibly for Bible study, sermon preparation, and spiritual growth." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/guides/how-to-use-ai-for-bible-study.md" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            <section className="py-20 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-yellow-600 text-sm uppercase tracking-widest mb-4">
                        <Sparkles size={16} /><span>Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        How to Study with the <span className="text-yellow-500">Assistant</span>
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                        The Assistant can be a helpful tool for deeper Scripture study—when used wisely. Learn how to leverage study assistance while keeping your personal discernment at the center.
                    </p>
                </div>
            </section>

            <section className="py-12 px-6 md:px-12 bg-[#1a1a1a] text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-500"><Lightbulb size={24} />The Short Answer</h2>
                    <p className="text-lg leading-relaxed text-gray-300">
                        The Assistant is a helper, not a replacement for personal study and spiritual discernment. Use it to generate sermon outlines, discover cross-references, and organize your thoughts—but always verify suggestions against Scripture and sound doctrine.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-[#1a1a1a] font-bold flex items-center justify-center">1</span>
                            What the Assistant Can Do for Bible Study
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: 'Generate Sermon Outlines', desc: 'Turn passages into structured teaching points' },
                                { title: 'Create Lesson Plans', desc: 'Develop Bible study curriculum from Scripture' },
                                { title: 'Summarize Passages', desc: 'Get quick overviews of chapters or books' },
                                { title: 'Suggest Applications', desc: 'Explore how passages apply to modern life' },
                                { title: 'Find Themes', desc: 'Identify recurring themes across Scripture' },
                                { title: 'Save Preparation Time', desc: 'Accelerate research and organization' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 p-4 bg-green-50 border border-green-200">
                                    <CheckCircle className="text-green-600 shrink-0 mt-1" size={18} />
                                    <div><p className="font-bold text-green-900">{item.title}</p><p className="text-green-800 text-sm">{item.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-[#1a1a1a] font-bold flex items-center justify-center">2</span>
                            What the Assistant Cannot Replace
                        </h2>
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-4">
                            <div className="flex gap-3 items-start">
                                <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={24} />
                                <div>
                                    <p className="font-bold text-amber-900 mb-2">Important Limitations</p>
                                    <ul className="text-amber-800 space-y-2">
                                        <li>• <strong>Personal relationship with God</strong> — The Assistant cannot pray for you or know your heart</li>
                                        <li>• <strong>Spiritual discernment</strong> — The Holy Spirit's guidance is irreplaceable</li>
                                        <li>• <strong>Pastoral wisdom</strong> — The Assistant lacks the context pastoral counselors have</li>
                                        <li>• <strong>Community</strong> — Growth happens in relationship with other believers</li>
                                        <li>• <strong>Theological accuracy</strong> — Machine assistance can make errors; always verify</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-[#1a1a1a] font-bold flex items-center justify-center">3</span>
                            How InspireWrite Uses the Assistant Responsibly
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">InspireWrite's study features are designed to assist, not replace your study:</p>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex gap-3"><CheckCircle className="text-yellow-500 shrink-0 mt-1" size={18} /><span><strong>You control the input</strong> — Select which verses to study; the Assistant works with your choices</span></li>
                            <li className="flex gap-3"><CheckCircle className="text-yellow-500 shrink-0 mt-1" size={18} /><span><strong>Review and edit</strong> — All generated output can be edited before use; you have final say</span></li>
                            <li className="flex gap-3"><CheckCircle className="text-yellow-500 shrink-0 mt-1" size={18} /><span><strong>Private by default</strong> — Your notes and studies are private unless you share them</span></li>
                            <li className="flex gap-3"><CheckCircle className="text-yellow-500 shrink-0 mt-1" size={18} /><span><strong>Scripture-centered</strong> — Content is built around the Bible text you select</span></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            <span className="w-10 h-10 bg-yellow-500 text-[#1a1a1a] font-bold flex items-center justify-center">4</span>
                            Best Practices for Assisted Study
                        </h2>
                        <div className="space-y-4">
                            <div className="p-5 bg-[#F5F2EA] border-l-4 border-yellow-500">
                                <p className="font-bold mb-1">1. Read the passage yourself first</p>
                                <p className="text-gray-600 text-sm">Form your own initial thoughts before consulting the Assistant.</p>
                            </div>
                            <div className="p-5 bg-[#F5F2EA] border-l-4 border-yellow-500">
                                <p className="font-bold mb-1">2. Use assistance for structure, not substance</p>
                                <p className="text-gray-600 text-sm">Let the Assistant organize your thoughts; let Scripture and the Spirit provide the message.</p>
                            </div>
                            <div className="p-5 bg-[#F5F2EA] border-l-4 border-yellow-500">
                                <p className="font-bold mb-1">3. Verify everything</p>
                                <p className="text-gray-600 text-sm">Check generated content against the biblical text and trusted commentaries.</p>
                            </div>
                            <div className="p-5 bg-[#F5F2EA] border-l-4 border-yellow-500">
                                <p className="font-bold mb-1">4. Add your personal voice</p>
                                <p className="text-gray-600 text-sm">Your experiences, illustrations, and personality make the message authentic.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] text-white p-10 text-center">
                        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>Try Bible Study with the Assistant</h2>
                        <p className="text-gray-300 mb-8">Experience how InspireWrite's Assistant can support your sermon preparation and study.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/bible/jn/1" className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-[#1a1a1a] font-semibold px-8 py-4 text-sm uppercase tracking-widest hover:bg-yellow-400 transition-colors">
                                <BookOpen size={18} />Start Reading
                            </Link>
                            <Link href="/pricing" className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">
                                View Study Plans<ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </BibleLayout>
    );
}
