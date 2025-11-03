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

  
  describe("recupererDossiersElementsSuppr", () => {
    it("Retourne les dossiers du projet dont celui supprimé mais pas caché", async () => {
        const dossiers : Dossier[] = await dao.recupererDossiersElementsSuppr();
        
        expect(dossiers).toBeDefined();
        expect(dossiers.length).equal(3);
        const dossier1 : Dossier = dossiers[0];

        expect(dossier1.getId()).equal("d3");
        expect(dossier1.getTitre()).equal("Dossier supprimé test");
        expect(dossier1.getSlug()).equal("dossier-supprime-test");
        expect(dossier1.getDateCreation().toLocaleString()).equal("08/04/2024 17:30:00");
        expect(dossier1.getDescription()).equal("Espace voué à être supprimé");
        expect(dossier1.getUtilisateur().getUsername()).equal("admin");

        expect(dossier1.getElementSupprime()).toBeDefined();
        expect(dossier1.getElementSupprime()?.getId()).equal(4);
        expect(dossier1.getElementSupprime()?.getUtilisateur().getUsername()).equal("admin");
        expect(dossier1.getElementSupprime()?.getRaisonSuppression()).equal("J'aime pas ce truc");
        expect(dossier1.getElementSupprime()?.getCache()).toBeFalsy();
        expect(dossier1.getElementSupprime()?.getDateSuppression().toLocaleString()).equal("30/04/2002 15:42:24");
    });
  });

  
  describe("recupererDossiersCaches", () => {
    it("Retourne les dossiers du projet dont ceux supprimés voire cachés", async () => {
        const dossiers : Dossier[] = await dao.recupererDossiersCaches();
        
        expect(dossiers).toBeDefined();
        expect(dossiers.length).equal(4);
        const dossier1 : Dossier = dossiers[2];

        expect(dossier1.getId()).equal("d4");
        expect(dossier1.getTitre()).equal("Dossier supprimé caché test");
        expect(dossier1.getSlug()).equal("dossier-supprime-cache-test");
        expect(dossier1.getDateCreation().toLocaleString()).equal("03/01/2024 12:00:00");
        expect(dossier1.getDescription()).equal("Espace de l'admin");
        expect(dossier1.getUtilisateur().getUsername()).equal("testuser");

        expect(dossier1.getElementSupprime()).toBeDefined();
        expect(dossier1.getElementSupprime()?.getId()).equal(5);
        expect(dossier1.getElementSupprime()?.getUtilisateur().getUsername()).equal("admin");
        expect(dossier1.getElementSupprime()?.getRaisonSuppression()).equal("Je garde ce dossier pour moi");
        expect(dossier1.getElementSupprime()?.getCache()).toBeTruthy();
        expect(dossier1.getElementSupprime()?.getDateSuppression().toLocaleString()).equal("20/01/2022 05:00:00");
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