
/**
 * Classe utilitaire pour la gestion des slugs
 */
export class SlugsUtil {

    /**
     * M%éthode de génération d'un slug à partir d'un texte
     * @param texte Texte source
     * @returns Slug généré
     */
    public static genererSlug(texte : string) : string {
        const lowercase = texte.toLowerCase();
        const separationAccents = lowercase.normalize("NFD");
        const sansAccents = separationAccents.replace(/[\u0300-\u036f]/g, "");
        const sansCaracteresSpeciaux = sansAccents.replace(/[^a-z0-9\s-]/g, "");
        const avecTirets = sansCaracteresSpeciaux.replace(/\s+/g, '-');
        const slug = avecTirets.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        return slug;
    }
}