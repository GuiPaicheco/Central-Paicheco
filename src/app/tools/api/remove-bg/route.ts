import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    // 1. Preparando o corpo para a API externa
    const apiFormData = new FormData();
    apiFormData.append("image_file", file);
    apiFormData.append("size", "auto");

    // 2. Chamada para a API do Remove.bg
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY || "",
      },
      body: apiFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Erro na API de remoção", details: errorData },
        { status: response.status }
      );
    }

    // 3. Recebemos o binário da imagem processada
    const imageBlob = await response.blob();

    // 4. Retornamos a imagem com o Content-Type correto
    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("Erro no processamento:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}