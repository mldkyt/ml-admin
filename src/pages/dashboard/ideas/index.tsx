import DashboardLeftSide from "@/components/DashboardLeftSide";
import {Inter} from "next/font/google";
import {useEffect, useRef, useState} from "react";

const inter = Inter({subsets: ['latin']});

export default function Index() {

    const [ideas, setIdeas] = useState([] as string[]);

    const hasRan = useRef(false);

    useEffect(() => {
        if (hasRan.current) return;
        hasRan.current = true;

        (async () => {
            const res = await fetch('/api/ideas/get', {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            if (data.length === 0) {
                localStorage.removeItem("token");
                window.location.href = "/";
            }
            setIdeas(data.ideas);
        })();
    }, []);

    return (
        <main className={`${inter.className}`}>
            <DashboardLeftSide/>
            <div>
                <h1>Idea list</h1>
                {ideas.map((idea, i) => {
                    function deleteIdea() {
                        fetch('/api/ideas/delete', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `${localStorage.getItem("token")}`
                            },
                            body: JSON.stringify({
                                id: i.toString()
                            })
                        }).then(x => {
                            location.reload();
                        });
                    }

                    return <>
                        <div key={i}>
                            {idea}
                            <button onClick={deleteIdea}>Delete this idea</button>
                        </div>
                    </>
                })}
            </div>
        </main>
    )
}
