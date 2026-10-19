import Link from "next/link";

export default function NotFound() {
  return (
    <main className="about-intro">
      <div className="intro">
        <h1 className="t-h1 ink">Página não encontrada</h1>
        <p className="t-h1 grey">
          <Link href="/" className="text-link">
            Voltar para os projetos
          </Link>
        </p>
      </div>
    </main>
  );
}
