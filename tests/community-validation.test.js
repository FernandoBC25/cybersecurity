const test = require('node:test');
const assert = require('node:assert/strict');
const validation = require('../scripts/community-validation.js');

function validCpfFromBase(base) {
  const calculateDigit = (digits) => {
    const sum = digits.split('').reduce((total, digit, index) => total + Number(digit) * (digits.length + 1 - index), 0);
    const remainder = (sum * 10) % 11;
    return String(remainder === 10 ? 0 : remainder);
  };
  const firstDigit = calculateDigit(base);
  return `${base}${firstDigit}${calculateDigit(`${base}${firstDigit}`)}`;
}

test('accepts normal text and rejects empty or invisible-only content', () => {
  assert.equal(validation.validateText('Uma contribuição útil.', 5000), '');
  assert.match(validation.validateText(' \n\u200b\u2060 ', 1000), /Escreva uma mensagem/);
});

test('blocks configured offensive terms without matching inside unrelated words', () => {
  assert.match(validation.validateText('Você é um IDIOTA!', 1000), /não é permitida/);
  assert.match(validation.validateText('FILHO   DA   PUTA', 1000), /não é permitida/);
  assert.match(validation.validateText('i d i o t a', 1000), /não é permitida/);
  assert.equal(validation.validateText('A palavra idiotal não deve ser bloqueada.', 1000), '');
});

test('enforces character limits', () => {
  assert.equal(validation.validateText('a'.repeat(5000), 5000), '');
  assert.match(validation.validateText('a'.repeat(5001), 5000), /limite é de 5\.000 caracteres/);
});

test('detects valid CPF values and avoids invalid numeric sequences', () => {
  const cpf = validCpfFromBase('987654321');
  assert.equal(validation.detectPersonalData(`CPF: ${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`).cpf, true);
  assert.equal(validation.detectPersonalData(`CPF: ${cpf}`).cpf, true);
  assert.equal(validation.detectPersonalData('Número: 123.456.789-00').cpf, false);
});

test('detects Brazilian phone numbers and email addresses', () => {
  assert.equal(validation.detectPersonalData('Ligue +55 (11) 98765-4321').telefone, true);
  assert.equal(validation.detectPersonalData('Telefone 98765-4321').telefone, true);
  assert.equal(validation.detectPersonalData('Sequência 12345678').telefone, false);
  assert.equal(validation.detectPersonalData('Contato: pessoa.exemplo+1@dominio.com.br').email, true);
});

test('recognizes JPEG, PNG and WebP file signatures, rejecting unrelated files', () => {
  assert.equal(validation.imageTypeFromBytes([0xff, 0xd8, 0xff, 0x00]), 'image/jpeg');
  assert.equal(validation.imageTypeFromBytes([137, 80, 78, 71, 13, 10, 26, 10]), 'image/png');
  assert.equal(validation.imageTypeFromBytes([82, 73, 70, 70, 0, 0, 0, 0, 87, 69, 66, 80]), 'image/webp');
  assert.equal(validation.imageTypeFromBytes([0x4d, 0x5a, 0x00, 0x00]), '');
});

test('normalizes repeated-content signatures without retaining the message text', () => {
  assert.equal(validation.contentSignature('Olá   Comunidade!'), validation.contentSignature(' olá comunidade! '));
  assert.notEqual(validation.contentSignature('Olá Comunidade!'), validation.contentSignature('Olá, Comunidade!'));
});
