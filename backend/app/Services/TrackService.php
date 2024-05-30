<?php

namespace App\Services;

use App\Models\Point;
use App\Models\Track;
use App\Models\User;
use DOMDocument;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class TrackService
{
    private DOMDocument $dom;
    private Track $track;

    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function updateTrack(array $data): void
    {
        /** @var Track $track */
        $track = Track::find($data['id'])->where('ref_user_id', 1)->get(); // Just to ensure that this track belongs to logged-in user
        if (is_null($track)) {
            throw new \Exception('Track not found');
        }

        $track = Track::find($data['id']);
        $fieldName = Str::snake($data['name']);
        if (!in_array($fieldName, $track->getFillable())) {
            throw new \Exception('Invalid parameter');
        }
        if (is_bool($data['value'])) {
            $data['value'] = $data['value'] ? 1 : 0;
        }
        $track->setAttribute($fieldName, $data['value']);
        $track->save();
        $track->refresh();
    }

    public function uploadTrack(UploadedFile $file, string $color): void
    {
        $handle = fopen($file->path(), "r");
        if (!$handle) {
            throw new \Exception("Unable to open file!");
        }
        $text = fread($handle, filesize($file->path()));
        fclose($handle);
        if (!$text) {
            throw new \Exception("Unable to read file!");
        }

        $this->dom = new DOMDocument();
        if (!$this->dom->loadXML($text)) {
            throw new \Exception("Unable to load GPX!");
        }

        $gpx = $this->dom->getElementsByTagName("gpx");
        if ($gpx->count() == 0) {
            throw new \Exception("This is not GPX file!");
        }
        $track['ref_user_id'] = User::find(1)->id;
        $track['description'] = sprintf("Filename: %s", $file->getClientOriginalName());
        $track['activity_type'] = $gpx[0]->getElementsByTagName("type")->item(0)->nodeValue ?? null;
        if (str_contains(strtolower($track['activity_type']), 'вело') ||
            str_contains(strtolower($track['activity_type']), 'bike') ||
            str_contains(strtolower($track['activity_type']), 'cycle') ||
            str_contains(strtolower($file->getClientOriginalName()), 'вело') ||
            str_contains(strtolower($file->getClientOriginalName()), 'bike') ||
            str_contains(strtolower($file->getClientOriginalName()), 'cycle')) {
            $track['activity_type'] = 'bike';
        } else {
            $track['activity_type'] = 'hike';
        }
        $track['total_time'] = $gpx[0]->getElementsByTagName("totalTime")->item(0)->nodeValue ?? 0;
        $track['cumulative_decrease'] = $gpx[0]->getElementsByTagName("cumulativeDecrease")->item(0)->nodeValue ?? 0;
        $track['cumulative_climb'] = $gpx[0]->getElementsByTagName("cumulativeClimb")->item(0)->nodeValue ?? 0;
        $track['total_distance'] = $gpx[0]->getElementsByTagName("totalDistance")->item(0)->nodeValue ?? 0;
        $track['color'] = $color;
        $this->track = Track::create($track);
        $this->uploadTrackPoints();
    }

    private function uploadTrackPoints()
    {
        $points = [];
        /** @var DOMNode $point */
        foreach ($this->dom->getElementsByTagName("trkpt") as $point) {
            $points[] = [
                'ref_track_id' => $this->track->getKey(),
                'lat' => $point->getAttribute('lat'),
                'lng' => $point->getAttribute('lon'),
                'datetime' => date('Y-m-d H:i:s', strtotime($point->getElementsByTagName("time")->item(0)->nodeValue)),
                'ele' => $point->getElementsByTagName("ele")->item(0)->nodeValue ?? 0,
            ];
        }
        Point::insert($points);
    }

    public function all(): Collection
    {
        $tracks = Track::where(function ($query) {
            $query->where('is_public', 1);
        })->orWhere(function ($query) {
            $query->where('ref_user_id', Auth::id())->where('is_visible', 1);
        })->get();
        return $tracks;
    }

    public function public(): Collection
    {
        $tracks = Track::where('is_public', 1)->get();
        return $tracks;
    }
}
