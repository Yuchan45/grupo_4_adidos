window.addEventListener("load", function() {
    let nameInput = document.querySelector("#nameInput");
    let nameTxt = document.querySelector("#fullName");

    nameInput.addEventListener("keypress", function() {
        
        console.log(1)
        nameTxt.innerHTML = "Hola"
    })
})