import {NextApiRequest, NextApiResponse} from "next";
import {Redirect} from "@/utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.status(405).end();
    }

    if (req.headers.authorization !== process.env.TOKEN) {
        res.status(401).end();
        return;
    }

    const fetch1 = await fetch(`${process.env.FIREBASE}/redirects.json`);
    let json1 = await fetch1.json() as Redirect[];
    json1.reverse();

    res.send({redirects: json1});

}
