const main = document.getElementById("main");
const searchInput = document.getElementById("input");
const sortSelect = document.getElementById("select");

let products;
let currentList;
fetchProducts();

searchInput.addEventListener('input', () => filterList(searchInput.value));
sortSelect.addEventListener('change', () => sortList(sortSelect.value));

async function fetchProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        products = data.products;
        currentList = products;
        displayList(currentList);

    } catch (err) {
        console.log(err);
    }
}

function displayList(list) {
    main.innerHTML="";
    list.forEach(product => create(product));
}

function create(product) {
    let productContainer = document.createElement('div');
    productContainer.classList.add('product_container');

    let textContainer = document.createElement('div');
    textContainer.classList.add('text_container');

    let title = document.createElement('h2');
    title.textContent = product.title;

    let description = document.createElement('p');
    description.textContent = product.description;            

    let image = document.createElement('img');
    image.src = product.thumbnail;   

    textContainer.appendChild(title);
    textContainer.appendChild(description);
    productContainer.appendChild(textContainer)
    productContainer.appendChild(image);

    console.log("create");
    main.appendChild(productContainer);
}

function filterList(query) {
    console.log("filter");

    currentList = products.filter( product =>  
        product.title.toLowerCase().includes(query.toLowerCase()) 
        //|| product.description.toLowerCase().includes(query.toLowerCase())
    );

    sortList(currentList, sortSelect.value);
}

function sortList(type) {
    console.log("sort");
    
    let sortedList = [...currentList]

    switch(type) {
        case "asc":
            sortedList.sort((a, b) => {
            return a.title.localeCompare(b.title);
            });
            break;
        case "desc":
            sortedList.sort((a, b) => {
            return - a.title.localeCompare(b.title);
            });
            break;
    }

    displayList(sortedList);
}