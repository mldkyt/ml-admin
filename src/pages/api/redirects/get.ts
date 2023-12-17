import {NextApiRequest, NextApiResponse} from "next";
import {Redirect} from "@/utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end();
    }


    if (!req.query.id) {
        res.status(400).end();
    }

    const fetch1 = await fetch(`${process.env.FIREBASE}/redirects.json`);
    let json1 = await fetch1.json() as Redirect[];


    res.send({redirect: json1.find(redirect => redirect.id === req.query.id)});

}