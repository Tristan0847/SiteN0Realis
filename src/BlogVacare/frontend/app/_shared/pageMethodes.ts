import { SiteVariant } from "@BlogsShared/model/Variant";
import { ElementSupprime } from "@BlogsShared/model/ElementSupprime";

/**
 * Méthode filtrant les éléments à afficher selon l'état de connexion (seuls les admins peuvent afficher les éléments supprimés) et le variant actuel du site
 * @param elements Liste des éléments retournés 
 * @param estAdmin Si on est admin ou non
 * @param variant Variante actuelle du site (si mode old, on affiche les éléments supprimés non cachés)
 * @returns Liste des éléments à afficher
 */
export function filtrerElements<T extends { getElementSupprime(): ElementSupprime | null }>(
    elements: T[], estAdmin: boolean, variant: SiteVariant
): T[] {
    let elementsAffiches : T[] = [];
      if (!estAdmin) {
        elements.forEach((m) => {
          const elementsupprime = m.getElementSupprime();
          if (!elementsupprime || (!elementsupprime.getCache() && variant == "old")) {
              elementsAffiches.push(m);
          }
        });
      }
      else {
        elementsAffiches = elements;
      }
    
      return elementsAffiches;
}