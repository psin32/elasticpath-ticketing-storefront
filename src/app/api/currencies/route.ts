import { getAllCurrencies } from "@/services/currencies";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const response = await getAllCurrencies()
    return NextResponse.json(response);
}
