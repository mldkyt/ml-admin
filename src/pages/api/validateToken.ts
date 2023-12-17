import {NextApiRequest, NextApiResponse} from "next";
import {validateToken} from "@/utils/validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.send({valid: false});
    }

    const { token } = JSON.parse(req.body);
    if (!token) {
        res.send({valid: false});
    }

    if (!validateToken(token)) {
        res.send({valid: false});
    }

    res.send({valid: true});
}
