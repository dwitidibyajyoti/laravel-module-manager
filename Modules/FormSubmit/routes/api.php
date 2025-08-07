<?php

use Illuminate\Support\Facades\Route;
use Modules\FormSubmit\Http\Controllers\FormSubmitController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('formsubmits', FormSubmitController::class)->names('formsubmit');
});
