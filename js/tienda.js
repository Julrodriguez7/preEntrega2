const containerItems = document.getElementById("containerItems");


//CREAR ITEMS EN TIENDA
productos.forEach((product) => {
    const item = document.createElement ("div");
    item.className = "item";
    item.innerHTML = `
    <img src="${product.img}" alt="">
    <h3>${product.nombre}</h3>
    <p>$${product.precio}</p>
    <div class="footer-item">
        <i class="fa-solid fa-plus" id="btnDetalle"></i>
        <i class="fa-solid fa-cart-plus" id="btnAgregarCarrito"></i>
    </div>
    `;

    containerItems.append(item);
})