document.querySelector("button").addEventListener("click", getFetch);

/* Loads last inputted title, author, and image on page load and place it in DOM*/
document.querySelector("h2").innerText = localStorage.getItem("bookTitle");

document.querySelector("h3").innerText = localStorage.getItem("bookAuthor");

/*Hide image on page load*/
document.querySelector("img").src = localStorage.getItem("bookCover")


function getFetch() {
  const isbn = document.querySelector("input").value;
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {

      const dataPrefix = data[`ISBN:${isbn}`]

      const title = dataPrefix.title

      const author = dataPrefix.authors[0].name
      document.querySelector('h3').innerText = author
      console.log(author)

      const coverImg = dataPrefix.cover.medium
      console.log(coverImg)
      
      /*Show cover image */
      document.querySelector('img').src = coverImg;
      document.querySelector('img').style.display = "initial"

      console.log(dataPrefix.title)
      console.log(isbn)
      /*If no books have inputted yet, the first local storage value will be 'null' so this replaces 'null' with the first input*/
      if (!localStorage.getItem("bookTitle")) {
        localStorage.setItem("bookTitle", title);
        localStorage.setItem("bookAuthor", author);
        localStorage.setItem("bookImg", coverImg);

        console.log(title);
      } else {


        /* Show cover image */
        document.querySelector('img').style.display = 'initial';
      }

      localStorage.getItem("bookTitle")
      localStorage.getItem("bookAuthor")

      // /*Retrieve titles from localStorage and place in DOM*/
      document.querySelector("h2").innerText = title;
    //   const author = `https://openlibrary.org${data.authors[0]}.json`
    //   console.log(author)
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

/*9780399501487
9781841953922
9780142437339
*/
