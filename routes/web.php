<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->get('/', function () {
    return Inertia::render('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/modules/create', function () {
    return Inertia::render('uploadModule'); // or wherever your create component is
})->name('modules.create');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
