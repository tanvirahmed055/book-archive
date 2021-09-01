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



