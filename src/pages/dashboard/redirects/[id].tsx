import {useEffect, useRef, useState} from "react";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ['latin']});

export default function EditSpecific() {

    const [redirectLabel, setRedirectLabel] = useState("");
    const [redirectURL, setRedirectURL] = useState("");

    const hasRan = useRef(false);

    useEffect(() => {
        if (hasRan.current) return;
        hasRan.current = true;
        const id = window.location.href.split("/")[5];
        fetch(`/api/redirects/get?id=${id}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        }).then(x => {
            if (x.status !== 200) {
                alert("Redirect not found");
                window.location.href = "/dashboard/redirects";
            }

            x.json().then(data => {
                setRedirectLabel(data.redirect.label);
                setRedirectURL(data.redirect.url);
            });
        });
    }, []);

    function performSave() {
        const id = window.location.href.split("/")[5];
        fetch(`/api/redirects/save?id=${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                label: redirectLabel,
                url: redirectURL
            })
        }).then(x => {
            if (x.status === 200) {
                window.location.href = "/dashboard/redirects";
            } else {
                alert("Error saving redirect");
            }
        });
    }

    return (
        <main className={`${inter.className}`}>
            <h1>Editing Redirect</h1>
            <a href="/dashboard/redirects">Return back</a>
            <br />
            <label htmlFor="redirectTitle">Redirect Title</label>
            <br />
            <input id="redirectTitle" type="text" placeholder="Redirect Title" value={redirectLabel} onChange={e => setRedirectLabel(e.target.value)}/>
            <br />
            <label htmlFor="redirectText">Redirect Text</label>
            <br />
            <input id="redirectText" placeholder="Redirect Text" value={redirectURL} onChange={e => setRedirectURL(e.target.value)} />
            <br />
            <button onClick={performSave}>Save</button>
        </main>
    )
}
