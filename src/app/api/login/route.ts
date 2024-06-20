import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "../../utils/jwt";

export async function POST(req: NextRequest){
    const body = await req.json();
    

    const token = await encrypt(body, "30d");
    const res = NextResponse.json(
        {  ...body,
            success: true,
            message: "Login successful"
        },
        {status: 201}
    )
    res.cookies.set({
        name: "session",
        value: token,
        httpOnly: true,
        sameSite: "strict",
    });

    return res
}