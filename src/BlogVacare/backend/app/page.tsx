/**
 * Page d'accueil de l'API BlogVacare
 * @returns Composant React de la page d'accueil
 */
export default function HomePage() {
    return (
        <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <h1>Bienvenue sur le back-end API BlogVacare</h1>
            <p>Cette API permet de gérer les blogs et les messages associés.</p>
            <p>Utilisez les routes suivantes pour interagir avec l&apos;API :</p>
            <ul>
                <li><strong>GET /api/dossiers/liste</strong> : Récupérer les dossiers du projet</li>
                <li><strong>GET /api/blogs/liste/[idDossier]</strong> : Récupérer les blogs d&apos;un dossier</li>
                <li><strong>GET /api/messages/liste/[idDossier]/[idBlog]</strong> : Récupérer les messages d&apos;un blog dans un dossier</li>
            </ul>
            <p>Assurez-vous de fournir les paramètres requis dans l&apos;URL.</p>
            <p>Pour plus d&apos;informations, consultez la documentation de l&apos;API.</p>
        </main>
    );
}
