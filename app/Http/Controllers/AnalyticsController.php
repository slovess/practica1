<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class AnalyticsController extends Controller
{
    public function index()
    {

        $transactions = Auth::user()->transactions()
            ->with('category')
            ->get();

        $categories = Auth::user()->categories()->get();

        return Inertia::render('AnalyticsDashboard', [
            'transactions' => $transactions,
            'categories' => $categories,
            'initialDate' => now()->format('Y-m-d') 
        ]);
    }

    public function analytics(Request $request)
    {
        $query = auth()->user()->transactions()
            ->with('category')
            ->select('id', 'type', 'amount', 'date', 'category_id', 'description');

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('date', [
                $request->start_date,
                $request->end_date
            ]);
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        return response()->json($query->get());
    }
}
