<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class CategoryController extends Controller
{
    public function index()
    {
        return Response::json(Category::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
        ]);

        $validated['user_id'] = auth()->id();

        $category = Category::create($validated);

        return Response::json($category, 201);
    }

    public function show($id)
    {
        return Response::json(Category::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->only(['name']));

        return Response::json($category);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return Response::json(['message' => 'Deleted']);
    }
}
