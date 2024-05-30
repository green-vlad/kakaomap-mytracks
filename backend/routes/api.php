<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\KakaoMapSdkController;
use App\Http\Controllers\Api\TrackController;
use App\Http\Middleware\ApiConvertToCamelCase;
use App\Http\Middleware\ApiConvertToSnakeCase;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/tracks', [TrackController::class, 'index'])->middleware([ApiConvertToCamelCase::class]);
    Route::patch('/tracks/update', [TrackController::class, 'update'])->middleware([ApiConvertToSnakeCase::class]);
    Route::get('/tracks/all', [TrackController::class, 'all'])->middleware([ApiConvertToCamelCase::class]);
    Route::post('/tracks/upload', [TrackController::class, 'store'])->middleware([ApiConvertToCamelCase::class]);

});

Route::get('/tracks/public', [TrackController::class, 'public'])->middleware([ApiConvertToCamelCase::class]);
Route::get('/tracks/{track}/points', [TrackController::class, 'getPointsList'])->middleware([ApiConvertToCamelCase::class]);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/kakaomap-sdk-js', [KakaoMapSdkController::class, 'kakaoMapSDKJs']);
