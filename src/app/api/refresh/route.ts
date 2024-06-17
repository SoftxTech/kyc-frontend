import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "../../utils/jwt";

export async function POST(req: NextRequest) {
    const token = req.cookies.get("session")?.value;

    if (!token) return NextResponse.json(
        {
            "sucess": false,
            "message": "please login"
        }
        , { status: 401 }
    );
    try{
        const parsed = await decrypt(token);

        const res = NextResponse.json(
            {   ...parsed,
                "sucess": true,
                "message": "Refresh successful"
            },
            {status: 201}
        )
        res.cookies.set({
            name: "access",
            value: token,
            httpOnly: true,
            sameSite: "strict",
        });
        return res
    }
    catch(e){
        return NextResponse.json(
            {
                "sucess": false,
                "message": "please login again"
            }
            , { status: 401 }
        );
    }
}