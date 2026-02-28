import { faker } from '@faker-js/faker/locale/pt_BR';

/**
 * Gera um CPF válido com dígitos verificadores corretos.
 */
export function generateValidCPF(): string {
  const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += digits[i] * (10 - i);
  let v1 = 11 - (sum % 11);
  if (v1 >= 10) v1 = 0;
  digits.push(v1);

  sum = 0;
  for (let i = 0; i < 10; i++) sum += digits[i] * (11 - i);
  let v2 = 11 - (sum % 11);
  if (v2 >= 10) v2 = 0;
  digits.push(v2);

  return digits.join('');
}

/**
 * Gera e-mail dinâmico no padrão QA Fluencypass.
 * Formato: felipe.test.play{DD}{MM}{HH}{mm}{YYYY}@fluencypass.com
 * Exemplo às 13:32 de 27/02/2026 → felipe.test.play2702133220260@fluencypass.com
 */
export function generateTestEmail(): string {
  const now  = new Date();
  const dd   = String(now.getDate()).padStart(2, '0');
  const mm   = String(now.getMonth() + 1).padStart(2, '0');
  const HH   = String(now.getHours()).padStart(2, '0');
  const min  = String(now.getMinutes()).padStart(2, '0');
  const yyyy = now.getFullYear();
  return `felipe.test.play${dd}${mm}${HH}${min}${yyyy}@fluencypass.com`;
}

/**
 * Gera dados completos para o checkout.
 * phone: apenas 9 dígitos — o campo do formulário já exibe +55 e DDD fixo
 */
export function generateCheckoutData() {
  const now  = new Date();
  const dd   = String(now.getDate()).padStart(2, '0');
  const mm   = String(now.getMonth() + 1).padStart(2, '0');
  const HH   = String(now.getHours()).padStart(2, '0');
  const min  = String(now.getMinutes()).padStart(2, '0');
  const yyyy = now.getFullYear();

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    fullName   : `${firstName} ${lastName}`,
    email      : `felipe.test.play${dd}${mm}${HH}${min}${yyyy}@fluencypass.com`, 
    phone      : `119${faker.string.numeric(8)}`,   // 11 dígitos (DDD 11 + 9 obrigatório + 8 random)
    cpf        : generateValidCPF(),
    cep        : '01310100',                       // CEP Av. Paulista - válido
    number     : String(faker.number.int({ min: 100, max: 9999 })),
    complement : `Sala ${faker.number.int({ min: 1, max: 99 })}`,
    cardNumber : '5555555555554444',
    cardName   : '',    // preenchido com fullName.toUpperCase() no teste
    cardExpiry : '1230',
    cardCVV    : '123',
    birthDate  : '14/02/1999', // Default DoB format with slashes
    password   : 'Teste@123',
  };
}
