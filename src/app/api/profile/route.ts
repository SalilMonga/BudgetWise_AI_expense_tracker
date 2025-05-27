import { NextResponse } from "next/server";
import { getProfile, updateProfile } from "./data";

export async function GET() {
  return NextResponse.json(getProfile());
}

export async function POST(req: Request) {
  const updates = await req.json();
  const updatedProfile = updateProfile(updates);
  return NextResponse.json(updatedProfile);
} 