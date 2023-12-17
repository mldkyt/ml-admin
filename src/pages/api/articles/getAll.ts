import {NextApiRequest, NextApiResponse} from "next";
import {ArticleBase} from "@/utils/types";
import {validateToken} from "@/utils/validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end();
    }

    if (req.headers.authorization !== process.env.TOKEN) {
        res.status(401).end();
        return;
    }

    const fetch1 = await fetch(`${process.env.FIREBASE}/articles.json`);
    let json1 = await fetch1.json() as ArticleBase[];
    json1.reverse();

    res.send({articles: json1});

}
