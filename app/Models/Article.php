<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'abstract',
        'description',
        'image',
    
    ];
    public function admin()
    {
        return $this->belongsTo(User::class);
    }

}