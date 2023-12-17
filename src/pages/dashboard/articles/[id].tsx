import {useEffect, useRef, useState} from "react";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ['latin']});

export default function EditSpecific() {

    const [articleTitle, setArticleTitle] = useState("");
    const [articleText, setArticleText] = useState("");
    const [articlePostDate, setArticlePostDate] = useState("");

    const hasRan = useRef(false);

    useEffect(() => {
        if (hasRan.current) return;
        hasRan.current = true;
        const id = window.location.href.split("/")[5];
        fetch(`/api/articles/get?id=${id}`).then(x => {
            if (x.status !== 200) {
                alert("Article not found");
                window.location.href = "/dashboard/articles";
            }

            x.json().then(data => {
                setArticleTitle(data.article.title);
                setArticleText(data.article.paragraphs.join("\n"));
                setArticlePostDate(`${data.article.postYear}/${data.article.postMonth}/${data.article.postDay}`);
            });
        });
    }, []);

    function performSave() {
        const id = window.location.href.split("/")[5];
        fetch(`/api/articles/save?id=${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                title: articleTitle,
                paragraphs: articleText.split("\n")
            })
        }).then(x => {
            if (x.status === 200) {
                alert("Article saved");
                window.location.href = "/dashboard/articles";
            } else {
                alert("Error saving article");
            }
        });
    }

    return (
        <main className={`${inter.className}`}>
            <h1>Editing Article</h1>
            <a href="/dashboard/articles">Return back</a>
            <br />
            <label htmlFor="articleTitle">Article Title</label>
            <br />
            <input id="articleTitle" type="text" placeholder="Article Title" value={articleTitle} onChange={e => setArticleTitle(e.target.value)}/>
            <br />
            <label htmlFor="articleText">Article Text</label>
            <br />
            <textarea id="articleText" placeholder="Article Text" value={articleText} onChange={e => setArticleText(e.target.value)} rows={20} cols={50}/>
            <br />
            <p>Posted on {articlePostDate}</p>
            <button onClick={performSave}>Save</button>
        </main>
    )
}
