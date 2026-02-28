/**
 * Factory de dados para Usuários de Teste.
 * Isola credenciais e massas de dados dos specs
 */
export const userFactory = {
    validUser: () => ({
        email: process.env.TEST_USER_EMAIL || 'qa@example.com',
        password: process.env.TEST_USER_PASSWORD || 'password123',
    }),
    invalidUser: () => ({
        email: 'invalid@example.com',
        password: 'wrong-password',
    }),
};
