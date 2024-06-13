import { getSession } from "../lib"
import { redirect } from "next/navigation"

const isLoggedIn = async () => {
    const session = await getSession();
    return session? true : false;
}

export default isLoggedIn ;