<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MainController;
use App\Http\Controllers\ArticleController;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserProfileController;

Route::get('/article', function () {
    return Inertia::render('Article');
});


Route::get('/article/{id}', [ArticleController::class, 'show'])->name('article.show');

Route::resource('profile', UserProfileController::class)->only(['edit', 'update']);

Route::get('/profile/edit', [UserProfileController::class, 'edit'])->name('profile.edit');
Route::put('/profile/update', [UserProfileController::class, 'update'])->name('profile.update');
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::delete('/categories/{categories}', [CategoryController::class, 'destroy']);
});
Route::get('/transactions', [TransactionController::class, 'index']);
Route::post('/transactions', [TransactionController::class, 'store']);
Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy']);


Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/main', [MainController::class, 'index'])->name('main');
});

Route::get('/analytics', [AnalyticsController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('analytics');

Route::get('/profile', function () {
    return Inertia::render('UserDashboard');
})->middleware(['auth', 'verified'])->name('profile');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::post('/article', [ArticleController::class, 'store']);
    Route::put('/article/{id}', [ArticleController::class, 'update']);
    Route::delete('/article/{id}', [ArticleController::class, 'destroy']);
});

Route::get('/transactions/summary', [TransactionController::class, 'summary'])
    ->middleware(['auth:sanctum']);

Route::middleware(['auth:sanctum'])->group(function () {
    // Получение транзакций по дате
    Route::get('/transactions', [TransactionController::class, 'index']);

    // Или отдельный endpoint для фильтрации по дате
    Route::get('/transactions/by-date/{date}', [TransactionController::class, 'getByDate']);
});

require __DIR__ . '/auth.php';
