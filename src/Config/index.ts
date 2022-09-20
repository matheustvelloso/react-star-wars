const Config = {
  api: {
    baseURL: import.meta.env.VITE_STAR_WARS_API_BASE_URL,
    viaCepBaseURL: import.meta.env.VITE_VIA_CEP_API_BASE_URL,
  },

  app: {
    name: import.meta.env.VITE_APP_NAME,
    version: import.meta.env.PACKAGE_VERSION,
  },
  i18n: {
    debbug: JSON.parse(
      (import.meta.env.VITE_I18N_DEBBUG ?? 'false').toLocaleLowerCase(),
      // Converts 'true' to true and 'false' to false
    ),
  },
};

export default Config;
