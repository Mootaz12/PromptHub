import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";
import { Prompt } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id },
    });

    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    return NextResponse.json(prompt);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching prompt" },
      { status: 500 },
    );
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { tag, author, content } = await req.json();

  try {
    const updatedPrompt = await prisma.prompt.update({
      where: { id },
      data: {
        content,
        tag,
        author,
      },
    });

    return NextResponse.json(updatedPrompt);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error updating prompt" },
      { status: 500 },
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    await prisma.prompt.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting prompt" },
      { status: 500 },
    );
  }
}
