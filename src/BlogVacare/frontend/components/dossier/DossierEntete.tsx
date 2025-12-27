'use client';

import { useVariant } from "@BlogsFront/contexts/VariantContext";
import Link from "next/link";

/**
 * Méthode de composant pour afficher l'entête de la liste de dossiers
 * @returns Composant React contenant l'entête de la liste de dossiers
 */
export function DossierEntete() {
  // Récupération des styles
  const variant = useVariant();

  if (variant == "old") {
    return (
      <div className="mx-auto px-4 border-2 border-black bg-white max-w-3xl">
          <div className="text-center mb-10">
        <h2 className="font-bold text-3xl pt-4">Bienvenue sur le Forum de SuperFlashAtomicMan et Vince</h2>
        <p className="px-2 text-lg">Si vous n&apos;êtes ni l&apos;unique SuperFlashAtomicMan, ni l&apos;audacieux Vince, ni le TRES intelligent Mister Owl, vous n&apos;êtes PAS le bienvenue ici ! Ce forum est privé et interdit aux adultes !</p>
        </div>
    </div>
  );
  }

  return (
    <section className="mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-extrabold text-primary-dark drop-shadow-md leading-tight">
          Bienvenue sur le Blog de <Link href="/vacare" className="text-primary-dark/40 hover:bg-green-800/10 hover:text-primary-dark/90 transition">Vacare</Link>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg text-neutral-700 leading-relaxed px-2">
          <Link href="/old" className="underline hover:bg-green-800 hover:text-white">Anciennement</Link> blog de Vince et de son meilleur ami, ce forum est aujourd&apos;hui celui de Vacare et, par conséquent, de <strong>N0Realis</strong>.<br/>
          Espace réservé aux employés autorisés, ne contactez Vacare qu&apos;en cas de nécessité absolue.<br/>
          <strong>Nos rêves deviendront réalité.</strong>
        </p>
      </div>
    </section>
  );
}

