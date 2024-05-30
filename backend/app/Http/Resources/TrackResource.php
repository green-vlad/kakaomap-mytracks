<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrackResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'refUserId'     => $this->ref_user_id,
            'description'   => $this->description,
            'startDatetime' => $this->start_datetime,
            'endDateTime'   => $this->end_datetime,
            'activityType'  => $this->activity_type,
            'isPublic'      => $this->is_public,
            'isVisible'     => $this->is_visible,
            'totalTime'     => $this->total_time,
            'totalDistance' => $this->total_distance,
            'color'         => $this->color,
         ];
    }
}
