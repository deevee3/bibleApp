import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';
import { FileText, Shield, AlertTriangle, UserCheck, CreditCard, Sparkles, Ban, Scale, Mail } from 'lucide-react';

export default function Terms() {
    return (
        <BibleLayout>
            <Head title="Terms of Use - InspireWrite by Glenride">
                <meta name="description" content="InspireWrite terms of use. Understand your rights and responsibilities when using our Bible reading and spiritual journaling platform." />
                <meta name="ai-summary" content="InspireWrite terms of use. Understand your rights and responsibilities when using our Bible reading and spiritual journaling platform." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/terms.md" />
            </Head>

            {/* Hero */}
            <section className="py-16 px-6 md:px-12 bg-[#F5F2EA]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <h1 className="text-4xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Cormorant Garamond, DM Serif Display, serif' }}>
                            TERMS OF USE.
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
                            <FileText className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Agreement to Terms</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Welcome to InspireWrite ("the Service"), operated by Glenride ("we," "our," or "us"). By accessing or using InspireWrite at inspirewrite.online, you agree to be bound by these Terms of Use.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            If you do not agree to these terms, please do not use the Service.
                        </p>
                    </div>

                    {/* Service Description */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Description of Service</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            InspireWrite is a Bible reading and spiritual journaling application that provides:
                        </p>
                        <ul className="text-gray-700 space-y-2">
                            <li>Access to the complete Bible text for reading and study</li>
                            <li>Tools for highlighting, bookmarking, and annotating verses</li>
                            <li>Personal journaling and note-taking features</li>
                            <li>Sermon and lesson generation with the Assistant</li>
                            <li>Ability to share created content with others</li>
                        </ul>
                    </div>

                    {/* Account Terms */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <UserCheck className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Account Terms</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">To use certain features, you must create an account. You agree to:</p>
                        <ul className="text-gray-700 space-y-2">
                            <li>Provide accurate and complete registration information</li>
                            <li>Maintain the security of your password and account</li>
                            <li>Notify us immediately of any unauthorized use</li>
                            <li>Be responsible for all activities under your account</li>
                            <li>Be at least 13 years of age to create an account</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            We reserve the right to suspend or terminate accounts that violate these terms.
                        </p>
                    </div>

                    {/* Subscriptions */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Subscriptions and Payments</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            InspireWrite offers both free and paid subscription plans:
                        </p>
                        <ul className="text-gray-700 space-y-2">
                            <li><strong>Free features:</strong> Basic Bible reading access</li>
                            <li><strong>Paid plans:</strong> Study assistance, unlimited journals, and advanced tools</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            For paid subscriptions:
                        </p>
                        <ul className="text-gray-700 space-y-2">
                            <li>Payments are processed securely through Stripe</li>
                            <li>Subscriptions renew automatically unless cancelled</li>
                            <li>You can cancel anytime through your account settings</li>
                            <li>Refunds are provided at our discretion on a case-by-case basis</li>
                        </ul>
                    </div>

                    {/* Generated Content Disclaimer */}
                    <div className="mb-12 p-6 bg-amber-50 border-l-4 border-amber-500">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="text-amber-600" size={28} />
                            <h2 className="text-2xl font-bold m-0 text-amber-900">Generated Content Disclaimer</h2>
                        </div>
                        <p className="text-amber-900 leading-relaxed font-medium">
                            Important: Generated sermons, lessons, and insights are provided as study aids, not as authoritative spiritual guidance.
                        </p>
                        <ul className="text-amber-800 space-y-2 mt-4">
                            <li>Content is generated by machine learning and may contain errors or misinterpretations</li>
                            <li>Always verify generated content against Scripture and sound doctrine</li>
                            <li>Study assistance does not replace personal Bible study, prayer, or pastoral counsel</li>
                            <li>You are responsible for reviewing and editing any generated content before use or sharing</li>
                            <li>We do not guarantee the theological accuracy of generated content</li>
                        </ul>
                    </div>

                    {/* Pastoral Disclaimer */}
                    <div className="mb-12 p-6 bg-blue-50 border-l-4 border-blue-500">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="text-blue-600" size={28} />
                            <h2 className="text-2xl font-bold m-0 text-blue-900">Not a Substitute for Professional Guidance</h2>
                        </div>
                        <p className="text-blue-900 leading-relaxed">
                            InspireWrite is a spiritual tool, not a replacement for:
                        </p>
                        <ul className="text-blue-800 space-y-2 mt-4">
                            <li><strong>Pastoral care:</strong> For spiritual counseling, please consult your pastor or church leadership</li>
                            <li><strong>Mental health services:</strong> If you're experiencing mental health challenges, please seek qualified professional help</li>
                            <li><strong>Medical advice:</strong> The Service does not provide medical advice of any kind</li>
                            <li><strong>Legal or financial guidance:</strong> Consult appropriate professionals for such matters</li>
                        </ul>
                        <p className="text-blue-800 leading-relaxed mt-4">
                            If you are in crisis, please contact emergency services or a crisis helpline in your area.
                        </p>
                    </div>

                    {/* Acceptable Use */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Ban className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Acceptable Use</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">You agree NOT to:</p>
                        <ul className="text-gray-700 space-y-2">
                            <li>Use the Service for any unlawful purpose</li>
                            <li>Share content that is hateful, harassing, or harmful</li>
                            <li>Attempt to gain unauthorized access to the Service</li>
                            <li>Interfere with or disrupt the Service</li>
                            <li>Use automated systems to scrape or overload the Service</li>
                            <li>Impersonate others or misrepresent your affiliation</li>
                            <li>Use the Service to send spam or unsolicited messages</li>
                        </ul>
                    </div>

                    {/* Intellectual Property */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Intellectual Property</h2>
                        </div>
                        <h3 className="text-lg font-bold mt-6 mb-3">Our Content</h3>
                        <p className="text-gray-700 leading-relaxed">
                            The InspireWrite name, logo, design, and code are owned by Glenride and protected by intellectual property laws. Bible text is in the public domain or used under appropriate licenses.
                        </p>
                        <h3 className="text-lg font-bold mt-6 mb-3">Your Content</h3>
                        <p className="text-gray-700 leading-relaxed">
                            You retain ownership of notes, journals, and content you create. By using the Service, you grant us a limited license to store and display your content to you and those you choose to share with.
                        </p>
                    </div>

                    {/* Limitation of Liability */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                        <p className="text-gray-700 leading-relaxed">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                        </p>
                        <ul className="text-gray-700 space-y-2">
                            <li>The Service is provided "as is" without warranties of any kind</li>
                            <li>We are not liable for any indirect, incidental, or consequential damages</li>
                            <li>Our total liability shall not exceed the amount you paid us in the past 12 months</li>
                            <li>We do not guarantee uninterrupted or error-free service</li>
                        </ul>
                    </div>

                    {/* Termination */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Termination</h2>
                        <p className="text-gray-700 leading-relaxed">
                            You may close your account at any time through your account settings. We may suspend or terminate your access for violations of these terms or at our discretion with notice.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            Upon termination, your right to use the Service ceases, but we may retain certain data as required by law or for legitimate business purposes.
                        </p>
                    </div>

                    {/* Changes */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update these terms from time to time. Significant changes will be communicated via email or notice on the Service. Continued use after changes constitutes acceptance.
                        </p>
                    </div>

                    {/* Governing Law */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                        <p className="text-gray-700 leading-relaxed">
                            These terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of appropriate jurisdiction.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="p-6 bg-[#1a1a1a] text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="text-yellow-500" size={28} />
                            <h2 className="text-2xl font-bold m-0">Contact Us</h2>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            If you have questions about these terms, please contact us:
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
                    <Link href="/privacy" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                        <Shield size={16} />
                        Privacy Policy
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                        <Mail size={16} />
                        Contact Us
                    </Link>
                    <Link href="/about" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                        <FileText size={16} />
                        About Us
                    </Link>
                </div>
            </section>
        </BibleLayout>
    );
}
