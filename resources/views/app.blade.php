<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <!-- Scripts -->
    @vite
</head>

<body>
    @inertia
</body>

<style>
    a.nostyle:link {
        text-decoration: inherit;
        color: inherit;
        cursor: auto;
    }

    a.nostyle:visited {
        text-decoration: inherit;
        color: inherit;
        cursor: auto;
    }
</style>

</html>