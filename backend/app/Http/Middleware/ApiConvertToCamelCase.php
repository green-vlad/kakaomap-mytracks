<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ApiConvertToCamelCase
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        $content = $response->getContent();
        $json = json_decode($content, true);
        if ($json === null) {
            return $response;
        }
        $replaced = [];
        foreach ($json as $key => $value) {
            $replaced[Str::camel($key)] = $this->convertArray($value);
        }
        $response->setContent(json_encode($replaced));
        return $response;
    }

    private function convertArray($array): mixed
    {
        if (is_array($array)) {
            foreach ($array as $key => $value) {
                if (Str::camel($key) !== $key) {
                    $array[Str::camel($key)] = $this->convertArray($value);
                    unset($array[$key]);
                } else {
                    $array[$key] = $this->convertArray($value);
                }
            }
        }
        return $array;
    }
}
