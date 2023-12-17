import DashboardLeftSide from "@/components/DashboardLeftSide";
import {Inter} from "next/font/google";
import {useEffect, useRef, useState} from "react";
import {Redirect} from "@/utils/types";

import styles from '@/styles/DashboardRedirectList.module.scss';

const inter = Inter({subsets: ['latin']});

export default function Index() {

    const [redirects, setRedirects] = useState([] as Redirect[]);

    const hasRan = useRef(false);

    useEffect(() => {
        if (hasRan.current) return;
        hasRan.current = true;

        (async () => {
            const res = await fetch('/api/redirects/getAll');
            const data = await res.json();
            console.log(data);
            if (data.length === 0) {
                localStorage.removeItem("token");
                window.location.href = "/";
            }
            setRedirects(data.redirects);
        })();
    }, []);

    return (
        <main className={`${inter.className}`}>
            <DashboardLeftSide/>
            <div>
                <h1>Redirect Manager</h1>
                {redirects.map((redirect, i) => (
                    <div key={i} className={styles.redirect}>
                        <h2>{redirect.label}</h2>
                        <p>{redirect.url}</p>
                        <a href={`/dashboard/redirects/${redirect.id}`}>Edit</a>
                    </div>
                ))}
            </div>
        </main>
    )
}
