<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'user_id',
        'image' // Путь к изображению
    ];

    /**
     * Связь с автором (пользователем)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * URL изображения статьи
     */
    public function getImageUrlAttribute()
    {
        return $this->image ? Storage::url($this->image) : null;
    }

    /**
     * Удаление изображения при удалении статьи
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($article) {
            if ($article->image) {
                Storage::delete($article->image);
            }
        });
    }
}