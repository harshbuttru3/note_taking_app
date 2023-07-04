let titleText = document.getElementById("noteTitle");
let noteText = document.getElementById("noteText");
let savebtn = document.getElementById("save");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

window.addEventListener("load", () => {
  displayNotes();
});

function displayNotes() {
  const noteList = document.getElementById("noteList");
  noteList.innerHTML = "";
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];

    const noteItem = document.createElement("li");
    noteItem.className = "note-item";

    const noteTitle = document.createElement("h2");
    noteTitle.className = "note-title";

    const noteText = document.createElement("p");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    noteTitle.innerHTML = note.title;
    noteText.innerHTML = note.text;
    deleteBtn.innerHTML = "Delete";

    noteItem.appendChild(noteTitle);
    noteItem.appendChild(noteText);
    noteItem.appendChild(deleteBtn);
    noteList.appendChild(noteItem);

    deleteBtn.addEventListener("click", () => {
      deleteNote(i); // Call deleteNote() with the index of the note
    });
  }
}

function deleteNote(index) {
  notes.splice(index, 1); // Remove the note from the notes array
  localStorage.setItem("notes", JSON.stringify(notes)); // Update the notes in local storage
  displayNotes(); // Refresh the displayed notes
}

savebtn.addEventListener("click", () => {
  let title = titleText.value.trim();
  let text = noteText.value.trim();
  if (titleText.value !== "" && noteText.value !== "") {
    const note = {
      title: title,
      text: text,
    };
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    titleText.value = "";
    noteText.value = "";
    displayNotes();
  }
});

let notebtn = document.getElementById("display");
notebtn.addEventListener("click", () => {
  let x = document.getElementById("displayNotes");
  // x.style.display = "block"
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
});
let notebtn = document.getElementById("displayMobile");
notebtn.addEventListener("click", () => {
  let x = document.getElementById("displayNotes");
  // x.style.display = "block"
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
});

document.getElementById("clearbtn").addEventListener("click", () => {
  titleText.value = "";
  noteText.value = "";
});

document.getElementById("clearNotes").addEventListener("click", () => {
  localStorage.removeItem("notes");
  notes = [];
  displayNotes();
});

const nameInput = document.getElementById("nameInput");

nameInput.addEventListener("input", () => {
  const editedName = nameInput.innerText;
  localStorage.setItem("name", editedName);
});

// Check if the name exists in localStorage and update the displayed name
const savedName = localStorage.getItem("name");
if (savedName) {
  nameInput.innerText = savedName;
}

const imageContainer = document.getElementById("imageContainer");
const image = document.getElementById("image");

const imageUrls = [
  "image1.jpeg",
  "image2.jpeg",
  "image3.jpeg",
  "image4.jpeg",
  "image5.jpeg",
  // Add more image URLs as needed
];

let currentIndex = 0;

// Check if there's a saved image index in localStorage
if (localStorage.getItem("currentIndex")) {
  currentIndex = parseInt(localStorage.getItem("currentIndex"));
  image.src = imageUrls[currentIndex];
} else {
  image.src = imageUrls[currentIndex];
}

imageContainer.addEventListener("click", (event) => {
  if (event.target === image) {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    const nextImageUrl = imageUrls[currentIndex];
    image.src = nextImageUrl;

    // Save the current index in localStorage
    localStorage.setItem("currentIndex", currentIndex.toString());
  }
});

window.addEventListener("load", () => {
  // Check if there's a saved image index in localStorage
  if (localStorage.getItem("currentIndex")) {
    currentIndex = parseInt(localStorage.getItem("currentIndex"));
    image.src = imageUrls[currentIndex];
  }
});
