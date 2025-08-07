<?php

use Illuminate\Support\Facades\Route;
use Modules\FormSubmit\Http\Controllers\FormSubmitController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('formsubmit', FormSubmitController::class)->names('formsubmit');
});


// Route::post('/test-submit', function () {
//     dd('Form hit');
// });
