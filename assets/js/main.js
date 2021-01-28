// Define global variables
// =======================
const eventArray = ["1AKZAJ3GkdtJ6Bi", "1AvGZp9GkBqesc5"]
// =======================

// UI Functions
// =======================

// List building
// -----------------------

function renderCard(event) {
  let localDate = event.dates.start.localDate;
  let time = event.dates.start.localTime ? moment(event.dates.start.localTime, "HH:mm:ss").format("hh:mm A") : "TBD";
  let template = `
<div class="card-content search-results">
  <div class="content box columns is-mobile">
      <div class="eventDate column is-one-fifth is-size-4">
          <div class="date-month has-text-centered has-text-centered has-text-weight-bold">
              ${moment(localDate, "YYYY/MM/DD").format("MMM")}
              <div class="date-day has-text-centered">
                  ${moment(localDate, "YYY/MM/DD").date()}
              </div>
          </div>
      </div>
      <div class="event-info column is-mobile is-size-5">
          <div class="week-day">
              ${moment(localDate, "YYYY/MM/DD").format("ddd")} - ${time}
              <div class="event-name has-text-weight-bold">
                  ${event.name}
                  <div class="venue-location">${event._embedded.venues[0].name}</div>
              </div>
          </div>
      </div>
      <div class="column is-one-fifth">
          <button class="button is-info is-rounded">See Details</button>
      </div>
  </div>
</div>
  `
  return template
}
// -----------------------

// Display Event Details
// -----------------------

// -----------------------

// Display Saved Events
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

// renderInitialPage

$("#searchButton").on("click", searchEvent);
  function searchEvent() {
    let queryURLBase = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=2wklXXwfJkLzbYFxIvoGSwhehNloF33O&classificationName=music&dmaId=701&sort=date,asc";
    let queryURL = queryURLBase;
    let cityName = $("#keyword").val();
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
    let queryData = {}
    if (startDate) {
      startDate = startDate + "T00:00:00Z";
      queryData.startDateTime = startDate
    }

    if (endDate) {
      endDate = endDate + "T00:00:00Z";
      queryData.endDateTime = endDate;
    }
    if (cityName) {
      queryData.city = cityName
    } 
    $.ajax({
      url: queryURL,
      method: "GET",
      data : queryData
    }).then(async function (res) {
      let events = await res._embedded.events;
      $(".outer-card").empty();
      var eventsHeader = `
      <header class="card-header">
      <p class="card-header-title">Upcoming Events</p>
    </header>
    <div class="card-content box">
      <p class="country is-size-4 has-text-weight-bold">${cityName}</p>
      <p class="eventNumber is-size-6 has-text-weight-medium">
          ${events.length} Events
      </p>
    </div>
      `
      $(".outer-card").append(eventsHeader);
      for (i = 0; i < events.length; i++) {
        var eventObj = renderCard(events[i]);
        $(".outer-card").append(eventObj);
      }
    })
  }

  $("#savedButton").on("click", savedEvents);
  function savedEvents() {
    $(".hero-body").empty();
    $(".card-content").empty();
    $(".outer-card").empty();
    var savedHeader = `
    <header class="card-header">
    <p class="card-header-title">Upcoming Events</p>
  </header>
  <div class="card-content box">
    <p class="country is-size-4 has-text-weight-bold">Saved</p>
    <p class="eventNumber is-size-6 has-text-weight-medium">
        ${eventArray.length} Events
    </p>
  </div>
    `
    for (i = 0; i < eventArray.length; i++) {
      let queryURL = "https://app.ticketmaster.com/discovery/v2/events/" + eventArray[i] + ".json?apikey=2wklXXwfJkLzbYFxIvoGSwhehNloF33O";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(async function (res) {
        console.log(res)
        var response = await res.dates
        var savedObj = renderCard(res)
        $(".hero-body").append(savedObj);
      })

    }
  }
