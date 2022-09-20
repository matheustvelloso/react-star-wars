/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_I18N_DEBBUG?: 'true' | 'false';
  readonly PACKAGE_VERSION: string;
  readonly VITE_STAR_WARS_API_BASE_URL?: string;
  readonly VITE_VIA_CEP_API_BASE_URL?: string;
  // add more env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
