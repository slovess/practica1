"use client";
import { useForm } from '@inertiajs/react';
import { Header } from '@/Components/Header';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Footer } from '@/Components/Footer';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '', // Добавлено подтверждение пароля
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register', {
            onSuccess: () => {
                window.location.href = '/main';
            },
            onError: (errors) => {
                console.log('Ошибки регистрации:', errors);
            }
        });
    };

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700&display=swap"
                rel="stylesheet"
            />
            <Header/>
            <div className="min-h-[80vh] flex items-center justify-center bg-white">
                <div className="w-full max-w-md p-8 space-y-8">
                    <h1 className="text-3xl font-bold text-center text-blue-500">РЕГИСТРАЦИЯ</h1>

                    {errors && (
                        <div className="text-red-500 text-sm text-center">
                            {Object.values(errors).join(' ')}
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Имя" />
                            <TextInput
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full border-blue-500 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Почта" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 block w-full border-blue-500 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Пароль" />
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full border-blue-500 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Повторить пароль" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full border-blue-500 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <PrimaryButton 
                                className="w-full justify-center bg-blue-600 hover:bg-blue-700"
                                disabled={processing}
                            >
                                {processing ? 'Регистрация...' : 'Зарегистрироваться'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}