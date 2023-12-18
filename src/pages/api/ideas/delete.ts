import {NextApiRequest, NextApiResponse} from "next";
import {ArticleBase} from "@/utils/types";
import {types} from "sass";
import Number = types.Number;

async function getIdeas() {
    const fetch1 = await fetch(`${process.env.FIREBASE}/ideas.json`);
    let json1 = await fetch1.json() as string[];
    return json1;
}

async function updateIdeas(data: string[]) {
    await fetch(`${process.env.FIREBASE}/ideas.json`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).send("Method not allowed");
    }

    if (req.headers.authorization !== process.env.TOKEN) {
        res.status(401).send("Unauthorized");
        return;
    }

    if (req.headers["content-type"] !== "application/json") {
        res.status(415).send("Content-Type must be application/json");
        return;
    }

    if (!req.body.id) {
        res.status(400).send("No body ID");
        return;
    }

    const number = +req.body.id;
    if (isNaN(number)) {
        res.status(400).send("ID is not a number");
        return;
    }

    let data = await getIdeas();
    if (number > data.length) {
        res.status(404).send("ID not found");
        return;
    }
    data.splice(number, 1);
    console.log(data)
    await updateIdeas(data);

    res.status(204).end();

}