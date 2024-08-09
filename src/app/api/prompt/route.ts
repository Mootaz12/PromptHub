import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";
import { Prompt } from "@/types";

export async function POST(req: NextRequest) {
  const { content, tag, author }: Prompt = await req.json();
  try {
    const newPrompt = await prisma.prompt.create({
      data: {
        content,
        tag,
        author,
      },
    });
    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating prompt" },
      { status: 500 },
    );
  }
}
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const tag = url.searchParams.get("tag");
  const authorId = url.searchParams.get("author");
  try {
    let prompts;
    if (tag) {
      prompts = await prisma.prompt.findMany({
        where: {
          tag: tag,
        },
      });
    }
    if (authorId) {
      prompts = await prisma.prompt.findMany({
        where: {
          author: authorId,
        },
      });
    }
    return NextResponse.json(prompts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching prompts" },
      { status: 500 },
    );
  }
}
