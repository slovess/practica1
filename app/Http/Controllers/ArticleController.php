<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    // Просмотр всех статей (доступно всем)
    public function index()
    {
        $articles = Article::latest()->get();
        return response()->json($articles);
    }

    // Создание статьи (только админ)
    public function store(Request $request)
    {
        if (!auth()->user()->is_admin) {
            return response()->json(['error' => 'Только для администраторов'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'image|max:2048'
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        $article = Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $imagePath,
            'user_id' => auth()->id()
        ]);

        return response()->json($article, 201);
    }

    // Просмотр одной статьи (доступно всем)
    public function show(Article $article)
    {
        return response()->json($article);
    }

    // Обновление статьи (только админ)
    public function update(Request $request, Article $article)
    {
        if (!auth()->user()->is_admin) {
            return response()->json(['error' => 'Только для администраторов'], 403);
        }

        $request->validate([
            'title' => 'string|max:255',
            'content' => 'string',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            // Удаляем старое изображение
            if ($article->image) {
                Storage::delete($article->image);
            }
            $article->image = $request->file('image')->store('articles', 'public');
        }

        $article->update([
            'title' => $request->title ?? $article->title,
            'content' => $request->content ?? $article->content,
            'image' => $article->image
        ]);

        return response()->json($article);
    }

    // Удаление статьи (только админ)
    public function destroy(Article $article)
    {
        if (!auth()->user()->is_admin) {
            return response()->json(['error' => 'Только для администраторов'], 403);
        }

        if ($article->image) {
            Storage::delete($article->image);
        }

        $article->delete();

        return response()->json(['message' => 'Статья удалена']);
    }
}