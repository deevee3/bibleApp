import BibleLayout from '@/layouts/bible-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Book, Chapter as ChapterType, Verse, UserInteractions, BookNav } from '@/types/bible';
import { SharedData } from '@/types';
import { useState, useEffect, type ReactNode } from 'react';
import { Bookmark, Heart, X, Highlighter, Expand, Minimize, MessageSquare, BookOpen, ChevronRight, ChevronDown, Sparkles, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
    book: Book;
    chapter: ChapterType;
    verses: Verse[];
    version: { name: string; abbreviation: string; language: string; slug: string; label: string };
    available_versions: { slug: string; label: string; name: string }[];
    total_chapters: number;
    prev_link: string | null;
    next_link: string | null;
    userInteractions: UserInteractions;
    allBooks: BookNav[];
    bookChapters: { id: number; number: number }[];
}

interface NoteDialogState {
    isOpen: boolean;
    type: 'highlight' | 'favorite' | 'bookmark';
    id: number; // verse_id or chapter_id (for bookmark)
    initialNote: string;
    color?: string; // For highlights
}

// The source dataset has no paragraph markers, so verses are grouped into
// readable paragraph blocks of this size.
const PARAGRAPH_SIZE = 5;

/** Strip KJV crawler brace artifacts (for meta descriptions / snippets). */
function stripBraceArtifacts(text: string): string {
    return text
        .replace(/\{[^}]*\}/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Render verse text, converting KJV crawler artifacts into proper typography:
 * - short {segments} (words added for readability) -> true italics
 * - longer {translator notes} (contain ":" or are long) -> footnote markers
 *   hoverable/tappable outside the main text flow
 * Raw curly braces are never rendered.
 */
function renderVerseText(text: string): ReactNode[] {
    return text.split(/(\{[^}]*\})/g).map((part, i) => {
        if (part.length > 2 && part.startsWith('{') && part.endsWith('}')) {
            const inner = part.slice(1, -1).trim();
            const isNote = inner.includes(':') || inner.length > 40;

            return isNote ? (
                <span
                    key={i}
                    className="inline-block align-super text-[0.68em] font-sans font-semibold text-yellow-600/90 dark:text-yellow-400/90 cursor-help px-0.5 select-none hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors"
                    title={`Translator note: ${inner}`}
                    role="note"
                    aria-label={`Translator note: ${inner}`}
                >
                    [*]
                </span>
            ) : (
                <em key={i}>{inner}</em>
            );
        }

        return <span key={i}>{part}</span>;
    });
}

