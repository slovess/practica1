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
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:user_profiles',
            'birth_date' => 'required|date',
        ]);

        return User::create($validated);
    }

    public function show(User $userProfile)
    {
        return $userProfile;
    }

    public function update(Request $request, User $userProfile)
    {
        $validated = $request->validate([
            'full_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:user_profiles,email,'.$userProfile->id,
            'birth_date' => 'sometimes|date',
        ]);

        $userProfile->update($validated);
        return $userProfile;
    }

    public function destroy(User $userProfile)
    {
        $userProfile->delete();
        return response()->noContent();
    }
}