const button = document.getElementById("submit-btn");

button.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("book-detail").innerHTML = "";
    document.getElementById("book-items").innerHTML = "";
    document.getElementById("count-detail").innerHTML = "";
    const searchText = document.getElementById("input-value").value;
    //console.log(searchText);

    if (searchText.length > 0) {
        document.getElementById("spinner").classList.remove("d-none");
        getBookData(searchText);
    } else {
        document.getElementById("error-message").innerHTML =
            "<p class='text-center p-3 bg-danger'><b>Please enter a book name</b></p>";
    }

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
            document.getElementById("spinner").classList.add("d-none");
            //console.log(data);
            const first30Books = data.docs.slice(0, 30);
            const bookContainer = document.getElementById("book-items");
            const countContainer = document.getElementById("count-detail");

            first30Books?.forEach(element => {
                //console.log(element);


                const bookDiv = document.createElement('div');

                bookDiv.classList.add = "col";
                bookDiv.innerHTML = `<div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${element?.cover_i ? element.cover_i : 10909258}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Book Name: ${element?.title}</h5>
                  <p class="card-text">>Author Name: ${element?.author_name?.slice(0, 10)}</p>
                  <p class="card-text">>Published Year: ${element?.first_publish_year}</p>
                  <p class="card-text">>Publisher Name: ${element?.publisher?.slice(0, 5)}</p>
                  
                </div>
              </div>`
                bookContainer.appendChild(bookDiv);
            });

            if (data.numFound > 0) {
                const searchCountDiv = document.createElement('div');
                searchCountDiv.innerHTML = `
            <div><h1 class="text-center">Showing first 30 results out of ${data.numFound} results<h1></div>
            `
                countContainer.appendChild(searchCountDiv);
            } else {
                errorMessage();
            }

        })

    document.getElementById("input-value").value = "";
}




const errorMessage = () => {
    const searchText = document.getElementById("input-value").value;
    const errorMessageDiv = document.getElementById("error-message");

    errorMessageDiv.innerHTML = `<div class="card m-auto p-5 bg-danger text-white" >
          <h1 class="card-title text-center">No Result Found</h1>
        </div>`;
};


