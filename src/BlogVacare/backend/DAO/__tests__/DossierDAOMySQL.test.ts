import { describe, it, expect, beforeAll } from 'vitest';
import { DossierDAOMySQL } from '@BlogsBack/DAO/Implementation/DossierDAOMySQL';
import { Dossier } from '@BlogsShared/model/Dossier';

// Fichier de tests unitaires sur la table Dossiers
describe('DossierDAOMySQL.test - Méthodes GET', () => {
  let dao: DossierDAOMySQL;

  beforeAll(() => {
    dao = new DossierDAOMySQL();
  });

  describe("recupererDossiers", () => {
    it("Retourne les dossiers du projet", async () => {
        const dossiers : Dossier[] = await dao.recupererDossiers();
        
        expect(dossiers).toBeDefined();
        expect(dossiers.length).equal(2);
        const dossier1 : Dossier = dossiers[1];

        expect(dossier1.getId()).equal("d1");
        expect(dossier1.getTitre()).equal("Discussions générales");
        expect(dossier1.getSlug()).equal("discussions-generales");
        expect(dossier1.getDateCreation().toLocaleString()).equal("01/01/2024 10:00:00");
        expect(dossier1.getDescription()).equal("Espace pour discuter de tout et n'importe quoi");
        expect(dossier1.getUtilisateur().getUsername()).equal("admin");
    });
  });

  
  describe("recupererDossierParSlug", () => {
    it("Retourne les données complètes d'un dossier demandé", async () => {
        const dossier : Dossier = await dao.recupererDossierParSlug("aide-support");
        
        expect(dossier).toBeDefined();

        expect(dossier.getId()).equal("d2");
        expect(dossier.getTitre()).equal("Aide et Support");
        expect(dossier.getSlug()).equal("aide-support");
        expect(dossier.getDateCreation().toLocaleString()).equal("03/01/2024 12:00:00");
        expect(dossier.getDescription()).equal("Besoin d'aide ? Par ici alors !");
        expect(dossier.getUtilisateur().getUsername()).equal("testuser");
    });

    it("Erreur pour un dossier inexistant", async () => {
        await expect(dao.recupererDossierParSlug("dossier-inexistant"))
        .rejects.toThrow("Aucun dossier trouvé avec le slug fourni");
    })
  });

});