import { describe, it, expect, beforeAll } from 'vitest';
import { MessageDAOMySQL } from '@BlogsBack/DAO/Implementation/MessageDAOMySQL';
import { Message } from '@BlogsShared/model/Message';

// Fichier de tests unitaires sur la table Messages
describe('MessageDAOMySQL.test - Méthodes GET', () => {
  let dao: MessageDAOMySQL;

  beforeAll(() => {
    dao = new MessageDAOMySQL();
  });

  describe("recupererMessages", () => {
    it("Retourne les messages d'un blog donné", async () => {
        const messages : Message[] = await dao.recupererMessages("b3");

        expect(messages).toBeDefined();
        expect(messages.length).equal(3);
        const message1 : Message = messages[0];

        expect(message1.getContenu()).equal("Bonjour, quelqu'un peut m'expliquer comment créer un nouveau blog ?");
        expect(message1.getDate().toLocaleString()).equal("03/01/2024 12:35:00");
        expect(message1.getUtilisateur().getUsername()).equal("testuser");
        expect(message1.getElementSupprime()).toBeNull();
    });

    it("Erreur si on entre un blog inexistant", async () => {
        await expect(dao.recupererMessages("b0847"))
        .rejects.toThrow("Blog vide");
    });
  });

  describe("recupererPremierMessage", () => {
    it("Retourne le premier message d'un blog donné", async () => {
        const message : Message = await dao.recupererPremierMessage("b2");

        expect(message).toBeDefined();
        
        expect(message.getContenu()).equal("Salut ! Je m'appelle TestUser et je suis employé chez N0Realis.");
        expect(message.getDate().toLocaleString()).equal("01/01/2024 11:05:00");
        expect(message.getUtilisateur().getUsername()).equal("testuser");
        expect(message.getElementSupprime()).toBeNull();
    });

    
    it("Erreur si on entre un blog inexistant", async () => {
        await expect(dao.recupererPremierMessage("b0847"))
        .rejects.toThrow("Aucun message trouvé");
    });
  });

});