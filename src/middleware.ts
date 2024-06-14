import { NextRequest } from "next/server";
import { authApi } from "./api/authApi";

export async function middleware(request: NextRequest) {
  return await authApi.updateSession(request);
}
