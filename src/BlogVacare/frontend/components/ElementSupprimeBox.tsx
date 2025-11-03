import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { getVariantStyles } from "@BlogsFront/lib/variant-styles";
import { ElementSupprime } from "@BlogsShared/model/ElementSupprime";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

type TypeSuppression =  "dossier" | "blog" | "message";
/**
 * Paramètres en entrée de la fonction
 */
interface SuppressionBoxProps {
    type: TypeSuppression;
    donnees: ElementSupprime;
}

/**
 * Dialog Box affichée quand on veut afficher les données d'un élément supprimé (dossier, blog, message), commun aux 3
 * @param param0 Type de suppression et données à afficher 
 * @returns 
 */
export default function ElementSupprimeBox({ type, donnees }: SuppressionBoxProps) {

    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);

    const [dialogBoxOuverte, setDialogBox] = useState(false);
    const upperType = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div>
          <div className={ type == "message" ? styles.elementSupprTitreMessage : styles.elementSupprTitre } >⚠️ { upperType } supprimé — <p className={ styles.elementSupprTitreLien } onClick={() => setDialogBox(true)}>Voir les détails</p></div>
          <Dialog open={dialogBoxOuverte} onClose={() => setDialogBox(false)} className={ styles.elementSupprDialogBox }>
            <DialogPanel className={ styles.elementSupprDialogPanel }>
              <DialogTitle className={ styles.elementSupprDialogTitre }>Ce { type } a été supprimé</DialogTitle>
              <div className="mb-2">
                <span className={ styles.elementSupprDialogContenu }>Raison :</span> {donnees.getRaisonSuppression()}
              </div>
              <div className="mb-2">
                <span className={ styles.elementSupprDialogContenu }>Date :</span> {donnees.getDateSuppression().toLocaleString()}
              </div>
              <div>
                <span className={ styles.elementSupprDialogContenu }>Auteur :</span> {donnees.getUtilisateur().getUsername()}
              </div>
              <button onClick={() => setDialogBox(false)} className={ styles.elementSupprDialogBtn }>Fermer</button>
            </DialogPanel>
          </Dialog>
        </div>
    );
}
  