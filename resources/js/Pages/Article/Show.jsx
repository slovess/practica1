"use client";
import { Header } from "../../Components/Header";
import { ArticleContent } from '../../Components/ArticleContent';
import { Footer } from '../../Components/Footer';
import { Head } from '@inertiajs/react';

const Article = ({ article, meta }) => {
    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="layout">
                <Header />
                <ArticleContent article={article} />
                <Footer />

                <style jsx>{`
                    .layout {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        background-color: #fff;
                    }
                `}</style>
            </div>
        </>
    );
};

export default Article;
