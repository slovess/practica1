<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\User;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        $ArrayOfCategory = [
            'Транспорт',
            'Продукты',
            'Всё для дома',
            'Красота',
            'Рестораны',
            'Техника'
        ];

        foreach ($ArrayOfCategory as $item) {
            Category::create([
                'name' => $item,
                'user_id' => $admin->id
            ]);
        }
    }
}
