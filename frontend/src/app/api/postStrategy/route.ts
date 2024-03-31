import { oneLevelData } from "@/_assets/data/strategy";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("GET 시작");

  const data = await request.json();
  const strategyData = data.strategy;
  console.log("server) strategyData", strategyData);

  const baseUrl = process.env.BASE_URL;
  const url = `/result`;
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
  };
  const body = JSON.stringify({ strategy: strategyData });
  try {
    const response = await fetch(baseUrl + url, {
      method: "POST",
      headers,
      body: body,
    });

    const data = await response.json();
    console.log("server) data", data);
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
  }
}
