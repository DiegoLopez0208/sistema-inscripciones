import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const credentials = await req.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", // Permite recibir y enviar cookies del backend
    });

    if (!response.ok) {
        return NextResponse.json({ message: "Login fallido" }, { status: response.status });
    }

    // Extraer las cookies del backend y reenviarlas al navegador
    const cookies = response.headers.get("set-cookie");
    if (cookies) {
        const data = await response.json();
        console.log({ data })

        // Transferir las cookies del backend al cliente
        return new NextResponse(JSON.stringify({ ...data.user }), {
            headers: { "Set-Cookie": cookies },
        });
    }

    return NextResponse.json({ message: "Login exitoso" }, { status: 200 });
}
