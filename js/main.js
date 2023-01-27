document.querySelector('button').addEventListener('click', getFetch)
/* Loads local storage on page load and place it in DOM*/
document.querySelector('p').innerText = localStorage.getItem('books');

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.title)
        /*If no books have inputted yet, the first local storage value will be 'null' so this replaces 'null' with the first input*/
        if(!localStorage.getItem('books')) {
            localStorage.setItem('books', data.title)
        } else {
            /*When button is clicked, everything that is already stored in the local storage under keyname 'books' as string concatenated with the title just inputted: Example: Bible ; Atomic Habits*/
            let books = localStorage.getItem('books') + " ; " + data.title

            /*Create local storage holder that stores entire concatenated string of inputted books*/
            localStorage.setItem('books', books)
        }
        // /*Retrieve titles from localStorage and place in DOM*/
        document.querySelector('p').innerText = localStorage.getItem('books');
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

