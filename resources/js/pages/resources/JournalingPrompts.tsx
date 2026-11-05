import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';
import { PenTool, Heart, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export default function JournalingPrompts() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "30 Journaling Prompts for Spiritual Growth",
        "description": "Powerful journaling prompts to deepen your relationship with God. Reflection questions for prayer, gratitude, Scripture meditation, and personal growth.",
        "author": { "@type": "Organization", "name": "InspireWrite by Glenride" },
        "publisher": { "@type": "Organization", "name": "InspireWrite by Glenride", "url": "https://inspirewrite.online" }
    };

    const promptCategories = [
        {
            name: "Scripture Reflection",
            icon: <BookOpen className="text-yellow-500" size={24} />,
            prompts: [
                "What verse spoke to me most today, and why?",
                "How does today's reading challenge my current thinking?",
                "What character in this passage do I most relate to?",
                "What is God revealing about Himself in this text?",
                "How can I apply this Scripture to a situation I'm facing?",
                "What questions does this passage raise for me?",
                "If I were to memorize one verse from today, which would it be?"
            ]
        },
        {
            name: "Prayer & Listening",
            icon: <Heart className="text-yellow-500" size={24} />,
            prompts: [
                "What is weighing on my heart right now?",
                "What am I thankful for today? List at least 5 things.",
                "Where do I need God's guidance this week?",
                "What might God be saying to me through recent circumstances?",
                "Who needs my prayers today, and what specifically can I pray?",
                "What fears or anxieties do I need to surrender?",
                "When did I last sense God's presence? Describe that moment."
            ]
        },
        {
            name: "Self-Examination",
            icon: <Sparkles className="text-yellow-500" size={24} />,
            prompts: [
                "Where have I seen God at work in my life this month?",
                "What sin or struggle do I need to confess?",
                "In what areas am I growing spiritually? Where am I stuck?",
                "How am I treating the people closest to me?",
                "What distractions are keeping me from God?",
                "Am I living in alignment with my values? Where's the gap?",
                "What would it look like to trust God more completely?"
            ]
        },
        {
            name: "Vision & Purpose",
            icon: <PenTool className="text-yellow-500" size={24} />,
            prompts: [
                "What spiritual goals do I have for this season?",
                "How can I use my gifts to serve others this week?",
                "What legacy do I want to leave?",
                "If fear weren't a factor, what would I do for God?",
                "What broken thing in the world breaks my heart?",
                "How is God shaping my character through current challenges?",
                "What step of faith is God calling me to take?",
                "Where do I sense God leading me in the next year?",
                "What does a life well-lived look like to me?"
            ]
        }
    ];

    return (
        <BibleLayout>
            <Head title="30 Journaling Prompts for Spiritual Growth | InspireWrite">
                <meta name="description" content="Powerful journaling prompts to deepen your relationship with God. Reflection questions for prayer, gratitude, Scripture meditation, and personal growth." />
                <meta name="ai-summary" content="Powerful journaling prompts to deepen your relationship with God. Reflection questions for prayer, gratitude, Scripture meditation, and personal growth." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/resources/journaling-prompts-for-spiritual-growth.md" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            <section className="py-20 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 text-yellow-600 text-sm uppercase tracking-widest mb-4">
                        <PenTool size={16} /><span>Resource Guide</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        30 Journaling Prompts for <span className="text-yellow-500">Spiritual Growth</span>
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                        Journaling transforms ordinary Bible reading into deep spiritual formation. Use these prompts to reflect, pray, and grow closer to God.
                    </p>
                </div>
            </section>

            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto space-y-12">
                    {promptCategories.map((category, catIndex) => (
                        <div key={catIndex}>
                            <div className="flex items-center gap-3 mb-6">
                                {category.icon}
                                <h2 className="text-xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                                    {category.name}
                                </h2>
                                <div className="h-px bg-black/10 flex-1" />
                            </div>
                            <div className="grid gap-3">
                                {category.prompts.map((prompt, i) => (
                                    <div key={i} className="p-4 bg-[#F5F2EA] border-l-4 border-yellow-500 hover:bg-yellow-50 transition-colors">
                                        <p className="text-gray-800 font-medium">{prompt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="p-8 bg-[#F5F2EA] border border-gray-200">
                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>How to Use These Prompts</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li><strong>1. Read Scripture first</strong> — Let God's Word prime your reflection</li>
                            <li><strong>2. Choose one prompt</strong> — Don't try to answer them all at once</li>
                            <li><strong>3. Write freely</strong> — Don't censor yourself; this is between you and God</li>
                            <li><strong>4. End with prayer</strong> — Turn your reflections into conversation with God</li>
                            <li><strong>5. Review periodically</strong> — Look back to see how God has been working</li>
                        </ul>
                    </div>

                    <div className="bg-[#1a1a1a] text-white p-10 text-center">
                        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>Start Journaling with InspireWrite</h2>
                        <p className="text-gray-300 mb-8">Attach notes directly to verses and build a spiritual journal over time.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/bible/ps/1" className="inline-flex items-center justify-center gap-2 bg-yellow-500 px-8 py-4 text-sm uppercase tracking-widest hover:bg-yellow-600">
                                <BookOpen size={18} />Start with Psalms
                            </Link>
                            <Link href="/register" className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white/10">
                                Create Account<ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </BibleLayout>
    );
}
