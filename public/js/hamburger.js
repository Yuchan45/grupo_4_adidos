// Hamburger Menu interactions
const labels = document.querySelectorAll('.aside-menu nav a');
let menuBtn = document.getElementById("ham-menu");
let hamInner = document.querySelector('.ham-inner');
let aside = document.querySelector('.aside-menu');
let menuOpen = false;

function disableOverflow(flag) {
    // Recibe como parametro un booleano. Si es true, deshabilita el scroll. Si es false, lo habilita.
    let body = document.querySelector('body');
    if (flag == true){
        body.style.overflowY = 'hidden';
    } else {
        body.style.overflowY = 'auto';
    }
}

menuBtn.addEventListener('click', function() {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        aside.classList.add('active');
        document.body.style.overflow = "hidden";
        menuOpen = true;
    }else {
        menuBtn.classList.remove('open');
        aside.classList.remove('active');
        document.body.style.overflow = "auto";
        menuOpen = false;
    }
});

labels.forEach(function (label) {
    // Recide un array de labels y les agrega el evento onClick, el cual esconde el menuAside.
    label.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        aside.classList.remove('active');
    });
});