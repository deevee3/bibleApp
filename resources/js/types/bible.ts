export interface BibleVersion {
    id: number;
    name: string;
    abbreviation: string;
    language: string;
}

export interface Book {
    id: number;
    bible_version_id: number;
    name: string;
    abbreviation: string;
    position: number;
    image: string | null;
    chapters_count?: number;
}

export interface BookNav {
    id: number;
    name: string;
    abbreviation: string;
    position: number;
    chapters_count: number;
}

export interface Chapter {
    id: number;
    book_id: number;
    number: number;
    verses?: Verse[];
}

export interface Verse {
    id: number;
    chapter_id: number;
    number: number;
    text: string;
}

export interface Highlight {
    id: number;
    user_id: number;
    verse_id: number;
    color: 'yellow' | 'green' | 'blue' | 'pink';
    note: string | null;
    created_at: string;
    updated_at: string;
}

export interface Favorite {
    id: number;
    user_id: number;
    verse_id: number;
    note: string | null;
    created_at: string;
    updated_at: string;
}

export interface Bookmark {
    id: number;
    user_id: number;
    book_id: number;
    chapter_id: number;
    verse_id: number | null;
    note: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserInteractions {
    highlights: Record<number, Highlight>;
    favorites: Record<number, Favorite>; // Changed from number[] to Record<number, Favorite>
    bookmark: Bookmark | null;
}

export interface LessonMovement {
    focus: string;
    teaching: string;
    practice: string;
}

export interface Lesson {
    id: number;
    user_id: number;
    sermon_id: number | null;
    title: string;
    content: string;
    big_takeaway?: string;
    movements?: LessonMovement[];
    reflection_questions?: string[];
    prayer?: string;
    source_verses: number[];
    source_highlights: number[];
    source_favorites: number[];
    theme: string | null;
    position: number;
    created_at: string;
    updated_at: string;
    sermon?: Sermon;
    user?: User;
}

export interface Sermon {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    share_token: string;
    is_public: boolean;
    detected_theme: string | null;
    analysis: string | null;
    big_takeaway?: string;
    movements?: LessonMovement[];
    reflection_questions?: string[];
    prayer?: string;
    created_at: string;
    updated_at: string;
    lessons?: Lesson[];
    user?: User;
    share_url?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}
