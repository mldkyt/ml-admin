export async function validateClient() {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }

    const res = await fetch("/api/validateToken", {
        method: "POST",
        body: JSON.stringify({token})
    });
    const json = await res.json();
    return json.valid;
}