import { describe, it, expect, beforeAll } from 'vitest';
import { ElementSupprimeDAOMySQL } from '@BlogsBack/DAO/Implementation/ElementSupprimeDAOMySQL';
import { ElementSupprime } from '@BlogsShared/model/ElementSupprime';

// Fichier de tests unitaires sur la table Messages
describe('ElementSupprimeDAOMySQL.test - Méthodes GET', () => {
  let dao: ElementSupprimeDAOMySQL;

  beforeAll(() => {
    dao = new ElementSupprimeDAOMySQL();
  });

  describe("recupererElementSupprime", () => {
    it("Récupération d'un élément supprimé dont l'id est donné", async () => {
        const element : ElementSupprime = await dao.recupererElementSupprime(1);

        expect(element).toBeDefined();
        expect(element.getUtilisateur().getUsername()).equal("admin");
        expect(element.getRaisonSuppression()).equal("Contenu inapproprié");
        expect(element.getDateSuppression().toLocaleString()).equal("04/01/2024 10:00:00");
        expect(element.getCache()).toBeFalsy();
    });

    
    it("Récupération d'un élément supprimé dont l'id est inexistant", async () => {
        await expect(dao.recupererElementSupprime(847)).rejects
        .toThrow("Aucun élément supprimé trouvé avec l'identifiant fourni");

    });

  })



});
