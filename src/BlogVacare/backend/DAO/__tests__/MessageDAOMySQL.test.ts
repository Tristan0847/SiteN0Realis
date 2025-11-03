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
    
    it("Retourne les messages d'un blog avec messages supprimés", async () => {
        const messages : Message[] = await dao.recupererMessages("b1");

        expect(messages).toBeDefined();
        expect(messages.length).equal(2);
        const message1 : Message = messages[0];

        expect(message1.getContenu()).equal("Bienvenue à tous sur ce nouveau forum ! N'hésitez pas à vous présenter et à poser vos questions.");
        expect(message1.getDate().toLocaleString()).equal("01/01/2024 10:31:00");
        expect(message1.getUtilisateur().getUsername()).equal("admin");
        expect(message1.getElementSupprime()).toBeNull();
    });


    it("Erreur si on entre un blog inexistant", async () => {
        await expect(dao.recupererMessages("b0847"))
        .rejects.toThrow("Blog vide");
    });
  });

  
  describe("recupererMessagesElementsSuppr", () => {
    it("Retourne les messages d'un blog donné avec ses messages supprimés", async () => {
        const messages : Message[] = await dao.recupererMessagesElementsSuppr("b1");

        expect(messages).toBeDefined();
        expect(messages.length).equal(3);
        const message1 : Message = messages[2];

        expect(message1.getContenu()).equal("Ceci est un message supprimé dans un blog normal.");
        expect(message1.getDate().toLocaleString()).equal("04/01/2024 09:55:00");
        expect(message1.getUtilisateur().getUsername()).equal("testuser");

        expect(message1.getElementSupprime()).toBeDefined();
        expect(message1.getElementSupprime()?.getId()).equal(6);
        expect(message1.getElementSupprime()?.getUtilisateur().getUsername()).equal("admin");
        expect(message1.getElementSupprime()?.getRaisonSuppression()).equal("Test suppression");
        expect(message1.getElementSupprime()?.getCache()).toBeFalsy();
        expect(message1.getElementSupprime()?.getDateSuppression().toLocaleString()).equal("30/04/2025 15:42:24");        
    });

    it("Erreur si on entre un blog inexistant", async () => {
        await expect(dao.recupererMessages("b0847"))
        .rejects.toThrow("Blog vide");
    });
  });

  
  
  describe("recupererMessagesCaches", () => {
    it("Retourne les messages d'un blog donné avec ses messages supprimés", async () => {
        const messages : Message[] = await dao.recupererMessagesCaches("b1");

        expect(messages).toBeDefined();
        expect(messages.length).equal(5);
        const message1 : Message = messages[2];

        expect(message1.getContenu()).equal("Ceci est un message caché dans un blog normal.");
        expect(message1.getDate().toLocaleString()).equal("04/01/2024 09:45:00");
        expect(message1.getUtilisateur().getUsername()).equal("admin");

        expect(message1.getElementSupprime()).toBeDefined();
        expect(message1.getElementSupprime()?.getId()).equal(7);
        expect(message1.getElementSupprime()?.getUtilisateur().getUsername()).equal("admin");
        expect(message1.getElementSupprime()?.getRaisonSuppression()).equal("Cache les preuves");
        expect(message1.getElementSupprime()?.getCache()).toBeTruthy();
        expect(message1.getElementSupprime()?.getDateSuppression().toLocaleString()).equal("20/01/2025 05:00:00");        
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