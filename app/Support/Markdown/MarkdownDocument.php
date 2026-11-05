<?php

namespace App\Support\Markdown;

/**
 * One markdown page: header fields + body in reading order.
 * Body holds main content only — no nav, footer, cookie banners, modals,
 * tracking, or repeated sign-up CTAs.
 */
final class MarkdownDocument
{
    public function __construct(
        public readonly string $title,
        public readonly string $summary,
        public readonly string $canonical,
        public readonly string $lastUpdated,
        public readonly string $body,
        /** @var array<int, array{label: string, url: string}> */
        public readonly array $related = [],
    ) {}

    public function render(): string
    {
        $lines = [
            '# '.$this->title,
            '',
            '> '.$this->summary,
            '',
            'Canonical: '.$this->canonical,
            'Last updated: '.$this->lastUpdated,
            '',
            trim($this->body),
        ];

        if ($this->related !== []) {
            $lines[] = '';
            $lines[] = '## Related';
            foreach ($this->related as $link) {
                $lines[] = '- ['.$link['label'].']('.$link['url'].')';
            }
        }

        return implode("\n", $lines)."\n";
    }

    public function tokens(): int
    {
        return (int) ceil(strlen($this->render()) / 4);
    }
}
