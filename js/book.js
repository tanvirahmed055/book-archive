const button = document.getElementById("submit-btn");

button.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("book-detail").innerHTML = "";
    document.getElementById("book-items").innerHTML = "";
    const searchText = document.getElementById("input-value").value;
    //console.log(searchText);
    getBookData(searchText);

});


const getBookData = (bookName) => {
    bookCardDiv(`https://openlibrary.org/search.json?q=${bookName}`);
}


const fetchedData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


const bookCardDiv = url => {
    fetchedData(url)
        .then(data => {
            //console.log(data);

            data.docs.forEach(element => {
                //console.log(element);
                const bookContainer = document.getElementById("book-items");

                const bookDiv = document.createElement('div');

                bookDiv.className = "col m-auto";
                bookDiv.innerHTML = `<div class="card ">
                    <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${element.text[3]}</h5>
                      <h5 class="card-title">${element.author_name[0]}</h5>
                      <p class="card-text"></p>
                      <p class="card-text">$</p>
                    </div>
                  </div>`
                bookContainer.appendChild(bookDiv);
            });
        })

}

