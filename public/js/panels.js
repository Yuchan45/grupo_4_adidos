const panels = document.querySelectorAll('.panel');
panels.forEach(panel => panel.addEventListener('click', toggleOpenActive));

function toggleOpenActive() {
    this.classList.toggle('open');
    setTimeout(()=> {
        this.classList.toggle('open-active');
    }, 500)
}
