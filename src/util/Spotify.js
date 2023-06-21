let accessToken = "";
let expirationTime;
const clientId = "7cee5cc40f99455d97fdc907b45a6dc0";
const redirectUri = "http://localhost:3000/";

const getAccessToken = () => {
  if (accessToken && Date.now() < expirationTime) {
    return accessToken;
  }     
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    expirationTime = Date.now() + expiresIn * 1000;
    window.setTimeout(() => {
      accessToken = '';
      expirationTime = 0;
    }, expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = accessUrl;
  }
};


const search = (term) => {
  if (!term) {
    return Promise.resolve([]);
  }

  const accessToken = getAccessToken();
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
      albumLink: track.album.external_urls.spotify
    }));
  });
};

const savePlaylist = (name, trackUris) => {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
};

const Spotify = {
  getAccessToken,
  search,
  savePlaylist
};

export default Spotify;
