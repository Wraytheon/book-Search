document.querySelector("button").addEventListener("click", getFetch);
/*Hide image on page load*/
document.querySelector("img").style.display = 'none'


function getFetch() {
  const isbn = document.querySelector("input").value;
  console.log(isbn)
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
    /* Variable holding the prefix for accessing the data*/
      const dataPrefix = data[`ISBN:${isbn}`]

      /*Title data retrieval and display*/
      const title = dataPrefix.title
      document.querySelector("h2").innerText = title
      console.log(title)
      /*Isbn data display*/
      document.querySelector("h3").innerText = isbn

      /*Author data retrieval and display*/
      const author = dataPrefix.authors[0].name
      document.querySelector('h4').innerText = author
      console.log(author)

      /*Cover image retrieval and display*/
      const coverImg = dataPrefix.cover.medium
      console.log(coverImg)
      document.querySelector('img').src = coverImg;
      /*Display image*/
      document.querySelector("img").style.display = "initial"
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

/*9780399501487
9781841953922
9780142437339
*/
