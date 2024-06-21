import * as dotenv from 'dotenv';
dotenv.config();

const configuration = () => {
  if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
    throw Error('Missing Env: JWT_ACCESS_TOKEN_SECRET');
  }
  if (!process.env.JWT_ACCESS_TOKEN_EXPIRES) {
    throw Error('Missing Env: JWT_ACCESS_TOKEN_EXPIRES');
  }
  if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
    throw Error('Missing Env: JWT_REFRESH_TOKEN_SECRET');
  }
  if (!process.env.JWT_REFRESH_TOKEN_EXPIRES) {
    throw Error('Missing Env: JWT_REFRESH_TOKEN_EXPIRES');
  }
  if (!process.env.JWT_VERIFICATION_TOKEN_EXPIRES) {
    throw Error('Missing Env: JWT_VERIFICATION_TOKEN_EXPIRES');
  }
  if (!process.env.JWT_VERIFICATION_TOKEN_SECRET) {
    throw Error('Missing Env: JWT_VERIFICATION_TOKEN_SECRET');
  }

  return {
    isDev: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    admin: {
      password: process.env.TEAM_SUPER_ADMIN_PASSWORD,
    },
    web: {
      app_url: process.env.APP_URL, // suffix with token
      admin_url: process.env.ADMIN_URL,
    },
    server: {
      port: parseInt(process.env.PORT, 10) || 9090,
    },
    database: {
      sql: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
    },
    wallet: {
      secret_key: process.env.WALLET_SECRET,
    },
    jwt: {
      access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      access_token_expires: process.env.JWT_ACCESS_TOKEN_EXPIRES,
      verification_token_secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      verification_token_expires: process.env.JWT_VERIFICATION_TOKEN_EXPIRES,
      refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      refresh_token_expires: process.env.JWT_REFRESH_TOKEN_EXPIRES,
    },
    AWS: {
      REGION: process.env.AWS_REGION,
      ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      ACCESS_KEY_SECRET: process.env.AWS_ACCESS_KEY_SECRET,
      SES_SENDER_NAME: process.env.AWS_SENDER_NAME,
      SES_SOURCE_EMAIL: process.env.AWS_SENDER_EMAIL,
    },
    google: {
      OAUTH_GOOGLE_ID: process.env.OAUTH_GOOGLE_ID,
      OAUTH_GOOGLE_SECRET: process.env.OAUTH_GOOGLE_SECRET,
      OAUTH_GOOGLE_REDIRECT_URL: process.env.OAUTH_GOOGLE_REDIRECT_URL,
    },
    facebook: {
      OAUTH_FACEBOOK_ID: process.env.OAUTH_FACEBOOK_ID,
      OAUTH_FACEBOOK_SECRET: process.env.OAUTH_FACEBOOK_SECRET,
      OAUTH_FACEBOOK_REDIRECT_URL: process.env.OAUTH_FACEBOOK_REDIRECT_URL,
    },
    linkedin: {
      OAUTH_LINKEDIN_ID: process.env.OAUTH_LINKEDIN_ID,
      OAUTH_LINKEDIN_SECRET: process.env.OAUTH_LINKEDIN_SECRET,
      OAUTH_LINKEDIN_REDIRECT_URL: process.env.OAUTH_LINKEDIN_REDIRECT_URL,
    },
    twitter: {
      OAUTH_TWITTER_ID: process.env.OAUTH_TWITTER_ID,
      OAUTH_TWITTER_SECRET: process.env.OAUTH_TWITTER_SECRET,
      OAUTH_TWITTER_REDIRECT_URL: process.env.OAUTH_TWITTER_REDIRECT_URL,
    },
    session: {
      secret: process.env.SESSION_SECRET,
      maxAge: parseInt(process.env.SESSION_MAX_AGE, 10),
    },
    slack: {
      secret: process.env.SLACK_SIGNING_KEY,
      token: process.env.SLACK_BOT_TOKEN,
    },
    providus: {
      is_live: process.env.PROVIDUS_IS_LIVE === 'true',
      clientId: process.env.PROVIDUS_CLIENT_ID,
      clientSecret: process.env.PROVIDUS_CLIENT_SECRET,
      baseUrl: process.env.PROVIDUS_BASE_URL,
      authSignature: process.env.PROVIDUS_AUTH_SIGNATURE,
    },
  };
};

export default configuration;
