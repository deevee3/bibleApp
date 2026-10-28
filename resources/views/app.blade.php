<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        {{-- Self-hosted fonts (DM Serif Display, Inter, Space Grotesk) — no external font CDN --}}
        <style>
            @font-face {
                font-family: 'DM Serif Display';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url('/fonts/dm-serif-display-400-normal.woff2') format('woff2');
            }
            @font-face {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url('/fonts/inter-400-normal.woff2') format('woff2');
            }
            @font-face {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-display: swap;
                src: url('/fonts/inter-500-normal.woff2') format('woff2');
            }
            @font-face {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 600;
                font-display: swap;
                src: url('/fonts/inter-600-normal.woff2') format('woff2');
            }
            @font-face {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url('/fonts/inter-700-normal.woff2') format('woff2');
            }
            @font-face {
                font-family: 'Space Grotesk';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url('/fonts/space-grotesk-400-normal.woff2') format('woff2');
            }
            @font-face {
                font-family: 'Space Grotesk';
                font-style: normal;
                font-weight: 500;
                font-display: swap;
                src: url('/fonts/space-grotesk-500-normal.woff2') format('woff2');
            }
            @font-face {
                font-family: 'Space Grotesk';
                font-style: normal;
                font-weight: 600;
                font-display: swap;
                src: url('/fonts/space-grotesk-600-normal.woff2') format('woff2');
            }
            @font-face {
                font-family: 'Space Grotesk';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url('/fonts/space-grotesk-700-normal.woff2') format('woff2');
            }
        </style>

        <title inertia>{{ config('app.name', 'InspireWrite') }}</title>

        <link rel="icon" href="/text.ico" sizes="any">
        <link rel="icon" href="/text.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
