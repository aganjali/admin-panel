import type { NextRequest } from "next/server";

import { login } from "@/lib/http/jwt-actions";

export async function POST(request: NextRequest) {
  return login(await request.json());
}
