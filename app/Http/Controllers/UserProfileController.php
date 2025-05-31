<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:user_profiles'
        ]);

        return User::create($validated);
    }

    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Пользователь не найден'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validated = $request->validate([
                'full_name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:user_profiles,email,'.$id,
                'birth_date' => 'sometimes|date',
            ]);

            $user->update($validated);
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json(['message' => 'Пользователь удален']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ошибка удаления'], 500);
        }
    }
}