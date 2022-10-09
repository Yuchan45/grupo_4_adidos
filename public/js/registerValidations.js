const formulario = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	fullname: /^[a-zA-Z0-9\_\-]{2,16}$/, // Letras, numeros, guion y guion_bajo
	username: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,16}$/, // 8 a 16 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const validarFormulario = (e) => {
    let nameTxt = document.querySelector("#fullName");


    switch (e.target.name) {
        case "fullname": 
            if (expresiones.fullname.test(e.target.value)) {
                nameTxt.innerHTML = ""
                document.getElementById('formFullname').classList.remove('text-danger')
            } else {
                nameTxt.innerHTML = "Debe contener minimo 2 caracteres."
                document.getElementById('formFullname').classList.add('text-danger')
            }
        break;

        case "username": 
            if (expresiones.username.test(e.target.value)) {
                nameTxt.innerHTML = ""
                document.getElementById('formUsername').classList.remove('text-danger')
            } else {
                nameTxt.innerHTML = "Debe contener minimo 2 caracteres."
                document.getElementById('formUsername').classList.add('text-danger')
            }
        break;

        case "password": 
            if (expresiones.username.test(e.target.value)) {
                nameTxt.innerHTML = ""
                document.getElementById('formPassword').classList.remove('text-danger')
            } else {
                nameTxt.innerHTML = "Debe contener minimo 8 caracteres."
                document.getElementById('formPassword').classList.add('text-danger')
            }
        break;

        case "email": 

        break;
    }
} 

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});



formulario.addEventListener("submit", (e) => {
    e.preventDefault();
});












// window.addEventListener("load", function() {
//     let nameInput = document.querySelector("#nameInput");
//     let nameTxt = document.querySelector("#fullName");

//     nameInput.addEventListener("submit", function() {
        
//         if (nameInput.value.lenght < 2) {
//             console.log("error")
//         }

//         console.log(1)
//         nameTxt.innerHTML = "Hola"
//     })
// })


// window.addEventListener("load", function() {

//     let form = this.document.querySelector("form")

//     form.addEventListener('submit', function(e){

//         let nameInput = document.querySelector("#nameInput");
//         console.log(nameInput)

//     })



//     // let nameInput = document.querySelector("#nameInput");
//     // let nameTxt = document.querySelector("#fullName");

//     // nameInput.addEventListener("submit", function(e) {
//     //     e.preventDefault();

//     //     if (nameInput.value == "") {
//     //         console.log(1)
//     //     }


//     //     // console.log(1)
//     //     // nameTxt.innerHTML = "Hola"
//     // })
// })