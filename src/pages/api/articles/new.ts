import {NextApiRequest, NextApiResponse} from "next";
import {ArticleBase} from "@/utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).send("Method not allowed");
        return;
    }

    if (req.headers.authorization !== process.env.TOKEN) {
        res.status(401).send("Unauthorized");
        return;
    }

    if (req.headers["content-type"] !== "application/json") {
        res.status(400).send("Content-Type must be application/json");
        return;
    }

    if (!req.body.id || !req.body.title || !req.body.paragraphs) {
        res.status(400).send("ID, title or paragraphs missing");
        return;
    }

    const fetch1 = await fetch(`${process.env.FIREBASE}/articles.json`);
    let json1 = await fetch1.json() as ArticleBase[];

    const date = new Date();

    await fetch(`${process.env.FIREBASE}/articles/${json1.length}.json`, {
        method: "PUT",
        body: JSON.stringify({
            id: req.body.id,
            title: req.body.title,
            paragraphs: req.body.paragraphs,
            postYear: date.getUTCFullYear(),
            postMonth: date.getUTCMonth(),
            postDay: date.getUTCDay()
        })
    });

    res.status(204).end();
}