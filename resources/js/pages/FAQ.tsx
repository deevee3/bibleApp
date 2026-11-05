import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Sparkles, Heart, CreditCard, Shield, Settings } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCategory {
    name: string;
    icon: React.ReactNode;
    items: FAQItem[];
}

export default function FAQ() {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    const toggleItem = (id: string) => {
        setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const categories: FAQCategory[] = [
        {
            name: "Getting Started with Bible Reading",
            icon: <BookOpen className="text-yellow-500" size={24} />,
            items: [
                {
                    question: "How do I start reading the Bible?",
                    answer: "Starting to read the Bible is simple with InspireWrite. Navigate to our Bible reader and begin with the Gospel of John if you're new to scripture—it's an accessible introduction to Jesus' life and teachings. Use our distraction-free Easy Read mode to focus on the text. Start with just one chapter a day, and use the highlighting and note features to capture insights as you read. Consistency matters more than quantity when building a Bible reading habit."
                },
                {
                    question: "Which Bible translation should I use?",
                    answer: "For new readers, we recommend starting with easy-to-understand translations like the New International Version (NIV) or New Living Translation (NLT). For deeper study, consider the English Standard Version (ESV) or New American Standard Bible (NASB). InspireWrite currently provides the King James Version (KJV), a classic translation known for its beautiful language and historical significance. The best translation is one you'll actually read consistently."
                },
                {
                    question: "Where should I start reading in the Bible?",
                    answer: "If you're new to the Bible, here are great starting points: The Gospel of John for understanding who Jesus is; The Book of Psalms for prayers and worship; Proverbs for practical wisdom; Genesis for the beginning of God's story. InspireWrite makes it easy to jump to any book—simply click on the book name from our homepage or use the navigation sidebar."
                },
                {
                    question: "How do I create a Bible reading habit?",
                    answer: "Building a Bible reading habit requires consistency and intention. Start small—even 5-10 minutes daily is powerful. Choose a specific time, like morning before work or evening before bed. Use InspireWrite's bookmarking feature to save your place. Set a reading plan goal, whether it's one chapter or a few verses per day. The highlight and note features help you engage more deeply, making reading more memorable and meaningful."
                }
            ]
        },
        {
            name: "Spiritual Growth",
            icon: <Heart className="text-yellow-500" size={24} />,
            items: [
                {
                    question: "How can I hear God's voice?",
                    answer: "Hearing God's voice often comes through Scripture—as you read the Bible, pay attention to verses that seem to speak directly to your situation. God also speaks through prayer (take time to listen, not just talk), through wise counsel from mature believers, through circumstances, and through the inner prompting of the Holy Spirit. InspireWrite's journaling feature helps you record these moments of insight and track how God has been speaking to you over time."
                },
                {
                    question: "What should I do when I feel far from God?",
                    answer: "Feeling spiritually dry is common and doesn't mean God has abandoned you. Continue your spiritual practices even when you don't feel like it—read Scripture, pray honestly about your feelings, stay connected to your faith community. Use InspireWrite to journal through this season; looking back at your notes later often reveals God's faithfulness. Consider reading Psalms of lament (like Psalm 42) which express similar feelings. Sometimes distance from God reveals areas where we've drifted that need attention."
                },
                {
                    question: "How do I pray effectively?",
                    answer: "Effective prayer isn't about using perfect words—it's about honest conversation with God. Start with thanksgiving, then confession, then bring your requests. The ACTS model helps: Adoration (praising God), Confession (acknowledging sins), Thanksgiving (expressing gratitude), and Supplication (making requests). Pray Scripture back to God—the Assistant can help you identify key verses to pray over. Most importantly, make time to listen in silence, not just speak."
                },
                {
                    question: "How do I study the Bible deeply, not just read it?",
                    answer: "Deep Bible study involves observation (what does the text say?), interpretation (what does it mean?), and application (how does it change my life?). Use InspireWrite's highlighting to mark key themes in different colors. Write notes asking questions about the passage. Look up cross-references to see how passages connect. The Assistant can help you structure your study into formal insights. Consider joining a Bible study group for discussion and accountability."
                }
            ]
        },
        {
            name: "Using InspireWrite",
            icon: <Sparkles className="text-yellow-500" size={24} />,
            items: [
                {
                    question: "How does sermon building with the Assistant work?",
                    answer: "InspireWrite's Assistant helps you create structured sermons from Scripture. Select the verses you want to preach from using highlights or favorites, then click 'Generate Lesson.' The Assistant analyzes the passage and produces a structured sermon outline with introduction, main points, illustrations, and application. Review and edit the content—the Assistant is a helper, not a replacement for your spiritual discernment and personal study."
                },
                {
                    question: "Can I share my sermons with others?",
                    answer: "Yes! InspireWrite allows you to share sermons you've created. From the sermon view page, click the 'Share' button to generate a shareable link. You can control whether the sermon is public or private. Share links with your congregation, small group, or fellow ministry leaders. Shared sermons display beautifully and can be accessed without an account."
                },
                {
                    question: "How do I highlight and organize verses?",
                    answer: "To highlight a verse, simply click on it while reading. A color palette will appear letting you choose from yellow, green, blue, or pink. Each color can represent different categories—like promises, commands, prayers, or truths about God. Your highlights are saved automatically and appear in your dashboard for easy reference. Add notes to any highlight by clicking the note icon to capture your thoughts."
                },
                {
                    question: "What is Easy Read mode?",
                    answer: "Easy Read mode is our distraction-free Bible reading experience. It removes navigation elements and visual clutter so you can focus entirely on God's Word. Enable Easy Read mode by clicking the Easy Read button while reading a chapter. The text expands to fill your screen with clean, readable typography. It's perfect for extended reading sessions, meditation on Scripture, or when you need to minimize distractions."
                },
                {
                    question: "What is the S.C.R.I.P.T. method in InspireWrite?",
                    answer: "The S.C.R.I.P.T. method is InspireWrite's denomination-neutral guided inquiry flow for deeper Bible reading. S.C.R.I.P.T. stands for Set the Scene, Capture What It Says, Relate to the Rest of Scripture, Interpret the Meaning, Put It Into Practice, and Talk to God. Premium users can enable S.C.R.I.P.T. Inquiry Mode directly in the chapter reader for step-by-step reflection prompts."
                },
                {
                    question: "How many Bible translations does InspireWrite provide?",
                    answer: "InspireWrite serves 2 Bible translations live: King James Version (31,100 verses) and Bible in Basic English (31,104 verses). That is 2 of 19 translation files vendored in 14 languages (2/19). Every vendored file holds 66 books and 1,189 chapters; the other files are not yet imported and cannot be read on the site today. See the Bible coverage research page (https://inspirewrite.online/research/bible-coverage) for the counted breakdown and methodology."
                },
                {
                    question: "What does the Bible coverage research page show?",
                    answer: "It shows counted Bible coverage statistics for InspireWrite, recomputed from the vendored translation files: 19 translation files in 14 languages, a median of 31,101 verses per translation, and 2 translations served live. Every finding states its denominator and links to its methodology. See Bible Coverage Statistics 2026 (https://inspirewrite.online/research/bible-coverage)."
                },
                {
                    question: "How do I create and organize notes?",
                    answer: "Notes in InspireWrite are attached directly to verses, making them easy to find later. Click on any verse and select the note icon to add your reflection. Notes are saved in your dashboard under the highlights section. You can write prayers, record insights, track questions, or document how God is speaking to you. This creates a personal spiritual journal tied directly to Scripture."
                }
            ]
        },
        {
            name: "Subscription & Billing",
            icon: <CreditCard className="text-yellow-500" size={24} />,
            items: [
                {
                    question: "What's included in the free version?",
                    answer: "The free features of InspireWrite include full access to read all 66 books of the Bible, basic navigation and search, and the ability to create an account to save your place. Paid plans unlock lesson and sermon building with the Assistant, unlimited highlighting and notes, advanced journaling features, and the ability to share your content with others."
                },
                {
                    question: "How do I upgrade to a paid plan?",
                    answer: "To upgrade, visit our Pricing page and choose the plan that fits your needs. Click 'Subscribe' and you'll be guided through a secure checkout process powered by Stripe. Your paid features activate immediately after successful payment. You can manage your subscription anytime from your account settings."
                },
                {
                    question: "Can I cancel my subscription anytime?",
                    answer: "Yes, you can cancel your subscription at any time from your account settings. Your access continues until the end of your current billing period. We don't offer prorated refunds, but you won't be charged again after cancellation. Your data remains in your account even after downgrading."
                },
                {
                    question: "Is my payment information secure?",
                    answer: "Absolutely. All payments are processed through Stripe, a leading payment provider trusted by millions of businesses. We never see or store your full credit card number. All transactions use bank-level encryption (TLS/SSL). Your financial information is protected by Stripe's PCI-DSS Level 1 certification, the highest level of payment security."
                }
            ]
        },
        {
            name: "Privacy & Security",
            icon: <Shield className="text-yellow-500" size={24} />,
            items: [
                {
                    question: "Is my data private?",
                    answer: "Yes, your privacy is important to us. Your highlights, notes, and journals are private and only visible to you unless you choose to share them. We don't sell your data to advertisers or third parties. Read our full Privacy Policy for details on how we handle your information."
                },
                {
                    question: "How is generated content handled?",
                    answer: "When you use the Assistant, selected Bible verses are used to generate sermon outlines and lessons. Your personal notes are not included unless you choose to add them. Generated content is stored privately in your account. As noted in our footer disclaimer, generated content should always be verified independently against Scripture."
                },
                {
                    question: "Can I delete my account and data?",
                    answer: "Yes, you can request deletion of your account and all associated data by contacting us at hello@inspirewrite.online. We'll process your request within 30 days. Some data may be retained as required by law or for legitimate business purposes, as outlined in our Privacy Policy."
                }
            ]
        }
    ];

    // Generate Schema.org FAQ structured data
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": categories.flatMap(cat =>
            cat.items.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                }
            }))
        )
    };

    return (
        <BibleLayout>
            <Head title="FAQ - Frequently Asked Questions | InspireWrite">
                <meta name="description" content="Find answers to common questions about InspireWrite. Learn how to read the Bible, study with the Assistant, manage your subscription, and grow spiritually." />
                <meta name="ai-summary" content="Find answers to common questions about InspireWrite. Learn how to read the Bible, study with the Assistant, manage your subscription, and grow spiritually." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/faq.md" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            </Head>

            {/* Hero */}
            <section className="py-20 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <h1 className="text-5xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            FAQ.
                        </h1>
                        <div className="h-px bg-black/20 flex-1" />
                    </div>

                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                        Find answers to common questions about Bible reading, spiritual growth, and using InspireWrite. Can't find what you're looking for? <Link href="/contact" className="text-yellow-600 hover:underline">Contact us</Link>.
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-12 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto space-y-12">
                    {categories.map((category, catIndex) => (
                        <div key={catIndex}>
                            <div className="flex items-center gap-3 mb-6">
                                {category.icon}
                                <h2 className="text-xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                                    {category.name}
                                </h2>
                                <div className="h-px bg-black/10 flex-1" />
                            </div>

                            <div className="space-y-3">
                                {category.items.map((item, itemIndex) => {
                                    const itemId = `${catIndex}-${itemIndex}`;
                                    const isOpen = openItems[itemId];

                                    return (
                                        <div
                                            key={itemIndex}
                                            id={`faq-${catIndex}-${itemIndex}`}
                                            className="border border-gray-100 bg-[#F5F2EA]/30 hover:border-yellow-500/30 transition-colors"
                                        >
                                            <button
                                                onClick={() => toggleItem(itemId)}
                                                className="w-full px-6 py-5 flex items-center justify-between text-left"
                                            >
                                                <span className="font-bold text-gray-900 pr-4">{item.question}</span>
                                                {isOpen ? (
                                                    <ChevronUp className="text-yellow-500 shrink-0" size={20} />
                                                ) : (
                                                    <ChevronDown className="text-gray-400 shrink-0" size={20} />
                                                )}
                                            </button>

                                            {isOpen && (
                                                <div className="px-6 pb-6">
                                                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                                                    <p className="text-sm mt-3">
                                                        <a href={`#faq-${catIndex}-${itemIndex}`} className="text-yellow-600 hover:underline">
                                                            Link to this answer
                                                        </a>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="py-16 px-6 md:px-12 bg-[#1a1a1a] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <HelpCircle className="mx-auto mb-4 text-yellow-500" size={48} />
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        Still Have Questions?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        We're here to help! Reach out directly and we'll get back to you within 24-48 hours.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-yellow-500 text-[#1a1a1a] font-semibold px-8 py-4 text-sm uppercase tracking-widest hover:bg-yellow-400 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>

            {/* Related Resources */}
            <section className="py-12 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-6 text-center">Helpful Guides</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link
                            href="/guides/how-to-read-the-bible"
                            className="p-6 bg-white border border-gray-100 hover:border-yellow-500 hover:shadow-lg transition-all group"
                        >
                            <BookOpen className="text-yellow-500 mb-3" size={24} />
                            <h4 className="font-bold group-hover:text-yellow-600 transition-colors">How to Read the Bible</h4>
                            <p className="text-gray-600 text-sm mt-1">A complete guide for beginners and experienced readers</p>
                        </Link>
                        <Link
                            href="/guides/how-to-pray-when-you-feel-stuck"
                            className="p-6 bg-white border border-gray-100 hover:border-yellow-500 hover:shadow-lg transition-all group"
                        >
                            <Heart className="text-yellow-500 mb-3" size={24} />
                            <h4 className="font-bold group-hover:text-yellow-600 transition-colors">How to Pray When You Feel Stuck</h4>
                            <p className="text-gray-600 text-sm mt-1">Practical strategies to revitalize your prayer life</p>
                        </Link>
                    </div>
                </div>
            </section>
        </BibleLayout>
    );
}
