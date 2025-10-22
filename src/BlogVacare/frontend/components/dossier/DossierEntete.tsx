'use client';

/**
 * Méthode de composant pour afficher l'entête de la liste de dossiers
 * @returns Composant React contenant l'entête de la liste de dossiers
 */
export function DossierEntete() {
  return (
    <section className="mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-extrabold text-primary-dark drop-shadow-md leading-tight">
          Bienvenue sur le Blog de Vacare
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg text-neutral-700 leading-relaxed px-2">
          Anciennement blog de Vince et de son meilleur ami, ce forum est aujourd&apos;hui celui de Vacare et, par conséquent, de <strong>N0Realis</strong>.<br/>
          Espace réservé aux employés autorisés, ne contactez Vacare qu&apos;en cas de nécessité absolue.<br/>
          <strong>Nos rêves deviendront réalité.</strong>
        </p>
      </div>
    </section>
  );
}

