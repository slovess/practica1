<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Middleware;

class TransactionController extends Controller
{
    public function index()
    {
        return Response::json(auth()->user()->transactions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
        ]);

        $transaction = auth()->user()->transactions()->create($validated);

        return Response::json($transaction, 201);
    }

    public function show($id)
    {
        $transaction = Transaction::findOrFail($id);
        $this->authorizeOwnership($transaction);

        return Response::json($transaction);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);
        $this->authorizeOwnership($transaction);

        $transaction->update($request->only(['type', 'amount', 'description', 'date', 'category_id']));

        return Response::json($transaction);
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $this->authorizeOwnership($transaction);
        $transaction->delete();

        return Response::json(['message' => 'Deleted']);
    }

    private function authorizeOwnership(Transaction $transaction)
    {
        if ($transaction->user !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
    }
}
