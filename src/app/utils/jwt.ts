import { jwtVerify, SignJWT } from "jose";

const secretKey = "DvqW7Q6S!1Qfg!WY8QC%8Eh4jHuDH8q$";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any, expires: string) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expires)
      .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}