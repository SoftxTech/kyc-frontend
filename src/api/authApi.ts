import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

class AuthApi {
  secretKey = "DvqW7Q6S!1Qfg!WY8QC%8Eh4jHuDH8q$";
  key = new TextEncoder().encode(this.secretKey);
  async encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(this.key);
  }

  async decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, this.key, {
      algorithms: ["HS256"],
    });
    return payload;
  }

  async login(data: any) {
    const payload = {
      id: data,
    };
    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await this.encrypt({ payload, expires });

    // Save the session in a cookie
    // cookies().set("session", session, { expires, httpOnly: true });
    const res = NextResponse.next();

    res.cookies.set({
      name: "session",
      value: session,
      httpOnly: true,
      expires: expires,
    });
    return { res };
  }

  async logout() {
    // Destroy the session
    // cookies().set("session", "", { expires: new Date(0) });
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: "",
      httpOnly: true,
      expires: new Date(0),
    });
    return res;
  }

  async getSession(req: NextRequest) {
    const session = req.cookies.get("session")?.value;
    if (!session) return null;
    return await this.decrypt(session);
  }

  async updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await this.decrypt(session);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await this.encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
  }
}
export const authApi = new AuthApi();
