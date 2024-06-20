import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "../../utils/jwt";

export async function GET(req: NextRequest) {
    const token = req.cookies.get("session")?.value;
    if (!token) return new NextResponse();
    try{
        const parsed = await decrypt(token);
        console.log(parsed);
        return NextResponse.json(parsed, {status: 200})
    }
    catch(e){
        return NextResponse.json(
            {
                "sucess": false,
                "message": "please login again"
            },
            {status: 401}
        );
    }
}