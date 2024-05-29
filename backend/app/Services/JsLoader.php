<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

class JsLoader
{
    private const KAKAOMAP_CACHE_KEY = 'kakaoMapSdkJs';
    private const KAKAOMAP_CACHE_TTL = 1800;
    public function getKakaoMapSdkJs(): string
    {
        $script = Cache::get(self::KAKAOMAP_CACHE_KEY);
        if ($script === null) {
            $http = new Client();
            $response = $http->request('GET', sprintf(env('APP_KAKAOMAP_SDK_JS_PATH'), env('APP_KAKAOMAP_KEY'), ''));
            $script = $response->getBody()->getContents();
            Cache::put(self::KAKAOMAP_CACHE_KEY, $script, self::KAKAOMAP_CACHE_TTL);
        }
        return $script;
    }
}
