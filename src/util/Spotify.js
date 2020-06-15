const clientId = "ddfb9073852b480a842886f8d1a98657";
const redirectUri = "http://localhost:3000";
let userAccessToken;

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }

    // check for user access token match
    const userAccessTokenMatch = window.location.href.match(
      /access_token=([^&]*)/
    );
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (userAccessTokenMatch && expiresInMatch) {
      userAccessToken = userAccessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // This clears the parameters, allowing us to grab a new user access token when it expires.
      window.setTimeout(() => (userAccessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return userAccessToken;
    } else {
      const accessUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUri;
    }
  },
};

export default Spotify;
