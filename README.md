# QuickNotes

QuickNotes is a small web app for capturing short notes the moment you think of them. You can write a note, give it a category of personal, work or study, search through your notes, and delete the ones you no longer need. Everything is saved in your browser, so your notes are still there after you refresh the page or close the tab.

## Features

* Add notes of 1 to 200 characters, each with a category
* Clear error messages for empty notes and notes that are too long
* Each category has its own colour so notes are easy to tell apart
* Live search that ignores upper and lower case
* Delete any note with one click
* A count message that reads correctly for zero, one and many notes
* Notes saved with localStorage and restored when the page loads
* A layout that adapts to phones and computers

## How to run it locally

1. Clone the repository:

```bash
   git clone https://github.com/jaGaban747/quicknotes-app.git
```

2. Open the folder in VS Code or any editor that supports the Live Server extension.
3. Right click `index.html` and choose **Open with Live Server**.
4. You can also open `index.html` directly in a browser. There is nothing to install and no build step.

## Technologies used

HTML5, CSS3 (Flexbox and media queries) and vanilla JavaScript.

## What I learned

-->I learned to keep the notes array as the single source of truth. Every change updates the array, saves it, and then calls render() to redraw the list, so the screen always matches the data.

--> I learned that localStorage only stores text, so I use JSON.stringify to save the array and JSON.parse to load it back. I also learned to put user text on the page with textContent instead of innerHTML, so nothing a user types can run as code.
--> I learned how CSS specificity decides which rule wins. In an earlier exercise, an id selector overrode a class selector, and my red warning colour never showed until I changed the selector. Building the project in small stages, with a commit after each one, also made problems much easier to find.