import {NextApiRequest, NextApiResponse} from "next";
import {ArticleBase} from "@/utils/types";

async function getArticles() {
    const fetch1 = await fetch(`${process.env.FIREBASE}/articles.json`);
    let json1 = await fetch1.json() as ArticleBase[];
    return json1;
}

async function updateArticles(data: ArticleBase[]) {
    await fetch(`${process.env.FIREBASE}/articles.json`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).send("Method not allowed");
    }

    if (req.headers.authorization !== process.env.TOKEN) {
        res.status(401).send("Unauthorized");
        return;
    }

    if (!req.body.id) {
        res.status(400).send("No ID provided");
        return;
    }

    let data = await getArticles();
    let index = data.findIndex(article => article.id === req.body.id);
    if (index === -1) {
        res.status(404).send("ID not found");
        return;
    }
    data.splice(index, 1);
    await updateArticles(data);

    res.status(204).end();
}