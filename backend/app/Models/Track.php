<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Track extends Model
{
    use HasFactory;

    protected $fillable = [
        'ref_user_id',
        'description',
        'start_datetime',
        'end_datetime',
        'activity_type',
        'is_public',
        'is_visible',
        'total_time',
        'cumulative_decrease',
        'cumulative_climb',
        'total_distance',
        'color',
    ];

    public function getPoints(): HasMany
    {
        return $this->hasMany(Point::class, 'ref_track_id', 'id');
    }
}
