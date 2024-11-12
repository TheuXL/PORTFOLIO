module.exports = {
  preset: 'ts-jest',                    // Usa o preset ts-jest para transpilar TypeScript
  testEnvironment: 'node',              // Define o ambiente de teste como Node.js
  moduleFileExtensions: ['ts', 'js'],   // Permite a importação de arquivos .ts e .js
  testMatch: ['**/__tests__/**/*.test.ts'],  // Define a localização dos arquivos de teste (todos os arquivos .test.ts dentro da pasta __tests__)
  coverageDirectory: 'coverage',        // Diretório onde os relatórios de cobertura de testes serão gerados
  clearMocks: true,                     // Limpa os mocks entre os testes para evitar interferências
  transform: {
    '^.+\\.ts$': 'ts-jest',             // Transforma arquivos .ts com ts-jest
  },
  collectCoverageFrom: [
    'src/**/*.{ts,js}',                 // Coleta a cobertura de todos os arquivos .ts e .js da pasta src
    '!src/**/*.d.ts',                   // Exclui arquivos de definição (.d.ts) da cobertura
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,             // Melhor performance para testes com TypeScript, sem necessidade de compilar todo o projeto
    },
  },
};
