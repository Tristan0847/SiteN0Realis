import Link from "next/link";

/**
 * Propos du component
 */
interface AccesRestreintProps {
    message: string;
}

/**
 * Méthode de génération du bloc indiquant un accès restreint à une fonctionnalité, nécessitant la connexion de l'utilisateur
 * @param message Message à afficher 
 * @returns Bloc d'accès restreint
 */
export function AccesRestreint({message} : AccesRestreintProps) {
    return <section className="mx-auto px-4 py-5 max-w-4xl">
                <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-md border-2 border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-orange-900">
                            Accès restreint
                        </h3>
                    </div>
                    
                    <p className="text-orange-800 mb-4">
                        {message}
                    </p>
                    
                    <Link href="/connexion" className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg">Se connecter</Link>
                </div>
            </section>;
}
