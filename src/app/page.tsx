export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center pt-10 pb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Développeur & DevOps
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Bienvenue sur mon espace en ligne. Je conçois des infrastructures robustes et je développe des applications web modernes.
        </p>
      </section>

      <section id="pro" className="space-y-6 pt-8">
        <h2 className="text-2xl font-bold border-b pb-2">Expériences Professionnelles</h2>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-muted-foreground italic">Aucune expérience n'est encore enregistrée.</p>
        </div>
      </section>

      <section id="perso" className="space-y-6 pt-8">
        <h2 className="text-2xl font-bold border-b pb-2">Projets Personnels</h2>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-muted-foreground italic">Aucun projet personnel n'est encore enregistré.</p>
        </div>
      </section>
    </div>
  );
}
