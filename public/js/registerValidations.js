const formulario = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	fullname: /^[a-zA-Z0-9\_\-]{2,20}$/, // Letras, numeros, guion y guion_bajo
	username: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,16}$/, // 8 a 16 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos = {
    fullname: false,
    username: false,
    password: false,
    email: false
}

const validarFormulario = (e) => {
    let nameTxt = document.querySelector("#fullName");
    let userTxt = document.querySelector("#userName");
    let passwordTxt = document.querySelector("#passwordText"); 
    let emailTxt = document.querySelector("#emailText");



    switch (e.target.name) {
        case "fullname": 
            if (expresiones.fullname.test(e.target.value)) {
                nameTxt.innerHTML = ""
                document.getElementById('formFullname').classList.remove('text-danger')
                campos['fullname'] = true;
            } else {
                nameTxt.innerHTML = "Debe contener minimos 2 caracteres."
                document.getElementById('formFullname').classList.add('text-danger')
                campos['fullname'] = false;
            }
        break;

        case "username": 
            if (expresiones.username.test(e.target.value)) {
                userTxt.innerHTML = ""
                document.getElementById('formUsername').classList.remove('text-danger')
                campos['username'] = true;
            } else {
                userTxt.innerHTML = "Debe contener minimos 2 caracteres validos."
                document.getElementById('formUsername').classList.add('text-danger')
                campos['username'] = false;
            }
        break;

        case "password": 
            if (expresiones.password.test(e.target.value)) {
                passwordTxt.innerHTML = ""
                document.getElementById('formPassword').classList.remove('text-danger')
                campos['password'] = true;
            } else {
                passwordTxt.innerHTML = "Debe contener entre 8 a 16 caracteres validos."
                document.getElementById('formPassword').classList.add('text-danger')
                campos['password'] = false;
            }
        break;

        case "email": 
            if (expresiones.email.test(e.target.value)) {
                emailTxt.innerHTML = ""
                document.getElementById('formEmail').classList.remove('text-danger')
                campos['email'] = true;
            } else {
                emailTxt.innerHTML = "Debe ingresar un mail valido."
                document.getElementById('formEmail').classList.add('text-danger')
                campos['email'] = false;
            }
        break;
    }
} 

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

