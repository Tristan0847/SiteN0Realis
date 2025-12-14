import OeilDeLOcculte from "@Wiki/components/OeilDeLOcculte";

/**
 * Méthode retournant un simple oeil de l'occulte en mode statique
 * @returns Composant OeilDeLOcculte en mode statique
 */
export function PageOeilOcculte() {
    return(<OeilDeLOcculte mode="statique" couleur="blanc" tailleIris="moyen" vitesse={1} opacite={80} />);
}