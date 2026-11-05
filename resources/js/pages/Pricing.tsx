import BibleLayout from '@/layouts/bible-layout';
import { Head } from '@inertiajs/react';
import { Check } from 'lucide-react';

export default function Pricing() {
    return (
        <BibleLayout>
            <Head title="Pricing">
                <meta name="description" content="Simple, transparent pricing. Free, Study at $7/mo, and Pro at $27/mo. Choose the plan that fits your spiritual journey." />
                <meta name="ai-summary" content="Simple, transparent pricing. Free, Study at $7/mo, and Pro at $27/mo. Choose the plan that fits your spiritual journey." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/pricing.md" />
            </Head>
            <div className="py-16 px-4 md:px-12 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-muted-foreground">Choose the plan that fits your spiritual journey.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Free Plan */}
                    <div className="border border-border/50 rounded-lg p-6 bg-card shadow-sm flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-serif mb-2">Free</h2>
                            <div className="text-4xl font-bold mb-4">$0<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                            <p className="text-muted-foreground text-sm mb-6">Read Scripture freely with zero distractions.</p>
                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex items-center gap-2"><Check className="size-4 text-green-500 shrink-0" /> Full Bible Access (all 66 books)</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-green-500 shrink-0" /> Distraction-free Easy Read mode</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-green-500 shrink-0" /> S.C.R.I.P.T. Method overview</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-green-500 shrink-0" /> Bookmarks &amp; scripture search</li>
                            </ul>
                        </div>
                        <a href="/bible/gn/1" className="w-full block text-center py-2.5 px-4 border border-border text-foreground hover:bg-muted font-medium rounded-md transition-colors">
                            Start Reading
                        </a>
                    </div>

                    {/* Study Plan */}
                    <div className="border border-border/70 rounded-lg p-6 bg-card shadow-sm flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-serif mb-2">Study</h2>
                            <div className="text-4xl font-bold mb-4">$7<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                            <p className="text-muted-foreground text-sm mb-6">Great for consistent personal reflection.</p>
                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex items-center gap-2"><Check className="size-4 text-green-500 shrink-0" /> Everything in Free</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-green-500 shrink-0" /> Color-coded verse highlighting</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-green-500 shrink-0" /> Personal notes on verses</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-green-500 shrink-0" /> Up to 2 lessons with the Assistant / month</li>
                            </ul>
                        </div>
                        <a href="/checkout/price_1SqIgMLenlwJrzcOoUWAw2qf" className="w-full block text-center py-2.5 px-4 border border-primary text-primary hover:bg-primary/10 font-semibold rounded-md transition-colors">
                            Get Started
                        </a>
                    </div>

                    {/* Pro Plan */}
                    <div className="border-2 border-primary rounded-lg p-6 bg-card shadow-md relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">RECOMMENDED</div>
                        <div>
                            <h2 className="text-2xl font-serif mb-2">Pro</h2>
                            <div className="text-4xl font-bold mb-4">$27<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                            <p className="text-muted-foreground text-sm mb-6">For pastors, teachers, and deeper prep.</p>
                            <ul className="space-y-3 mb-8 text-sm">
                                <li className="flex items-center gap-2"><Check className="size-4 text-primary shrink-0" /> Everything in Study</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-primary shrink-0" /> Advanced study insights</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-primary shrink-0" /> Unlimited personal journals</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-primary shrink-0" /> Guided reading plans</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-primary shrink-0" /> Unlimited lessons</li>
                                <li className="flex items-center gap-2"><Check className="size-4 text-primary shrink-0" /> Up to 5 sermons with the Assistant / month</li>
                            </ul>
                        </div>
                        <a href="/checkout/price_1SqIgxLenlwJrzcOw7OEiD4n" className="w-full block text-center py-2.5 px-4 bg-primary text-primary-foreground hover:opacity-90 font-semibold rounded-md transition-opacity shadow-sm">
                            Subscribe Now
                        </a>
                    </div>
                </div>
            </div>
        </BibleLayout>
    );
}
