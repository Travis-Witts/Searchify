// Define global variables
// =======================
const eventArray = ["1AKZAJ3GkdtJ6Bi", "1AvGZp9GkBqesc5"];
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

// $("#searchButton").on("click", searchEvent);
// function searchEvent() {
//   let queryURLBase =
//     "https://app.ticketmaster.com/discovery/v2/events.json?apikey=2wklXXwfJkLzbYFxIvoGSwhehNloF33O&classificationName=music&dmaId=701&sort=date,asc";
//   let queryURL = queryURLBase;
//   let keyword = $("#keyword").val();
//   let startDateTime = $("#startDate").val();
//   let endDateTime = $("#endDate").val();

//   if (startDateTime) {
//     startDateTime = startDateTime + "T00:00:00Z";
//     queryURL = queryURL.concat("&startDateTime=" + startDateTime);
//   } else if (endDateTime) {
//     endDateTime = endDateTime + "T00:00:00Z";
//     queryURL = queryURL.concat("&endDateTime=" + endDateTime);
//   }
//   if (keyword) {
//     queryURL = queryURL.concat("&city=" + keyword);
//   } else {
//     return null;
//   }
//   console.log(queryURL);

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (res) {
//     console.log(res);
//     let events = res._embedded.events;
//     var outer = $(".outer-card").empty();
//     outer.append(
//       $("<header>")
//         .addClass("card-header")
//         .append($("<p>").addClass("card-header-title").text("Upcoming Events"))
//     );
//     outer.append(
//       $("<div>")
//         .addClass("card-content box")
//         .append(
//           $("<p>")
//             .addClass("Country is-size-4 has-text-weight-bold")
//             .text(keyword)
//         )
//         .append(
//           $("<p>")
//             .addClass("eventNumber is-size-6 has-text-weight-medium")
//             .text("Events")
//         )
//     );
//     outer.append($("<div>").addClass("card-content search-results"));
//     $(".eventNumber").text(events.length + " Events");
//     events.forEach(function (e) {
//       let card = $("<div>").addClass("content box columns is-mobile");
//       let eventDate = $("<div>").addClass(
//         "eventDate column is-one-fifth is-size-4"
//       );
//       let eventInfo = $("<div>").addClass(
//         "event-info column is-mobile is-size-5"
//       );
//       let eventBTN = $("<div>")
//         .addClass("column is-one-fifth")
//         .append(
//           $("<button>")
//             .addClass("button is-info is-rounded")
//             .text("See Details")
//         );
//       eventDate
//         .append(
//           $("<div>").addClass(
//             "date-month has-text-centered has-text-weight-bold"
//           )
//         )
//         .append($("<div>").addClass("date-day has-text-centered"));
//       eventInfo
//         .append($("<div>").addClass("week-day"))
//         .append($("<div>").addClass("event-artist has-text-weight-bold"))
//         .append($("<div>").addClass("venue-location"));

//       card.append(eventDate);
//       card.append(eventInfo);
//       card.append(eventBTN);
//       let newContent = card;
//       let name = e.name;
//       let location = e._embedded.venues[0].name;
//       let localDate = e.dates.start.localDate;
//       let date = moment(localDate, "YYYY/MM/DD").date();
//       let month = moment(localDate, "YYYY/MM/DD").format("MMM");
//       let time = e.dates.start.localTime
//         ? moment(e.dates.start.localTime, "HH:mm:ss").format("hh:mm A")
//         : "TBD";
//       let day = moment(localDate, "YYYY/MM/DD").format("ddd");

//       newContent.find(".date-month").text(month);
//       newContent.find(".date-day").text(date);
//       newContent.find(".week-day").text(`${day} - ${time}`);
//       newContent.find(".event-artist").text(name);
//       newContent.find(".venue-location").text(`${location}`);

//       $(".search-results").append(newContent);
//     });
//   });
// }

$("#savedButton").on("click", savedEvents);
function savedEvents() {
  $(".hero-body").empty();
  $(".card-content").empty();
  $(".card-header-title").text("");
  for (i = 0; i < eventArray.length; i++) {
    let queryURL =
      "https://app.ticketmaster.com/discovery/v2/events/" +
      eventArray[i] +
      ".json?apikey=2wklXXwfJkLzbYFxIvoGSwhehNloF33O";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (res) {
      console.log(res);
      let event = res;
      $(".eventNumber").text(eventArray.length + " Events");
      let card = $("<div>").addClass("content box columns is-mobile");
      let eventDate = $("<div>").addClass(
        "eventDate column is-one-fifth is-size-4"
      );
      let eventInfo = $("<div>").addClass(
        "event-info column is-mobile is-size-5"
      );
      let eventBTN = $("<div>")
        .addClass("column is-one-fifth")
        .append(
          $("<button>")
            .addClass("button is-info is-rounded")
            .text("See Details")
        );
      eventDate
        .append(
          $("<div>").addClass(
            "date-month has-text-centered has-text-weight-bold"
          )
        )
        .append($("<div>").addClass("date-day has-text-centered"));
      eventInfo
        .append($("<div>").addClass("week-day"))
        .append($("<div>").addClass("event-artist has-text-weight-bold"))
        .append($("<div>").addClass("venue-location"));

      card.append(eventDate);
      card.append(eventInfo);
      card.append(eventBTN);
      let newContent = card;
      let name = event.name;
      let location = event._embedded.venues[0].name;
      let localDate = event.dates.start.localDate;
      let date = moment(localDate, "YYYY/MM/DD").date();
      let month = moment(localDate, "YYYY/MM/DD").format("MMM");
      let time = event.dates.start.localTime
        ? moment(event.dates.start.localTime, "HH:mm:ss").format("hh:mm A")
        : "TBD";
      let day = moment(localDate, "YYYY/MM/DD").format("ddd");

      newContent.find(".date-month").text(month);
      newContent.find(".date-day").text(date);
      newContent.find(".week-day").text(`${day} - ${time}`);
      newContent.find(".event-artist").text(name);
      newContent.find(".venue-location").text(`${location}`);

      $(".hero-body").append(newContent);
    });
  }
}

