import DashboardLeftSide from "@/components/DashboardLeftSide";
import {Inter} from "next/font/google";
import {useEffect, useRef, useState} from "react";
import {ArticleBase} from "@/utils/types";

import styles from '@/styles/DashboardArticleList.module.scss';
const inter = Inter({subsets: ['latin']});

export default function Articles() {

    const [articles, setArticles] = useState([] as ArticleBase[]);

    const hasRan = useRef(false);

    useEffect(() => {
        if (hasRan.current) return;
        hasRan.current = true;

        (async () => {
            const res = await fetch('/api/articles/getAll');
            const data = await res.json();
            console.log(data);
            if (data.length === 0) {
                localStorage.removeItem("token");
                window.location.href = "/";
            }
            setArticles(data.articles);
        })();
    }, []);

    return (
        <main className={`${inter.className}`}>
            <DashboardLeftSide/>
            <div>
                <h1>Article Manager</h1>
                {articles.map((article, i) => (
                    <div key={i} className={styles.article}>
                        <h2>{article.title}</h2>
                        <p>{article.paragraphs[0]}</p>
                        <a href={`/dashboard/articles/${article.id}`}>Edit</a>
                    </div>
                ))
                }
            </div>
        </main>
    )
}
