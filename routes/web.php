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

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\Article;

// Аутентификация
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // Защищенные маршруты
    Route::get('/profile', function () {
        return Inertia::render('Profile/ProfileSection');
    })->name('profile');
});


Route::resource('article', ArticleController::class);
Route::post('article', [ArticleController::class, 'store'])->name('article.store');

Route::get('/article/{userId}', [ArticleController::class, 'show'])->name('article.show');

Route::resource('profile', UserProfileController::class);
Route::prefix('profile')->group(function () {
    Route::get('/{id}', [UserProfileController::class, 'show'])->name('profile.show');
    Route::put('/{id}', [UserProfileController::class, 'update'])->name('profile.update');
    Route::delete('/{id}', [UserProfileController::class, 'destroy'])->name('profile.destroy');
});

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
Route::put('/transactions/{id}', [TransactionController::class, 'update']);
Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);



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
