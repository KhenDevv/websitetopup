<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| In development, the Vite dev server (port 5173) serves the React SPA
| directly — no Blade involved.
|
| In production, `npm run build` outputs to public/dist/index.html, which
| this catch-all route serves for every non-API URL so React Router can
| handle client-side navigation.
|
*/

Route::get('/{any}', function () {
    $indexHtml = public_path('index.html');

    if (File::exists($indexHtml)) {
        return response(File::get($indexHtml), 200)
            ->header('Content-Type', 'text/html');
    }

    // Fallback during development before first production build
    return response(
        '<div style="font-family:sans-serif;text-align:center;margin-top:20vh;color:#667085">
            <h2>No production build found.</h2>
            <p>For <b>development</b>, visit <a href="http://localhost:5173">http://localhost:5173</a> (Vite dev server).</p>
            <p>For <b>production</b>, run <code style="background:#1e2028;color:#00f2c3;padding:2px 8px;border-radius:4px">npm run build</code> first, then revisit this URL.</p>
         </div>',
        200
    )->header('Content-Type', 'text/html');
})->where('any', '.*');
