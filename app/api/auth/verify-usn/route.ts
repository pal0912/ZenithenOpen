import { NextRequest, NextResponse } from "next/server";
import { verifyStudentUSN } from "@/lib/auth/usn-verification";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { usn } = body;

    if (!usn) {
      return NextResponse.json(
        { valid: false, error: "USN is required" },
        { status: 400 }
      );
    }

    const result = await verifyStudentUSN(usn);

    if (!result.valid) {
      return NextResponse.json(
        { valid: false, error: result.error },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      student: result.student,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { valid: false, error: "Internal server error during verification" },
      { status: 500 }
    );
  }
}
