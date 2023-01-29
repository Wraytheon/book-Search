document.querySelector('button').addEventListener('click', getFetch)
/* Loads local storage on page load and place it in DOM*/
document.querySelector('p').innerText = localStorage.getItem('bookTitle');
/*Loads locally stored cover images on page load and place them in DOM*/
document.querySelector('img').src = localStorage.getItem('coverImage');

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.title)
        /*If no bookTitle have inputted yet, the first local storage value will be 'null' so this replaces 'null' with the first input*/
        if(!localStorage.getItem('bookTitle')) {
            /*Store book titles*/
            localStorage.setItem('bookTitle', data.title)

            /*Store cover images*/
            const imageUrlString = JSON.stringify(images)

            localStorage.setItem('coverImage', imageUrlString)


        } else {
            /*When button is clicked, everything that is already stored in the local storage under keyname 'bookTitle' as string concatenated with the title just inputted: Example: Bible ; Atomic Habits*/
            let title = localStorage.getItem('bookTitle') + " ; " + data.title

            /*Create local storage holder that stores entire concatenated string of inputted bookTitle*/
            localStorage.setItem('bookTitle', title)

            // let covers = localStorage.getItem('

            /*Display carousel */
            document.getElementById('carousel').style.display = 'initial';
        }
        // /*Retrieve titles from localStorage and place in DOM*/
        document.querySelector('p').innerText = localStorage.getItem('bookTitle');

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

        data.forEach(image => {
            images.push(image.covers);
          });

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

