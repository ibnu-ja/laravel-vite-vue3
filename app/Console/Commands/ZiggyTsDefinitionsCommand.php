<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Tightenco\Ziggy\Ziggy;

class ZiggyTsDefinitionsCommand extends Command
{
    protected $signature = 'ziggy:ts-definitions';

    protected $description = 'Generate TS definitions for ziggy';

    protected $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->files = $files;
    }

    public function handle()
    {
        $path            = './resources/ts/shims-ziggy.d.ts';
        $generatedRoutes = $this->generate();

        $this->makeDirectory($path);
        $this->files->put(base_path($path), $generatedRoutes);

        $this->info('File generated!');
    }

    private function generate(): string
    {
        $ziggy  = (new Ziggy(false, null));
        $routes = collect($ziggy->toArray()['routes'])
            ->map(function ($route, $key) {
                $methods = json_encode($route['methods'] ?? []);

                return <<<TYPESCRIPT
    "{$key}": {
        "uri": "{$route['uri']}",
        "methods": {$methods}
    },
TYPESCRIPT;
            })
            ->join("\n");

        return <<<TYPESCRIPT

import {Config, RouteParam, Router} from "ziggy-js";
type LaravelRoutes = {
    [key: string]: { uri: string, methods: string[] };
{$routes}
}
declare global {
    interface ZiggyLaravelRoutes extends LaravelRoutes {}
    function route(): Router;
    function route(name: keyof ZiggyLaravelRoutes, params?: RouteParam, absolute?: boolean, customZiggy?: Config): string;
}
export { LaravelRoutes };

TYPESCRIPT;
    }

    protected function makeDirectory($path)
    {
        if (!$this->files->isDirectory(dirname(base_path($path)))) {
            $this->files->makeDirectory(dirname(base_path($path)), 0755, true, true);
        }

        return $path;
    }
}
