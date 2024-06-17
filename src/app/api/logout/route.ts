import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest){
    const token = req.cookies.get("session")?.value;

    if (!token) return new NextResponse("nothing");

    let res = new NextResponse()

    res.cookies.delete('session')

    return res
}