export default function Chapter({ book, chapter, verses, version, available_versions, total_chapters, prev_link, next_link, userInteractions, allBooks, bookChapters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [fontSize, setFontSize] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('bible-font-size');
            if (saved) {
                const parsed = parseInt(saved, 10);
                if (!isNaN(parsed) && parsed >= 14 && parsed <= 32) {
                    return parsed;
                }
            }
        }
        return 20;
    });
    const [selectedVerseId, setSelectedVerseId] = useState<number | null>(null);
    const [navOpen, setNavOpen] = useState(false);
    const [expandedBook, setExpandedBook] = useState<string | null>(book.abbreviation);
    const [showStickyHeader, setShowStickyHeader] = useState(false);

    useEffect(() => {
        localStorage.setItem('bible-font-size', String(fontSize));
    }, [fontSize]);

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyHeader(window.scrollY > 220);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initialize Easy Read mode from localStorage
    const [zenMode, setZenMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('bible-zen-mode') === 'true';
        }
        return false;
    });

    const [inquiryMode, setInquiryMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('bible-inquiry-mode') === 'true';
        }
        return false;
    });

    // Track verse to highlight from URL hash (e.g., #verse-5)
    const [highlightedVerseNum, setHighlightedVerseNum] = useState<number | null>(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            const match = hash.match(/^#verse-(\d+)$/);
            return match ? parseInt(match[1], 10) : null;
        }
        return null;
    });

    // Persist Easy Read mode changes
    useEffect(() => {
        localStorage.setItem('bible-zen-mode', String(zenMode));
    }, [zenMode]);

    useEffect(() => {
        localStorage.setItem('bible-inquiry-mode', String(inquiryMode));
    }, [inquiryMode]);

    // Scroll to highlighted verse on mount or when hash changes
    useEffect(() => {
        if (highlightedVerseNum !== null) {
            const verseElement = document.getElementById(`verse-${highlightedVerseNum}`);
            if (verseElement) {
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
                // Clear highlight after a few seconds
                setTimeout(() => {
                    setHighlightedVerseNum(null);
                }, 4000);
            }
        }
    }, [highlightedVerseNum]);

    // Close selection when changing chapters
    useEffect(() => {
        setSelectedVerseId(null);
        // Update highlighted verse from new URL hash
        const hash = window.location.hash;
        const match = hash.match(/^#verse-(\d+)$/);
        setHighlightedVerseNum(match ? parseInt(match[1], 10) : null);
    }, [chapter.id]);

    const [noteDialog, setNoteDialog] = useState<NoteDialogState>({
        isOpen: false,
        type: 'highlight',
        id: 0,
        initialNote: '',
    });
    const [noteContent, setNoteContent] = useState('');

    useEffect(() => {
        if (noteDialog.isOpen) {
            setNoteContent(noteDialog.initialNote || '');
        }
    }, [noteDialog.isOpen, noteDialog.initialNote]);

    const isBookmarked = !!userInteractions.bookmark;

    // Group verses into readable paragraph blocks (the source data carries
    // no paragraph markers, so we chunk by a fixed size).
    const paragraphs: Verse[][] = [];
    for (let i = 0; i < verses.length; i += PARAGRAPH_SIZE) {
        paragraphs.push(verses.slice(i, i + PARAGRAPH_SIZE));
    }

    const versionLabel = version.label;
    const firstVerseClean = stripBraceArtifacts(verses[0]?.text ?? '');
    const metaDescription = `Read ${book.name} chapter ${chapter.number} online free in the ${version.name}. ${firstVerseClean.substring(0, 140)}${firstVerseClean.length > 140 ? '…' : ''}`;

    const scriptPrompts = [
        {
            key: 'S',
            title: 'Set the Scene',
            prompt: 'Who is speaking, to whom, and what is happening in this passage?',
        },
        {
            key: 'C',
            title: 'Capture What It Says',
            prompt: 'What words, actions, commands, or promises are emphasized?',
        },
        {
            key: 'R',
            title: 'Relate to the Rest of Scripture',
            prompt: 'Where else does Scripture speak to this same theme?',
        },
        {
            key: 'I',
            title: 'Interpret the Meaning',
            prompt: 'What did this mean then, and what does it reveal about God today?',
        },
        {
            key: 'P',
            title: 'Put It Into Practice',
            prompt: 'What one action or attitude should change this week?',
        },
        {
            key: 'T',
            title: 'Talk to God',
            prompt: 'How will you respond to God in prayer based on this passage?',
        },
    ];

    const handleInquiryModeToggle = () => {
        if (!auth.user) return router.visit('/login');
        if (!auth.user.can_access_premium) return router.visit('/pricing');

        setInquiryMode(!inquiryMode);
    };

    const handleBookmarkClick = () => {
        if (!auth.user) return router.visit('/login');
        if (!auth.user.is_subscribed) return router.visit('/pricing');

        if (isBookmarked) {
            // Open dialog to edit note or remove
            setNoteDialog({
                isOpen: true,
                type: 'bookmark',
                id: chapter.id,
                initialNote: userInteractions.bookmark?.note || '',
            });
        } else {
            // Just add bookmark
            router.post('/bible/bookmark', {
                book_id: book.id,
                chapter_id: chapter.id,
            }, {
                preserveScroll: true,
            });
        }
    };

    const handleSaveNote = () => {
        const { type, id, color } = noteDialog;

        let url = '';
        let data: any = { note: noteContent };

        if (type === 'bookmark') {
            url = '/bible/bookmark';
            data = {
                ...data,
                book_id: book.id,
                chapter_id: chapter.id,
            };
        } else if (type === 'highlight') {
            url = '/bible/highlight';
            data = {
                ...data,
                verse_id: id,
                color: color || 'yellow', // Default to yellow if new
            };
        } else if (type === 'favorite') {
            url = '/bible/favorite';
            data = {
                ...data,
                verse_id: id,
            };
        }

        router.post(url, data, {
            preserveScroll: true,
            onSuccess: () => setNoteDialog({ ...noteDialog, isOpen: false }),
        });
    };

    const handleHighlight = (color: string) => {
        if (!auth.user) return router.visit('/login');
        if (!auth.user.is_subscribed) return router.visit('/pricing');
        if (!selectedVerseId) return;

        router.post('/bible/highlight', {
            verse_id: selectedVerseId,
            color: color,
        }, {
            preserveScroll: true,
            onSuccess: () => setSelectedVerseId(null),
        });
    };

    const handleFavorite = () => {
        if (!auth.user) return router.visit('/login');
        if (!auth.user.is_subscribed) return router.visit('/pricing');
        if (!selectedVerseId) return;

        router.post('/bible/favorite', {
            verse_id: selectedVerseId,
        }, {
            preserveScroll: true,
            onSuccess: () => setSelectedVerseId(null),
        });
    };

    const openVerseNoteDialog = (verseId: number) => {
        if (!auth.user) return router.visit('/login');

        const highlight = userInteractions.highlights[verseId];
        const favorite = userInteractions.favorites[verseId];

        // Prioritize editing Highlight note, then Favorite note.
        // If neither, we'll create a new Favorite with note (or Highlight? Let's go with Favorite as it's cleaner)
        // Actually, let's go with Highlight (yellow) as default "Note" carrier if nothing exists, as it's more "study" like.

        if (highlight) {
            setNoteDialog({
                isOpen: true,
                type: 'highlight',
                id: verseId,
                initialNote: highlight.note || '',
                color: highlight.color,
            });
        } else if (favorite) {
            setNoteDialog({
                isOpen: true,
                type: 'favorite',
                id: verseId,
                initialNote: favorite.note || '',
            });
        } else {
            // Create new Highlight (Yellow) with Note
            setNoteDialog({
                isOpen: true,
                type: 'highlight',
                id: verseId,
                initialNote: '',
                color: 'yellow',
            });
        }
    };

    const getHighlightColor = (color: string) => {
        switch (color) {
            case 'yellow': return 'bg-yellow-200/50 dark:bg-yellow-400/25';
            case 'green': return 'bg-green-200/50 dark:bg-green-400/25';
            case 'blue': return 'bg-blue-200/50 dark:bg-blue-400/25';
            case 'pink': return 'bg-pink-200/50 dark:bg-pink-400/25';
            default: return '';
        }
    };

    return (
        <BibleLayout zenMode={zenMode}>
            <Head>
                <title>{`${book.name} ${chapter.number} (${versionLabel}) — Read the Bible Online | InspireWrite`}</title>
                <meta name="description" content={metaDescription} />
                <meta name="ai-summary" content={metaDescription} />
                <link
                    rel="alternate"
                    type="text/markdown"
                    href={
                        version.slug === 'kjv'
                            ? `https://inspirewrite.online/bible/${book.abbreviation}/${chapter.number}.md`
                            : `https://inspirewrite.online/bible/${version.slug}/${book.abbreviation}/${chapter.number}.md`
                    }
                />
                <meta property="og:title" content={`${book.name} ${chapter.number} (${versionLabel}) — InspireWrite`} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="article" />
            </Head>

            {/* Sticky mini-header on scroll */}
            {showStickyHeader && (
                <div className="fixed top-0 left-0 right-0 z-40 bg-[#F5F2EA]/95 dark:bg-[#1a1a1a]/95 backdrop-blur border-b border-border/40 py-2.5 px-6 flex items-center justify-between shadow-sm animate-in fade-in duration-200">
                    <div className="flex items-center gap-3">
                        <span className="font-serif font-semibold text-sm tracking-wide">
                            {book.name} {chapter.number}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            (Chapter {chapter.number} of {total_chapters})
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground/80 font-mono px-1.5 py-0.5 bg-muted rounded">
                            {versionLabel}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {prev_link && (
                            <Link href={prev_link} className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
                                &larr; Prev
                            </Link>
                        )}
                        {next_link && (
                            <Link href={next_link} className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
                                Next &rarr;
                            </Link>
                        )}
                        <Link href="/bible/search" className="text-muted-foreground hover:text-primary transition-colors ml-2" title="Search Scripture">
                            <Search className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            )}

            <div className={cn(
                "mx-auto py-8 px-4 md:px-8 relative transition-all duration-500 ease-in-out",
                zenMode ? "max-w-3xl pt-12" : "max-w-4xl"
            )}>
                {/* Navigation Header */}
                <div className={cn(
                    "flex flex-col md:flex-row justify-between items-center mb-12 border-b border-border/50 pb-6 transition-opacity duration-300",
                    zenMode && "opacity-20 hover:opacity-100"
                )}>
                    <Sheet open={navOpen} onOpenChange={setNavOpen}>
                        <SheetTrigger asChild>
                            <button className="flex items-center gap-2 text-sm uppercase tracking-widest mb-4 md:mb-0 hover:text-primary transition-colors group">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <span className="font-medium">Books</span>
                                <span className="text-muted-foreground">/</span>
                                <span className="font-bold text-primary">{book.name}</span>
                                <span className="text-muted-foreground">/</span>
                                <span className="font-medium">Ch. {chapter.number}</span>
                                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[320px] sm:w-[400px] p-0">
                            <SheetHeader className="p-6 border-b">
                                <SheetTitle className="text-left font-serif">Scripture Navigation</SheetTitle>
                            </SheetHeader>
                            <ScrollArea className="h-[calc(100vh-80px)]">
                                <div className="p-4">
                                    {/* Old Testament */}
                                    <div className="mb-6">
                                        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 px-2">Old Testament</h3>
                                        {allBooks.filter(b => b.position <= 39).map((navBook) => (
                                            <div key={navBook.id} className="mb-1">
                                                <button
                                                    onClick={() => setExpandedBook(expandedBook === navBook.abbreviation ? null : navBook.abbreviation)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                                                        navBook.abbreviation === book.abbreviation
                                                            ? "bg-primary/10 text-primary font-medium"
                                                            : "hover:bg-muted"
                                                    )}
                                                >
                                                    <span>{navBook.name}</span>
                                                    <ChevronRight className={cn(
                                                        "h-4 w-4 transition-transform",
                                                        expandedBook === navBook.abbreviation && "rotate-90"
                                                    )} />
                                                </button>
                                                {expandedBook === navBook.abbreviation && (
                                                    <div className="grid grid-cols-6 gap-1 p-2 ml-2 border-l border-border">
                                                        {Array.from({ length: navBook.chapters_count }, (_, i) => i + 1).map((chNum) => (
                                                            <Link
                                                                key={chNum}
                                                                href={`/bible/${navBook.abbreviation}/${chNum}`}
                                                                onClick={() => setNavOpen(false)}
                                                                className={cn(
                                                                    "w-8 h-8 flex items-center justify-center rounded text-xs font-medium transition-colors",
                                                                    navBook.abbreviation === book.abbreviation && chNum === chapter.number
                                                                        ? "bg-primary text-primary-foreground"
                                                                        : "hover:bg-muted"
                                                                )}
                                                            >
                                                                {chNum}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* New Testament */}
                                    <div>
                                        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 px-2">New Testament</h3>
                                        {allBooks.filter(b => b.position > 39).map((navBook) => (
                                            <div key={navBook.id} className="mb-1">
                                                <button
                                                    onClick={() => setExpandedBook(expandedBook === navBook.abbreviation ? null : navBook.abbreviation)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                                                        navBook.abbreviation === book.abbreviation
                                                            ? "bg-primary/10 text-primary font-medium"
                                                            : "hover:bg-muted"
                                                    )}
                                                >
                                                    <span>{navBook.name}</span>
                                                    <ChevronRight className={cn(
                                                        "h-4 w-4 transition-transform",
                                                        expandedBook === navBook.abbreviation && "rotate-90"
                                                    )} />
                                                </button>
                                                {expandedBook === navBook.abbreviation && (
                                                    <div className="grid grid-cols-6 gap-1 p-2 ml-2 border-l border-border">
                                                        {Array.from({ length: navBook.chapters_count }, (_, i) => i + 1).map((chNum) => (
                                                            <Link
                                                                key={chNum}
                                                                href={`/bible/${navBook.abbreviation}/${chNum}`}
                                                                onClick={() => setNavOpen(false)}
                                                                className={cn(
                                                                    "w-8 h-8 flex items-center justify-center rounded text-xs font-medium transition-colors",
                                                                    navBook.abbreviation === book.abbreviation && chNum === chapter.number
                                                                        ? "bg-primary text-primary-foreground"
                                                                        : "hover:bg-muted"
                                                                )}
                                                            >
                                                                {chNum}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>

                    <div className="flex items-center gap-4">
                        {/* Top chapter quick nav and position */}
                        <div className="flex items-center gap-1 border-r border-border pr-4">
                            {prev_link ? (
                                <Link
                                    href={prev_link}
                                    className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary px-1.5 py-1 transition-colors"
                                    title="Previous Chapter"
                                >
                                    &larr; Prev
                                </Link>
                            ) : (
                                <span className="text-xs uppercase tracking-wider text-muted-foreground/30 px-1.5 py-1 select-none">
                                    &larr; Prev
                                </span>
                            )}
                            <span className="text-xs text-muted-foreground/70 px-1 font-mono">
                                {chapter.number}/{total_chapters}
                            </span>
                            {next_link ? (
                                <Link
                                    href={next_link}
                                    className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary px-1.5 py-1 transition-colors"
                                    title="Next Chapter"
                                >
                                    Next &rarr;
                                </Link>
                            ) : (
                                <span className="text-xs uppercase tracking-wider text-muted-foreground/30 px-1.5 py-1 select-none">
                                    Next &rarr;
                                </span>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleBookmarkClick}
                            className={cn("hover:text-primary transition-colors", isBookmarked && "text-primary fill-primary")}
                            title={isBookmarked ? "Edit Bookmark Note" : "Bookmark Chapter"}
                        >
                            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
                        </Button>

                        <div className="flex items-center gap-2 border-l border-border pl-4">
                            <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="text-lg font-serif hover:text-primary w-8 h-8 flex items-center justify-center transition-colors">A-</button>
                            <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="text-lg font-serif hover:text-primary w-8 h-8 flex items-center justify-center transition-colors">A+</button>
                        </div>

                        <div className="border-l border-border pl-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setZenMode(!zenMode)}
                                title={zenMode ? "Exit Easy Read Mode" : "Enter Easy Read Mode"}
                                className="hover:text-primary transition-colors"
                            >
                                {zenMode ? <Minimize className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
                            </Button>
                        </div>

                        <div className="border-l border-border pl-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleInquiryModeToggle}
                                title={inquiryMode ? "Exit S.C.R.I.P.T. Inquiry Mode" : "Enter S.C.R.I.P.T. Inquiry Mode (Premium)"}
                                className={cn("transition-colors", inquiryMode ? "text-primary" : "hover:text-primary")}
                            >
                                <Sparkles className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {inquiryMode && (
                    <section className="mb-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="font-serif text-2xl text-foreground">S.C.R.I.P.T. Inquiry Mode</h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    A denomination-neutral reading and reflection flow designed for InspireWrite subscribers.
                                </p>
                            </div>
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                                Premium
                            </span>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            {scriptPrompts.map((step) => (
                                <article key={step.key} className="rounded-xl border border-border/70 bg-background/80 p-4">
                                    <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                                        {step.key} — {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-foreground/80">{step.prompt}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* Chapter Navigation */}
                <div className={cn(
                    "flex justify-between items-center mb-12 transition-opacity duration-300",
                    zenMode && "opacity-0 hover:opacity-100"
                )}>
                    {prev_link ? (
                        <Link
                            href={prev_link}
                            className="text-xs uppercase tracking-widest hover:text-primary flex items-center gap-2 text-muted-foreground transition-colors"
                        >
                            &larr; Previous
                        </Link>
                    ) : (
                        <div className="w-20"></div>
                    )}

                    <div className="text-center">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-1">
                            {book.name} &bull; Chapter {chapter.number} of {total_chapters}
                        </span>
                        <h1 className="font-serif text-5xl md:text-6xl text-center text-foreground/90 font-medium tracking-tight">
                            {chapter.number}
                        </h1>
                    </div>

                    {next_link ? (
                        <Link
                            href={next_link}
                            className="text-xs uppercase tracking-widest hover:text-primary flex items-center gap-2 text-muted-foreground transition-colors"
                        >
                            Next &rarr;
                        </Link>
                    ) : (
                        <div className="w-20"></div>
                    )}
                </div>

                {/* At a glance — facts from this chapter's record */}
                <dl className="max-w-[68ch] mx-auto mb-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-[#F5F2EA] dark:bg-card p-3"><dt className="text-xs uppercase tracking-widest text-muted-foreground">Book</dt><dd className="font-semibold">{book.name}</dd></div>
                    <div className="bg-[#F5F2EA] dark:bg-card p-3"><dt className="text-xs uppercase tracking-widest text-muted-foreground">Chapter</dt><dd className="font-semibold">{chapter.number} of {total_chapters}</dd></div>
                    <div className="bg-[#F5F2EA] dark:bg-card p-3"><dt className="text-xs uppercase tracking-widest text-muted-foreground">Verses</dt><dd className="font-semibold">{verses.length}</dd></div>
                    <div className="bg-[#F5F2EA] dark:bg-card p-3"><dt className="text-xs uppercase tracking-widest text-muted-foreground">Translation</dt><dd className="font-semibold">{version.name} ({versionLabel})</dd></div>
                </dl>

                {/* Verses — grouped into readable paragraph blocks with comfortable line measure */}
                <div
                    className={cn(
                        "max-w-[68ch] mx-auto font-serif leading-[1.8] text-foreground/85 selection:bg-primary/20",
                        zenMode && "leading-[1.85]"
                    )}
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {paragraphs.map((group, pIndex) => (
                        <p key={pIndex} className="mb-6">
                            {group.map((verse) => {
                        const highlight = userInteractions.highlights[verse.id];
                        const isFavorited = !!userInteractions.favorites[verse.id];
                        const isSelected = selectedVerseId === verse.id;
                        const isFirstVerse = verse.number === 1;
                        const hasNote = highlight?.note || userInteractions.favorites[verse.id]?.note;

                        return (
                            <span
                                key={verse.id}
                                id={`verse-${verse.number}`}
                                onClick={() => setSelectedVerseId(isSelected ? null : verse.id)}
                                className={cn(
                                    "relative inline transition-colors duration-200 cursor-pointer select-text decoration-clone p-0.5 rounded box-decoration-clone",
                                    highlight ? getHighlightColor(highlight.color) : "hover:bg-black/5",
                                    isSelected && "bg-black/10",
                                    highlightedVerseNum === verse.number && "ring-2 ring-primary ring-offset-2 bg-primary/10 animate-pulse"
                                )}
                            >
                                <sup className={cn(
                                    "mr-2 align-super select-none font-sans text-[0.72em] font-bold tracking-wide text-primary transition-opacity",
                                    isFirstVerse && "hidden" // Hide verse number 1 for drop cap effect
                                )}>
                                    {verse.number}
                                    {isFavorited && <Heart className="inline-block h-2.5 w-2.5 ml-1 text-red-500 fill-red-500" />}
                                    {hasNote && <MessageSquare className="inline-block h-2.5 w-2.5 ml-1 text-blue-500 fill-blue-500" />}
                                </sup>

                                {isFirstVerse && !verse.text.startsWith('{') ? (
                                    <>
                                        <span className="float-left text-7xl leading-[0.8] pr-3 pt-1 font-bold text-primary font-serif">
                                            {verse.text.charAt(0)}
                                        </span>
                                        <span>{renderVerseText(verse.text.substring(1))}{' '}</span>
                                    </>
                                ) : (
                                    <span>{renderVerseText(verse.text)}{' '}</span>
                                )}

                                {/* Floating Toolbar for Selected Verse */}
                                {isSelected && (
                                    <div
                                        className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-3 bg-popover text-popover-foreground shadow-xl border border-border rounded-full p-1.5 flex items-center gap-1 animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-200 whitespace-nowrap"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex gap-1 pr-2 border-r border-border mr-1">
                                            {['yellow', 'green', 'blue', 'pink'].map((c) => (
                                                <button
                                                    key={c}
                                                    onClick={() => handleHighlight(c)}
                                                    className={cn(
                                                        "w-6 h-6 rounded-full border border-black/10 hover:scale-110 transition-transform shadow-sm",
                                                        c === 'yellow' && "bg-yellow-200",
                                                        c === 'green' && "bg-green-200",
                                                        c === 'blue' && "bg-blue-200",
                                                        c === 'pink' && "bg-pink-200",
                                                        highlight?.color === c && "ring-2 ring-primary ring-offset-2"
                                                    )}
                                                    title={`Highlight ${c}`}
                                                />
                                            ))}
                                        </div>
                                        <button
                                            onClick={handleFavorite}
                                            className={cn("p-2 rounded-full hover:bg-muted transition-colors", isFavorited ? "text-red-500" : "text-muted-foreground")}
                                            title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                                        >
                                            <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
                                        </button>
                                        <button
                                            onClick={() => openVerseNoteDialog(verse.id)}
                                            className={cn("p-2 rounded-full hover:bg-muted transition-colors", hasNote ? "text-blue-500" : "text-muted-foreground")}
                                            title="Add/Edit Note"
                                        >
                                            <MessageSquare className={cn("h-4 w-4", hasNote && "fill-current")} />
                                        </button>
                                        <button
                                            onClick={() => setSelectedVerseId(null)}
                                            className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                                            title="Close"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </span>
                        );
                            })}
                        </p>
                    ))}
                </div>

                {/* Chapter quick-jump (no 150 clicks for Psalms) + version switcher */}
                <div className={cn(
                    "flex flex-wrap justify-center gap-6 mt-10 transition-opacity duration-300",
                    zenMode && "opacity-20 hover:opacity-100"
                )}>
                    {available_versions.length > 1 && (
                        <label className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                            Version
                            <select
                                value={version.slug}
                                onChange={(e) => {
                                    const slug = e.target.value;
                                    if (slug === 'kjv') {
                                        router.visit(`/bible/${book.abbreviation}/${chapter.number}`);
                                    } else {
                                        router.visit(`/bible/${slug}/${book.abbreviation}/${chapter.number}`);
                                    }
                                }}
                                className="rounded-md border border-input bg-background px-3 py-2 font-sans text-sm normal-case tracking-normal text-foreground"
                                aria-label="Switch Bible translation"
                            >
                                {available_versions.map((v) => (
                                    <option key={v.slug} value={v.slug} title={v.name}>
                                        {v.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                    <label className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                        Chapter
                        <select
                            value={chapter.number}
                            onChange={(e) => {
                                const ch = Number(e.target.value);
                                if (version.slug === 'kjv') {
                                    router.visit(`/bible/${book.abbreviation}/${ch}`);
                                } else {
                                    router.visit(`/bible/${version.slug}/${book.abbreviation}/${ch}`);
                                }
                            }}
                            className="rounded-md border border-input bg-background px-3 py-2 font-sans text-sm normal-case tracking-normal text-foreground"
                            aria-label={`Jump to a chapter of ${book.name}`}
                        >
                            {Array.from({ length: total_chapters }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                        <span className="normal-case tracking-normal">of {total_chapters}</span>
                    </label>
                </div>

                {/* Bottom Navigation */}
                <div className={cn(
                    "flex justify-between items-center mt-16 pt-12 border-t border-border/50 transition-opacity duration-300",
                    zenMode && "opacity-20 hover:opacity-100"
                )}>
                    {prev_link ? (
                        <Link
                            href={prev_link}
                            className="group flex flex-col items-start"
                        >
                            <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 group-hover:text-primary transition-colors">&larr; Previous</span>
                            <span className="font-serif text-lg group-hover:text-primary transition-colors">Chapter {chapter.number - 1 > 0 ? chapter.number - 1 : 'Book'}</span>
                        </Link>
                    ) : (
                        <div></div>
                    )}

                    {next_link ? (
                        <Link
                            href={next_link}
                            className="group flex flex-col items-end"
                        >
                            <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 group-hover:text-primary transition-colors">Next &rarr;</span>
                            <span className="font-serif text-lg group-hover:text-primary transition-colors">Chapter {chapter.number + 1}</span>
                        </Link>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>

            <Dialog open={noteDialog.isOpen} onOpenChange={(open) => setNoteDialog({ ...noteDialog, isOpen: open })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {noteDialog.type === 'bookmark' && 'Bookmark Note'}
                            {noteDialog.type === 'highlight' && 'Highlight Note'}
                            {noteDialog.type === 'favorite' && 'Favorite Note'}
                        </DialogTitle>
                        <DialogDescription>
                            Add a personal note or reflection.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="note">Note</Label>
                            <Textarea
                                id="note"
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                placeholder="Enter your thoughts here..."
                                className="min-h-[120px]"
                            />
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-between">
                        {noteDialog.type === 'bookmark' ? (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => {
                                    setNoteDialog({ ...noteDialog, isOpen: false });
                                    router.post('/bible/bookmark', {
                                        book_id: book.id,
                                        chapter_id: chapter.id,
                                    }, { preserveScroll: true });
                                }}
                            >
                                Remove Bookmark
                            </Button>
                        ) : (
                            <div></div>
                        )}
                        <div className="flex gap-2">
                            <Button variant="secondary" onClick={() => setNoteDialog({ ...noteDialog, isOpen: false })}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveNote}>
                                Save Note
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </BibleLayout>
    );
}
