import { A } from "./ComposantsCustom";

/**
 * Props pour le composant Articles Liés
 */
interface ArticlesLiesProps {
    relations: Array<{
        slug: string;
        type: string;
        description?: string;
    }>;
}

/**
 * Composant Articles Liés pour afficher une section d'articles liés
 * @param children Contenu des articles liés
 * @returns Composant des articles liés
 */
export function ArticlesLies({ relations }: ArticlesLiesProps) {
    
    return(<div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            🔗 Voir aussi
        </h3>
        <div className="prose prose-invert prose-sm">
            {relations && relations.map((relation, index) => (
                <div key={index}>
                    <A href={`/article/${relation.slug}`}>{relation.description ? relation.description : relation.slug}</A>
                </div>
            ))}
        </div>
    </div>)

}