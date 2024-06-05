import { servicesProducts } from "../service/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard (name, price, image, id){
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="img-container">
    <img class="image" src="${image}" alt="${name}">
<div class="card-container--info">
    <p>${name}</p>
<div class="card-container--value" >
    <p>${price}</p>
    <button class="delete-button" data-id="${id}">
    <img src="./imagen/icons8-eliminar-48.png" alt="eliminar">
</button>
</div>
</div>
</div>`
;
productContainer.appendChild(card);
return card;
}

const render = async () => {
    try {
    const listProducts = await servicesProducts.productList();
    
    listProducts.forEach(product => {
      productContainer.appendChild(
        createCard(
            product.name,
            product.price,
            product.image,
            product.id
        )
      )  
    });

} catch (error){
        console.log(error);
    }
};


form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts
    .createProducts(name, price, image)
    .then((res)=>console.log(res))
    .catch((err)=> console.log(err));
});


function deleteCard(cardElement) {
    cardElement.remove();
}

productContainer.addEventListener("click", (event) => {
    // Verifica si el clic ocurrió en un botón de clase "delete-button"
    if (event.target.classList.contains("delete-button")) {
        // Elimina la tarjeta del DOM
        deleteCard(event.target.closest('.card'));
        
        // Obtiene el ID del producto a eliminar del atributo data-id del botón
        const productId = event.target.dataset.id;
       
        // Llama a la función para eliminar el producto del backend
        servicesProducts
            .deleteProduct(productId)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }
});

render();