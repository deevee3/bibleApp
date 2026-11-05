import BibleLayout from '@/layouts/bible-layout';
import { Head, Link } from '@inertiajs/react';
import { Book } from '@/types/bible';

interface Props {
    version: {
        name: string;
        abbreviation: string;
        language: string;
    };
    books: Book[];
}

export default function Index({ version, books }: Props) {
    const oldTestament = books.filter(b => b.position <= 39); // Crude approximation for KJV
    const newTestament = books.filter(b => b.position > 39);

    return (
        <BibleLayout>
            <Head title="Bible Index — Read the Bible Online | InspireWrite">
                <meta name="description" content="Read the Bible online free in the King James Version: all 66 books, 1,189 chapters." />
                <meta name="ai-summary" content="Read the Bible online free in the King James Version: all 66 books, 1,189 chapters." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/bible.md" />
            </Head>
            
            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-12 flex flex-col items-center text-center">
                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6">
                    Word of God
                </h2>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="font-serif italic text-2xl md:text-3xl mb-4">
                        "In the beginning was the Word, and the Word was with God, and the Word was God."
                    </p>
                    <p className="text-sm uppercase tracking-widest mb-8 text-muted-foreground">
                        John 1:1 • {version.name}
                    </p>
                    <button className="bg-[#EAB308] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#CA9A04] transition-colors shadow-lg">
                        Start Reading
                    </button>
                </div>

                {/* At a glance — counts from the books sent with this page */}
                <div className="relative z-10 max-w-2xl mx-auto mt-10 grid grid-cols-3 gap-4 text-center">
                    <div><div className="font-serif text-3xl font-bold">{books.length}</div><div className="text-xs uppercase tracking-widest text-muted-foreground">Books</div></div>
                    <div><div className="font-serif text-3xl font-bold">{books.reduce((sum, b) => sum + (b.chapters_count ?? 0), 0).toLocaleString()}</div><div className="text-xs uppercase tracking-widest text-muted-foreground">Chapters</div></div>
                    <div><div className="font-serif text-3xl font-bold">{version.name}</div><div className="text-xs uppercase tracking-widest text-muted-foreground">Translation</div></div>
                </div>
                <p className="relative z-10 max-w-2xl mx-auto mt-4 text-sm text-muted-foreground">
                    Also available in the Bible in Basic English. See the counted coverage in the{' '}
                    <Link href="/research/bible-coverage" className="underline">Bible Coverage Statistics 2026</Link>.
                </p>
                </div>
                
                {/* Decorative elements resembling the book cover leaves/lines */}
                <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-border/30 rounded-full opacity-50 -z-0"></div>
                <div className="absolute top-1/3 right-1/4 w-48 h-48 border border-border/30 rounded-full opacity-50 -z-0"></div>
            </section>

            {/* Books Grid */}
            <section className="py-16 px-4 md:px-12 bg-white/50 dark:bg-card/40">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <h3 className="font-serif text-3xl italic mb-2">The Old Testament</h3>
                        <div className="w-16 h-1 bg-primary mx-auto opacity-20"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
                        {oldTestament.map((book) => (
                            <Link 
                                key={book.id} 
                                href={`/bible/${book.abbreviation}`}
                                className="group flex flex-col items-center p-4 bg-card shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/10"
                            >
                                <div className="w-full aspect-[2/3] bg-[#F5F2EA] dark:bg-[#2b231a] mb-4 flex items-center justify-center relative overflow-hidden group-hover:bg-[#EAE5D5] dark:group-hover:bg-[#372b1e] transition-colors">
                                    {book.image ? (
                                        <img 
                                            src={book.image} 
                                            alt={book.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <>
                                            <span className="font-serif text-4xl text-primary/10 font-bold absolute -bottom-4 -right-4 group-hover:text-primary/20 transition-colors">
                                                {book.position}
                                            </span>
                                            <span className="font-serif text-xl text-primary/80 relative z-10">
                                                {book.abbreviation.toUpperCase().substring(0, 2)}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <h4 className="font-serif text-center font-medium group-hover:text-primary transition-colors">
                                    {book.name}
                                </h4>
                            </Link>
                        ))}
                    </div>

                    <div className="mb-16 text-center">
                        <h3 className="font-serif text-3xl italic mb-2">The New Testament</h3>
                        <div className="w-16 h-1 bg-primary mx-auto opacity-20"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {newTestament.map((book) => (
                            <Link 
                                key={book.id} 
                                href={`/bible/${book.abbreviation}`}
                                className="group flex flex-col items-center p-4 bg-card shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/10"
                            >
                                <div className="w-full aspect-[2/3] bg-[#F5F2EA] dark:bg-[#2b231a] mb-4 flex items-center justify-center relative overflow-hidden group-hover:bg-[#EAE5D5] dark:group-hover:bg-[#372b1e] transition-colors">
                                    {book.image ? (
                                        <img 
                                            src={book.image} 
                                            alt={book.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <>
                                            <span className="font-serif text-4xl text-primary/10 font-bold absolute -bottom-4 -right-4 group-hover:text-primary/20 transition-colors">
                                                {book.position}
                                            </span>
                                            <span className="font-serif text-xl text-primary/80 relative z-10">
                                                {book.abbreviation.toUpperCase().substring(0, 2)}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <h4 className="font-serif text-center font-medium group-hover:text-primary transition-colors">
                                    {book.name}
                                </h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Newsletter Section */}
            <section className="py-20 px-4 md:px-12 bg-[#FBF9F4] dark:bg-card">
                 <div className="max-w-4xl mx-auto text-center">
                    <h3 className="font-serif text-3xl md:text-4xl mb-4">Subscribe to our Daily Verse</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Get a daily dose of inspiration delivered straight to your inbox. No spam, just the Word.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            className="flex-1 bg-white dark:bg-background border border-border px-4 py-3 focus:outline-none focus:border-primary"
                        />
                        <button className="bg-primary text-primary-foreground px-8 py-3 text-sm font-bold uppercase tracking-widest hover:opacity-90">
                            Subscribe
                        </button>
                    </div>
                 </div>
            </section>
        </BibleLayout>
    );
}
