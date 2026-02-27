/**
 * DateHelper — utilitários de data para testes.
 *
 * Centraliza formatação e manipulação de datas
 * para evitar inconsistências nos testes.
 */

export class DateHelper {
    /**
     * Retorna a data atual no formato ISO (YYYY-MM-DD).
     */
    static today(): string {
        return new Date().toISOString().split('T')[0];
    }

    /**
     * Retorna uma data futura a N dias de hoje.
     */
    static futureDate(daysFromNow: number): string {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0];
    }

    /**
     * Retorna uma data passada a N dias de hoje.
     */
    static pastDate(daysAgo: number): string {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString().split('T')[0];
    }

    /**
     * Formata para pt-BR (DD/MM/YYYY).
     */
    static formatBR(dateStr: string): string {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    }

    /**
     * Retorna timestamp atual em milissegundos.
     * Útil para gerar IDs únicos em dados de teste.
     */
    static timestamp(): number {
        return Date.now();
    }

    /**
     * Gera um sufixo único baseado em timestamp.
     * Ex: "test-1709050800000"
     */
    static uniqueSuffix(prefix: string = 'test'): string {
        return `${prefix}-${Date.now()}`;
    }
}
