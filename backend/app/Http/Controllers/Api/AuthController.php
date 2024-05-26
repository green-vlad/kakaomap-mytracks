<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'error' => 'Unauthorized',
                401,
            ]);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('TOKEN')->plainTextToken;
        return response()->json(compact('token', 'user'));
    }

    public function logout(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response()->json(['', 204]);
    }

    public function getKakaomapKey()
    {
        return response()->json(['key' => getenv('KAKAOMAP_KEY')]);
    }
}
