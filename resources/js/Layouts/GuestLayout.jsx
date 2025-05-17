import { Header } from '@/Components/Header';
import { Footer } from '@/Components/Footer';

import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700&display=swap"
                rel="stylesheet"
            />
            <Header />
            <div className=" flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">

                <div>
                    <Link href="/">

                    </Link>
                </div>

                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}

                </div>

            </div>
            <Footer />
        </>
    );
}
