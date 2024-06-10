export const config =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? {
        apiUrl: "https://api.innercircleprints.com/api",
        oAuthUrl: "https://api.innercircleprints.com",
      }
    : {
        // apiUrl: "https://api.innercircleprints.com/api",
        // oAuthUrl: "https://api.innercircleprints.com",

        apiUrl: "https://stagingapi.innercircleprints.com/api",
        oAuthUrl: "https://stagingapi.innercircleprints.com",
      };
