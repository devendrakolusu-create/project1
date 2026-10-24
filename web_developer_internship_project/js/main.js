document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Contact form: client-side validation demo only; it does not send data to a server.
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const message = document.getElementById("contactMessage").value.trim();
      const status = document.getElementById("contactStatus");
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      status.className = "form-status";
      if (name.length < 2) status.textContent = "Please enter a name with at least 2 characters.";
      else if (!emailOk) status.textContent = "Please enter a valid email address.";
      else if (message.length < 10) status.textContent = "Please write a message of at least 10 characters.";
      else {
        status.textContent = "Validation successful! This demo form does not send messages.";
        status.classList.add("success");
        contactForm.reset();
        return;
      }
      status.classList.add("error");
    });
  }

  // Product catalogue: client-side search, category filter, and sorting.
  const productGrid = document.getElementById("productGrid");
  if (productGrid) {
    const products = [
      {id:"P-101",name:"Studio Headphones",category:"Audio",price:2499,icon:"🎧",bg:"#f0edff",description:"Comfortable over-ear audio for focus sessions."},
      {id:"P-102",name:"Wireless Earbuds",category:"Audio",price:1799,icon:"🎵",bg:"#e8f3ff",description:"Compact everyday listening with a clean design."},
      {id:"P-103",name:"Mechanical Keyboard",category:"Workspace",price:3299,icon:"⌨️",bg:"#fff0e1",description:"Tactile typing for coding and creative work."},
      {id:"P-104",name:"Desk Lamp",category:"Workspace",price:1299,icon:"💡",bg:"#fff7d9",description:"A minimal lamp for a brighter study setup."},
      {id:"P-105",name:"Laptop Stand",category:"Accessories",price:999,icon:"💻",bg:"#e5f8f0",description:"Raise your screen for a more comfortable desk."},
      {id:"P-106",name:"Travel Backpack",category:"Accessories",price:2199,icon:"🎒",bg:"#fcecf3",description:"Room for your laptop, charger, and daily essentials."},
      {id:"P-107",name:"USB-C Hub",category:"Accessories",price:1499,icon:"🔌",bg:"#e8f3ff",description:"A handy connection hub for your workspace."},
      {id:"P-108",name:"Desktop Speakers",category:"Audio",price:2899,icon:"🔊",bg:"#f0edff",description:"Small speakers for music and video calls."},
      {id:"P-109",name:"Notebook Set",category:"Workspace",price:399,icon:"📓",bg:"#e5f8f0",description:"Capture ideas, plans, and study notes on paper."}
    ];
    const search = document.getElementById("productSearch");
    const category = document.getElementById("categoryFilter");
    const sort = document.getElementById("sortProducts");
    const count = document.getElementById("productCount");
    const render = () => {
      const query = search.value.trim().toLowerCase();
      let visible = products.filter(p =>
        (p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)) &&
        (category.value === "all" || p.category === category.value)
      );
      if (sort.value === "price-low") visible.sort((a,b) => a.price-b.price);
      if (sort.value === "price-high") visible.sort((a,b) => b.price-a.price);
      if (sort.value === "name") visible.sort((a,b) => a.name.localeCompare(b.name));
      count.textContent = `${visible.length} product${visible.length === 1 ? "" : "s"} found`;
      if (!visible.length) {
        productGrid.innerHTML = '<div class="no-results"><strong>No products found</strong><p>Try another search term or reset the filters.</p></div>';
        return;
      }
      productGrid.innerHTML = visible.map(p => `
        <article class="product-card">
          <div class="product-visual" style="background:${p.bg}">
            <span>${p.icon}</span><span class="product-category">${p.category}</span>
          </div>
          <div class="product-info"><h3>${p.name}</h3><p>${p.description}</p>
            <div class="product-bottom"><span class="price">₹${p.price.toLocaleString("en-IN")}</span><span class="product-id">${p.id}</span></div>
          </div>
        </article>`).join("");
    };
    [search, category, sort].forEach(el => el.addEventListener("input", render));
    document.getElementById("resetProducts").addEventListener("click", () => {
      search.value = ""; category.value = "all"; sort.value = "featured"; render();
    });
    render();
  }

  // Weather demo using Open-Meteo geocoding and forecast APIs (no API key required).
  const weatherForm = document.getElementById("weatherForm");
  if (weatherForm) {
    const cityInput = document.getElementById("cityInput");
    const status = document.getElementById("weatherStatus");
    const result = document.getElementById("weatherResult");
    const describe = code => {
      if (code === 0) return "Clear sky";
      if ([1,2,3].includes(code)) return "Mainly clear / partly cloudy";
      if ([45,48].includes(code)) return "Foggy conditions";
      if ([51,53,55,56,57].includes(code)) return "Drizzle";
      if ([61,63,65,66,67,80,81,82].includes(code)) return "Rain showers";
      if ([71,73,75,77,85,86].includes(code)) return "Snow";
      if ([95,96,99].includes(code)) return "Thunderstorm";
      return "Current conditions";
    };
    weatherForm.addEventListener("submit", async event => {
      event.preventDefault();
      const city = cityInput.value.trim();
      if (!city) { status.textContent = "Please enter a city name."; status.className = "form-status error"; return; }
      status.textContent = "Fetching current weather…";
      status.className = "form-status";
      result.innerHTML = "";
      try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        if (!geoResponse.ok) throw new Error("Could not contact the location service.");
        const geoData = await geoResponse.json();
        if (!geoData.results || !geoData.results.length) throw new Error("City not found. Check the spelling and try again.");
        const place = geoData.results[0];
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`);
        if (!weatherResponse.ok) throw new Error("Could not retrieve weather data.");
        const data = await weatherResponse.json();
        const current = data.current;
        const placeName = [place.name, place.admin1, place.country].filter(Boolean).join(", ");
        result.innerHTML = `<div class="weather-data">
          <div class="weather-main"><div><div class="weather-city">${placeName}</div><div class="weather-desc">${describe(current.weather_code)} · Updated ${current.time.replace("T"," ")}</div></div><div class="weather-temp">${Math.round(current.temperature_2m)}°C</div></div>
          <div class="weather-stat"><span>Feels like</span><strong>${Math.round(current.apparent_temperature)}°C</strong></div>
          <div class="weather-stat"><span>Humidity</span><strong>${current.relative_humidity_2m}%</strong></div>
          <div class="weather-stat"><span>Wind speed</span><strong>${current.wind_speed_10m} km/h</strong></div>
          <div class="weather-stat"><span>Precipitation</span><strong>${current.precipitation} mm</strong></div>
        </div>`;
        status.textContent = "Weather updated successfully.";
      } catch (error) {
        status.textContent = error.message || "Something went wrong. Please try again.";
        status.className = "form-status error";
        result.innerHTML = '<div class="weather-empty"><span>☁</span><h2>Could not load weather</h2><p>Check your internet connection and try again.</p></div>';
      }
    });
  }

  // Tasks persist in LocalStorage on this browser.
  const taskForm = document.getElementById("taskForm");
  if (taskForm) {
    const input = document.getElementById("taskInput");
    const list = document.getElementById("taskList");
    const empty = document.getElementById("taskEmpty");
    const summary = document.getElementById("taskSummary");
    const remaining = document.getElementById("taskRemaining");
    const filterButtons = [...document.querySelectorAll("[data-task-filter]")];
    let currentFilter = "all";
    let tasks = [];
    try { tasks = JSON.parse(localStorage.getItem("devendra-web-lab-tasks") || "[]"); }
    catch { tasks = []; }
    const save = () => {
      try { localStorage.setItem("devendra-web-lab-tasks", JSON.stringify(tasks)); }
      catch { /* Storage may be disabled; the current session still works. */ }
    };
    const render = () => {
      const shown = tasks.filter(t => currentFilter === "all" || (currentFilter === "active" && !t.done) || (currentFilter === "completed" && t.done));
      list.innerHTML = shown.map(t => `<li class="task-item ${t.done ? "completed" : ""}" data-id="${t.id}">
        <input class="task-check" type="checkbox" aria-label="Mark task complete" ${t.done ? "checked" : ""}>
        <span class="task-text"></span><button class="task-delete" type="button" aria-label="Delete task">×</button>
      </li>`).join("");
      shown.forEach(t => {
        const row = list.querySelector(`[data-id="${t.id}"]`);
        row.querySelector(".task-text").textContent = t.text;
        row.querySelector(".task-check").addEventListener("change", () => {
          t.done = !t.done; save(); render();
        });
        row.querySelector(".task-delete").addEventListener("click", () => {
          tasks = tasks.filter(item => item.id !== t.id); save(); render();
        });
      });
      const done = tasks.filter(t => t.done).length;
      const left = tasks.length - done;
      summary.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"}`;
      remaining.textContent = `${left} remaining`;
      empty.hidden = shown.length > 0;
      if (tasks.length === 0) empty.querySelector("p").textContent = "Nothing here yet. Add your first task above.";
      else if (shown.length === 0) empty.querySelector("p").textContent = "No tasks match this filter.";
      filterButtons.forEach(b => b.classList.toggle("active", b.dataset.taskFilter === currentFilter));
    };
    taskForm.addEventListener("submit", event => {
      event.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      tasks.unshift({id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, done:false});
      save(); input.value = ""; render(); input.focus();
    });
    filterButtons.forEach(button => button.addEventListener("click", () => { currentFilter = button.dataset.taskFilter; render(); }));
    document.getElementById("clearCompleted").addEventListener("click", () => {
      tasks = tasks.filter(t => !t.done); save(); render();
    });
    render();
  }
});
