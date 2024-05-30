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

    Route::get('/tracks', [TrackController::class, 'index']);
    Route::patch('/tracks/update', [TrackController::class, 'update']);
    Route::get('/tracks/all', [TrackController::class, 'all']);
    Route::post('/tracks/upload', [TrackController::class, 'store']);

});

Route::get('/tracks/public', [TrackController::class, 'public']);
Route::get('/tracks/{track}/points', [TrackController::class, 'getPointsList']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/kakaomap-sdk-js', [KakaoMapSdkController::class, 'kakaoMapSDKJs']);
