import {NextApiRequest, NextApiResponse} from "next";
import {ArticleBase} from "@/utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end();
    }

    if (req.headers.authorization !== process.env.TOKEN) {
        res.status(401).end();
        return;
    }

    const fetch1 = await fetch(`${process.env.FIREBASE}/ideas.json`);
    let json1 = await fetch1.json() as string[];

    res.send({ideas: json1});

}