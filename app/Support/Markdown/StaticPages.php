<?php

namespace App\Support\Markdown;

use App\Support\Site;

/**
 * Markdown bodies for the hardcoded Inertia pages.
 *
 * These transcribe the matching TSX page's main content — same facts,
 * same prices, same wording in substance. When a TSX page changes, update
 * the matching method here in the same commit; the coverage test
 * (tests/Feature/MarkdownCoverageTest.php) fails if a public route has no
 * renderer, and the llms.txt generator reads the registry, not this file.
 */
final class StaticPages
{
    public static function home(array $books = []): MarkdownDocument
    {
        $old = array_filter($books, fn (array $b) => ($b['position'] ?? 0) <= 39);
        $new = array_filter($books, fn (array $b) => ($b['position'] ?? 0) >= 40);

        $list = function (array $group): string {
            return implode("\n", array_map(
                fn (array $b) => '- ['.$b['name'].']('.Site::url('/bible/'.strtolower($b['abbreviation']).'/1').')',
                $group
            ));
        };

        $body = <<<'MD'
            InspireWrite by Glenride is the Bible reading and spiritual journaling companion for modern believers.

            Read all 66 books in distraction-free Easy Read mode and follow the S.C.R.I.P.T. method for denomination-neutral reflection. Highlight verses, capture insights, and build lessons and sermons with the Assistant.

            ## Features

            - **Scripture Reading** — Immerse yourself in the Word with a distraction-free reading experience.
            - **S.C.R.I.P.T. Method** — Follow our denomination-neutral six-step flow for deeper reading and reflection: Set the Scene, Capture What It Says, Relate to the Rest of Scripture, Interpret the Meaning, Put It Into Practice, Talk to God.
            - **Personal Journaling** — Capture your spiritual insights, prayers, and reflections.
            - **The Assistant** — Transform your study into structured lessons with the Assistant.
            - **Sermon Builder** — Craft meaningful sermons with the Assistant's help.

            ## About

            InspireWrite by Glenride is a spiritual writing platform designed for those who want to deepen their relationship with scripture through thoughtful journaling and creative expression. We combine the timeless wisdom of the Bible with thoughtful modern tools to help you create lessons, build sermons with the Assistant, and capture your spiritual insights in meaningful ways.

            ## What readers say

            - "InspireWrite has transformed how I study and reflect on Scripture. The journaling features are incredible." — Sarah M., Bible Study Leader
            - "Finally, a platform that combines reading, studying, and writing in one beautiful experience." — Pastor David, Church Pastor
            - "The Assistant saves me hours of preparation time each week." — Michelle K., Sunday School Teacher

            MD;

        if ($old !== []) {
            $body .= "## Old Testament\n\n".$list($old)."\n\n";
        }
        if ($new !== []) {
            $body .= "## New Testament\n\n".$list($new)."\n\n";
        }

        $body .= "Start reading at [Genesis 1](".Site::url('/bible/gn/1').").";

        return new MarkdownDocument(
            title: 'InspireWrite by Glenride — S.C.R.I.P.T. Bible Reading & Spiritual Journaling',
            summary: Site::SHORT_DESCRIPTION,
            canonical: Site::URL.'/',
            lastUpdated: '2026-10-21',
            body: $body,
            related: [
                ['label' => 'About', 'url' => Site::url('/about')],
                ['label' => 'Pricing', 'url' => Site::url('/pricing')],
                ['label' => 'Bible index', 'url' => Site::url('/bible')],
                ['label' => 'Bible coverage research', 'url' => Site::url('/research/bible-coverage')],
            ],
        );
    }

