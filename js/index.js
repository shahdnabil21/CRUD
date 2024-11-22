var BookName = document.getElementById("BookName");
var WebsiteUrl = document.getElementById("WebsiteUrl");
var Submit = document.getElementById("Submit");
var form = document.getElementById("form");
var closeBtn = document.getElementById("closeiteam");
var inneriteam = document.getElementById("inneriteam");
var lightbox = document.querySelector(".light-box");
var innerbox = document.querySelector(".innerbox");

function isValidUrl(url) {
    var regex = /^(ftp|http|https):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
}
BookName.addEventListener('keyup',function(){
    if(BookName.value.length < 3 ){
        BookName.classList.add('is-invalid')
    }else{
        BookName.classList.replace('is-invalid','is-valid')
    }
})

WebsiteUrl.addEventListener('keyup',function(){
    if(!isValidUrl(WebsiteUrl.value)){
        WebsiteUrl.classList.add('is-invalid')
    }else{
        WebsiteUrl.classList.replace('is-invalid','is-valid')
    }
})


Submit.addEventListener("click", function(event) {
    // event.preventDefault(); 

    if (BookName.value.length < 3 || !isValidUrl(WebsiteUrl.value)) {
        inneriteam.classList.replace("d-none", "d-flex");
    } else {
        inneriteam.classList.replace("d-flex", "d-none"); 
        creatBook(); 
    }
});

function closeiteam(){
    inneriteam.classList.replace("d-flex", "d-none"); 
}
closeBtn.addEventListener("click",closeiteam)
document.addEventListener("keyup", function(e){
    if(e.key == 'Escape'){
        closeiteam()
    }
})


lightbox.addEventListener("click", function(e) {
    closeiteam();
});


innerbox.addEventListener("click", function(e) {
    e.stopPropagation(); 
});



var Books = [];

if (localStorage.getItem("store") != null) {
    Books = JSON.parse(localStorage.getItem("store"));
    displayBooks();
}

function creatBook() {
    var New = {
        BookName: BookName.value,
        WebsiteUrl: WebsiteUrl.value,
    }

    Books.push(New)
    localStorage.setItem("store", JSON.stringify(Books));
    console.log(New);

    displayBooks()
    clearInput()
}

function clearInput() {
    BookName.value = '';
    WebsiteUrl.value = '';
    BookName.classList.remove("is-valid")
    WebsiteUrl.classList.remove("is-valid")
}



function displayBooks() {
    var data = '';
    for (var i = 1; i < Books.length; i++) {
        data += `<tr>
                  <td scope="row">`+ (i) + `</td>
                  <td>`+ Books[i].BookName + `</td>
                  <td><a class="text-decoration-none" target='_blank' href="`+ Books[i].WebsiteUrl + `"><button class="btn btn-visit" ><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                  <td><button class="btn btn-danger"  onclick="deleteItem(`+ i + `)"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`
    }
    document.getElementById("bookTable").innerHTML = data

}

function deleteItem(index) {
    Books.splice(index, 1)
    displayBooks()
    localStorage.setItem("store", JSON.stringify(Books));

}

