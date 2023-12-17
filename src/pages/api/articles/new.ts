import {NextApiRequest, NextApiResponse} from "next";
import {ArticleBase} from "@/utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).end();
        return;
    }

    if (!req.query.id) {
        res.status(400).end();
        return;
    }

    if (req.headers.authorization !== process.env.TOKEN) {
        res.status(401).end();
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

    res.status(200).end();
}