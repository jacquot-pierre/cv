import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const experience = await prisma.experience.findUnique({
            where: { id: params.id },
            include: { tags: true }
        });

        if (!experience) {
            return NextResponse.json({ error: "Expérience non trouvée." }, { status: 404 });
        }

        return NextResponse.json(experience, { status: 200 });
    } catch (error) {
        console.error("GET /api/experiences/[id] ERREUR:", error);
        return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        const body = await request.json();
        const tags = Array.isArray(body.tags) ? body.tags : [];

        // Dans un PUT on veut écraser les anciens tags par les nouveaux. 
        // Prisma le permet avec un update et set `tags: { set: [] }` puis `connectOrCreate`.
        const updatedExperience = await prisma.experience.update({
            where: { id: params.id },
            data: {
                title: body.title !== undefined ? body.title : undefined,
                description: body.description !== undefined ? body.description : undefined,
                company: body.company !== undefined ? body.company : undefined,
                startDate: body.startDate ? new Date(body.startDate) : undefined,
                endDate: body.endDate !== undefined ? (body.endDate ? new Date(body.endDate) : null) : undefined,
                type: body.type !== undefined ? body.type : undefined,
                tags: {
                    // Supprime les anciennes liaisons de tags
                    set: [], 
                    // Ajoute les nouvelles (et les crée si besoin)
                    connectOrCreate: tags.map((tagName: string) => ({
                        where: { name: tagName },
                        create: { name: tagName }
                    }))
                }
            },
            include: { tags: true }
        });

        return NextResponse.json(updatedExperience, { status: 200 });
    } catch (error) {
        console.error("PUT /api/experiences/[id] ERREUR:", error);
        return NextResponse.json({ error: "Erreur lors de la mise à jour de l'expérience." }, { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
        await prisma.experience.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ message: "Expérience supprimée avec succès." }, { status: 200 });
    } catch (error) {
        console.error("DELETE /api/experiences/[id] ERREUR:", error);
        return NextResponse.json({ error: "Erreur lors de la suppression. Il se peut qu'elle n'existe pas." }, { status: 500 });
    }
}
