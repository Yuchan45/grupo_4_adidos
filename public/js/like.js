async function like(id) {
    const url = '/products/favorites/' + id;
    const btn = document.querySelector('#heart-' + id);

    const options = {
        method: 'POST',
        body: ''
    };

    const response = await fetch(url, options);
    const data = await response.text();
    

    if (data=='True') {
        btn.classList.add("active-fav");
    } else {
        btn.classList.remove("active-fav");
    }

}