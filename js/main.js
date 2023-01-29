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
            /*Display carousel */
            document.getElementById('carousel').style.display = 'initial';

            /*Create local storage holder that stores entire concatenated string of inputted books*/
            localStorage.setItem('books', books)
        }
        // /*Retrieve titles from localStorage and place in DOM*/
        document.querySelector('p').innerText = localStorage.getItem('books');

        /*Display book cover*/
        console.log(data.covers)
        /*Plug the id retrieved from data.covers into the cover images template url*/
        const coverUrl = `https://covers.openlibrary.org/b/id/${data.covers}-S.jpg`
        console.log(coverUrl);
        /*Show the cover*/
        document.querySelector('img').src = coverUrl;

        /* Carousel */
        const carousel = document.getElementById("carousel");
        const currentImage = document.getElementById("current-image");
        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");

        // List of image URLs
        const images = [];

        const addImages = data.map(image => image.coverUrl);

        /* Starting index for image urls array*/
        let currentIndex = 0;

        // Update the current image
        function updateCurrentImage() {
        currentImage.src = images[currentIndex];
        }

        // Show the previous image
        prevBtn.addEventListener("click", function() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        updateCurrentImage();
        });

        // Show the next image
        nextBtn.addEventListener("click", function() {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        updateCurrentImage();
        });

        // Initialize the carousel
        updateCurrentImage();
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

