"use client";
import {getCookie} from "cookies-next";
import {NeantCookies} from "@lib/storage/cookies/neant";
import {ResonancesFaibles} from "@/components/ResonancesFaibles";


export function JPMemento() {

    const cookie = getCookie(NeantCookies.jp.ending);

    return (
        <>
            {(cookie && (cookie.toString() === "jp" || cookie.toString() === "bauk")) ?
                cookie === "jp" ?
                    <Memento1/>
                    :
                    <Memento2/>
                :
                <ResonancesFaibles/>}
        </>
    );
}


function Memento1() {
    return (
        <>
            <div className="text-center mb-6 mt-8">
                <p>Votre corps s&apos;éteint, votre âme s&apos;éveille.</p>
                <p>Lors de vos derniers instants, les débris de votre mémoire paradent.</p>
                <p>Vos efforts, vos joies, votre rédemption. Auriez-vous pu faire autrement ? Peu importe.</p>
                <p>Car, immanquablement, nous étions condamnés à nous retrouver.</p>
            </div>

            <p className="text-left">Où suis-je?</p>
            <p className="text-right">Nulle part</p>

            <p className="text-left">Je n&apos;ai pas trop fauté ? Ou causé trop de tort ?</p>
            <p className="text-right">Vous seul pouvez être juge de vos propres actions.</p>

            <p className="text-left">
                Je regrette beaucoup, plus que je ne le devrais vraiment.<br/>
                Mais j&apos;ai réussi à remonter la pente, je me suis confié, j&apos;ai soutenu mes amis, j&apos;ai laissé plus de bonheur derrière moi qu&apos;il n&apos;aurait pu le faire...<br/>
                Alors, peut-être qu&apos;un type comme moi peut l&apos;espérer ?<br/>
                Espérer avoir racheté son âme avant la fin ?
            </p>

            <p className="text-right">Si telle est la réponse de votre cœur, alors ainsi soit-il.</p>
            <p className="text-right">Respirez profondément, prenez le temps qu&apos;il vous sera nécessaire de prendre, contemplez votre réelle nature</p>
            <p className="text-right">De votre retour dépend toute votre existence.</p>

            <p className="text-center font-bold">Que désirez-vous être ?</p>

            <p className="text-left">Julien-Phébus, je désire rester moi-même.</p>
            <p className="text-right mt-4">Votre choix est ainsi fait.</p>
        </>
    )
}

function Memento2() {
    return <>
        <div className="text-center mb-6 mt-8">
            <p>Votre corps s&apos;éteint, votre âme s&apos;éveille.</p>
            <p>Lors de vos derniers instants, les débris de votre mémoire paradent.</p>
            <p>Vos échecs, vos regrets, vos torts. Auriez-vous pu faire autrement ? Peu importe.</p>
            <p>Car, immanquablement, nous étions condamnés à nous retrouver.</p>
        </div>

        <p className="text-left">Suis-je parti ?</p>
        <p className="text-right">Oui</p>

        <p className="text-left">J&apos;ai été juste ?</p>
        <p className="text-right">Vous seul pouvez être juge de vos propres actions.</p>

        <p className="text-left">Je ne l&apos;ai pas été, je regrette tout, du début à la fin.</p>

        <p className="text-right">Si telle est la réponse de votre cœur, alors ainsi soit-il.</p>
        <p className="text-right">Respirez profondément, prenez le temps qu'il vous sera nécessaire de prendre, contemplez votre réelle nature</p>
        <p className="text-right">De votre retour dépend toute votre existence.</p>

        <p className="text-center font-bold">Que désirez-vous être ?</p>

        <p className="text-left">Rien.</p>
        <p className="text-right mt-4">Votre choix est ainsi fait.</p>
    </>
}