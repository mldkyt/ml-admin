import Head from 'next/head'
import {Inter} from 'next/font/google'
import {useEffect, useState} from "react";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = '/dashboard';
        }
    }, []);

    const [token, setToken] = useState("");
    const [validatingToken, setValidatingToken] = useState(false);

    function performLogIn() {
        setValidatingToken(true);
        fetch("/api/validateToken", {
            method: "POST",
            body: JSON.stringify({token}),
        }).then(x => {
            x.json().then(y => {
                if (y.valid) {
                    setValidatingToken(false);
                    localStorage.setItem('token', token);
                    location.href = "/dashboard";
                } else {
                    setValidatingToken(false);
                    alert("Invalid token");
                }
            })
        })
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={`${inter.className}`}>
                <h1>Log into ml-admin</h1>
                <input type="text" value={token} onChange={x => setToken(x.target.value)}/>
                <button onClick={performLogIn}>{validatingToken ? "..." : "Log in"}</button>
            </main>
        </>
    )
}
