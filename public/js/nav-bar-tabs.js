const dropdownButtons = document.querySelectorAll('#drop-btn');

document.addEventListener('click', e => {
        // console.log(e.target.className)
        const isDropdownBtn = e.target.matches('[data-dropdown-button]');
        const notifElement = e.target.parentElement.parentElement;
        const isNotificationBtn = notifElement.classList.contains('notification');

        if (!(isDropdownBtn || isNotificationBtn)) {
            dropdownButtons.forEach(tab => {
                let tabText = tab.childNodes[1];
                let dropdownContainer = tab.nextElementSibling;
                if (dropdownContainer.classList.contains('dropdown-active')) {
                    tabText.classList.remove('active-tab');
                    dropdownContainer.classList.remove('dropdown-active');
                }
            });
        }
});


dropdownButtons.forEach(button => {
    button.addEventListener('click', toggleDropdown);
});

function toggleDropdown(e) {
    //console.log(this); // Siempre retorna el elemento drop-btn
    let tabText = this.childNodes[1];
    dropdownMenu = this.nextElementSibling;

    tabText.classList.add('active-tab');
    dropdownMenu.classList.add('dropdown-active');
}



// ****************** Addressing *******************
const loginBtn = document.querySelector('#login-link');
const registerBtn = document.querySelector('#register-link');
const logoutBtn = document.querySelector('#logout-link');

loginBtn.addEventListener('click', ()=> {
    window.location.href = "login-form";
});

registerBtn.addEventListener('click', ()=> {
    window.location.href = "register-form";
});

logoutBtn.addEventListener('click', ()=> {
    window.location.href = "";
});