// =======================
// Model Class Definitions
// =======================

class Event {
  constructor(id, name, venueName, venueUrl, images, url, info, notes) {
    this.id;
    this.name;
    this.date;
    this.startTime;
    this.venueName;
    this.venueUrl;
    this.images;
    this.url;
    this.artists;
    this.info;
    this.notes;
  }
}

// =======================
// Application Service Class Definition
// =======================
class EventService {
  constructor(stateCode, startDate, endDate) {
    this.queryBaseURL =
      "https://app.ticketmaster.com/discovery/v2/events.json?apikey=2wklXXwfJkLzbYFxIvoGSwhehNloF33O&classificationName=music&dmaId=701&sort=date,asc";
    this.API_KEY = "2wklXXwfJkLzbYFxIvoGSwhehNloF33O";

    this.queryData;

    if (stateCode) {
      this.queryData.stateCode = stateCode;
    }

    if (startDate) {
      this.queryData.startDateTime = startDate + "T00:00:00Z";
    }

    if (endDate) {
      this.queryData.endDateTime = endDate + "T00:00:00Z";
    }

    // const events = this.getEvents();
    // this.events = events.map((event) => new Event(event));
  }

  // Fetch Events From TicketMaster API (Returns Promise)
  fetchEvents() {
    return $.ajax({
      url: this.queryBaseURL,
      method: "GET",
      data: {
        stateCode: "SA",
      },
    });
  }

  saveEvent(event) {}

  deleteEvent(event) {}
}

class SpotifySearchService {
  constructor() {
    this.authToken;
  }

  getAuthToken() {
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

  async fetchArtist(name) {
    const token = await this.getAuthToken();
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
      return response;
    });
  }
}

// =======================
// Application Controller Class Definition
// =======================
class App {
  constructor() {
    // Instantiate View Components
    this.navbar = new NavBar(this);
    this.homeView = new HomeView(this);
    this.resultsView = new ResultsView(this);
    this.eventDetailsView = new EventDetailsView(this);

    // Instantiate Service Providers
    this.eventService = new EventService();
    this.spotifySearchService = new SpotifySearchService();

    console.log(this.spotifySearchService.fetchArtist("architects"));

    // Render Default View
    this.homeView.render();
    this.homeView.attachEventHandlers();
    this.navbar.render();
    this.navbar.attachEventHandlers();
  }

