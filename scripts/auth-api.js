(function initializeAuthApi() {
  const defaultEndpoints = {
    login: 'auth/login',
    register: 'auth/register',
  };

  let configuration = {
    baseUrl: window.AUTH_API_BASE_URL || '',
    endpoints: { ...defaultEndpoints },
  };

  class AuthApiError extends Error {
    constructor(message, status, code, cause) {
      super(message);
      this.name = 'AuthApiError';
      this.status = status;
      this.code = code;
      if (cause) this.cause = cause;
    }
  }

  function configure(options = {}) {
    const { baseUrl, endpoints } = options;

    if (baseUrl !== undefined) {
      if (typeof baseUrl !== 'string' || !baseUrl.trim()) {
        throw new TypeError('A URL base da API deve ser uma string não vazia.');
      }
      configuration.baseUrl = baseUrl.trim();
    }

    if (endpoints !== undefined) {
      if (!endpoints || typeof endpoints !== 'object' || Array.isArray(endpoints)) {
        throw new TypeError('Os endpoints da API devem ser informados como um objeto.');
      }

      configuration.endpoints = { ...configuration.endpoints, ...endpoints };
    }
  }

  function getEndpointUrl(endpoint) {
    if (!configuration.baseUrl) {
      throw new AuthApiError('Configure a URL base da API antes de fazer chamadas.');
    }
    if (typeof endpoint !== 'string' || !endpoint.trim()) {
      throw new AuthApiError('Configure um endpoint válido para a operação.');
    }

    let baseUrl;
    try {
      baseUrl = new URL(configuration.baseUrl, window.location.origin);
    } catch (cause) {
      throw new AuthApiError('A URL base da API não é válida.', undefined, undefined, cause);
    }

    if (baseUrl.protocol !== 'https:' && baseUrl.protocol !== 'http:') {
      throw new AuthApiError('A URL base da API deve usar HTTP ou HTTPS.');
    }

    return new URL(endpoint, baseUrl.href.endsWith('/') ? baseUrl.href : `${baseUrl.href}/`);
  }

  async function postJson(endpoint, payload, options = {}) {
    const url = getEndpointUrl(endpoint);
    let response;

    try {
      response = await window.fetch(url.href, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: options.signal,
      });
    } catch (cause) {
      if (cause && cause.name === 'AbortError') throw cause;
      throw new AuthApiError('Não foi possível conectar à API de autenticação.', undefined, undefined, cause);
    }

    let data = null;
    if (response.status !== 204) {
      try {
        data = await response.json();
      } catch (cause) {
        throw new AuthApiError('A API de autenticação retornou uma resposta inválida.', response.status, undefined, cause);
      }
    }

    if (!response.ok) {
      const message = data && typeof data.message === 'string'
        ? data.message
        : `A API de autenticação retornou HTTP ${response.status}.`;
      const code = data && typeof data.code === 'string' ? data.code : undefined;
      throw new AuthApiError(message, response.status, code);
    }

    return data;
  }

  window.AuthApi = Object.freeze({
    configure,
    login: (credentials, options) => postJson(configuration.endpoints.login, credentials, options),
    register: (user, options) => postJson(configuration.endpoints.register, user, options),
    AuthApiError,
  });
})();
