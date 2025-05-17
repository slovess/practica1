"use client";
import { useForm } from '@inertiajs/react';
import { Header } from '@/Components/Header';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Footer } from '@/Components/Footer';

export default function Login() {
    const { data, setData, post, processing } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            preserveScroll: true,
            onSuccess: () => {
                // Редирект после успешного входа
                window.location.href = '/main';
            },
            onError: (errors) => {
                if (errors.email) {
                    console.error('Ошибка email:', errors.email);
                }
                if (errors.password) {
                    console.error('Ошибка пароля:', errors.password);
                }
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
                    <h1 className="text-3xl font-bold text-center text-blue-500 focus:border-blue-500 focus:ring-blue-500 border-blue-500" >ВХОД</h1>

                    <form onSubmit={submit} className="mt-8 space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Почта"  focus:border-blue-500 focus:ring-blue-500 border-blue-500 />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 block w-full border-blue-500 focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
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
                        </div>

                        <div>
                            <PrimaryButton 
                                className="w-full justify-center bg-blue-600 hover:bg-blue-700"
                                disabled={processing}
                            >
                                Войти
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}