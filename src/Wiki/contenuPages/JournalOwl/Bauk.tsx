import {BaseJournalOwl} from "@Wiki/contenuPages/JournalOwl/JournalBase";
import Link from "next/link";


/**
 * Méthode pour l'article "Bauk" du journal d'Owl
 */
export function JournalBauk() {
    return (
        <BaseJournalOwl contenu={<>
            <p>Je te pose ce message ici pour quand tu auras le temps de le lire, Ant, mais je me doutais que quelque chose allait dégénérer sans vraiment comprendre pourquoi. Je crois que j'ai enfin mis le doigt sur le doute qui m'assaillait : Vince</p>
            <p>J'avais déjà entendu parler d'Edmond et de Bauk avant qu'ils ne soient sur AVOS, surtout de Bauk pour des raisons évidentes. Mais JP, jamais Vincent ne m'en avait parlé, il l'a ajouté sans que je le connaisse. Lui, Edmond et Bauk à la fois.</p>
            <br/>
            <p>J'ai pu me rendre au centre de rééducation de Bauk et lui parler un peu, tu savais que cette rencontre n'était pas son idée ? La vraie surprise qu'il voulait faire, c'était celle de sa victoire, mais quelqu'un l'a incité à inviter un peu plus de monde à l'événement. Ce même quelqu'un ne s'y est jamais rendu. Je te laisse deviner qu'il s'agissait de Vince.</p>
            <br/>
            <p>Et alors qu'il connaissait chacun des 3 acteurs de cette tragédie, il n'a jamais interagi avec un seul d'entre eux sur le blog. Pas même un petit mot pour Bauk. Pourtant je le connais : du temps de l'ancien blog, c'était le plus bavard d'entre nous, mais dans ce cas précis il n'a jamais rien dit?</p>
            <br/>
            <p>Je sais pas quoi en penser, je connais Vincent depuis son enfance et il ne s'est jamais comporté ainsi, il était le plus heureux d'entre nous pour ce qui était d'ouvrir AVOS et il s'est pourtant plus renfermé sur lui-même qu'autre chose.</p>
            <p>Je ne veux pas croire qu'il ait pu orchestrer une telle rencontre depuis plusieurs mois... Qu'en penses-tu, de ton côté, Ant ?</p>
            <br/><br/>
            <p className="text-right">Owl, 09/08/2009</p>

            <Link href="../../journal-d-anti-r/bauk/" className="text-gray-200 hover:text-gray-400 text-lg mt-4 inline-block">
                ▶ Réponse d'AntiR
            </Link>
            <br/>
        </>}
        />
    );
}