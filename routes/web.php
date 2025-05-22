<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AnalyticsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/article', function () {
    return Inertia::render('Article');
});
Route::get('/article/{id}', [ArticleController::class, 'show']);



Route::resource('profile', ProfileController::class)->only(['edit', 'update']);

Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/main', function (){
    return Inertia::render('MainPage');
})->middleware(['auth', 'verified'])->name('main');

Route::get('/analytics', function (){
    return Inertia::render('AnalyticsDashboard');
})->middleware(['auth', 'verified'])->name('analytics');

Route::get('/profile', function (){
    return Inertia::render('UserDashboard');
})->middleware(['auth', 'verified'])->name('profile');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::post('/article', [ArticleController::class, 'store']);
    Route::put('/article/{id}', [ArticleController::class, 'update']);
    Route::delete('/article/{id}', [ArticleController::class, 'destroy']);
});

require __DIR__.'/auth.php';
