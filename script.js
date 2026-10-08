// 1. Select the elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// 2. Data: an array of note objects
const STORAGE_KEY = "quicknotes";
const MAX_LENGTH = 200;

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();

// 3. Count message for zero, one and many notes
function countMessage(total) {
  if (total === 0) return "You have no notes yet.";
  if (total === 1) return "You have 1 note.";
  return `You have ${total} notes.`;
}

// 4. Rebuild the list from the array (textContent only, never innerHTML)
function render() {
  list.replaceChildren();

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const info = document.createElement("div");

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("small");
    meta.classList.add("note-meta");
    meta.textContent = `${note.category} · ${note.createdAt}`;

    info.append(text, meta);

    const del = document.createElement("button");
    del.type = "button";
    del.classList.add("delete-btn");
    del.textContent = "Delete";
    del.addEventListener("click", () => deleteNote(note.id));

    li.append(info, del);
    list.append(li);
  });

  count.textContent = countMessage(notes.length);
}

function validateNote(text) {
  if (text === "") return "A note cannot be empty.";
  if (text.length > MAX_LENGTH) {
    return `A note must be ${MAX_LENGTH} characters or fewer (yours is ${text.length}).`;
  }
  return "";
}

// 5. Add and delete
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// 6. Form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  const error = validateNote(text);

  if (error) {
    errorMessage.textContent = error;
    input.focus();
    return;
  }

  errorMessage.textContent = "";
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

input.addEventListener("input", () => {
  errorMessage.textContent = "";
});

// 7. Draw once on load
render();