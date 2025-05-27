<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class AnalyticsController extends Controller
{
    public function index()
    {
        // Получаем транзакции текущего пользователя с категориями
        $transactions = Auth::user()->transactions()
            ->with('category')
            ->get();

        // Получаем категории для фильтров
        $categories = Auth::user()->categories()->get();

        return Inertia::render('AnalyticsDashboard', [
            'transactions' => $transactions,
            'categories' => $categories,
            'initialDate' => now()->format('Y-m-d') // текущая дата для фильтров
        ]);
    }
    // В TransactionController
    public function analytics(Request $request)
    {
        $query = auth()->user()->transactions()
            ->with('category')
            ->select('id', 'type', 'amount', 'date', 'category_id', 'description');

        // Фильтр по дате
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('date', [
                $request->start_date,
                $request->end_date
            ]);
        }

        // Фильтр по категории
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Фильтр по типу (доход/расход)
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        return response()->json($query->get());
    }
}
