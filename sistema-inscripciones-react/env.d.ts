declare namespace NodeJS {
  interface ProcessEnv {
    RESEND_API_KEY: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;

    EMAIL_DOMAIN: string;

    BACKEND_URL: string;

    NEXTAUTH_SECRET: string;
  }
}
