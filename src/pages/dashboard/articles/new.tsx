import DashboardLeftSide from "@/components/DashboardLeftSide";
import {useState} from "react";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ['latin']});

export default function () {
    const [articleID, setArticleID] = useState("");
    const [articleTitle, setArticleTitle] = useState("");
    const [articleText, setArticleText] = useState("");

    function send() {
        fetch('/api/articles/new', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                id: articleID,
                title: articleTitle,
                paragraphs: articleText.split("\n")
            })
        }).then(x => {
            console.log(x);
            x.text().then(y => console.log(y));
            if (x.status === 204) {
                window.location.href = "/dashboard/articles";
            } else {
                alert("Error saving article");
            }
        });
    }

    return (
        <main className={inter.className}>
            <DashboardLeftSide/>
            <h1>Create a new article</h1>
            <input type="text" placeholder="Article ID" value={articleID}
                   onChange={e => setArticleID(e.target.value)}/>
            <br/>
            <input type="text" placeholder="Article title" value={articleTitle}
                   onChange={e => setArticleTitle(e.target.value)}/>
            <br/>
            <textarea placeholder="Article text" value={articleText} onChange={e => setArticleText(e.target.value)}
                      rows={20} cols={50}/>
            <br/>
            <button onClick={send}>Add</button>
        </main>
    )
}
