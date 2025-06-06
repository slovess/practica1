<?php

namespace App\Http\Controllers;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Middleware;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = auth()->user()->transactions()->with('category');

        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }
        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:income,expense',
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
        if ($transaction->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
    }

    public function summary(Request $request)
    {
        $query = auth()->user()->transactions();

        // Применяем фильтры
        if ($request->has('start_date')) {
            $query->whereDate('date', '>=', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->whereDate('date', '<=', $request->end_date);
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $income = (clone $query)->where('type', 'income')->sum('amount');
        $expenses = (clone $query)->where('type', 'expense')->sum('amount');

        return response()->json([
            'income' => $income,
            'expenses' => abs($expenses),
        ]);
    }
}
