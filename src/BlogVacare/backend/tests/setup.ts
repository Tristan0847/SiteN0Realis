import { beforeAll, afterAll, afterEach } from 'vitest';
import dotenv from 'dotenv';

// Variables d'environnement test
dotenv.config({ path: '.env.test' });

beforeAll(() => {
  console.log('Démarrage des tests');
});

afterAll(() => {
  console.log('✅ Tests terminés');
});

afterEach(() => {
});