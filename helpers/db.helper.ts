import { ApiHelper } from './api.helper';

/**
 * DbHelper — helpers para setup e teardown de dados de teste via Hasura.
 *
 * Encapsula operações comuns de banco para os testes:
 * - Criar/remover dados de teste
 * - Resetar estado entre testes
 * - Seed de dados parametrizados
 */

export class DbHelper {
    private readonly api: ApiHelper;

    constructor(api?: ApiHelper) {
        this.api = api || new ApiHelper();
    }

    /**
     * Seed de dados para um cenário de teste específico.
     */
    async seedScenario(scenarioName: string, data: Record<string, any>): Promise<void> {
        console.log(`[DbHelper] Seeding scenario: ${scenarioName}`);

        const mutation = `
      mutation SeedData($objects: [${scenarioName}_insert_input!]!) {
        insert_${scenarioName}(objects: $objects) {
          affected_rows
        }
      }
    `;

        await this.api.mutate(mutation, { objects: Array.isArray(data) ? data : [data] });
    }

    /**
     * Limpa todos os dados de teste de uma tabela.
     */
    async cleanTable(tableName: string, whereClause?: string): Promise<void> {
        console.log(`[DbHelper] Cleaning table: ${tableName}`);

        const where = whereClause || '{ _and: [] }';
        const mutation = `
      mutation CleanTable {
        delete_${tableName}(where: ${where}) {
          affected_rows
        }
      }
    `;

        await this.api.mutate(mutation);
    }

    /**
     * Verifica se um registro existe.
     */
    async recordExists(tableName: string, field: string, value: string): Promise<boolean> {
        const query = `
      query CheckRecord($value: String!) {
        ${tableName}(where: { ${field}: { _eq: $value } }) {
          id
        }
      }
    `;

        const result = await this.api.query(query, { value });
        return (result.data?.[tableName]?.length ?? 0) > 0;
    }
}

export const dbHelper = new DbHelper();
