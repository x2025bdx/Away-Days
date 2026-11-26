(function () {
  "use strict";

  const storage = {
    get: function (key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch (error) {
        return fallback;
      }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
    }
  };

  let savedTrips = storage.get("awayDaysSavedTrips", []);
  if (!Array.isArray(savedTrips)) savedTrips = [];
  let activeFilter = "top10";

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  const LEAGUE_IMAGES = {
    NHL: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85",
    NBA: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85",
    NFL: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85",
    MLB: "https://images.unsplash.com/photo-1508344928928-7165b4e2a0cf?auto=format&fit=crop&w=900&q=85",
    CFB: "https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&w=900&q=85",
    CBB: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=85",
    MLS: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=85"
  };

  function tripImage(trip) {
    return LEAGUE_IMAGES[trip.league] || trip.image;
  }

  function normalizeSearch(value) {
    return String(value).toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\b(the|team|game|match|hockey|basketball|football|baseball)\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tripSearchText(trip) {
    return normalizeSearch([
      trip.team,
      trip.opponent,
      trip.city,
      trip.stadium,
      trip.league
    ].join(" "));
  }

  function tripCard(trip) {
    const saved = savedTrips.includes(trip.id);
    return [
      '<article class="trip-card" data-open-trip="' + trip.id + '" tabindex="0" role="button" aria-label="View ' + escapeHtml(trip.team) + ' at ' + escapeHtml(trip.opponent) + '">',
      '<div class="trip-card-image" style="background-image:url(\'' + escapeHtml(tripImage(trip)) + '\')">',
      '<button class="save-trip ' + (saved ? "saved" : "") + '" type="button" data-save-trip="' + trip.id + '" aria-label="' + (saved ? "Remove " : "Save ") + trip.team + ' trip">' + (saved ? "♥" : "♡") + "</button>",
      '<span class="distance">' + escapeHtml(trip.league || "Match") + " · " + trip.distance + "</span>",
      "</div>",
      '<div class="trip-card-body">',
      '<p class="trip-date">' + trip.date + " · " + trip.time + "</p>",
      "<h3>" + escapeHtml(trip.team) + " at " + escapeHtml(trip.opponent) + "</h3>",
      '<p class="trip-venue">' + escapeHtml(trip.city) + " · " + escapeHtml(trip.stadium) + "</p>",
      '<div class="trip-card-footer">',
      "<span>Trip from <strong>" + trip.from + "</strong></span>",
      '<button type="button" data-open-trip="' + trip.id + '">View trip →</button>',
      "</div></div></article>"
    ].join("");
  }

  function getFilteredTrips() {
    if (activeFilter === "top10") {
      return AWAY_DAYS.slice().sort(function (a, b) {
        return b.supporters - a.supporters;
      }).slice(0, 10);
    }
    if (activeFilter === "all") return AWAY_DAYS;
    return AWAY_DAYS.filter(function (trip) { return trip.league === activeFilter; });
  }

  function renderTrips(containerId, trips) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = trips.length
      ? trips.map(tripCard).join("")
      : '<div class="empty-state"><p>No trips match that filter.</p></div>';
  }

  function renderGroups(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = FAN_GROUPS.map(function (group) {
      return [
        '<article class="group-card">',
        '<div class="group-card-top"><span class="group-city">' + escapeHtml(group.city) + '</span><span class="open-dot"></span></div>',
        "<h3>" + escapeHtml(group.match) + "</h3>",
        '<p class="group-meta">' + escapeHtml(group.seats) + "<br>" + escapeHtml(group.leaving) + "</p>",
        '<div class="group-footer"><div class="avatars">',
        group.members.map(function (member) { return '<span class="avatar">' + escapeHtml(member) + "</span>"; }).join(""),
        '</div><button class="join-button" type="button" data-join-group="' + group.id + '">Join group →</button></div>',
        "</article>"
      ].join("");
    }).join("");
  }

  function renderCities() {
    const container = document.getElementById("city-grid");
    container.innerHTML = CITY_GUIDES.map(function (guide) {
      return [
        '<article class="city-card" data-open-city="' + escapeHtml(guide.city) + '" tabindex="0" role="button" style="background-image:url(\'' + escapeHtml(guide.image) + '\')">',
        '<span class="city-label">' + escapeHtml(guide.label) + "</span>",
        '<div class="city-copy"><h3>' + escapeHtml(guide.city) + "</h3>",
        "<p>" + escapeHtml(guide.title) + " · " + escapeHtml(guide.country) + "</p></div></article>"
      ].join("");
    }).join("");
  }

  function openCity(cityName) {
    const guide = CITY_GUIDES.find(function (item) { return item.city === cityName; });
    if (!guide) return;
    document.getElementById("trip-dialog-content").innerHTML = [
      '<div class="dialog-trip-image" style="background-image:url(\'' + escapeHtml(guide.image) + '\')"></div>',
      '<div class="dialog-trip-body">',
      '<p class="trip-date">' + escapeHtml(guide.label) + "</p>",
      "<h2>" + escapeHtml(guide.city) + " weekend guide</h2>",
      '<p class="trip-venue">' + escapeHtml(guide.title) + " · " + escapeHtml(guide.country) + "</p>",
      '<div class="city-activities">',
      guide.activities.map(function (activity) {
        return '<article><span>→</span><div><strong>' + escapeHtml(activity[0]) + "</strong><p>" + escapeHtml(activity[1]) + "</p></div></article>";
      }).join(""),
      "</div>",
      '<div class="dialog-actions"><button class="quiet-button" type="button" id="close-city-dialog">Close guide</button>',
      '<button class="dark-button" type="button" data-find-match="' + escapeHtml(guide.city) + '">Find matches here <span>→</span></button></div>',
      "</div>"
    ].join("");
    document.getElementById("trip-dialog").showModal();
  }

  function showView() {
    const hash = (window.location.hash || "#home").slice(1);
    const routeMap = {
      home: "home",
      discover: "discover-view",
      community: "community-view",
      "how-it-works": "home",
      saved: "saved-view"
    };
    const route = routeMap[hash] || "home";

    document.querySelectorAll("[data-view]").forEach(function (view) {
      view.hidden = view.id !== route;
    });

    if (hash === "home" || hash === "discover" || hash === "community" || hash === "saved") {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (hash === "how-it-works") {
      document.getElementByById("how-it-works").scrollIntoView();
    }
  }

  function openTrip(tripId) {
    const trip = AWAY_DAYS.find(function (item) { return item.id === tripId; });
    if (!trip) return;
    document.getElementById("trip-dialog").dataset.tripId = tripId;
    document.getElementById("trip-dialog-content").innerHTML = [
      '<div class="planner-cover" style="background-image:url(\'' + escapeHtml(tripImage(trip)) + '\')">',
      '<div><p class="trip-date">' + escapeHtml(trip.league) + " · " + escapeHtml(trip.date) + " · " + escapeHtml(trip.time) + "</p>",
      "<h2>" + escapeHtml(trip.team) + " at " + escapeHtml(trip.opponent) + "</h2>",
      '<p>' + escapeHtml(trip.stadium) + " · " + escapeHtml(trip.city) + "</p></div></div>",
      '<div class="planner-body">',
      '<div class="planner-main">',
      '<p class="eyebrow">YOUR AWAY-DAY PLAN</p>',
      '<h3>Customize everything</h3>',
      '<section class="planner-section"><div class="planner-section-title"><span>01</span><div><strong>Game ticket</strong><small>Official or resale ticket</small></div></div>',
      '<label class="choice-row"><input type="radio" name="ticket" class="plan-choice" data-cost="148" checked><span><strong>Lower bowl ticket</strong><small>Section 112 · 2 seats available</small></span><b>$148</b></label>',
      '<label class="choice-row"><input type="radio" name="ticket" class="plan-choice" data-cost="92"><span><strong>Upper level ticket</strong><small>Lower price, stadium view</small></span><b>$92</b></label>',
      '<label class="choice-row"><input type="radio" name="ticket" class="plan-choice" data-cost="220"><span><strong>Club or sideline seat</strong><small>Lounge access · 1 seat available</small></span><b>$220</b></label>',
      '<label class="choice-row"><input type="radio" name="ticket" class="plan-choice" data-cost="0"><span><strong>I already have tickets</strong><small>Season pass or resale tickets</small></span><b>$0</b></label></section>',
      '<section class="planner-section"><div class="planner-section-title"><span>02</span><div><strong>Stay</strong><small>Near the stadium or city centre</small></div></div>',
      '<label class="choice-row"><input type="radio" name="hotel" class="plan-choice" data-cost="180" checked><span><strong>3-night downtown hotel</strong><small>Central location · 2 guests</small></span><b>$180</b></label>',
      '<label class="choice-row"><input type="radio" name="hotel" class="plan-choice" data-cost="96"><span><strong>Shared fan apartment</strong><small>Kitchen · 4-person room</small></span><b>$96</b></label>',
      '<label class="choice-row"><input type="radio" name="hotel" class="plan-choice" data-cost="58"><span><strong>Hostel or shared room</strong><small>Social dorm near transit</small></span><b>$58</b></label>',
      '<label class="choice-row"><input type="radio" name="hotel" class="plan-choice" data-cost="0"><span><strong>I have my own stay</strong><small>Friends, family or existing booking</small></span><b>$0</b></label></section>',
      '<section class="planner-section"><div class="planner-section-title"><span>03</span><div><strong>Travel</strong><small>Choose how you get there</small></div></div>',
      '<label class="choice-row"><input type="radio" name="travel" class="plan-choice" data-cost="64" checked><span><strong>Fan coach</strong><small>Round trip · reserved seat</small></span><b>$64</b></label>',
      '<label class="choice-row"><input type="radio" name="travel" class="plan-choice" data-cost="38"><span><strong>Shared ride</strong><small>Split fuel and parking</small></span><b>$38</b></label>',
      '<label class="choice-row"><input type="radio" name="travel" class="plan-choice" data-cost="0"><span><strong>Driving with friends</strong><small>Own car · no shared booking needed</small></span><b>$0</b></label>',
      '<label class="choice-row"><input type="radio" name="travel" class="plan-choice" data-cost="112"><span><strong>Rental car</strong><small>Compact car · 3-day estimate</small></span><b>$112</b></label>',
      '<label class="choice-row"><input type="radio" name="travel" class="plan-choice" data-cost="82"><span><strong>Train or public transit</strong><small>Flexible departure times</small></span><b>$82</b></label></section>',
      '<section class="planner-section"><div class="planner-section-title"><span>04</span><div><strong>Food & experiences</strong><small>Add to the trip</small></div></div>',
      '<label class="choice-row"><input type="checkbox" class="plan-choice" data-cost="45" checked><span><strong>Pre-match meal</strong><small>Fan-friendly restaurant</small></span><b>$45</b></label>',
      '<label class="choice-row"><input type="checkbox" class="plan-choice" data-cost="28"><span><strong>City walking tour</strong><small>Two-hour local guide</small></span><b>$28</b></label>',
      '<label class="choice-row"><input type="checkbox" class="plan-choice" data-cost="36"><span><strong>Museum entry</strong><small>Day admission</small></span><b>$36</b></label>',
      '<label class="choice-row"><input type="checkbox" class="plan-choice" data-cost="0"><span><strong>No extra activities</strong><small>Keep the weekend simple</small></span><b>$0</b></label></section>',
      "</div>",
      '<aside class="planner-summary">',
      '<div class="summary-match"><span>TRIP TOTAL</span><strong id="plan-total">$437</strong><small>Estimate for 1 person</small></div>',
      '<div class="vendor-prices">',
      '<strong>Sample vendor comparison</strong>',
      '<button type="button" data-vendor="Ticketmaster"><span>Tickets</span><b>Ticketmaster</b><em>Compare</em></button>',
      '<button type="button" data-vendor="Expedia"><span>Hotel</span><b>Expedia</b><em>Compare</em></button>',
      '<button type="button" data-vendor="Airbnb"><span>Stay</span><b>Airbnb</b><em>Compare</em></button>',
      '<button type="button" data-vendor="Google"><span>Transit</span><b>Google Maps</b><em>View route</em></button>',
      "</div>",
      '<p class="price-source"><strong>Prototype estimate only</strong><br>Vendor cards demonstrate a future live-price comparison. No live availability or pricing feed is connected.</p>',
      '<button class="dark-button full-button" type="button" id="save-full-plan" data-save-dialog="' + trip.id + '">Save my trip</button>',
      '<button class="outline-button full-button" type="button" data-find-fans="' + trip.id + '">Find fans going to this game</button>',
      '<div class="fans-preview"><span>' + trip.supporters + ' fans already interested</span><div class="avatars">',
      '<span class="avatar">AR</span><span class="avatar">MK</span><span class="avatar">JL</span>',
      '</div></div>',
      "</aside></div>"
    ].join("");
    document.getElementById("trip-dialog").classList.add("planner-dialog");
    document.getElementById("trip-dialog").showModal();
    updatePlanTotal();
  }

  function toggleSaved(tripId) {
    if (savedTrips.includes(tripId)) {
      savedTrips = savedTrips.filter(function (id) { return id !== tripId; });
    } else {
      savedTrips.push(tripId);
    }
    storage.set("awayDaysSavedTrips", savedTrips);
    document.getElementById("saved-count").textContent = savedTrips.length;
    refreshRenderedTrips();
  }

  function updatePlanTotal() {
    const total = document.getElementById("plan-total");
    if (!total) return;
    let amount = 0;
    document.querySelectorAll(".plan-choice:checked").forEach(function (choice) {
      amount += Number(choice.getAttribute("data-cost"));
    });
    total.textContent = "$" + amount;
  }

  function findFans(tripId) {
    const trip = AWAY_DAYS.find(function (item) { return item.id === tripId; });
    if (!trip) return;
    document.getElementById("trip-dialog").dataset.tripId = tripId;
    document.getElementById("trip-dialog").classList.remove("planner-dialog");
    document.getElementById("trip-dialog-content").innerHTML = [
      '<div class="dialog-trip-body fans-dialog">',
      '<p class="eyebrow">OPTIONAL · FAN NETWORK</p>',
      "<h2>Fans travelling to " + escapeHtml(trip.city) + "</h2>",
      '<p class="trip-venue">People interested in ' + escapeHtml(trip.team) + " at " + escapeHtml(trip.opponent) + "</p>",
      '<div class="fans-list">',
      '<article><div class="avatar large">AR</div><div><strong>Alex R.</strong><p>Leaving Toronto · 2 seats in my car</p></div><button type="button" data-contact-fan="Alex">Connect</button></article>',
      '<article><div class="avatar large">MK</div><div><strong>Morgan K.</strong><p>Looking for a fan apartment</p></div><button type="button" data-contact-fan="Morgan">Connect</button></article>',
      '<article><div class="avatar large">JL</div><div><strong>Jordan L.</strong><p>Booking a fan coach · 1 seat open</p></div><button type="button" data-contact-fan="Jordan">Connect</button></article>',
      "</div>",
      '<div class="dialog-actions"><button class="quiet-button" type="button" id="back-to-plan">Back to planner</button><button class="dark-button" type="button" id="post-trip">Post that I’m going</button></div>',
      "</div>"
    ].join("");
  }

  function refreshRenderedTrips() {
    const visible = getFilteredTrips();
    renderTrips("trip-grid", visible);
    renderTrips("discover-grid", AWAY_DAYS);
    renderTrips("saved-grid", AWAY_DAYS.filter(function (trip) { return savedTrips.includes(trip.id); }));
    document.getElementById("saved-empty").hidden = savedTrips.length > 0;

    const openTripId = document.querySelector("[data-save-dialog]");
    if (openTripId) {
      openTripId.textContent = savedTrips.includes(openTripId.getAttribute("data-save-dialog")) ? "Saved" : "Save trip";
    }
  }

  document.addEventListener("click", function (event) {
    const saveButton = event.target.closest("[data-save-trip]");
    if (saveButton) toggleSaved(saveButton.getAttribute("data-save-trip"));

    const openButton = event.target.closest("[data-open-trip]");
    if (openButton && !event.target.closest("[data-save-trip]")) openTrip(openButton.getAttribute("data-open-trip"));

    const cityButton = event.target.closest("[data-open-city]");
    if (cityButton) openCity(cityButton.getAttribute("data-open-city"));

    if (event.target.closest("#close-city-dialog")) document.getElementById("trip-dialog").close();

    const findMatch = event.target.closest("[data-find-match]");
    if (findMatch) {
      document.getElementById("trip-dialog").close();
      document.getElementById("search-team").value = findMatch.getAttribute("data-find-match");
      window.location.hash = "discover";
      document.getElementById("trip-search").requestSubmit();
    }

    const dialogSave = event.target.closest("[data-save-dialog]");
    if (dialogSave) toggleSaved(dialogSave.getAttribute("data-save-dialog"));

    const planButton = event.target.closest("[data-plan-trip]");
    if (planButton) {
      openTrip(planButton.getAttribute("data-plan-trip"));
    }

    const vendorButton = event.target.closest("[data-vendor]");
    if (vendorButton) {
      const vendor = vendorButton.getAttribute("data-vendor");
      vendorButton.querySelector("em").textContent = "Opening demo";
      window.setTimeout(function () {
        window.alert(vendor + " comparison would open in the live product. This prototype does not fetch live prices.");
      }, 100);
    }

    if (event.target.matches(".plan-choice")) updatePlanTotal();

    const fansButton = event.target.closest("[data-find-fans]");
    if (fansButton) findFans(fansButton.getAttribute("data-find-fans"));

    if (event.target.closest("#back-to-plan")) {
      openTrip(document.getElementById("trip-dialog").dataset.tripId);
    }

    const contactFan = event.target.closest("[data-contact-fan]");
    if (contactFan) {
      contactFan.textContent = "Request sent";
      contactFan.disabled = true;
    }

    if (event.target.closest("#post-trip")) {
      event.target.closest("#post-trip").textContent = "You’re listed";
      event.target.closest("#post-trip").disabled = true;
    }

    const joinButton = event.target.closest("[data-join-group]");
    if (joinButton) {
      joinButton.textContent = "Request sent ✓";
      joinButton.disabled = true;
    }

    if (event.target.closest("[data-go-discover]")) window.location.hash = "discover";
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-open-trip], [data-open-city]");
    if (!card) return;
    event.preventDefault();
    card.click();
  });

  document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach(function (filter) {
        filter.setAttribute("aria-pressed", filter === button ? "true" : "false");
      });
      refreshRenderedTrips();
    });
  });

  document.getElementById("trip-search").addEventListener("submit", function (event) {
    event.preventDefault();
    const rawQuery = document.getElementById("search-team").value.trim();
    const query = normalizeSearch(rawQuery);
    const queryWords = query.split(" ").filter(Boolean);
    const filtered = queryWords.length
      ? AWAY_DAYS.filter(function (trip) {
          const searchable = tripSearchText(trip);
          return queryWords.every(function (word) { return searchable.includes(word); });
        })
      : [];
    renderTrips("discover-grid", filtered);
    const heading = document.querySelector("#discover-view .view-heading");
    const notice = heading.querySelector(".search-result-note") || document.createElement("p");
    notice.className = "search-result-note";
    notice.textContent = query
      ? (filtered.length + " scheduled game" + (filtered.length === 1 ? "" : "s") + " found for “" + rawQuery + "”")
      : "Enter a team, opponent, city or stadium";
    if (!notice.parentNode) heading.appendChild(notice);
    window.location.hash = "discover";
  });

  const searchInput = document.getElementById("search-team");
  const suggestions = document.getElementById("search-suggestions");

  function searchMatches(query) {
    const normalizedQuery = normalizeSearch(query);
    if (!normalizedQuery) return [];
    return AWAY_DAYS.filter(function (trip) {
      return tripSearchText(trip).includes(normalizedQuery);
    });
  }

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      suggestions.hidden = true;
      return;
    }
    const matches = searchMatches(query).slice(0, 5);
    if (!matches.length) {
      suggestions.innerHTML = '<button type="button" class="suggestion-empty" disabled>No scheduled games found</button>';
    } else {
      suggestions.innerHTML = matches.map(function (trip) {
        return '<button type="button" data-suggestion-trip="' + trip.id + '"><strong>' + escapeHtml(trip.team) + " at " + escapeHtml(trip.opponent) + '</strong><span>' + escapeHtml(trip.city) + " · " + escapeHtml(trip.date) + "</span></button>";
      }).join("");
    }
    suggestions.hidden = false;
  });

  document.addEventListener("click", function (event) {
    const suggestion = event.target.closest("[data-suggestion-trip]");
    if (suggestion) {
      suggestions.hidden = true;
      openTrip(suggestion.getAttribute("data-suggestion-trip"));
      return;
    }
    if (!event.target.closest(".trip-search")) suggestions.hidden = true;
  });

  document.getElementById("close-trip-dialog").addEventListener("click", function () {
    document.getElementById("trip-dialog").close();
    document.getElementById("trip-dialog").classList.remove("planner-dialog");
  });
  document.getElementById("saved-button").addEventListener("click", function () {
    window.location.hash = "saved";
  });
  document.getElementById("find-group").addEventListener("click", function () {
    window.location.hash = "community";
  });
  document.getElementById("view-cities").addEventListener("click", function () {
    document.getElementById("city-grid").scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener("hashchange", showView);
  renderTrips("trip-grid", AWAY_DAYS);
  renderTrips("discover-grid", AWAY_DAYS);
  renderGroups("community-cards");
  renderGroups("community-grid-wide");
  renderCities();
  refreshRenderedTrips();
  showView();
})();
