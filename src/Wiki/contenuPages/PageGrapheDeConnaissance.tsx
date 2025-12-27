import { Article } from "@Wiki/.contentlayer/generated";
import { GrapheDeConnaissance } from "@Wiki/components/GrapheDeConnaissance";
import { H2 } from "@Wiki/components/Wiki/ComposantsCustom";

/**
 * Props pour la page Graphe de Connaissance
 */
interface PageGrapheDeConnaissanceProps {
    articles: Article[];
}

/**
 * Page affichant le graphe de connaissance du site entier
 * @param articles Articles à afficher
 * @returns Composant PageGrapheDeConnaissance
 */
export function PageGrapheDeConnaissance({ articles }: PageGrapheDeConnaissanceProps) {
    return(<>
    <H2>Aperçu de nos articles</H2>
    <div className="text-xl my-2 text-white space-y-2">
        <p>Afin de vous proposer une navigation plus optimisée de notre site, le <strong>graphe de connaissance</strong> suivant a été mis en place pour répertorier chacun de nos articles et les relations existantes entre eux !</p>
        <p>Chaque noeud présent ci-dessous représente un article, chaque lien entre deux noeuds symbolise donc un rapport d'un article à un autre, ce qui vous permet donc une vision plus ordonnée de notre travail, et un suivi plus clair de nos contenus.</p>
    </div>
    <GrapheDeConnaissance articles={ articles } slugCentral={ "" } avecFiltres={ true } />
    </>);
}