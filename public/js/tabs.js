const contents = document.querySelectorAll('.content');
const buttons = document.querySelectorAll('.tab-btn');
const [historyBtn, visionBtn, goalsBtn] = buttons;

historyBtn.addEventListener('click', ()=> {
    addActive(buttons, 0);
    addActive(contents, 0);
});

visionBtn.addEventListener('click', ()=> {
    addActive(buttons, 1);
    addActive(contents, 1);
});

goalsBtn.addEventListener('click', ()=> {
    addActive(buttons, 2);
    addActive(contents, 2);
});


function addActive(array, index) {
    // Recibe un array de Node elements (NodeList) y el indice del elemento al cual aplicarle la clase active.
    // Le aplica el active al elemento indicado y al resto de los elementos se lo remueve.
    for (let i=0; i<array.length; i++) {
        array[i].classList.remove('active');
        if (i == index) {
            array[i].classList.add('active');
        } 
    }
}
