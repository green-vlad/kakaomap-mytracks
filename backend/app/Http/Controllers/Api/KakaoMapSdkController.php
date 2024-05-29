<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\JsLoader;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\ResponseTrait;

class KakaoMapSdkController extends Controller
{
    use ResponseTrait;

    private JsLoader $jsLoader;
    public function __construct(JsLoader $jsLoader)
    {
        $this->jsLoader = $jsLoader;
    }
    public function kakaoMapSdkJs(Request $request): Response
    {
        return response($this->jsLoader->getKakaoMapSdkJs())->
               header('Content-Type', 'application/javascript');
    }
}
