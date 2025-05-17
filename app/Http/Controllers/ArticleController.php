<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::with(['user', 'category'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

        $article = $request->user()->articles()->create($validated);
        
        return response()->json($article, 201);
    }

    public function show(Article $article)
    {
        return $article->load(['user', 'category']);
    }

    public function update(Request $request, Article $article)
    {
        $this->authorize('update', $article);
        
        $validated = $request->validate([
            'title' => 'string|max:255',
            'content' => 'string'
        ]);

        $article->update($validated);
        
        return $article;
    }

    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);
        
        $article->delete();
        
        return response()->noContent();
    }
}