  renderHome() {
    console.log("I run");
    // Render Default View
    this.homeView.render();
    this.homeView.attachEventHandlers();
  }

  renderEventDetails() {
    this.eventDetailsView.render();
    this.eventDetailsView.attachEventHandlers();
  }

  async getEvents(stateCode, startDate, endDate) {
    // Fetch Events from Event Service
    const events = await this.eventService.fetchEvents(
      stateCode,
      startDate,
      endDate
    );
    // Render Results View
    this.resultsView.render(events);
    // Attach Results View Event Handlers
    this.resultsView.attachEventHandlers();
    this.navbar.render();
    this.navbar.attachEventHandlers();
  }
}

// =======================
// View Component Class Definitions
// =======================

class HomeView {
  constructor(app) {
    this.app = app;
    this.template = `
      <section class="hero is-light is-fullheight search-panel" id="search-component">

        <div class="hero-body is-flex-direction-column is-justify-content-center">
          <div class="columns is-mobile is-centered">
            <h1 class="title is-1 has-text-centered">Find out what's happening in your city!</h1>
          </div>
          <form class="field" id="search-form">
            <div class="field">
              <div class="control columns is-mobile is-centered">
                <div class="search-bar column is-two-thirds is-half-tablet">
                  <div class="control has-icons-left">
                    <input
                      class="input is-rounded is-large"
                      type="text"
                      placeholder="Enter a Location"
                      id="keyword"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-map-marker-alt"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="field is-grouped is-grouped-multiline columns is-mobile is-centered"
            >
              <div class="control">
                <label class="label">Start Date</label>
                <div class="control">
                  <input class="input" type="date" id="startDate" />
                </div>
              </div>
              <div class="control">
                <label class="label">End Date</label>
                <div class="control">
                  <input class="input" type="date" id="endDate" />
                </div>
              </div>
            </div>
            <div class="columns is-mobile is-centered">
              <button
                type="submit"
                class="button is-rounded"
                id="searchButton"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>
    `;
  }

  attachEventHandlers() {
    $("#search-form").on("submit", (e) => {
      e.preventDefault();
      this.app.getEvents(
        e.target[0].value,
        e.target[1].value,
        e.target[2].value
      );
    });
  }

  render() {
    // Clear Body Content
    $(".app-root").empty();
    // Append View Component To Body Element
    $(".app-root").append(this.template);
  }
}

class ResultsView {
  constructor(app) {
    this.app = app;
    this.template = `
      <!-- Results View Component -->
        <section class="section" id="results">
         <div class="container" id="results-container">

          </div>
      </section>
    `;
  }
  attachEventHandlers() {}

  render(data) {
    const events = data._embedded.events;

    // Clear Body Content
    $(".app-root").empty();
    // Append View Component To Body Element
    $(".app-root").append(this.template);

    // Select #results Element from DOM
    const resultsContainerEl = $("#results-container");

    const columns = '<div class="columns"></div>';
    let cardCount = 0;
    // Render Event Cards
    for (const event in events) {
      console.log(events[event]);
      const card = new EventCard(this.app, events[event]);

      if (cardCount === 0 || cardCount % 3 === 0) {
        console.log("condition met!");
        resultsContainerEl.append(columns);
        resultsContainerEl.children().last().append(card.render());
        card.attachEventHandlers();
        cardCount++;
        console.log(cardCount);
      } else {
        console.log("condition not met!");
        resultsContainerEl.children().last().append(card.render());
        cardCount++;
      }
    }
  }
}

class EventDetailsView {
  constructor(app) {
    this.app = app;
    this.template = `
      <!--|| Event Details View Component-->
      <!-- Event Details Hero Component -->
      <section class="hero is-primary is-medium has-background" id="artist-banner">
        <img class="hero-background" src="https://www.nme.com/wp-content/uploads/2020/10/architects-696x442.jpg"></img>
        <div class="overlay"></div>
        <div class="container mx-6">
          <div class="hero-body pl-6" id="hero-text">
            <p class="title is-1 has-text-weight-bold">
              In Hearts Wake 2020 Australian Tour
            </p>
      <!-- Event Venue Element -->
      <div class="icon-text mb-0 level">
              <div class="level-left">
                <span class="icon level-item">
                  <i class="fas fa-map-marker-alt"></i>
                </span>
                <span class="subtitle is-size-4 level-item" id="event-venue"
                  >Lions Art Factory</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Event Details Info Component -->
      <section class="section">
        <div class="container">
          <h1 class="title" id="event-about">About</h1>
        </div>
      </section>
    `;
  }
  attachEventHandlers() {}

