import {useEffect} from "react";
import {validateClient} from "@/utils/validationClient";
import {Inter} from "next/font/google";
import DashboardLeftSide from "@/components/DashboardLeftSide";

const inter = Inter({subsets: ['latin']});

export default function Index() {

    useEffect(() => {
        (async () => {
            if (!await validateClient()) {
                localStorage.removeItem("token");
                window.location.href = "/";
            }
        })()
    }, []);

    return (
        <>
            <main className={`${inter.className}`}>
                <DashboardLeftSide />
                <h1>haiiii cutie~ :3</h1>
            </main>
        </>
    )
}
