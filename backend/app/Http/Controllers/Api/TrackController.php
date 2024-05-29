<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Track;
use App\Models\User;
use App\Services\TrackService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class TrackController extends Controller
{
    private TrackService $trackService;

    public function __construct(TrackService $trackService) {
        $this->trackService = $trackService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $user = Auth::user();
        return response()->json($user->getTracks()->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'file' => 'required|file|max:5048',
            'color' => 'size:7|regex:/^#[a-fA-F0-9]{6}$/'
        ]);
        $this->trackService->uploadTrack($data['file'], $data['color']);
        return response()->json('', 204);
    }

    /**
     * Display the specified resource.
     */
    public function show(Track $track)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|integer|exists:tracks,id',
            'name' => 'required|string|max:255',
            'value' => 'required',
        ]);
        $this->trackService->updateTrack($data);
        return response()->json('', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Track $track)
    {
        //
    }

    public function getPointsList(Track $track): JsonResponse
    {
        return response()->json($track->getPoints()->get());
    }

    public function all(): JsonResponse
    {
        return response()->json($this->trackService->all());
    }

    public function public(): JsonResponse
    {
        return response()->json($this->trackService->public());
    }
}
