// Define global variables
// =======================
const eventArray = ["1AKZAJ3GkdtJ6Bi", "1AvGZp9GkBqesc5"]
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

// renderInitialPage

$("#searchButton").on("click", searchEvent);
function searchEvent() {
  let queryURLBase = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=2wklXXwfJkLzbYFxIvoGSwhehNloF33O&classificationName=music&dmaId=701&sort=date,asc";
  let queryURL = queryURLBase;
  let keyword = $("#keyword").val();
  let startDateTime = $("#startDate").val();
  let endDateTime = $("#endDate").val();

  if (startDateTime) {
    startDateTime = startDateTime + "T00:00:00Z";
    queryURL = queryURL.concat("&startDateTime=" + startDateTime);
  }

    if (endDateTime) {
      endDateTime = endDateTime + "T00:00:00Z";
      queryURL = queryURL.concat("&endDateTime=" + endDateTime);
    }
  if (keyword) {
    queryURL = queryURL.concat("&city=" + keyword);
  } else {
    return null
  }
  console.log(queryURL)

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (res) {
    console.log(res)
    let events = res._embedded.events;
    var outer =$(".outer-card").empty();
    outer.append($("<header>").addClass("card-header").append($("<p>").addClass("card-header-title").text("Upcoming Events")));
    outer.append($("<div>").addClass("card-content box").append($("<p>").addClass("Country is-size-4 has-text-weight-bold").text(keyword)).append($("<p>").addClass("eventNumber is-size-6 has-text-weight-medium").text("Events")));
    outer.append($("<div>").addClass("card-content search-results"));
    $(".eventNumber").text(events.length + " Events")
    events.forEach(function (e, i) {
      let card = $("<div>").addClass("content box columns is-mobile");
      let eventDate = $("<div>").addClass("eventDate column is-one-fifth is-size-4");
      let eventInfo = $("<div>").addClass("event-info column is-mobile is-size-5");
      let eventBTN = $("<div>").addClass("column is-one-fifth").append($("<button>").addClass("button is-info is-rounded").text("See Details"))
      eventDate.append($("<div>").addClass("date-month has-text-centered has-text-weight-bold")).append($("<div>").addClass("date-day has-text-centered"));
      eventInfo.append($("<div>").addClass("week-day")).append($("<div>").addClass("event-artist has-text-weight-bold")).append($("<div>").addClass("venue-location"));

      card.append(eventDate);
      card.append(eventInfo);
      card.append(eventBTN)
      let newContent = card;
      let name = e.name;
      let location = e._embedded.venues[0].name;
      let localDate = e.dates.start.localDate;
      let date = moment(localDate, 'YYYY/MM/DD').date();
      let month = moment(localDate, 'YYYY/MM/DD').format("MMM");
      let time = e.dates.start.localTime ? moment(e.dates.start.localTime, "HH:mm:ss").format("hh:mm A") : "TBD";
      let day = moment(localDate, 'YYYY/MM/DD').format("ddd")

      newContent.find(".date-month").text(month);
      newContent.find(".date-day").text(date);
      newContent.find(".week-day").text(`${day} - ${time}`);
      newContent.find(".event-artist").text(name);
      newContent.find(".venue-location").text(`${location}`);

      $(".search-results").append(newContent);
    })

  })
}

$("#savedButton").on("click", savedEvents);
function savedEvents() {
  $(".hero-body").empty();
  $(".card-content").empty();
  $(".card-header-title").text("");
  for (i = 0; i < eventArray.length; i++) {
    let queryURL = "https://app.ticketmaster.com/discovery/v2/events/" + eventArray[i] + ".json?apikey=2wklXXwfJkLzbYFxIvoGSwhehNloF33O";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (res) {
      console.log(res)
      let event = res;
      $(".eventNumber").text(eventArray.length + " Events")
        let card = $("<div>").addClass("content box columns is-mobile");
        let eventDate = $("<div>").addClass("eventDate column is-one-fifth is-size-4");
        let eventInfo = $("<div>").addClass("event-info column is-mobile is-size-5");
        let eventBTN = $("<div>").addClass("column is-one-fifth").append($("<button>").addClass("button is-info is-rounded").text("See Details"))
        eventDate.append($("<div>").addClass("date-month has-text-centered has-text-weight-bold")).append($("<div>").addClass("date-day has-text-centered"));
        eventInfo.append($("<div>").addClass("week-day")).append($("<div>").addClass("event-artist has-text-weight-bold")).append($("<div>").addClass("venue-location"));

        card.append(eventDate);
        card.append(eventInfo);
        card.append(eventBTN)
        let newContent = card;
        let name = event.name;
        let location = event._embedded.venues[0].name;
        let localDate = event.dates.start.localDate;
        let date = moment(localDate, 'YYYY/MM/DD').date();
        let month = moment(localDate, 'YYYY/MM/DD').format("MMM");
        let time = event.dates.start.localTime ? moment(event.dates.start.localTime, "HH:mm:ss").format("hh:mm A") : "TBD";
        let day = moment(localDate, 'YYYY/MM/DD').format("ddd")

        newContent.find(".date-month").text(month);
        newContent.find(".date-day").text(date);
        newContent.find(".week-day").text(`${day} - ${time}`);
        newContent.find(".event-artist").text(name);
        newContent.find(".venue-location").text(`${location}`);

        $(".hero-body").append(newContent);
      })

    }
  }
