import { describe, it, expect, beforeAll } from 'vitest';
import { UtilisateurDAOMySQL } from '@BlogsBack/DAO/Implementation/UtilisateurDAOMySQL';

// Fichier de tests unitaires sur la table Utilisateurs
describe('UtilisateurDAOMySQL - Méthodes GET', () => {
  let dao: UtilisateurDAOMySQL;

  beforeAll(() => {
    dao = new UtilisateurDAOMySQL();
  });

  describe('getMotDePasse', () => {
    it('Retourne le mot de passe haché d\'un utilisateur existant', async () => {
      const utilisateur = await dao.getMotDePasse('testuser');

      // L'utilisateur n'est pas null
      expect(utilisateur).toBeDefined();
      // Il a pour pseudo "testuser"
      expect(utilisateur.getUsername()).toBe('testuser');
      // Mot de passe défini
      expect(utilisateur.getMotDePasse()).toBeTruthy();
    });

    it('Lance une erreur pour utilisateur inexistant', async () => {
      await expect(dao.getMotDePasse('utilisateur_inexistant'))
        .rejects
        .toThrow('Erreur lors de la récupération du mot de passe haché');
    });
  });

  describe('getRole', () => {
    it('estAdmin=false pour testuser', async () => {
      const utilisateur = await dao.getRole('testuser');

      // On vérifie que testuser n'est pas admin
      expect(utilisateur.getUsername()).toBe('testuser');
      expect(utilisateur.getEstAdmin()).toBe(false);
    });

    it('estAdmin=true pour admin', async () => {
      const utilisateur = await dao.getRole('admin');

      expect(utilisateur.getUsername()).toBe('admin');
      expect(utilisateur.getEstAdmin()).toBe(true);
    });

    it('Lance une erreur pour un utilisateur inexistant', async () => {
      // ACT & ASSERT
      await expect(dao.getRole('utilisateur_qui_existe_pas'))
        .rejects
        .toThrow('Erreur lors de la récupération du rôle');
    });
  });
});