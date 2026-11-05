import BibleLayout from '@/layouts/bible-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, type FormEvent } from 'react';
import { Search as SearchIcon, BookOpen, Clock, X, Sparkles } from 'lucide-react';

interface SearchResult {
    verse_id: number;
    book_name: string;
    book_abbreviation: string;
    chapter_number: number;
    verse_number: number;
    reference: string;
    snippet: string;
}

interface Props {
    query: string;
    results: SearchResult[];
    version: { slug: string; label: string; name: string } | null;
    available_versions: { slug: string; label: string; name: string }[];
}

/** Highlight query tokens inside a snippet with <mark>. */
function highlightSnippet(snippet: string, query: string) {
    const tokens = query.split(/\s+/).filter(Boolean);

    if (tokens.length === 0) return snippet;

    const lowerTokens = new Set(tokens.map((t) => t.toLowerCase()));
    const pattern = new RegExp(`(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

    return snippet.split(pattern).map((part, i) =>
        lowerTokens.has(part.toLowerCase()) ? (
            <mark key={i} className="bg-yellow-200 dark:bg-yellow-500/30 text-inherit rounded px-1 py-0.5 font-medium">
                {part}
            </mark>
        ) : (
            <span key={i}>{part}</span>
        ),
    );
}

const EXAMPLE_PROMPTS = [
    'faith',
    'still waters',
    'John 1',
    'peace',
    'grace',
    'lamp unto my feet',
    'love is patient',
];

export default function Search({ query, results, version, available_versions }: Props) {
    const [value, setValue] = useState(query);
    const [versionSlug, setVersionSlug] = useState(version?.slug ?? 'kjv');
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('bible-recent-searches');
            if (saved) {
                try {
                    setRecentSearches(JSON.parse(saved));
                } catch {
                    // Ignore JSON parse errors
                }
            }
        }
    }, []);

    const saveSearch = (searchTerm: string) => {
        if (typeof window === 'undefined') return;
        const trimmed = searchTerm.trim();
        if (trimmed.length < 2) return;

        const updated = [trimmed, ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('bible-recent-searches', JSON.stringify(updated));
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('bible-recent-searches');
        }
    };

    const runSearch = (searchTerm: string) => {
        const q = searchTerm.trim();
        if (q.length >= 2) {
            saveSearch(q);
            router.visit(`/bible/search?q=${encodeURIComponent(q)}&version=${encodeURIComponent(versionSlug)}`);
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        runSearch(value);
    };

    // Result links stay inside the searched version's URL space.
    const resultHref = (result: SearchResult) =>
        versionSlug === 'kjv'
            ? `/bible/${result.book_abbreviation}/${result.chapter_number}`
            : `/bible/${versionSlug}/${result.book_abbreviation}/${result.chapter_number}`;

    const currentVersionLabel = version?.label || (versionSlug === 'bbe' ? 'BBE' : 'KJV');

    return (
        <BibleLayout>
            <Head>
                <title>{query ? `Search: ${query} | InspireWrite` : 'Search the Bible | InspireWrite'}</title>
                <meta name="description" content="Search the full text of the Bible. Find verses by keyword or phrase." />
                <meta name="ai-summary" content="Search the full text of the Bible. Find verses by keyword or phrase." />
                <link rel="alternate" type="text/markdown" href="https://inspirewrite.online/bible/search.md" />
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className="mx-auto max-w-4xl px-4 md:px-8 py-12">
                <h1 className="font-serif text-4xl md:text-5xl mb-2">Search Scripture</h1>
                <p className="text-muted-foreground mb-8">Find verses by keyword, phrase, or book reference across Scripture.</p>

                <form onSubmit={submit} className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="e.g. love is patient, shepherd, psalm 23…"
                            className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                            aria-label="Search the Bible"
                        />
                    </div>
                    {available_versions.length > 1 && (
                        <select
                            value={versionSlug}
                            onChange={(e) => setVersionSlug(e.target.value)}
                            className="rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground font-sans"
                            aria-label="Bible translation to search"
                        >
                            {available_versions.map((v) => (
                                <option key={v.slug} value={v.slug} title={v.name}>
                                    {v.label}
                                </option>
                            ))}
                        </select>
                    )}
                    <button
                        type="submit"
                        className="rounded-md bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:bg-yellow-400 transition-colors shadow-sm"
                    >
                        Search
                    </button>
                </form>

                {/* Example prompt chips */}
                <div className="flex flex-wrap items-center gap-2 mb-8 text-xs text-muted-foreground">
                    <span className="font-medium">Try:</span>
                    {EXAMPLE_PROMPTS.map((prompt) => (
                        <button
                            key={prompt}
                            type="button"
                            onClick={() => {
                                setValue(prompt);
                                runSearch(prompt);
                            }}
                            className="px-2.5 py-1 rounded-full bg-muted/70 hover:bg-primary/20 hover:text-foreground border border-border/60 transition-colors"
                        >
                            "{prompt}"
                        </button>
                    ))}
                </div>

                {/* Recent Searches */}
                {recentSearches.length > 0 && !query && (
                    <div className="mb-10 p-4 rounded-xl border border-border/60 bg-card/60">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                                <Clock size={14} />
                                <span>Recent Searches</span>
                            </div>
                            <button
                                type="button"
                                onClick={clearRecentSearches}
                                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {recentSearches.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => {
                                        setValue(item);
                                        runSearch(item);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-background hover:bg-muted text-xs border border-border/80 transition-colors"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Query Header & Count */}
                {query && (
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                        <p className="text-sm text-muted-foreground">
                            {results.length > 0 ? (
                                <>
                                    <span className="font-semibold text-foreground">{results.length}</span> result{results.length === 1 ? '' : 's'} for{' '}
                                    <span className="font-serif italic text-foreground">“{query}”</span> in <span className="font-semibold text-foreground">{currentVersionLabel}</span>
                                </>
                            ) : (
                                <>
                                    No results for <span className="font-serif italic text-foreground">“{query}”</span> in {currentVersionLabel}
                                </>
                            )}
                        </p>
                    </div>
                )}

                {/* Results List or Empty State */}
                {results.length > 0 ? (
                    <div className="space-y-4">
                        {results.map((result) => (
                            <Link
                                key={result.verse_id}
                                href={resultHref(result)}
                                className="block rounded-lg border border-border/50 bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                        <span className="font-serif font-semibold text-lg group-hover:text-primary transition-colors">
                                            {result.reference}
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                                        {currentVersionLabel}
                                    </span>
                                </div>
                                <p className="font-serif text-foreground/80 leading-relaxed text-base">
                                    {highlightSnippet(result.snippet, query)}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : query ? (
                    <div className="rounded-xl border border-dashed border-border p-12 text-center bg-card/40">
                        <SearchIcon className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                        <h3 className="font-serif text-xl font-semibold mb-2">No matching verses found</h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                            We couldn't find any verses matching <span className="font-serif italic text-foreground">“{query}”</span> in the {currentVersionLabel} translation. Try checking the spelling or trying one of the common prompts below.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">Suggestions:</span>
                            {EXAMPLE_PROMPTS.slice(0, 4).map((prompt) => (
                                <button
                                    key={prompt}
                                    type="button"
                                    onClick={() => {
                                        setValue(prompt);
                                        runSearch(prompt);
                                    }}
                                    className="px-3 py-1 rounded-full text-xs bg-muted hover:bg-primary/20 hover:text-primary transition-colors border border-border"
                                >
                                    "{prompt}"
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </BibleLayout>
    );
}
