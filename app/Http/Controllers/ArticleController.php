<?php
namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::all();

        return Inertia::render('Article/Index', [
            'articles' => $articles,
            'meta' => [
                'title' => 'Все статьи',
                'description' => 'Последние опубликованные статьи'
            ]
        ]);
    }

    public function show($id)
    {
        $article = Article::findOrFail($id);

        return Inertia::render('Article/Show', [
            'article' => $article, 
            'meta' => [
                'title' => $article->name,
                'description' => $article->abstract
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'abstract' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $validated['user_id'] = $request->user()->id;

    $article = Article::create($validated);

    return Response::json($article, 201);
    }
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->only(['title', 'content']));

        return Response::json($article);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return Response::json(['message' => 'Deleted']);
    }
}