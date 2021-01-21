// Define global variables
// =======================

// =======================

// UI Functions
// =======================

// Display Event Details
// -----------------------

// -----------------------

// Display Acts/artists
// -----------------------

// -----------------------

// Display Artist Info Function
// -----------------------

// -----------------------

// =======================

// Logic functions

// =======================

// Ticketmaster API search function
// -----------------------

// Spotify API artist search function
// -----------------------

// Spotify API Auth Service
function spotifyAuthService() {
  const queryURL = "https://accounts.spotify.com/api/token";
  const clientKey =
    "OTIwMTI1MTA1ODZjNDllY2FjYWRkNjg3MTNjYzdhMmU6MjEzNTg0MTBhMzE4NDJhY2E1Mzc2YTFhMzcyNmJmYTY=";

  return $.ajax({
    url: queryURL,
    method: "POST",
    data: {
      grant_type: "client_credentials",
    },
    headers: {
      Authorization: `Basic ${clientKey}`,
    },
  }).then(function (response) {
    // Return Access Token
    return response.access_token;
  });
}

// Spotify Search Artist by Name
async function spotifyGetArtistService(name) {
  const token = await spotifyAuthService();
  const queryURL = "https://api.spotify.com/v1/search";
  let data;
  $.ajax({
    url: queryURL,
    method: "GET",
    data: {
      q: name,
      type: "artist",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(response);
  });
}

// =======================

// Listeners go down here

// =======================

// Search button listener
// -----------------------

// -----------------------

// Artist profile link listener
// -----------------------

// -----------------------

// =======================

// spotifyGetArtistService();