    public static function about(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'About InspireWrite — S.C.R.I.P.T. Bible Reading & Spiritual Journaling App',
            summary: 'Learn about InspireWrite by Glenride — the Bible reading and spiritual journaling companion featuring the denomination-neutral S.C.R.I.P.T. method.',
            canonical: Site::url('/about'),
            lastUpdated: '2026-10-21',
            body: <<<'MD'
                **InspireWrite by Glenride** is the Bible reading and spiritual journaling companion for modern believers, centered on the denomination-neutral S.C.R.I.P.T. method.

                We combine the timeless wisdom of Scripture with thoughtful technology to help you read, reflect, and grow in your faith journey.

                ## Our mission

                We believe the Bible should be accessible, beautiful, and deeply personal. Our mission is to create a distraction-free environment where you can immerse yourself in God's Word, capture your spiritual insights, and transform your study into meaningful lessons and sermons.

                Whether you're a new believer taking your first steps in Scripture, a pastor preparing Sunday's message, or a Bible study leader creating curriculum, InspireWrite provides the tools you need to engage with the Bible in a fresh, transformative way.

                ## Meet the founder

                **D'Vaughn House** — Founder & Developer, Glenride.

                D'Vaughn House is a software developer and the founder of Glenride, the group that creates InspireWrite and other digital products for Christian communities. With years of experience building web and mobile applications, he started Glenride to craft thoughtful tools that help people engage with Scripture.

                InspireWrite was born from a desire to have a better Bible reading and journaling experience — one that combines the reverence of Scripture with the convenience of modern technology. Glenride builds each product to support thoughtful scripture reading, personal journaling, and spiritual reflection.

                ## Our approach

                **InspireWrite is designed for all Christians.** We take a non-denominational approach, focusing on what unites believers: a love for Scripture and a desire to grow closer to God.

                We believe the Bible is the inspired Word of God, useful for teaching, rebuking, correcting, and training in righteousness (2 Timothy 3:16). Our tools are designed to help you engage with Scripture on its own terms, without imposing any particular doctrinal interpretation.

                ## What we offer

                - **Scripture Reading** — Read all 66 books of the Bible in a clean, distraction-free Easy Read mode. No ads, no distractions — just you and God's Word.
                - **Personal Journaling** — Capture your spiritual insights, prayers, and reflections. Highlight verses in multiple colors and attach personal notes to any passage.
                - **The Assistant** — Transform your Bible study into structured lessons and sermons with the Assistant. Save hours of preparation time.
                - **Built with Love** — Crafted by Glenride with passion for Scripture, beautiful design, and the spiritual growth of every user.

                ## Questions?

                Whether you have feedback, questions, or just want to say hello, we're here for you. See the [contact page](https://inspirewrite.online/contact).
                MD,
            related: [
                ['label' => 'Pricing', 'url' => Site::url('/pricing')],
                ['label' => 'Contact', 'url' => Site::url('/contact')],
                ['label' => 'Privacy Policy', 'url' => Site::url('/privacy')],
                ['label' => 'Terms of Use', 'url' => Site::url('/terms')],
            ],
        );
    }

    public static function pricing(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'Pricing — InspireWrite',
            summary: 'Simple, transparent pricing. Free, Study at $7/mo, and Pro at $27/mo. Choose the plan that fits your spiritual journey.',
            canonical: Site::url('/pricing'),
            lastUpdated: '2026-10-21',
            body: <<<'MD'
                Choose the plan that fits your spiritual journey.

                ## Free — $0/mo

                Read Scripture freely with zero distractions.

                - Full Bible Access (all 66 books)
                - Distraction-free Easy Read mode
                - S.C.R.I.P.T. Method overview
                - Bookmarks and scripture search

                ## Study — $7/mo

                Great for consistent personal reflection.

                - Everything in Free
                - Color-coded verse highlighting
                - Personal notes on verses
                - Up to 2 lessons with the Assistant / month

                ## Pro — $27/mo (recommended)

                For pastors, teachers, and deeper prep.

                - Everything in Study
                - Advanced study insights
                - Unlimited personal journals
                - Guided reading plans
                - Unlimited lessons
                - Up to 5 sermons with the Assistant / month

                Prices are as shown on the pricing page. Paid plans are arranged through secure checkout; manage a subscription anytime from account settings.
                MD,
            related: [
                ['label' => 'Start reading', 'url' => Site::url('/bible/gn/1')],
                ['label' => 'FAQ', 'url' => Site::url('/faq')],
                ['label' => 'About', 'url' => Site::url('/about')],
            ],
        );
    }

    /**
     * The FAQ, transcribed from resources/js/pages/FAQ.tsx (same questions,
     * same answers). Two additional questions come from the Bible coverage
     * study and are also added to the HTML FAQ page, so the two stay in sync.
     * Numbers in those two answers come from BibleCoverage, never typed in
     * by hand here — they are rendered from $study at call time.
     */
    public static function faq(array $study): MarkdownDocument
    {
        $served = $study['served'] ?? [];
        $servedText = implode(' and ', array_map(
            fn (array $row) => $row['name'].' ('.number_format($row['verses']).' verses)',
            $served
        ));

        $body = <<<'MD'
            Find answers to common questions about Bible reading, spiritual growth, and using InspireWrite.

            ## Getting Started with Bible Reading

            ### How do I start reading the Bible?

            Starting to read the Bible is simple with InspireWrite. Navigate to our Bible reader and begin with the Gospel of John if you're new to scripture — it's an accessible introduction to Jesus' life and teachings. Use our distraction-free Easy Read mode to focus on the text. Start with just one chapter a day, and use the highlighting and note features to capture insights as you read. Consistency matters more than quantity when building a Bible reading habit.

            ### Which Bible translation should I use?

            For new readers, we recommend starting with easy-to-understand translations like the New International Version (NIV) or New Living Translation (NLT). For deeper study, consider the English Standard Version (ESV) or New American Standard Bible (NASB). InspireWrite currently provides the King James Version (KJV), a classic translation known for its beautiful language and historical significance. The best translation is one you'll actually read consistently.

            ### Where should I start reading in the Bible?

            If you're new to the Bible, here are great starting points: The Gospel of John for understanding who Jesus is; The Book of Psalms for prayers and worship; Proverbs for practical wisdom; Genesis for the beginning of God's story. InspireWrite makes it easy to jump to any book — simply click on the book name from our homepage or use the navigation sidebar.

            ### How do I create a Bible reading habit?

            Building a Bible reading habit requires consistency and intention. Start small — even 5-10 minutes daily is powerful. Choose a specific time, like morning before work or evening before bed. Use InspireWrite's bookmarking feature to save your place. Set a reading plan goal, whether it's one chapter or a few verses per day. The highlight and note features help you engage more deeply, making reading more memorable and meaningful.

            ## Spiritual Growth

            ### How can I hear God's voice?

            Hearing God's voice often comes through Scripture — as you read the Bible, pay attention to verses that seem to speak directly to your situation. God also speaks through prayer (take time to listen, not just talk), through wise counsel from mature believers, through circumstances, and through the inner prompting of the Holy Spirit. InspireWrite's journaling feature helps you record these moments of insight and track how God has been speaking to you over time.

            ### What should I do when I feel far from God?

            Feeling spiritually dry is common and doesn't mean God has abandoned you. Continue your spiritual practices even when you don't feel like it — read Scripture, pray honestly about your feelings, stay connected to your faith community. Use InspireWrite to journal through this season; looking back at your notes later often reveals God's faithfulness. Consider reading Psalms of lament (like Psalm 42) which express similar feelings. Sometimes distance from God reveals areas where we've drifted that need attention.

            ### How do I pray effectively?

            Effective prayer isn't about using perfect words — it's about honest conversation with God. Start with thanksgiving, then confession, then bring your requests. The ACTS model helps: Adoration (praising God), Confession (acknowledging sins), Thanksgiving (expressing gratitude), and Supplication (making requests). Pray Scripture back to God — the Assistant can help you identify key verses to pray over. Most importantly, make time to listen in silence, not just speak.

            ### How do I study the Bible deeply, not just read it?

            Deep Bible study involves observation (what does the text say?), interpretation (what does it mean?), and application (how does it change my life?). Use InspireWrite's highlighting to mark key themes in different colors. Write notes asking questions about the passage. Look up cross-references to see how passages connect. The Assistant can help you structure your study into formal insights. Consider joining a Bible study group for discussion and accountability.

            ## Using InspireWrite

            ### How does sermon building with the Assistant work?

            InspireWrite's Assistant helps you create structured sermons from Scripture. Select the verses you want to preach from using highlights or favorites, then click 'Generate Lesson.' The Assistant analyzes the passage and produces a structured sermon outline with introduction, main points, illustrations, and application. Review and edit the content — the Assistant is a helper, not a replacement for your spiritual discernment and personal study.

            ### Can I share my sermons with others?

            Yes! InspireWrite allows you to share sermons you've created. From the sermon view page, click the 'Share' button to generate a shareable link. You can control whether the sermon is public or private. Share links with your congregation, small group, or fellow ministry leaders. Shared sermons display beautifully and can be accessed without an account.

            ### How do I highlight and organize verses?

            To highlight a verse, simply click on it while reading. A color palette will appear letting you choose from yellow, green, blue, or pink. Each color can represent different categories — like promises, commands, prayers, or truths about God. Your highlights are saved automatically and appear in your dashboard for easy reference. Add notes to any highlight by clicking the note icon to capture your thoughts.

            ### What is Easy Read mode?

            Easy Read mode is our distraction-free Bible reading experience. It removes navigation elements and visual clutter so you can focus entirely on God's Word. Enable Easy Read mode by clicking the Easy Read button while reading a chapter. The text expands to fill your screen with clean, readable typography. It's perfect for extended reading sessions, meditation on Scripture, or when you need to minimize distractions.

            ### What is the S.C.R.I.P.T. method in InspireWrite?

            The S.C.R.I.P.T. method is InspireWrite's denomination-neutral guided inquiry flow for deeper Bible reading. S.C.R.I.P.T. stands for Set the Scene, Capture What It Says, Relate to the Rest of Scripture, Interpret the Meaning, Put It Into Practice, and Talk to God. Premium users can enable S.C.R.I.P.T. Inquiry Mode directly in the chapter reader for step-by-step reflection prompts.

            ### How do I create and organize notes?

            Notes in InspireWrite are attached directly to verses, making them easy to find later. Click on any verse and select the note icon to add your reflection. Notes are saved in your dashboard under the highlights section. You can write prayers, record insights, track questions, or document how God is speaking to you. This creates a personal spiritual journal tied directly to Scripture.

            ## Subscription & Billing

            ### What's included in the free version?

            The free features of InspireWrite include full access to read all 66 books of the Bible, basic navigation and search, and the ability to create an account to save your place. Paid plans unlock lesson and sermon building with the Assistant, unlimited highlighting and notes, advanced journaling features, and the ability to share your content with others.

            ### How do I upgrade to a paid plan?

            To upgrade, visit our Pricing page and choose the plan that fits your needs. Click 'Subscribe' and you'll be guided through a secure checkout process powered by Stripe. Your paid features activate immediately after successful payment. You can manage your subscription anytime from your account settings.

            ### Can I cancel my subscription anytime?

            Yes, you can cancel your subscription at any time from your account settings. Your access continues until the end of your current billing period. We don't offer prorated refunds, but you won't be charged again after cancellation. Your data remains in your account even after downgrading.

            ### Is my payment information secure?

            Absolutely. All payments are processed through Stripe, a leading payment provider trusted by millions of businesses. We never see or store your full credit card number. All transactions use bank-level encryption (TLS/SSL). Your financial information is protected by Stripe's PCI-DSS Level 1 certification, the highest level of payment security.

            ## Privacy & Security

            ### Is my data private?

            Yes, your privacy is important to us. Your highlights, notes, and journals are private and only visible to you unless you choose to share them. We don't sell your data to advertisers or third parties. Read our full Privacy Policy for details on how we handle your information.

            ### How is generated content handled?

            When you use the Assistant, selected Bible verses are used to generate sermon outlines and lessons. Your personal notes are not included unless you choose to add them. Generated content is stored privately in your account. As noted in our footer disclaimer, generated content should always be verified independently against Scripture.

            ### Can I delete my account and data?

            Yes, you can request deletion of your account and all associated data by contacting us at hello@inspirewrite.online. We'll process your request within 30 days. Some data may be retained as required by law or for legitimate business purposes, as outlined in our Privacy Policy.

            ## Bible Coverage

            MD;

        $body .= "\n### How many Bible translations does InspireWrite provide?\n\n";
        $body .= "InspireWrite serves {$study['servedCount']} Bible translations live: {$servedText}. "
            . "That is {$study['servedCount']} of {$study['translationCount']} translation files vendored in {$study['languageCount']} languages "
            . "({$study['servedCount']}/{$study['translationCount']}). Every vendored file holds 66 books and 1,189 chapters; "
            . "the other files are not yet imported and cannot be read on the site today. "
            . "See the [Bible coverage research page](https://inspirewrite.online/research/bible-coverage) for the counted breakdown and methodology.\n\n";
        $body .= "### What does the Bible coverage research page show?\n\n";
        $body .= "It shows counted Bible coverage statistics for InspireWrite, recomputed from the vendored translation files: "
            . "{$study['translationCount']} translation files in {$study['languageCount']} languages, a median of "
            . number_format($study['medianVerses']) . " verses per translation, and {$study['servedCount']} translations served live. "
            . "Every finding states its denominator and links to its methodology. "
            . "See [Bible Coverage Statistics 2026](https://inspirewrite.online/research/bible-coverage).\n";

        return new MarkdownDocument(
            title: 'FAQ — Frequently Asked Questions | InspireWrite',
            summary: 'Find answers to common questions about InspireWrite. Learn how to read the Bible, study with the Assistant, manage your subscription, and grow spiritually.',
            canonical: Site::url('/faq'),
            lastUpdated: '2026-10-21',
            body: $body,
            related: [
                ['label' => 'How to Read the Bible', 'url' => Site::url('/guides/how-to-read-the-bible')],
                ['label' => 'How to Pray When You Feel Stuck', 'url' => Site::url('/guides/how-to-pray-when-you-feel-stuck')],
                ['label' => 'Bible coverage research', 'url' => Site::url('/research/bible-coverage')],
                ['label' => 'Contact', 'url' => Site::url('/contact')],
            ],
        );
    }

    public static function contact(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'Contact Us — InspireWrite by Glenride',
            summary: 'Contact the InspireWrite team. We\'re here to help with questions, feedback, or partnership inquiries. Reach out to hello@inspirewrite.online.',
            canonical: Site::url('/contact'),
            lastUpdated: '2026-10-21',
            body: <<<'MD'
                Have questions, feedback, or just want to say hello? We'd love to hear from you. Our team is here to help you get the most out of your InspireWrite experience.

                ## Get in touch

                - **Email:** [hello@inspirewrite.online](mailto:hello@inspirewrite.online) — for general inquiries and support.
                - **Response time:** We typically respond within 24-48 hours.
                - **Created by:** Glenride — founded by D'Vaughn House.

                ## What we can help with

                - Questions about InspireWrite features
                - Technical support and troubleshooting
                - Subscription and billing inquiries
                - Feature requests and feedback
                - Partnership and collaboration ideas
                - General spiritual encouragement

                ## Send a message

                The contact page has a message form (name, email address, subject, message; subjects: General Question, Technical Support, Billing & Subscription, Feature Request, Feedback, Partnership Inquiry, Other). For a reply, email [hello@inspirewrite.online](mailto:hello@inspirewrite.online) directly.

                ## Looking for quick answers?

                Check out our [frequently asked questions](https://inspirewrite.online/faq) for instant help with common topics.
                MD,
            related: [
                ['label' => 'FAQ', 'url' => Site::url('/faq')],
                ['label' => 'About', 'url' => Site::url('/about')],
                ['label' => 'Pricing', 'url' => Site::url('/pricing')],
            ],
        );
    }

    public static function forLlms(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'InspireWrite by Glenride — For LLMs and AI Agents',
            summary: 'Machine-readable summary of InspireWrite: what it is, what it offers, its pricing, and how to cite it. See /llms.txt for the full index.',
            canonical: Site::url('/for-llms'),
            lastUpdated: Site::LAST_UPDATED,
            body: <<<'MD'
                **InspireWrite by Glenride** is the Bible reading and spiritual journaling companion for modern believers, centered on the denomination-neutral S.C.R.I.P.T. method.

                ## What is InspireWrite?

                InspireWrite is a modern, full-featured Bible reading application that combines traditional scripture study with structured sermon and lesson generation using the Assistant. Built with Laravel 12 and React/Inertia.js, it provides a premium experience for Christians seeking to deepen their relationship with scripture.

                ## Core features

                - **Complete Bible Access** — Read all 66 books of the Bible with a clean, distraction-free Easy Read mode reading experience.
                - **S.C.R.I.P.T. Method** — Use a denomination-neutral six-step inquiry flow (Set the Scene, Capture, Relate, Interpret, Put into Practice, Talk to God).
                - **Verse Highlighting** — Highlight verses in multiple colors to organize and categorize your study.
                - **Favorites and Bookmarks** — Mark favorite verses and create bookmarks for quick reference.
                - **Personal Notes** — Attach personal reflections, prayers, and insights to any verse.
                - **Sermon Generation with the Assistant** — Generate structured sermons from selected Scripture passages.
                - **Lesson Creation with the Assistant** — Create Bible study lessons and outlines.
                - **Spiritual Journal Dashboard** — Review highlights, favorites, notes, and your spiritual journey.

                ## Who should use InspireWrite?

                Christians seeking a modern Bible reading experience; pastors and ministry leaders preparing sermons; Bible study group leaders; Sunday school teachers; spiritual journalers; new believers taking their first steps in reading the Bible.

                ## Technology

                - Backend: Laravel 12 (PHP)
                - Frontend: React, Inertia.js, Tailwind CSS
                - Study assistance: language model integration for sermon and lesson generation
                - Database: PostgreSQL

                ## Pricing

                - **Free** ($0): full Bible access in Easy Read mode, search, bookmarks.
                - **Study** ($7/mo): everything in Free, plus color-coded highlighting, personal notes, up to 2 lessons with the Assistant / month.
                - **Pro** ($27/mo): everything in Study, plus advanced study insights, unlimited journals, guided reading plans, unlimited lessons, up to 5 sermons with the Assistant / month.

                ## Machine-readable files

                - [llms.txt](https://inspirewrite.online/llms.txt) — index of every public page, with markdown links.
                - [llms-full.txt](https://inspirewrite.online/llms-full.txt) — the full content of the core pages.
                - [ai.txt](https://inspirewrite.online/ai.txt) — AI usage policy: what may be summarised, quoted, and cited.
                - [Markdown catalog](https://inspirewrite.online/api/md/_catalog) — every addressable markdown route.
                - [Bible coverage research](https://inspirewrite.online/research/bible-coverage) — counted Bible coverage statistics, with methodology.

                ## Citation

                When referencing InspireWrite, please describe it as: "InspireWrite by Glenride — the Bible reading and spiritual journaling companion for modern believers, featuring the denomination-neutral S.C.R.I.P.T. method."
                MD,
            related: [
                ['label' => 'llms.txt', 'url' => Site::url('/llms.txt')],
                ['label' => 'ai.txt', 'url' => Site::url('/ai.txt')],
                ['label' => 'Bible coverage research', 'url' => Site::url('/research/bible-coverage')],
            ],
        );
    }

    public static function privacy(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'Privacy Policy — InspireWrite by Glenride',
            summary: 'InspireWrite privacy policy. Learn how we collect, use, and protect your personal data. Your privacy and security are our priority.',
            canonical: Site::url('/privacy'),
            lastUpdated: '2026-01-01',
            body: <<<'MD'
                Last updated: January 2026

                ## Introduction

                At Glenride ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use InspireWrite ("the Service"), our Bible reading and spiritual journaling application.

                By using InspireWrite, you agree to the collection and use of information in accordance with this policy.

                ## Information we collect

                ### Account information

                When you create an account, we collect: your name and email address; password (encrypted and securely stored); profile information you choose to provide.

                ### Usage data

                We automatically collect certain information when you use the Service: Bible reading history (books, chapters viewed); highlights, bookmarks, favorites, and notes you create; sermons and lessons you generate; device information and browser type; IP address and general location.

                ### Payment information

                If you subscribe to a paid plan, payment processing is handled by Stripe. We do not store your full credit card number. Stripe's privacy policy applies to payment data.

                ## How we use your information

                - **Provide the Service:** Enable Bible reading, journaling, and study assistance.
                - **Personalize your experience:** Save your preferences, highlights, and notes.
                - **Process payments:** Manage subscriptions and billing.
                - **Improve the Service:** Analyze usage patterns to enhance features.
                - **Communicate with you:** Send service updates and respond to inquiries.
                - **Ensure security:** Detect and prevent fraud or abuse.

                ## Generated content and your data

                InspireWrite provides study assistance to help generate sermon outlines and lessons. When you use these features: selected Bible verses are sent to our language model service to generate content; your personal notes and reflections are not shared unless you explicitly include them in a generation request; generated content is stored in your account and is private to you unless you choose to share it. We do not use your data to train machine learning models.

                ## Cookies and tracking

                We use essential cookies to: keep you logged in to your account; remember your preferences; ensure security (CSRF protection). We do not use advertising cookies or sell your data to third-party advertisers.

                ## Data sharing

                We do not sell your personal information. We may share data with: **service providers** — hosting (Laravel Cloud), payments (Stripe), language model infrastructure (OpenAI), only as necessary to provide the Service; **legal requirements** — if required by law or to protect our rights; **with your consent** — when you explicitly choose to share (e.g., sharing sermons with others).

                ## Your rights

                You have the right to: **access** — request a copy of your personal data; **correction** — update inaccurate information; **deletion** — request deletion of your account and data; **export** — download your highlights, notes, and generated content; **object** — opt out of certain data processing. To exercise these rights, contact us at [hello@inspirewrite.online](mailto:hello@inspirewrite.online).

                ## Data security

                We implement industry-standard security measures including: HTTPS encryption for all data transmission; encrypted password storage (bcrypt hashing); secure cloud infrastructure; regular security updates and monitoring.

                ## Children's privacy

                InspireWrite is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.

                ## Changes to this policy

                We may update this privacy policy from time to time. We will notify you of significant changes by email or through the Service. Continued use after changes constitutes acceptance.

                ## Contact us

                If you have questions about this privacy policy or our data practices, please contact us: email [hello@inspirewrite.online](mailto:hello@inspirewrite.online); organization: Glenride.
                MD,
            related: [
                ['label' => 'Terms of Use', 'url' => Site::url('/terms')],
                ['label' => 'Contact', 'url' => Site::url('/contact')],
                ['label' => 'About', 'url' => Site::url('/about')],
            ],
        );
    }

    public static function terms(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'Terms of Use — InspireWrite by Glenride',
            summary: 'InspireWrite terms of use. Understand your rights and responsibilities when using our Bible reading and spiritual journaling platform.',
            canonical: Site::url('/terms'),
            lastUpdated: '2026-01-01',
            body: <<<'MD'
                Last updated: January 2026

                ## Agreement to terms

                Welcome to InspireWrite ("the Service"), operated by Glenride ("we," "our," or "us"). By accessing or using InspireWrite at inspirewrite.online, you agree to be bound by these Terms of Use.

                If you do not agree to these terms, please do not use the Service.

                ## Description of service

                InspireWrite is a Bible reading and spiritual journaling application that provides: access to the complete Bible text for reading and study; tools for highlighting, bookmarking, and annotating verses; personal journaling and note-taking features; sermon and lesson generation with the Assistant; ability to share created content with others.

                ## Account terms

                To use certain features, you must create an account. You agree to: provide accurate and complete registration information; maintain the security of your password and account; notify us immediately of any unauthorized use; be responsible for all activities under your account; be at least 13 years of age to create an account. We reserve the right to suspend or terminate accounts that violate these terms.

                ## Subscriptions and payments

                InspireWrite offers both free and paid subscription plans. **Free features:** basic Bible reading access. **Paid plans:** study assistance, unlimited journals, and advanced tools. For paid subscriptions: payments are processed securely through Stripe; subscriptions renew automatically unless cancelled; you can cancel anytime through your account settings; refunds are provided at our discretion on a case-by-case basis.

                ## Generated content disclaimer

                Important: Generated sermons, lessons, and insights are provided as study aids, not as authoritative spiritual guidance. Content is generated by machine learning and may contain errors or misinterpretations. Always verify generated content against Scripture and sound doctrine. Study assistance does not replace personal Bible study, prayer, or pastoral counsel. You are responsible for reviewing and editing any generated content before use or sharing. We do not guarantee the theological accuracy of generated content.

                ## Not a substitute for professional guidance

                InspireWrite is a spiritual tool, not a replacement for: **pastoral care** — for spiritual counseling, please consult your pastor or church leadership; **mental health services** — if you're experiencing mental health challenges, please seek qualified professional help; **medical advice** — the Service does not provide medical advice of any kind; **legal or financial guidance** — consult appropriate professionals for such matters. If you are in crisis, please contact emergency services or a crisis helpline in your area.

                ## Acceptable use

                You agree NOT to: use the Service for any unlawful purpose; share content that is hateful, harassing, or harmful; attempt to gain unauthorized access to the Service; interfere with or disrupt the Service; use automated systems to scrape or overload the Service; impersonate others or misrepresent your affiliation; use the Service to send spam or unsolicited messages.

                ## Intellectual property

                **Our content:** The InspireWrite name, logo, design, and code are owned by Glenride and protected by intellectual property laws. Bible text is in the public domain or used under appropriate licenses.

                **Your content:** You retain ownership of notes, journals, and content you create. By using the Service, you grant us a limited license to store and display your content to you and those you choose to share with.

                ## Limitation of liability

                To the maximum extent permitted by law: the Service is provided "as is" without warranties of any kind; we are not liable for any indirect, incidental, or consequential damages; our total liability shall not exceed the amount you paid us in the past 12 months; we do not guarantee uninterrupted or error-free service.

                ## Termination

                You may close your account at any time through your account settings. We may suspend or terminate your access for violations of these terms or at our discretion with notice. Upon termination, your right to use the Service ceases, but we may retain certain data as required by law or for legitimate business purposes.

                ## Changes to terms

                We may update these terms from time to time. Significant changes will be communicated via email or notice on the Service. Continued use after changes constitutes acceptance.

                ## Governing law

                These terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of appropriate jurisdiction.

                ## Contact us

                If you have questions about these terms, please contact us: email [hello@inspirewrite.online](mailto:hello@inspirewrite.online); organization: Glenride.
                MD,
            related: [
                ['label' => 'Privacy Policy', 'url' => Site::url('/privacy')],
                ['label' => 'Contact', 'url' => Site::url('/contact')],
                ['label' => 'About', 'url' => Site::url('/about')],
            ],
        );
    }

    public static function bibleSearch(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'Search the Bible — InspireWrite',
            summary: 'Search the full text of the Bible. Find verses by keyword or phrase.',
            canonical: Site::url('/bible/search'),
            lastUpdated: '2026-10-21',
            body: <<<'MD'
                Find verses by keyword, phrase, or book reference across Scripture.

                ## How search works

                Enter a query of at least 2 characters. Results are ranked by relevance and limited to 50 per search. Search one translation at a time — the King James Version by default, or the Bible in Basic English when more than one version is available. Each result links to its chapter and shows the reference and a text snippet with the query highlighted.

                ## Try

                - [faith](https://inspirewrite.online/bible/search?q=faith)
                - [still waters](https://inspirewrite.online/bible/search?q=still%20waters)
                - [John 1](https://inspirewrite.online/bible/search?q=John%201)
                - [peace](https://inspirewrite.online/bible/search?q=peace)
                - [grace](https://inspirewrite.online/bible/search?q=grace)
                - [lamp unto my feet](https://inspirewrite.online/bible/search?q=lamp%20unto%20my%20feet)
                - [love is patient](https://inspirewrite.online/bible/search?q=love%20is%20patient)

                Search results are utility pages, not canonical content: the HTML search page is marked noindex, and so is this markdown version.
                MD,
            related: [
                ['label' => 'Bible index', 'url' => Site::url('/bible')],
                ['label' => 'Genesis 1', 'url' => Site::url('/bible/gn/1')],
                ['label' => 'John 1', 'url' => Site::url('/bible/jn/1')],
            ],
        );
    }

    public static function guideReadBible(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'How to Read the Bible: A Complete Guide | InspireWrite',
            summary: 'Learn how to start reading the Bible effectively. Practical tips for developing a consistent Bible reading habit, understanding Scripture, and growing spiritually.',
            canonical: Site::url('/guides/how-to-read-the-bible'),
            lastUpdated: '2026-01-22',
            body: <<<'MD'
                Whether you're opening the Bible for the first time or returning after a long break, this guide will help you develop a meaningful, consistent practice of engaging with God's Word. 12 min read. Updated Jan 2026.

                ## The short answer

                Start with the Gospel of John to understand Jesus. Read just one chapter per day at the same time each day. Use highlighting and notes to engage actively. Don't worry about understanding everything — consistency matters more than comprehension when building a habit. God meets you where you are.

                The Bible is the most influential book in human history — and it can feel overwhelming. 66 books, multiple authors, thousands of years of history. Where do you even start? How do you make sense of it all?

                Here's the good news: **you don't need to be a scholar to read the Bible.** Millions of ordinary people have found life-changing wisdom in its pages. This guide will show you exactly how to begin your journey with Scripture — and how to make it stick.

                ## 1. Where should I start reading?

                Don't start at Genesis page one and try to read straight through. That approach often leads to getting stuck in Leviticus (the third book) and giving up. Instead, choose a strategic starting point:

                ### Best starting points for new readers

                - **Gospel of John** — The clearest introduction to who Jesus is and why he matters. Start here if you want to understand Christianity's core.
                - **Gospel of Mark** — The shortest Gospel, fast-paced and action-oriented. Great if you want a quick overview of Jesus' life.
                - **Psalms** — Ancient poetry about every human emotion. Perfect for when you need comfort, praise, or words to pray.
                - **Proverbs** — Practical wisdom for daily life. One chapter per day for a month.
                - **Genesis** — The origin story. Best after you've read a Gospel so you understand the bigger picture.

                [Start reading John chapter 1 now](https://inspirewrite.online/bible/jn/1)

                ## 2. How often should I read?

                **Consistency beats quantity.** Reading 5 minutes every day is far better than reading an hour once a week. The goal is to build a habit that becomes as automatic as brushing your teeth.

                - **Beginner** — 5-10 min/day — A few verses or 1 chapter
                - **Intermediate** — 15-20 min/day — 1-2 chapters with notes
                - **Deep Study** — 30+ min/day — Study with cross-references

                **Pro tip:** Anchor your reading to an existing habit. Read your Bible right after your morning coffee, during lunch, or before bed. The same time and place each day helps cement the habit.

                ## 3. What if I don't understand something?

                **You won't understand everything — and that's okay.** The Bible was written over 1,500 years across different cultures and languages. Even scholars spend lifetimes studying it.

                When you hit a confusing passage:

                - **Keep reading.** Context often clarifies things. A confusing verse in chapter 2 might make sense by chapter 5.
                - **Write down your questions.** Use InspireWrite's notes feature to track what confuses you. Questions are a sign of engagement.
                - **Look for the main point.** Every passage has a central message. Focus on what's clear before worrying about what's obscure.
                - **Ask for help.** Talk to a pastor, join a Bible study, or use a study Bible with explanatory notes.

                > "The Bible is shallow enough for a child to wade in, yet deep enough for an elephant to drown."
                >
                > — Often attributed to various theologians

                ## 4. How do I get more from my reading?

                Active reading transforms Bible time from passive consumption to life-changing encounter. Here's how to engage more deeply:

                - **Highlight key verses.** In InspireWrite, use different colors for different categories: promises in green, commands in blue, truths about God in yellow.
                - **Write personal notes.** Record your thoughts, questions, and how a verse applies to your life. Journaling deepens retention and insight.
                - **Pray as you read.** Turn verses into prayers. If you read "The Lord is my shepherd," pray "Lord, be my shepherd today in [specific situation]."
                - **Look for application.** Ask: "What does this passage call me to believe, do, or change?"

                ## 5. What if I fall behind or miss days?

                **Grace applies to Bible reading too.** If you miss a day (or a week, or a month), don't pile on guilt. Don't try to "catch up" by cramming. Simply start fresh where you left off.

                Missing days doesn't erase the time you've spent in Scripture. Every moment with God's Word matters. The goal is a lifetime relationship with the Bible, not a perfect streak.

                If you find yourself consistently struggling, consider: reading for less time (even 2 minutes counts); switching to a different book or translation; joining a study group for accountability; using InspireWrite's bookmarking to never lose your place.

                ## Ready to start?

                The best time to start reading the Bible was years ago. The second best time is right now. Begin your journey with InspireWrite today.

                [Start Reading John](https://inspirewrite.online/bible/jn/1)
                MD,
            related: [
                ['label' => 'How to Pray When You Feel Stuck', 'url' => Site::url('/guides/how-to-pray-when-you-feel-stuck')],
                ['label' => 'Best Bible Reading Plans', 'url' => Site::url('/resources/best-bible-reading-plans')],
                ['label' => 'Bible index', 'url' => Site::url('/bible')],
            ],
        );
    }

    public static function guidePray(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'How to Pray When You Feel Stuck | InspireWrite',
            summary: 'Feeling spiritually dry? Learn practical strategies to revitalize your prayer life and reconnect with God.',
            canonical: Site::url('/guides/how-to-pray-when-you-feel-stuck'),
            lastUpdated: '2026-10-21',
            body: <<<'MD'
                Prayer can feel like talking into an empty room. If you're struggling to find words or feeling distant from God, this guide is for you.

                ## The short answer

                When prayer feels stuck, don't try harder — try differently. Start with honesty: tell God exactly how you feel. Use Scripture as a script for prayer. Focus on presence, not performance.

                ## 1. Start with radical honesty

                The most powerful prayer is often the most honest one. God already knows what you're thinking — so tell Him the truth:

                > "God, I don't feel like praying right now."
                >
                > "I'm not sure You're listening."
                >
                > "I don't have any words. I'm just tired."

                This kind of raw honesty is all over the Psalms. Honest struggle is not faithlessness — it's the beginning of deeper faith.

                ## 2. Use Scripture as your script

                When you don't know what to say, let the Bible speak for you. Open a Psalm, read it slowly, then pray it back to God in your own words.

                - **Psalm 23** — "Lord, be my shepherd today..."
                - **Psalm 46:10** — "Help me be still and know You are God..."

                ## 3. Try the ACTS framework

                - **A — Adoration** — Praise God for who He is
                - **C — Confession** — Acknowledge where you've fallen short
                - **T — Thanksgiving** — Express gratitude for what He's done
                - **S — Supplication** — Bring your requests for yourself and others

                ## 4. Change your posture or location

                Sometimes getting unstuck is as simple as changing where or how you pray:

                - Take a prayer walk through your neighborhood
                - Pray at a different time of day
                - Speak your prayers out loud
                - Write your prayers in a journal

                ## 5. Embrace silence

                > "Be still, and know that I am God."
                >
                > — Psalm 46:10

                Set a timer for 5 minutes. Sit in silence. Just be present with God. This contemplative practice has transformed prayer for millions throughout history.

                ## Let Scripture guide your prayers

                When words fail, let God's Word speak.

                [Read Psalm 23](https://inspirewrite.online/bible/ps/23)
                MD,
            related: [
                ['label' => 'How to Read the Bible', 'url' => Site::url('/guides/how-to-read-the-bible')],
                ['label' => 'Bible index', 'url' => Site::url('/bible')],
            ],
        );
    }

    public static function guideJourney(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'How to Begin a Spiritual Journey | InspireWrite',
            summary: 'First steps for seekers and those returning to faith. A practical guide to starting or deepening your spiritual life.',
            canonical: Site::url('/guides/how-to-begin-a-spiritual-journey'),
            lastUpdated: '2026-10-21',
            body: <<<'MD'
                Whether you're exploring faith for the first time or returning after years away, every journey begins with a single step.

                ## The short answer

                A spiritual journey begins with curiosity and openness. Start by reading the Gospel of John to understand Jesus. Pray honestly, even if you're not sure anyone is listening. Find a community of believers. Don't expect perfection — spiritual growth is gradual and lifelong.

                ## 1. What is a spiritual journey?

                A spiritual journey is the process of seeking meaning, purpose, and connection with something greater than yourself. For Christians, it's the lifelong process of growing closer to God through Jesus Christ.

                It's not about becoming perfect or following a rigid set of rules. It's about relationship — with God, with yourself, and with others. Everyone's journey looks different, and that's okay.

                ## 2. Start with Scripture

                The Bible is the foundation of Christian spirituality. If you're new, start with the Gospel of John — it presents Jesus' identity and mission in accessible language.

                ### Recommended starting points

                - **Gospel of John** — Who is Jesus?
                - **Psalms** — Prayers for every emotion
                - **Proverbs** — Practical wisdom for life

                [Start reading John](https://inspirewrite.online/bible/jn/1)

                ## 3. Learn to pray

                Prayer is simply talking to God. You don't need fancy words or a specific formula. Be honest about your doubts, fears, and hopes. Even "God, if you're real, help me find You" is a valid prayer.

                Start with just a minute or two each day. Tell God what you're thankful for, what worries you, and ask for guidance. As you grow, your prayer life will naturally deepen.

                ## 4. Find community

                Spiritual growth happens best in community. Look for a local church, Bible study group, or Christian community where you feel welcomed and can ask questions.

                Don't expect to find perfect people — churches are full of imperfect people seeking God together. The goal is to walk alongside others who can encourage, challenge, and support your journey.

                ## 5. Build spiritual habits

                Small, consistent practices build a strong spiritual life:

                - **Daily Reading** — Even 5 minutes in Scripture daily
                - **Daily Prayer** — Morning, evening, or throughout the day
                - **Weekly Gathering** — Church service or Bible study
                - **Regular Reflection** — Journaling your spiritual insights

                ## Start your journey today

                InspireWrite is designed to support your spiritual growth every step of the way.

                [Read the Gospel of John](https://inspirewrite.online/bible/jn/1)
                MD,
            related: [
                ['label' => 'How to Read the Bible', 'url' => Site::url('/guides/how-to-read-the-bible')],
                ['label' => 'How to Pray When You Feel Stuck', 'url' => Site::url('/guides/how-to-pray-when-you-feel-stuck')],
            ],
        );
    }

    public static function guideAiStudy(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'How to Study with the Assistant | InspireWrite',
            summary: 'A guide to using the Assistant responsibly for Bible study, sermon preparation, and spiritual growth.',
            canonical: Site::url('/guides/how-to-use-ai-for-bible-study'),
            lastUpdated: '2026-10-21',
            body: <<<'MD'
                The Assistant can be a helpful tool for deeper Scripture study — when used wisely. Learn how to leverage study assistance while keeping your personal discernment at the center.

                ## The short answer

                The Assistant is a helper, not a replacement for personal study and spiritual discernment. Use it to generate sermon outlines, discover cross-references, and organize your thoughts — but always verify suggestions against Scripture and sound doctrine.

                ## 1. What the Assistant can do for Bible study

                - **Generate Sermon Outlines** — Turn passages into structured teaching points
                - **Create Lesson Plans** — Develop Bible study curriculum from Scripture
                - **Summarize Passages** — Get quick overviews of chapters or books
                - **Suggest Applications** — Explore how passages apply to modern life
                - **Find Themes** — Identify recurring themes across Scripture
                - **Save Preparation Time** — Accelerate research and organization

                ## 2. What the Assistant cannot replace

                - **Personal relationship with God** — The Assistant cannot pray for you or know your heart
                - **Spiritual discernment** — The Holy Spirit's guidance is irreplaceable
                - **Pastoral wisdom** — The Assistant lacks the context pastoral counselors have
                - **Community** — Growth happens in relationship with other believers
                - **Theological accuracy** — Machine assistance can make errors; always verify

                ## 3. How InspireWrite uses the Assistant responsibly

                InspireWrite's study features are designed to assist, not replace your study:

                - **You control the input** — Select which verses to study; the Assistant works with your choices
                - **Review and edit** — All generated output can be edited before use; you have final say
                - **Private by default** — Your notes and studies are private unless you share them
                - **Scripture-centered** — Content is built around the Bible text you select

                ## 4. Best practices for assisted study

                1. **Read the passage yourself first** — Form your own initial thoughts before consulting the Assistant.
                2. **Use assistance for structure, not substance** — Let the Assistant organize your thoughts; let Scripture and the Spirit provide the message.
                3. **Verify everything** — Check generated content against the biblical text and trusted commentaries.
                4. **Add your personal voice** — Your experiences, illustrations, and personality make the message authentic.

                ## Try Bible study with the Assistant

                Experience how InspireWrite's Assistant can support your sermon preparation and study.

                [Start Reading](https://inspirewrite.online/bible/jn/1)
                MD,
            related: [
                ['label' => 'How to Read the Bible', 'url' => Site::url('/guides/how-to-read-the-bible')],
                ['label' => 'FAQ', 'url' => Site::url('/faq')],
            ],
        );
    }

    public static function resourceReadingPlans(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: 'Best Bible Reading Plans | InspireWrite',
            summary: 'Discover the best Bible reading plans for new believers, busy professionals, and deep study. Find the perfect plan for your spiritual goals.',
            canonical: Site::url('/resources/best-bible-reading-plans'),
            lastUpdated: '2026-10-21',
            body: <<<'MD'
                The best reading plan is one you'll actually follow. Here are five proven approaches to help you engage with Scripture consistently.

                ## At a glance

                - **Plans:** 5
                - **Durations:** 30 to 365 days
                - **Daily time:** 5 to 30 minutes
                - **Note:** a small curated list of five plans, not a ranked list.

                ## 1. Bible in a Year

                - Best for: Comprehensive overview
                - Duration: 365 days; ~15 minutes/day
                - Read the entire Bible in one year with daily Old Testament, New Testament, Psalms, and Proverbs readings. Great for getting the full scope of Scripture.

                ## 2. Gospels First

                - Best for: New believers
                - Duration: 30 days; ~10 minutes/day
                - Start with Matthew, Mark, Luke, and John to understand Jesus' life and teachings before exploring the rest of the Bible.

                ## 3. Psalms & Proverbs

                - Best for: Devotional reading
                - Duration: 62 days; ~5 minutes/day
                - One Psalm and one chapter of Proverbs daily. Perfect for building wisdom and a prayer vocabulary.

                ## 4. New Testament Sprint

                - Best for: Understanding Christianity
                - Duration: 90 days; ~10 minutes/day
                - Focus on the New Testament to understand the foundation of Christian faith, from the Gospels through Revelation.

                ## 5. Deep Study Plan

                - Best for: Serious students
                - Duration: Varies; ~30 minutes/day
                - One book at a time, slowly. Read a chapter multiple times, take extensive notes, and research context before moving on.

                ## Tips for success

                - **Same time, same place** — Anchor reading to an existing habit like morning coffee
                - **Start small** — It's better to read 5 minutes daily than 30 minutes sporadically
                - **Use InspireWrite's bookmarks** — Never lose your place
                - **Grace for missed days** — Just pick up where you left off

                ## Start reading today

                InspireWrite makes Bible reading beautiful and distraction-free.

                [Start with John](https://inspirewrite.online/bible/jn/1)
                MD,
            related: [
                ['label' => 'How to Read the Bible', 'url' => Site::url('/guides/how-to-read-the-bible')],
                ['label' => 'Bible index', 'url' => Site::url('/bible')],
            ],
        );
    }

    public static function resourceJournaling(): MarkdownDocument
    {
        return new MarkdownDocument(
            title: '30 Journaling Prompts for Spiritual Growth | InspireWrite',
            summary: 'Powerful journaling prompts to deepen your relationship with God. Reflection questions for prayer, gratitude, Scripture meditation, and personal growth.',
            canonical: Site::url('/resources/journaling-prompts-for-spiritual-growth'),
            lastUpdated: '2026-10-21',
            body: <<<'MD'
                Journaling transforms ordinary Bible reading into deep spiritual formation. Use these prompts to reflect, pray, and grow closer to God.

                ## At a glance

                - **Prompts:** 30, in 4 categories — Scripture Reflection (7), Prayer & Listening (7), Self-Examination (7), Vision & Purpose (9)
                - **Note:** a counted list that matches its headline number, not a ranked list.

                ## Scripture Reflection (7 prompts)

                1. What verse spoke to me most today, and why?
                2. How does today's reading challenge my current thinking?
                3. What character in this passage do I most relate to?
                4. What is God revealing about Himself in this text?
                5. How can I apply this Scripture to a situation I'm facing?
                6. What questions does this passage raise for me?
                7. If I were to memorize one verse from today, which would it be?

                ## Prayer & Listening (7 prompts)

                1. What is weighing on my heart right now?
                2. What am I thankful for today? List at least 5 things.
                3. Where do I need God's guidance this week?
                4. What might God be saying to me through recent circumstances?
                5. Who needs my prayers today, and what specifically can I pray?
                6. What fears or anxieties do I need to surrender?
                7. When did I last sense God's presence? Describe that moment.

                ## Self-Examination (7 prompts)

                1. Where have I seen God at work in my life this month?
                2. What sin or struggle do I need to confess?
                3. In what areas am I growing spiritually? Where am I stuck?
                4. How am I treating the people closest to me?
                5. What distractions are keeping me from God?
                6. Am I living in alignment with my values? Where's the gap?
                7. What would it look like to trust God more completely?

                ## Vision & Purpose (9 prompts)

                1. What spiritual goals do I have for this season?
                2. How can I use my gifts to serve others this week?
                3. What legacy do I want to leave?
                4. If fear weren't a factor, what would I do for God?
                5. What broken thing in the world breaks my heart?
                6. How is God shaping my character through current challenges?
                7. What step of faith is God calling me to take?
                8. Where do I sense God leading me in the next year?
                9. What does a life well-lived look like to me?

                ## How to use these prompts

                1. **Read Scripture first** — Let God's Word prime your reflection
                2. **Choose one prompt** — Don't try to answer them all at once
                3. **Write freely** — Don't censor yourself; this is between you and God
                4. **End with prayer** — Turn your reflections into conversation with God
                5. **Review periodically** — Look back to see how God has been working

                ## Start journaling with InspireWrite

                Attach notes directly to verses and build a spiritual journal over time.

                [Start with Psalms](https://inspirewrite.online/bible/ps/1)
                MD,
            related: [
                ['label' => 'How to Read the Bible', 'url' => Site::url('/guides/how-to-read-the-bible')],
                ['label' => 'Bible index', 'url' => Site::url('/bible')],
            ],
        );
    }
}
