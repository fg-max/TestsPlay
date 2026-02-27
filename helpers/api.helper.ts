import dotenv from 'dotenv';
dotenv.config();

/**
 * ApiHelper — wrapper para chamadas à API Hasura GraphQL.
 *
 * Usado para:
 * - Setup de dados de teste (Arrange)
 * - Cleanup após testes
 * - Validação de dados no backend (Assert)
 */

interface GraphQLResponse<T = any> {
    data?: T;
    errors?: Array<{
        message: string;
        extensions?: Record<string, any>;
    }>;
}

interface ApiHelperConfig {
    apiUrl: string;
    adminSecret: string;
}

export class ApiHelper {
    private readonly apiUrl: string;
    private readonly adminSecret: string;

    constructor(config?: Partial<ApiHelperConfig>) {
        this.apiUrl = config?.apiUrl || process.env.API_URL || 'http://localhost:8080/v1/graphql';
        this.adminSecret = config?.adminSecret || process.env.HASURA_ADMIN_SECRET || '';
    }

    /**
     * Executa uma query/mutation GraphQL no Hasura.
     */
    async query<T = any>(
        queryString: string,
        variables: Record<string, any> = {}
    ): Promise<GraphQLResponse<T>> {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': this.adminSecret,
            },
            body: JSON.stringify({
                query: queryString,
                variables,
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        return response.json() as Promise<GraphQLResponse<T>>;
    }

    /**
     * Executa uma mutation GraphQL.
     * Alias semântico para query() — ambos usam o mesmo endpoint.
     */
    async mutate<T = any>(
        mutation: string,
        variables: Record<string, any> = {}
    ): Promise<GraphQLResponse<T>> {
        return this.query<T>(mutation, variables);
    }

    // ─── Helpers de Setup de Dados ─────────────────────────

    /**
     * Insere um usuário de teste via Hasura.
     */
    async createTestUser(userData: {
        email: string;
        name: string;
        role?: string;
    }): Promise<GraphQLResponse> {
        const mutation = `
      mutation CreateTestUser($email: String!, $name: String!, $role: String) {
        insert_users_one(object: { email: $email, name: $name, role: $role }) {
          id
          email
          name
        }
      }
    `;
        return this.mutate(mutation, userData);
    }

    /**
     * Remove dados de teste por email.
     */
    async cleanupTestUser(email: string): Promise<GraphQLResponse> {
        const mutation = `
      mutation DeleteTestUser($email: String!) {
        delete_users(where: { email: { _eq: $email } }) {
          affected_rows
        }
      }
    `;
        return this.mutate(mutation, { email });
    }
}

// Instância singleton para uso rápido
export const apiHelper = new ApiHelper();
