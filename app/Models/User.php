<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    protected $table = 'users';
    use HasFactory, Notifiable;


    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function categories()
    {
        return $this->hasMany(Category::class, '');
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
