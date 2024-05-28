<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TrackController;
use App\Http\Middleware\ApiConvertToCamelCase;
use App\Http\Middleware\ApiConvertToSnakeCase;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/tracks/upload', [TrackController::class, 'store'])->middleware(['auth:sanctum', ApiConvertToCamelCase::class]);
Route::get('/tracks', [TrackController::class, 'index'])->middleware([ApiConvertToCamelCase::class]);
Route::get('/tracks/to-display', [TrackController::class, 'tracksToDisplay'])->middleware([ApiConvertToCamelCase::class]);
Route::patch('/tracks/update', [TrackController::class, 'update'])->middleware([ApiConvertToSnakeCase::class]);
Route::get('/tracks/{track}/points', [TrackController::class, 'getPointsList'])->middleware([ApiConvertToCamelCase::class]);

Route::post('/login', [AuthController::class, 'login']);

