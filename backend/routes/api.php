<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TrackController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);

Route::get('get-kakaomap-key', [AuthController::class, 'getKakaomapKey']);
Route::post('/tracks/upload', [TrackController::class, 'store']);
Route::get('/tracks', [TrackController::class, 'index']);
