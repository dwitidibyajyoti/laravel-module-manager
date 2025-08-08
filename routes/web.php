<?php

use App\Http\Controllers\ModuleUploadController;
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


Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/modules/upload', [ModuleUploadController::class, 'store'])->name('modules.upload');
    Route::get('/modules', [ModuleUploadController::class, 'index']);
    Route::post('/modules/{name}/enable', [ModuleUploadController::class, 'enable']);
    Route::post('/modules/{name}/disable', [ModuleUploadController::class, 'disable']);
    Route::delete('/modules/{name}', [ModuleUploadController::class, 'destroy']);
    Route::post('/modules/{name}/migrate', [ModuleUploadController::class, 'migrate']);
});
// Route::middleware(['auth', 'verified'])->group(function () {

// });



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
