import { cookies } from "next/headers";
import { getToken, deleteToken, refreshToken } from "@/lib/http/jwt-actions";

export async function POST() {
  return refreshToken();
}

export async function GET() {
  await cookies();
  return getToken();
}

export async function DELETE() {
  return deleteToken();
}
