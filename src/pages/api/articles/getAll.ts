import {NextApiRequest, NextApiResponse} from "next";
import {ArticleBase} from "@/utils/types";
import {validateToken} from "@/utils/validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.send({articles: []});
    }

    const fetch1 = await fetch(`${process.env.FIREBASE}/articles.json`);
    let json1 = await fetch1.json() as ArticleBase[];
    json1.reverse();

    res.send({articles: json1});

}
