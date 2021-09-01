const button = document.getElementById("submit-btn");

button.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("book-detail").innerHTML = "";
    document.getElementById("book-items").innerHTML = "";
    document.getElementById("count-detail").innerHTML = "";
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
            const first20Books = data.docs.slice(0, 20);
            const bookContainer = document.getElementById("book-items");
            const countContainer = document.getElementById("count-detail");

            first20Books.forEach(element => {
                //console.log(element);


                const bookDiv = document.createElement('div');

                bookDiv.className = "col m-auto";
                bookDiv.innerHTML = `<div class="card h-100 mt-4 shadow rounded p-3">
                    <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h6 class="card-title fw-bold">Book Name: ${element.title}</h6>
                      <p class="card-text fw-bold">Author Name: ${element.author_name[0]}</p>
                      <p class="card-text fw-bold">Published Year: ${element.first_publish_year}</p>
                      <p class="card-text fw-bold">Publisher Name: ${element.publisher.slice(0, 10)}</p>
                    </div>
                  </div>`
                bookContainer.appendChild(bookDiv);
            });

            if (data.numFound > 0) {
                const searchCountDiv = document.createElement('div');
                searchCountDiv.innerHTML = `
            <div><h1 class="text-center">Showing first 20 results out of ${data.numFound} results<h1></div>
            `
                countContainer.appendChild(searchCountDiv);
            } else {
                errorMessage();
            }

        })


}




const errorMessage = () => {
    const searchText = document.getElementById("input-value").value;
    const errorMessageDiv = document.getElementById("error-message");

    errorMessageDiv.innerHTML = `<div class="card m-auto p-5 bg-danger text-white" >
          <h1 class="card-title text-center">No Result Found</h1>
        </div>`;
};