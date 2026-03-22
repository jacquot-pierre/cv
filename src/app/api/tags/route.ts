import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Récupérer la liste des tags (pour les filtres ou l'autocomplétion)
export async function GET() {
    try {
        const tags = await prisma.tag.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        return NextResponse.json(tags, { status: 200 });
    } catch (error) {
        console.error("GET /api/tags ERREUR:", error);
        return NextResponse.json({ error: "Erreur lors de la récupération des tags." }, { status: 500 });
    }
}
