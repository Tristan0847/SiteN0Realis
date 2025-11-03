import { useVariant } from "@BlogsFront/contexts/VariantContext";
import { getVariantStyles } from "@BlogsFront/lib/variant-styles";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

type TypeSuppression =  "dossier" | "blog" | "message";
/**
 * Paramètres en entrée de la fonction
 */
interface SuppressionBoxProps {
    id: string;
    type: TypeSuppression;
    suppressionHandler: (id: string, raisonSuppression: string, cache: boolean) => Promise<void>;
    dialogBoxOuverte: boolean;
    setDialogBox: (cache : boolean) => void;
}

/**
 * Dialog Box affichée quand on veut supprimer un élément (dossier, blog, message), commun aux 3
 * @param param0 Type de suppression et handler de la suppression
 * @returns 
 */
export default function SuppressionBox({ id, type, suppressionHandler, dialogBoxOuverte, setDialogBox }: SuppressionBoxProps) {
  
    // Récupération des styles
    const variant = useVariant();
    const styles = getVariantStyles(variant);

    // Variables du formulaire
    const [raisonSuppression, setRaisonSuppression] = useState("");
    const [cache, setCache] = useState(false);
    const [chargement, setChargement] = useState(false);
    const [erreur, setErreur] = useState<string|null>(null);

    // Fermeture du formulaire
    const fermetureFormulaire = () => {
        setErreur(null);
        setRaisonSuppression("");
        setCache(false);
        setChargement(false);
        setDialogBox(false);
    }

    // Validation du formulaire
    const confirmationHandler = async () => {
        try {
            setChargement(true);
            setErreur(null);
            await suppressionHandler(id, raisonSuppression, cache);

            fermetureFormulaire();
        }
        catch (err) {
            setErreur(err instanceof Error ? err.message : "Erreur lors de la suppression du " + type);
            setChargement(false);
        }
    }

    return (
        <Dialog open={dialogBoxOuverte} onClose={() => setDialogBox(false)}>
          <div className={ styles.supprFormConteneur }>
            <DialogPanel className={ styles.supprFormPanel }>
              <div className={ styles.supprFormContenu }>
                <DialogTitle className={ styles.supprFormTitre }>Supprimer ce { type } ?</DialogTitle>

                <Description className={ styles.supprFormDesc }>Cette action supprimera le { type }. Les utilisateurs non-admins n&apos;y auront plus accès.<br/><br/>Voulez-vous vraiment le supprimer ?</Description>
                
                {erreur && (
                    <div className={styles.messageFormDiv}>
                        {erreur}
                    </div>
                )}
                
                <div className="space-y-3">
                    <div>
                        <label htmlFor="raison" className={ styles.supprFormRaisonLabel }>Raison de la suppression</label>
                        <textarea id="raison" value={raisonSuppression} onChange={(e) => setRaisonSuppression(e.target.value)} className={ styles.supprFormRaison } rows={3} placeholder="Indiquez la raison de cette suppression..." disabled={chargement} />
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="cache" checked={cache} onChange={(e) => setCache(e.target.checked)} className={ styles.supprFormCache } disabled={chargement} />
                        <label htmlFor="cache" className={ styles.supprFormCacheLabel }>Cochez cette case si vous souhaitez que le { type } soit caché après suppression.</label>
                    </div>
                </div>
                
                <div className="flex w-full pt-2 gap-4 justify-center">
                  <button onClick={() => fermetureFormulaire()} className={ styles.supprFormBtnAnnuler }>Annuler</button>
                  <button onClick={() => confirmationHandler()} className={ styles.supprFormBtnConfirmer }>Supprimer</button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
    );
}
