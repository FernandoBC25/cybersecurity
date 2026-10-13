(function (root) {
  const blockedTerms = [
    'arrombado', 'arrombada', 'babaca', 'bosta', 'burro', 'burra',
    'cabrão', 'caralho', 'desgraçado', 'desgraçada', 'filho da puta', 'idiota',
    'imbecil', 'merda', 'otário', 'otária', 'porra', 'puta',
    'puto', 'fdp', 'foda-se'
  ].map((term) => normalizeText(term));

  function normalizeText(value) {
    return String(value ?? '')
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .replace(/\p{Cf}/gu, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function validateText(text, limit) {
    const normalized = normalizeText(text);
    if (!normalized) return 'Escreva uma mensagem antes de enviar.';
    if (Array.from(String(text)).length > limit) {
      return `O limite é de ${limit.toLocaleString('pt-BR')} caracteres.`;
    }

    const hasBlockedTerm = blockedTerms.some((term) => {
      const phrase = term.trim()
        .split(/[\s-]+/)
        .map((word) => Array.from(word).map(escapeRegExp).join('\\s*'))
        .join('[\\s-]+');
      return new RegExp(`(^|[^\\p{L}\\p{N}])${phrase}(?=$|[^\\p{L}\\p{N}])`, 'u').test(normalized);
    });
    return hasBlockedTerm
      ? 'Este conteúdo contém uma palavra ou expressão que não é permitida. Revise o texto e tente novamente.'
      : '';
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function isValidCpf(value) {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
    const checkDigit = (length) => {
      const sum = digits.slice(0, length).split('').reduce(
        (total, digit, index) => total + Number(digit) * (length + 1 - index),
        0
      );
      const remainder = (sum * 10) % 11;
      return remainder === 10 ? 0 : remainder;
    };
    return checkDigit(9) === Number(digits[9]) && checkDigit(10) === Number(digits[10]);
  }

  function findCpfMatches(text) {
    const matches = [];
    const expression = /(?:^|[^\d])(\d{3}\.?\d{3}\.?\d{3}-?\d{2})(?!\d)/g;
    let match;
    while ((match = expression.exec(text))) {
      const value = match[1];
      if (isValidCpf(value)) matches.push({ start: match.index + match[0].indexOf(value), end: match.index + match[0].indexOf(value) + value.length });
    }
    return matches;
  }

  function findPhoneMatches(text, cpfMatches) {
    const matches = [];
    const expression = /(?<!\d)(?:\+?55[\s.-]*)?(?:\(?[1-9]\d\)?[\s.-]*)?(?:9\d{4}|[2-5]\d{3})[\s.-]?\d{4}(?!\d)/g;
    let match;
    while ((match = expression.exec(text))) {
      const digits = match[0].replace(/\D/g, '');
      const localDigits = digits.startsWith('55') && (digits.length === 12 || digits.length === 13)
        ? digits.slice(4)
        : digits.length === 10 || digits.length === 11
          ? digits.slice(2)
          : digits;
      const hasDdd = digits.length === 10 || digits.length === 11 || digits.length === 12 || digits.length === 13;
      const ddd = hasDdd ? Number(digits.slice(digits.startsWith('55') && digits.length > 11 ? 2 : 0, digits.startsWith('55') && digits.length > 11 ? 4 : 2)) : 0;
      const validLocal = (localDigits.length === 8 && /^[2-5]/.test(localDigits))
        || (localDigits.length === 9 && /^9[6-9]/.test(localDigits));
      const start = match.index;
      const end = start + match[0].length;
      const overlapsCpf = cpfMatches.some((cpf) => start < cpf.end && end > cpf.start);
      if (validLocal && (!hasDdd || (ddd >= 11 && ddd <= 99)) && !overlapsCpf) {
        matches.push({ start, end });
      }
    }
    return matches;
  }

  function detectPersonalData(text) {
    const cpfMatches = findCpfMatches(text);
    const emails = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi.test(text);
    const phones = findPhoneMatches(text, cpfMatches).length > 0;
    return {
      cpf: cpfMatches.length > 0,
      telefone: phones,
      email: emails
    };
  }

  function imageTypeFromBytes(value) {
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
    if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
    if (bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte)) return 'image/png';
    if (bytes.length >= 12
      && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF'
      && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP') return 'image/webp';
    return '';
  }

  function contentSignature(text) {
    let hash = 2166136261;
    const normalized = normalizeText(text);
    for (let index = 0; index < normalized.length; index += 1) {
      hash ^= normalized.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16);
  }

  const validation = { normalizeText, validateText, detectPersonalData, imageTypeFromBytes, contentSignature };
  root.CommunityValidation = validation;
  if (typeof module !== 'undefined' && module.exports) module.exports = validation;
})(typeof window !== 'undefined' ? window : globalThis);
