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
        expect(blogs.length).equal(2);
        const blog3 : Blog = blogs[1];

        expect(blog3.getId()).equal("b1");
        expect(blog3.getNom()).equal("Bienvenue sur le forum");
        expect(blog3.getSlug()).equal("bienvenue-sur-le-forum");
        expect(blog3.getDateCreation().toLocaleString()).equal("01/01/2024 10:30:00");
        expect(blog3.getUtilisateur().getUsername()).equal("admin");
    });

    it("Retourne une erreur pour dossier vide ou inexistant", async () => {
        const blogs : Blog[] = await dao.recupererBlogsDuDossier("dossier-inexistant");
        
        expect(blogs).toBeDefined();
        expect(blogs.length).equal(0);
    });

  });
  
  describe("recupererBlogsDuDossierElementsSuppr", () => {
    it("Retourne les blogs du dossier d1 dont l'élément supprimé", async () => {
        const blogs : Blog[] = await dao.recupererBlogsDuDossierElementsSuppr("discussions-generales");;
        expect(blogs).toBeDefined();
        expect(blogs.length).equal(3);
        console.log(blogs);
        const blog3 : Blog = blogs[0];

        expect(blog3.getId()).equal("b5");
        expect(blog3.getNom()).equal("Blog supprimé test");
        expect(blog3.getSlug()).equal("blog-supprime-test");
        expect(blog3.getUtilisateur().getUsername()).equal("testuser");

        expect(blog3.getElementSupprime()).toBeDefined();
        expect(blog3.getElementSupprime()?.getId()).equal(1);
        expect(blog3.getElementSupprime()?.getUtilisateur().getUsername()).equal("admin");
        expect(blog3.getElementSupprime()?.getRaisonSuppression()).equal("Contenu inapproprié");
        expect(blog3.getElementSupprime()?.getCache()).toBeFalsy();
        expect(blog3.getElementSupprime()?.getDateSuppression().toLocaleString()).equal("04/01/2024 10:00:00");
    });

    it("Retourne une erreur pour dossier vide ou inexistant", async () => {
        const blogs : Blog[] = await dao.recupererBlogsDuDossier("dossier-inexistant");
        
        expect(blogs).toBeDefined();
        expect(blogs.length).equal(0);
    });

  });

  describe("recupererBlogsDuDossierCache", () => {
    it("Retourne les blogs du dossier d1 dont l'élément supprimé caché", async () => {
        const blogs : Blog[] = await dao.recupererBlogsDuDossierCache("discussions-generales");;
        expect(blogs).toBeDefined();
        expect(blogs.length).equal(4);
        const blog3 : Blog = blogs[3];

        expect(blog3.getId()).equal("b6");
        expect(blog3.getNom()).equal("Blog supprimé caché test");
        expect(blog3.getSlug()).equal("blog-supprime-cache-test");
        expect(blog3.getUtilisateur().getUsername()).equal("testuser");

        expect(blog3.getElementSupprime()).toBeDefined();
        expect(blog3.getElementSupprime()?.getId()).equal(3);
        expect(blog3.getElementSupprime()?.getUtilisateur().getUsername()).equal("admin");
        expect(blog3.getElementSupprime()?.getRaisonSuppression()).equal("Pour le fun");
        expect(blog3.getElementSupprime()?.getCache()).toBeTruthy();
        expect(blog3.getElementSupprime()?.getDateSuppression().toLocaleString()).equal("07/05/2021 14:08:00");
    });

    it("Retourne une erreur pour dossier vide ou inexistant", async () => {
        const blogs : Blog[] = await dao.recupererBlogsDuDossierElementsSuppr("dossier-inexistant");
        
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