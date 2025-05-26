<?php
namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index()
    {
        $articles = Article::all();
        return Inertia::render('MainPage', [
            'articles' => $articles
        ]);
    }
}