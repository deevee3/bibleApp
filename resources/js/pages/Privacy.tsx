import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';
import { Shield, Lock, Eye, Database, Cookie, UserCheck, Mail, FileText } from 'lucide-react';

export default function Privacy() {
    return (
        <BibleLayout>
            <Head title="Privacy Policy - InspireWrite by Glenride">
                <meta name="description" content="InspireWrite privacy policy. Learn how we collect, use, and protect your personal data. Your privacy and security are our priority." />
                <meta name="ai-summary" content="InspireWrite privacy policy. Learn how we collect, use, and protect your personal data. Your privacy and security are our priority." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/privacy.md" />
            </Head>

            {/* Hero */}
            <section className="py-16 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <h1 className="text-4xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            PRIVACY POLICY.
                        </h1>
                        <div className="h-px bg-black/20 flex-1" />
                    </div>
                    <p className="text-gray-600">Last updated: January 2026</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto prose prose-lg">
                    {/* Introduction */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Introduction</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            At Glenride ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use InspireWrite ("the Service"), our Bible reading and spiritual journaling application.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            By using InspireWrite, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </div>

                    {/* Information We Collect */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Information We Collect</h2>
                        </div>

                        <h3 className="text-lg font-bold mt-6 mb-3">Account Information</h3>
                        <p className="text-gray-700 leading-relaxed">
                            When you create an account, we collect:
                        </p>
                        <ul className="text-gray-700 space-y-2">
                            <li>Your name and email address</li>
                            <li>Password (encrypted and securely stored)</li>
                            <li>Profile information you choose to provide</li>
                        </ul>

                        <h3 className="text-lg font-bold mt-6 mb-3">Usage Data</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We automatically collect certain information when you use the Service:
                        </p>
                        <ul className="text-gray-700 space-y-2">
                            <li>Bible reading history (books, chapters viewed)</li>
                            <li>Highlights, bookmarks, favorites, and notes you create</li>
                            <li>Sermons and lessons you generate</li>
                            <li>Device information and browser type</li>
                            <li>IP address and general location</li>
                        </ul>

                        <h3 className="text-lg font-bold mt-6 mb-3">Payment Information</h3>
                        <p className="text-gray-700 leading-relaxed">
                            If you subscribe to a paid plan, payment processing is handled by Stripe. We do not store your full credit card number. Stripe's privacy policy applies to payment data.
                        </p>
                    </div>

                    {/* How We Use Your Information */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">How We Use Your Information</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">We use your information to:</p>
                        <ul className="text-gray-700 space-y-2">
                            <li><strong>Provide the Service:</strong> Enable Bible reading, journaling, and study assistance</li>
                            <li><strong>Personalize your experience:</strong> Save your preferences, highlights, and notes</li>
                            <li><strong>Process payments:</strong> Manage subscriptions and billing</li>
                            <li><strong>Improve the Service:</strong> Analyze usage patterns to enhance features</li>
                            <li><strong>Communicate with you:</strong> Send service updates and respond to inquiries</li>
                            <li><strong>Ensure security:</strong> Detect and prevent fraud or abuse</li>
                        </ul>
                    </div>

                    {/* Generated Content and Data */}
                    <div className="mb-12 p-6 bg-[#F5F2EA] border-l-4 border-yellow-500">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Generated Content and Your Data</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            InspireWrite provides study assistance to help generate sermon outlines and lessons. When you use these features:
                        </p>
                        <ul className="text-gray-700 space-y-2">
                            <li>Selected Bible verses are sent to our language model service to generate content</li>
                            <li>Your personal notes and reflections are <strong>not</strong> shared unless you explicitly include them in a generation request</li>
                            <li>Generated content is stored in your account and is private to you unless you choose to share it</li>
                            <li>We do not use your data to train machine learning models</li>
                        </ul>
                    </div>

                    {/* Cookies */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Cookie className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Cookies and Tracking</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            We use essential cookies to:
                        </p>
                        <ul className="text-gray-700 space-y-2">
                            <li>Keep you logged in to your account</li>
                            <li>Remember your preferences</li>
                            <li>Ensure security (CSRF protection)</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            We do not use advertising cookies or sell your data to third-party advertisers.
                        </p>
                    </div>

                    {/* Data Sharing */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <UserCheck className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Data Sharing</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            We do not sell your personal information. We may share data with:
                        </p>
                        <ul className="text-gray-700 space-y-2">
                            <li><strong>Service providers:</strong> Hosting (Laravel Cloud), payments (Stripe), language model infrastructure (OpenAI) — only as necessary to provide the Service</li>
                            <li><strong>Legal requirements:</strong> If required by law or to protect our rights</li>
                            <li><strong>With your consent:</strong> When you explicitly choose to share (e.g., sharing sermons with others)</li>
                        </ul>
                    </div>

                    {/* Your Rights */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Your Rights</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">You have the right to:</p>
                        <ul className="text-gray-700 space-y-2">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Correction:</strong> Update inaccurate information</li>
                            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                            <li><strong>Export:</strong> Download your highlights, notes, and generated content</li>
                            <li><strong>Object:</strong> Opt out of certain data processing</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            To exercise these rights, contact us at <a href="mailto:hello@inspirewrite.online" className="text-yellow-600 hover:underline">hello@inspirewrite.online</a>.
                        </p>
                    </div>

                    {/* Data Security */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Data Security</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            We implement industry-standard security measures including:
                        </p>
                        <ul className="text-gray-700 space-y-2">
                            <li>HTTPS encryption for all data transmission</li>
                            <li>Encrypted password storage (bcrypt hashing)</li>
                            <li>Secure cloud infrastructure</li>
                            <li>Regular security updates and monitoring</li>
                        </ul>
                    </div>

                    {/* Children's Privacy */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            InspireWrite is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                        </p>
                    </div>

                    {/* Changes */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update this privacy policy from time to time. We will notify you of significant changes by email or through the Service. Continued use after changes constitutes acceptance.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="p-6 bg-[#1a1a1a] text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Contact Us</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            If you have questions about this privacy policy or our data practices, please contact us:
                        </p>
                        <p className="text-white">
                            <strong>Email:</strong> <a href="mailto:hello@inspirewrite.online" className="text-yellow-500 hover:underline">hello@inspirewrite.online</a>
                        </p>
                        <p className="text-white mt-2">
                            <strong>Organization:</strong> Glenride
                        </p>
                    </div>
                </div>
            </section>

            {/* Related Links */}
            <section className="py-8 px-6 md:px-12 bg-[#F5F2EA] border-t border-gray-200">
                <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm">
                    <Link href="/terms" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                        <FileText size={16} />
                        Terms of Use
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                        <Mail size={16} />
                        Contact Us
                    </Link>
                    <Link href="/about" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                        <Shield size={16} />
                        About Us
                    </Link>
                </div>
            </section>
        </BibleLayout>
    );
}
