import { describe, it, expect, beforeAll } from 'vitest';
import { BlogDAOMySQL } from '@BlogsBack/DAO/Implementation/BlogDAOMySQL';
import { Blog } from '@BlogsShared/model/Blog';

// Fichier de tests unitaires sur la table Blogs
describe('BlogDAOMySQL.test - Méthodes GET', () => {
  let dao: BlogDAOMySQL;

  beforeAll(() => {
    dao = new BlogDAOMySQL();
  });

  describe("recupererBlogsDuDossier", () => {
    it("Retourne les blogs du dossier d1", async () => {
        const blogs : Blog[] = await dao.recupererBlogsDuDossier("discussions-generales");
        
        expect(blogs).toBeDefined();
        expect(blogs.length).equal(3);
        const blog3 : Blog = blogs[2];

        expect(blog3.getId()).equal("b1");
        expect(blog3.getNom()).equal("Bienvenue sur le forum");
        expect(blog3.getSlug()).equal("bienvenue-sur-le-forum");
        expect(blog3.getUtilisateur().getUsername()).equal("admin");
    });

    it("Retourne une erreur pour dossier vide ou inexistant", async () => {
        const blogs : Blog[] = await dao.recupererBlogsDuDossier("dossier-inexistant");
        
        expect(blogs).toBeDefined();
        expect(blogs.length).equal(0);
    });

  });

  describe("recupererBlogParSlug", () => {
    it("Retourne le blog correspondant à la paire d1/b2", async () => {
        const blog : Blog = await dao.recupererBlogParSlug("comment-creer-un-blog", "aide-support");

        expect(blog).toBeDefined();
        expect(blog.getId()).equal("b3");
        expect(blog.getNom()).equal("Comment créer un blog ?");
        expect(blog.getDateCreation().toISOString()).equal("2024-01-03T11:30:00.000Z");
        expect(blog.getUtilisateur().getUsername()).equal("testuser");
        expect(blog.getElementSupprime()).toBeNull();
    });

    
    it("Erreur pour un blog inexistant", async () => {
        await expect(dao.recupererBlogParSlug("blog-inexistant", "dossier-inexistant"))
        .rejects.toThrow("Impossible de récupérer le blog par slug");
    })
  });

});