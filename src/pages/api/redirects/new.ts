import {NextApiRequest, NextApiResponse} from "next";
import {Redirect} from "@/utils/types";

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

    if (req.headers["content-type"] !== "application/json") {
        res.status(400).end();
        return;
    }

    if (!req.body.id || !req.body.label || !req.body.url) {
        res.status(400).end();
        return;
    }

    const fetch1 = await fetch(`${process.env.FIREBASE}/redirects.json`);
    let json1 = await fetch1.json() as Redirect[];

    await fetch(`${process.env.FIREBASE}/redirects/${json1.length}.json`, {
        method: "PUT",
        body: JSON.stringify({
            id: req.body.id,
            label: req.body.label,
            url: req.body.url
        })
    });

    res.status(200).end();
}