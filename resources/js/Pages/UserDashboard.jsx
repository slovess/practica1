"use client";
import { Header } from '../Components/Header';
import ProfileSection from '@/Components/ProfileSection';
import { Footer } from '../Components/Footer';
import { usePage } from '@inertiajs/react';

export default function UserDashboard() {
    const { props } = usePage();
    const user = props.auth.user; // Get authenticated user data

    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700&display=swap"
                rel="stylesheet"
            />
            <main className="dashboard">
                <Header userName={user?.name || "Пользователь"} />
                <ProfileSection userId={user?.id} />
                <Footer />

                <style jsx>{`
                    .dashboard {
                        margin-top: 50px;
                        background-color: #fff;
                    }
                `}</style>
            </main>
        </>
    );
}