  render() {
    // Clear Body Content
    $(".app-root").empty();
    // Append View Component To Body Element
    $(".app-root").append(this.template);
  }
}

class EventCard {
  constructor(app, event) {
    this.app = app;
    this.id = event.id;
    this.imgUrl = event.images[0].url;
    this.name = event.name;
    this.venueName = event._embedded.venues[0].name;
    this.startDate = event.dates.start.localDate;
    this.startTime = event.dates.start.localTime;
    this.date = new Date(
      this.startDate.substr(0, 4),
      this.startDate.substr(5, 2),
      this.startDate.substr(8, 2)
    );

    this.template = `
      <div class="column">
        <!-- Card Component V2 -->
        <a id="card-wrapper">
        <div class="card tile-is-child is-flex is-flex-direction-column flex-grow-5" id="${
          this.id
        }">
          <!-- Card Image Element -->
          <div class="card-image">
            <figure class="image">
              <img
                src="${this.imgUrl}"
                alt="Placeholder image"
              />
            </figure>
            <span
              class="icon has-text-grey-light is-large"
              style="position: absolute; top: 5%; right: 5%"
            >
              <i class="far fa-star fa-2x"></i>
            </span>
          </div>
          <!-- Card Content Flex Wrapper -->
          <div class="is-flex is-flex-direction-row">
            <div class="card-content py-3 is-flex-grow-5">
              <div class="content">
                <div class="text">
                  <p
                    class="is-uppercase is-family-monospace has-text-weight-bold is-size-4 mb-0"
                  >
                    ${this.name}
                  </p>
                  <!-- Event Venue Element -->
                  <div class="icon-text mb-0 level">
                    <div class="level-left">
                      <span class="icon level-item">
                        <i class="fas fa-map-marker-alt"></i>
                      </span>
                      <span
                        class="is-size-6 has-text-grey level-item"
                        id="event-venue"
                        >${this.venueName}</span
                      >
                    </div>
                  </div>
                  <!-- Event Time Element -->
                  <div class="icon-text mb-0 level">
                    <div class="level-left">
                      <span class="icon level-item">
                        <i class="fas fa-clock"></i>
                      </span>
                      <time
                        class="is-size-6 has-text-grey level-item"
                        id="event-time"
                        >${this.startTime}</time
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Event Date Block Element -->
            <div
              class="card-footer is-flex-direction-column has-background-danger has-text-white px-5 has-text-centered is-justify-content-center"
              style="border: none"
            >
              <h3
                class="is-size-3 has-text-weight-bold mb-1"
                style="line-height: 24px"
              >
                ${this.startDate.substr(8, 9)}
              </h3>
              <h3 class="is-size-6 has-text-weight-light is-uppercase">
                ${this.date.toLocaleString("en-us", { month: "short" })}
              </h3>
            </div>
          </div>
        </div>
        <!-- //Card Component V2 -->
        </a>

    </div>
    `;
  }
  attachEventHandlers() {
    console.log("click!");
    $("#card-wrapper").on("click", this.app.renderEventDetails);
  }
  render() {
    return this.template;
  }
}

class NavBar {
  constructor(app) {
    this.app = app;
    this.template = `
      <!-- Navbar Component -->
      <nav class="level is-mobile" >
        <div class="button is-rounded">
          <a class="link is-info" id="homeButton" href="#">Home</a>
        </div>
        <div class="level-item">
          <a class="link is-info">LOGO</a>
        </div>
        <div class="button is-rounded">
          <a class="link is-info" id="savedButton">Saved Events</a>
        </div>
      </nav>
    `;
  }

  attachEventHandlers() {}

  render() {
    // Append View Component To Body Element
    $(".app-root").prepend(this.template);
  }
}

const app = new App();
