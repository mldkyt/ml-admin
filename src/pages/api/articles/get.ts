import {NextApiRequest, NextApiResponse} from "next";
import {ArticleBase} from "@/utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end();
    }


    if (!req.query.id) {
        res.status(400).end();
    }

    const fetch1 = await fetch(`${process.env.FIREBASE}/articles.json`);
    let json1 = await fetch1.json() as ArticleBase[];


    res.send({article: json1.find(article => article.id === req.query.id)});

}