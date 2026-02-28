import { test, expect } from '@playwright/test';
import { apiHelper } from '@helpers/api.helper';

/**
 * API Health Check Tests
 *
 * Testes de API para verificar a saúde dos endpoints Hasura/GraphQL.
 * Não requerem browser — rodam diretamente via fetch.
 */

test.describe('API Health Check', () => {
    test('deve retornar status 200 da API GraphQL', async ({ request }) => {
        // Arrange
        const apiUrl = process.env.API_URL || 'http://localhost:8080/v1/graphql';

        // Act
        const response = await request.post(apiUrl, {
            data: {
                query: '{ __typename }',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Assert
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.data).toBeDefined();
    });

    test('deve rejeitar requests sem autenticação em endpoints protegidos', async ({ request }) => {
        // Arrange
        const apiUrl = process.env.API_URL || 'http://localhost:8080/v1/graphql';

        // Act
        const response = await request.post(apiUrl, {
            data: {
                query: '{ users { id email } }',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Assert — deve retornar erro de autenticação
        const body = await response.json();
        expect(body.errors).toBeDefined();
    });
});
