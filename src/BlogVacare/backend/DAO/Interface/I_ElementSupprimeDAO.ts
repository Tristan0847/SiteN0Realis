import { ElementSupprime } from "@BlogsShared/model/ElementSupprime";

/**
 * Interface de gestion de DAO d'éléments supprimés
 */
export interface I_ElementSupprimeDAO {

    /**
     * Méthode de création d'un élément supprimé du projet
     * @param element Element à créer
     * @return Element supprimé créé avec son identifiant unique
     */
    creerElementSupprime(element : ElementSupprime) : Promise<ElementSupprime>;

    /**
     * Méthode permettant de récupérer les informations d'un élément supprimé
     * @param id Identifiant de l'élément supprimé demandé
     * @return Informations de l'élément supprimé demandées
     */
    recupererElementSupprime(id : number): Promise<ElementSupprime>;

    /**
     * Méthode de suppression d'un élément supprimé (revient donc à annuler la suppression)
     * @param id Identifiant de l'élément supprimé à annuler
     */
    annulerSuppression(id : number) : Promise<void>;

}