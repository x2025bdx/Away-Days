(function () {
  "use strict";

  const storage = {
    get: function (key, fallback) {
      try {
        const saved = localStorage.getItem(key);
        return saved === null ? fallback : JSON.parse(saved);
      } catch (error) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
      }
    }
  };

  function toDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function dateFromString(value) {
    return new Date(value + "T12:00:00");
  }

  function dateOffset(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return toDateString(date);
  }

  function dueDateFor(plant) {
    const dueDate = dateFromString(plant.lastWatered);
    dueDate.setDate(dueDate.getDate() + Number(plant.interval));
    return dueDate;
  }

  function daysUntilWatering(plant) {
    const today = dateFromString(toDateString(new Date()));
    return Math.round((dueDateFor(plant) - today) / 86400000);
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
  }

  const savedPlants = storage.get("tendPlants", null);
  let plants = Array.isArray(savedPlants) ? savedPlants : SAMPLE_PLANTS.map(function (plant, index) {
    return {
      id: "sample-" + index,
      name: plant.name,
      species: plant.species,
      interval: plant.interval,
      lastWatered: dateOffset(plant.daysSinceWatered)
    };
  });
  let activeFilter = "all";

  function savePlants() {
    storage.set("tendPlants", plants);
  }

  document.title = STARTUP.name + " | Plant care";
  document.getElementById("brand-name").textContent = STARTUP.name;
  document.getElementById("today-label").textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long", month: "long", day: "numeric"
  }).format(new Date()).toUpperCase();

  function showView() {
    const requested = (window.location.hash || "#garden").slice(1);
    const views = document.querySelectorAll("[data-view]");
    const exists = Array.prototype.some.call(views, function (view) {
      return view.id === requested;
    });
    const current = exists ? requested : "garden";

    views.forEach(function (view) {
      view.hidden = view.id !== current;
    });

    document.querySelectorAll("nav a").forEach(function (link) {
      if (link.getAttribute("href") === "#" + current) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", showView);

  const plantList = document.getElementById("plant-list");

  function makePlantRow(plant) {
    const daysLeft = daysUntilWatering(plant);
    const row = document.createElement("article");
    row.className = "plant-row";

    const mark = document.createElement("span");
    mark.className = "plant-mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = plant.name.charAt(0).toUpperCase();

    const details = document.createElement("div");
    details.className = "plant-details";
    const name = document.createElement("h3");
    name.textContent = plant.name;
    const species = document.createElement("p");
    species.textContent = plant.species || "Plant";
    details.append(name, species);

    const timing = document.createElement("div");
    timing.className = "plant-timing";
    const status = document.createElement("span");
    status.className = daysLeft < 0 ? "status status-overdue" : daysLeft === 0 ? "status status-today" : "status status-upcoming";
    status.textContent = daysLeft < 0 ? Math.abs(daysLeft) + "d overdue" : daysLeft === 0 ? "Due today" : "In " + daysLeft + (daysLeft === 1 ? " day" : " days");
    const dueDate = document.createElement("span");
    dueDate.className = "due-date";
    dueDate.textContent = "Water " + formatDate(dueDateFor(plant));
    timing.append(status, dueDate);

    const actions = document.createElement("div");
    actions.className = "plant-actions";
    const wateredButton = document.createElement("button");
    wateredButton.type = "button";
    wateredButton.className = "water-button";
    wateredButton.textContent = "Watered";
    wateredButton.setAttribute("aria-label", "Mark " + plant.name + " as watered today");
    wateredButton.addEventListener("click", function () {
      plant.lastWatered = toDateString(new Date());
      savePlants();
      renderPlants();
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", "Remove " + plant.name + " from your garden");
    removeButton.addEventListener("click", function () {
      if (window.confirm("Remove " + plant.name + " from your garden?")) {
        plants = plants.filter(function (item) { return item.id !== plant.id; });
        savePlants();
        renderPlants();
      }
    });
    actions.append(wateredButton, removeButton);

    row.append(mark, details, timing, actions);
    return row;
  }

  function renderPlants() {
    const sortedPlants = plants.slice().sort(function (first, second) {
      return daysUntilWatering(first) - daysUntilWatering(second) || first.name.localeCompare(second.name);
    });
    const duePlants = sortedPlants.filter(function (plant) { return daysUntilWatering(plant) <= 0; });
    const visiblePlants = sortedPlants.filter(function (plant) {
      if (activeFilter === "due") return daysUntilWatering(plant) <= 0;
      if (activeFilter === "upcoming") return daysUntilWatering(plant) > 0;
      return true;
    });

    plantList.replaceChildren.apply(plantList, visiblePlants.map(makePlantRow));
    document.getElementById("plant-count").textContent = plants.length;
    document.getElementById("due-count").textContent = duePlants.length;
    document.getElementById("overdue-count").textContent = duePlants.filter(function (plant) { return daysUntilWatering(plant) < 0; }).length;

    const emptyState = document.getElementById("empty-state");
    const isFilteredEmpty = plants.length > 0 && visiblePlants.length === 0;
    emptyState.hidden = visiblePlants.length > 0;
    document.getElementById("empty-title").textContent = isFilteredEmpty ? "Nothing in this view." : "A little room to grow.";
    document.getElementById("empty-copy").textContent = isFilteredEmpty
      ? "Try another filter to see the rest of your plants."
      : "Add your first plant and its watering rhythm to get started.";
    document.getElementById("empty-add").hidden = isFilteredEmpty;
  }

  const dialog = document.getElementById("plant-dialog");
  const form = document.getElementById("plant-form");
  const lastWateredInput = document.getElementById("plant-last-watered");

  function openPlantDialog() {
    lastWateredInput.value = toDateString(new Date());
    lastWateredInput.max = lastWateredInput.value;
    dialog.showModal();
    document.getElementById("plant-name").focus();
  }

  document.getElementById("add-plant").addEventListener("click", openPlantDialog);
  document.getElementById("empty-add").addEventListener("click", openPlantDialog);
  document.getElementById("close-dialog").addEventListener("click", function () { dialog.close(); });
  document.getElementById("cancel-dialog").addEventListener("click", function () { dialog.close(); });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    plants.push({
      id: "plant-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
      name: formData.get("name").trim(),
      species: formData.get("species").trim(),
      interval: Number(formData.get("interval")),
      lastWatered: formData.get("lastWatered")
    });
    savePlants();
    form.reset();
    dialog.close();
    renderPlants();
  });

  document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach(function (filterButton) {
        filterButton.setAttribute("aria-pressed", filterButton === button ? "true" : "false");
      });
      renderPlants();
    });
  });

  if (savedPlants === null || !Array.isArray(savedPlants)) {
    storage.set("tendPlants", plants);
  }
  renderPlants();
  showView();
})();