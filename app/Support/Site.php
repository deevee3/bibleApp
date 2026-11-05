<?php

namespace App\Support;

/**
 * Single source of truth for the site's identity.
 *
 * Every AI-readable surface (llms.txt, llms-full.txt, ai.txt, JSON-LD,
 * markdown pages) reads from here. Never hardcode the site name, URL,
 * description or contact in a second place.
 *
 * Facts only: there are no social-profile links on file for InspireWrite,
 * so none are listed here and none are invented anywhere else.
 */
final class Site
{
    public const NAME = 'InspireWrite';

    public const ALTERNATE_NAME = 'InspireWrite by Glenride';

    public const URL = 'https://inspirewrite.online';

    public const DESCRIPTION = 'InspireWrite by Glenride — the Bible reading and spiritual journaling companion for modern believers, featuring the denomination-neutral S.C.R.I.P.T. method.';

    public const SHORT_DESCRIPTION = 'The Bible reading and spiritual journaling companion for modern believers, centered on the denomination-neutral S.C.R.I.P.T. method.';

    public const CREATOR_NAME = 'Glenride';

    public const FOUNDER_NAME = "D'Vaughn House";

    public const CONTACT_EMAIL = 'hello@inspirewrite.online';

    public const LOGO_URL = self::URL.'/logo.svg';

    public const LAST_UPDATED = '2026-11-05';

    public static function url(string $path = ''): string
    {
        return rtrim(self::URL, '/').'/'.ltrim($path, '/');
    }

    public static function mdUrl(string $path = ''): string
    {
        $path = trim($path, '/');

        return $path === '' ? self::URL.'/index.md' : self::url($path.'.md');
    }

    /** Organization JSON-LD, shared by the homepage and ai.txt identity. */
    public static function organizationJsonLd(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => self::CREATOR_NAME,
            'alternateName' => self::ALTERNATE_NAME,
            'url' => self::URL,
            'logo' => self::LOGO_URL,
            'description' => 'Glenride builds digital tools that help believers grow in their faith through technology.',
            'founder' => [
                '@type' => 'Person',
                'name' => self::FOUNDER_NAME,
                'jobTitle' => 'Founder & Developer',
            ],
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'email' => self::CONTACT_EMAIL,
                'contactType' => 'customer support',
            ],
        ];
    }

    /** WebSite JSON-LD for the homepage. */
    public static function websiteJsonLd(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => self::NAME,
            'alternateName' => self::ALTERNATE_NAME,
            'url' => self::URL,
            'description' => self::SHORT_DESCRIPTION,
            'publisher' => self::organizationJsonLd(),
        ];
    }
}
