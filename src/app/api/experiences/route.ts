import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: {
                startDate: 'desc'
            },
            include: {
                tags: true
            }
        });
        return NextResponse.json(experiences, { status: 200 });
    } catch (error) {
        console.error("GET /api/experiences ERREUR:", error);
        return NextResponse.json({ error: "Erreur lors de la récupération des expériences." }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Validation basique (un vrai projet utiliserait Zod)
        if (!body.title || !body.description || !body.startDate || !body.type) {
             return NextResponse.json({ error: "Titre, description, date de début et type requis." }, { status: 400 });
        }

        const tags = Array.isArray(body.tags) ? body.tags : [];
        
        const newExperience = await prisma.experience.create({
            data: {
                title: body.title,
                description: body.description,
                company: body.company || null,
                startDate: new Date(body.startDate),
                endDate: body.endDate ? new Date(body.endDate) : null,
                type: body.type,
                // Gestion des tags : on connecte s'il existe, on crée sinon
                tags: {
                    connectOrCreate: tags.map((tagName: string) => ({
                        where: { name: tagName },
                        create: { name: tagName }
                    }))
                }
            },
            include: {
                tags: true
            }
        });

        return NextResponse.json(newExperience, { status: 201 });
    } catch (error) {
        console.error("POST /api/experiences ERREUR:", error);
        return NextResponse.json({ error: "Erreur lors de la création de l'expérience." }, { status: 500 });
    }
}
