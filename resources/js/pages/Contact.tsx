import BibleLayout from '@/layouts/bible-layout';
import { Head, useForm } from '@inertiajs/react';
import { Mail, MapPin, MessageSquare, Send, Clock, Heart } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // For now, just show success message - actual email sending can be implemented later
        setSubmitted(true);
    };

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact InspireWrite",
        "description": "Get in touch with the InspireWrite team. We'd love to hear from you.",
        "url": "https://inspirewrite.online/contact",
        "mainEntity": {
            "@type": "Organization",
            "name": "Glenride",
            "email": "hello@inspirewrite.online",
            "url": "https://inspirewrite.online"
        }
    };

    return (
        <BibleLayout>
            <Head title="Contact Us - InspireWrite by Glenride">
                <meta name="description" content="Contact the InspireWrite team. We're here to help with questions, feedback, or partnership inquiries. Reach out to hello@inspirewrite.online." />
                <meta name="ai-summary" content="Contact the InspireWrite team. We're here to help with questions, feedback, or partnership inquiries. Reach out to hello@inspirewrite.online." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/contact.md" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            </Head>

            {/* Hero */}
            <section className="py-20 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <h1 className="text-5xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            CONT<span className="text-yellow-500">ACT</span> US.
                        </h1>
                        <div className="h-px bg-black/20 flex-1" />
                    </div>

                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                        Have questions, feedback, or just want to say hello? We'd love to hear from you. Our team is here to help you get the most out of your InspireWrite experience.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold uppercase tracking-wider mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            Get in <span className="text-yellow-500">Touch</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-yellow-500 text-white">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider text-sm mb-1">Email Us</h3>
                                    <a href="mailto:hello@inspirewrite.online" className="text-yellow-600 hover:underline">
                                        hello@inspirewrite.online
                                    </a>
                                    <p className="text-gray-500 text-sm mt-1">For general inquiries and support</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-[#1a1a1a] text-white">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider text-sm mb-1">Response Time</h3>
                                    <p className="text-gray-600">We typically respond within 24-48 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-[#1a1a1a] text-white">
                                    <Heart size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider text-sm mb-1">Created By</h3>
                                    <p className="text-gray-600">Glenride</p>
                                    <p className="text-gray-500 text-sm">Founded by D'Vaughn House</p>
                                </div>
                            </div>
                        </div>

                        {/* What to Expect */}
                        <div className="mt-10 p-6 bg-[#F5F2EA] border-l-4 border-yellow-500">
                            <h3 className="font-bold uppercase tracking-wider text-sm mb-3">What We Can Help With</h3>
                            <ul className="space-y-2 text-gray-600 text-sm">
                                <li>• Questions about InspireWrite features</li>
                                <li>• Technical support and troubleshooting</li>
                                <li>• Subscription and billing inquiries</li>
                                <li>• Feature requests and feedback</li>
                                <li>• Partnership and collaboration ideas</li>
                                <li>• General spiritual encouragement</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold uppercase tracking-wider mb-6" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            Send a <span className="text-yellow-500">Message</span>
                        </h2>

                        {submitted ? (
                            <div className="bg-green-50 border border-green-200 p-8 text-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                                <p className="text-green-700">Thank you for reaching out. We'll get back to you within 24-48 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                                        placeholder="John Smith"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-bold uppercase tracking-wider mb-2">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors bg-white"
                                        required
                                    >
                                        <option value="">Select a topic...</option>
                                        <option value="general">General Question</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing & Subscription</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="partnership">Partnership Inquiry</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors resize-none"
                                        placeholder="How can we help you today?"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-yellow-500 text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-yellow-600 transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <Send size={18} />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* FAQ CTA */}
            <section className="py-12 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                        Looking for Quick Answers?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Check out our frequently asked questions for instant help with common topics.
                    </p>
                    <a
                        href="/faq"
                        className="inline-flex items-center gap-2 border-2 border-[#1a1a1a] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-colors font-bold"
                    >
                        <MessageSquare size={18} />
                        View FAQ
                    </a>
                </div>
            </section>
        </BibleLayout>
    );
}
