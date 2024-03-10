import { getCatalogRules } from "@/services/catalog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const response = await getCatalogRules()
    return NextResponse.json(response);
}
