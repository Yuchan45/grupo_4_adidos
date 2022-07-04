const dropdownButtons = document.querySelectorAll('#drop-btn');

document.addEventListener('click', unToggleDropdown);

dropdownButtons.forEach(button => {
    button.addEventListener('click', toggleDropdown);
});

function toggleDropdown(e) {
    let tabText = this.childNodes[1];
    dropdownMenu = this.nextElementSibling;
    tabReset();
    tabText.classList.add('active-tab');
    dropdownMenu.classList.add('dropdown-active');
}

function unToggleDropdown(e) {
    // Si, ya se que esta hecho a lo negro pero no se por que haciendolo como se debe no me toma el notification... 
    // No toma cuando le agrego el data-dropdown-button al notification...
    const isDropdownBtn = e.target.matches('[data-dropdown-button]');
    const notifElement = e.target.parentElement.parentElement;  // Xq el target al hacer click sobre el notif, agarra el svg... Asi que hay que buscar el abuelo
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
}

function tabReset() {
    dropdownButtons.forEach(tab => {
        // Debo resetear los tabs al clickear en alguno.
        let tabText = tab.childNodes[1];
        let dropdownContainer = tab.nextElementSibling;
        tabText.classList.remove('active-tab');
        dropdownContainer.classList.remove('dropdown-active');
    });
}


// ****************** Addressing *******************
const loginBtn = document.querySelector('#login-link');
const registerBtn = document.querySelector('#register-link');
const logoutBtn = document.querySelector('#logout-link');

loginBtn.addEventListener('click', ()=> {
    window.location.href = "/user/login";
});

registerBtn.addEventListener('click', ()=> {
    window.location.href = "/user/register";
});

logoutBtn.addEventListener('click', ()=> {
    window.location.href = "";
});