const main = document.getElementById("main");
const input = document.getElementById("input")
const select = document.getElementById("select")

let products;
fetchProducts()

input.addEventListener('input', event => filterList(products, input.value));
select.addEventListener('change', event => filterList(products, input.value));

async function fetchProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json()
        displayList(data.products);
        products = data.products

    } catch (err) {
        console.log(err)
    }
}

function displayList(list) {
    main.innerHTML=""
    list.forEach(element => create(element));
}

function create(product) {
    let productContainer = document.createElement('div');
    productContainer.classList.add('product_container');

    let textContainer = document.createElement('div');
    textContainer.classList.add('text_container');

    let title = document.createElement('h2')
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

function filterList(list, query) {
    console.log("filter");

    const newList = list.filter( product =>  
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    sortList(newList, select.value);
}

function sortList(list, type) {
    console.log("sort");
    
    let newList = [...list]

    switch(type) {
        case "null":
            newList = list;
            break;
        case "asc":
            newList.sort((a, b) => {
            return a.title.localeCompare(b.title);
            });
            break;
        case "desc":
            newList.sort((a, b) => {
            return -a.title.localeCompare(b.title);
            });
            break;
    }

    displayList(newList);
}