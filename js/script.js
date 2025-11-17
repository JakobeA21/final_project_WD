// script.js - basic interactive behaviors and API placeholders
// Comments included to satisfy assignment requirement explaining key sections.

// Wait for DOM ready
document.addEventListener('DOMContentLoaded', function () {
  // Example 1: populate "news" feed on the home page
  populateNewsFeed();

  // Example 2: populate events list on events page
  populateEventsList();

  // Example 3: populate dining menu on dining page
  populateDiningMenu();

  // Example event-driven behavior (buttons or dynamic UI)
  document.getElementById('cta-events')?.addEventListener('click', function (e) {
    // In a full app this might track analytics or fetch updated content.
    console.log('CTA Events clicked');
  });
});

/* ------------------------------
   API placeholder: getCampusHighlights()
   ------------------------------
   This function shows how you'd call a real API (using fetch).
   For the MVP we simulate the API with a short timeout.
*/
function getCampusHighlights() {
  // return fetch('https://api.example.com/highlights').then(r => r.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Welcome Back Week', summary: 'Games and food trucks on the quad.' },
        { id: 2, title: 'Career Fair', summary: 'Meet employers in the student center.' }
      ]);
    }, 600);
  });
}

function populateNewsFeed() {
  const el = document.getElementById('news-placeholder');
  if (!el) return;

  getCampusHighlights().then(items => {
    el.innerHTML = ''; // clear placeholder
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'list-group-item';
      div.innerHTML = `<strong>${escapeHtml(item.title)}</strong><div>${escapeHtml(item.summary)}</div>`;
      el.appendChild(div);
    });
  }).catch(err => {
    el.innerHTML = '<div class="list-group-item text-danger">Failed to load highlights.</div>';
    console.error(err);
  });
}

/* ------------------------------
   Events API placeholder
   ------------------------------ */
function getEvents() {
  // Example of how an events API would be called.
  // return fetch('/api/events').then(r => r.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'e1', name: 'Lecture: Modern Art', date: '2025-11-22', time: '6:00 PM', location: 'Auditorium' },
        { id: 'e2', name: 'Soccer Game: Lions vs Tigers', date: '2025-11-23', time: '2:00 PM', location: 'Field' }
      ]);
    }, 600);
  });
}

function populateEventsList() {
  const container = document.getElementById('events-list');
  if (!container) return;

  // Show loading state
  container.innerHTML = '<div class="col-12"><div class="spinner-border" role="status" aria-hidden="true"></div> Loading events...</div>';

  getEvents().then(events => {
    container.innerHTML = '';
    events.forEach(ev => {
      const col = document.createElement('div');
      col.className = 'col-md-6 mb-3';

      col.innerHTML = `
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title">${escapeHtml(ev.name)}</h3>
            <p class="card-text mb-2"><strong>${escapeHtml(ev.date)}</strong> — ${escapeHtml(ev.time)} • ${escapeHtml(ev.location)}</p>
            <div class="mt-auto">
              <button class="btn btn-sm btn-primary" onclick="rsvpEvent('${ev.id}')">RSVP</button>
              <button class="btn btn-sm btn-outline-secondary" onclick="viewEvent('${ev.id}')">View</button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  }).catch(err => {
    container.innerHTML = '<div class="col-12"><div class="alert alert-danger">Failed to load events.</div></div>';
    console.error(err);
  });
}

function rsvpEvent(eventId) {
  // In the completed app you'd POST to an endpoint. For now we show a confirmation.
  alert('RSVP recorded (placeholder) for ' + eventId);
  console.log('RSVP for', eventId);
}

function viewEvent(eventId) {
  // Would navigate to event details page; placeholder behavior:
  alert('Open event details for ' + eventId + ' (placeholder)');
}

/* ------------------------------
   Dining API placeholder
   ------------------------------ */
function getDiningMenu() {
  // return fetch('/api/dining/today').then(r => r.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { meal: 'Breakfast', items: ['Eggs', 'Pancakes', 'Fruit'] },
        { meal: 'Lunch', items: ['Grilled Chicken', 'Salad Bar', 'Soup'] },
        { meal: 'Dinner', items: ['Pasta', 'Veggie Stir Fry', 'Dessert'] }
      ]);
    }, 600);
  });
}

function populateDiningMenu() {
  const list = document.getElementById('menu-list');
  if (!list) return;

  getDiningMenu().then(menus => {
    list.innerHTML = '';
    menus.forEach(m => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `<strong>${escapeHtml(m.meal)}</strong>: ${escapeHtml(m.items.join(', '))}`;
      list.appendChild(li);
    });
  }).catch(err => {
    list.innerHTML = '<li class="list-group-item text-danger">Failed to load menu.</li>';
    console.error(err);
  });
}

/* ------------------------------
   Small helpers
   ------------------------------ */
function escapeHtml(str) {
  // Basic escaping to avoid injecting unsafe HTML from API data.
  return String(str).replace(/[&<>"'`=\/]/g, function (s) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    })[s];
  });
}
