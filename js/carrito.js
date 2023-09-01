const btnCarrito = document.getElementById("btnCarrito");
const btnCerrarCarrito = document.getElementById("btnCerrarCarrito");
const containerProductosCarrito = document.querySelector(".contenedor-productos");
const cuerpoCarrito = document.querySelector(".cuerpo-carrito");
const footerCarrito = document.querySelector(".footer-carrito");
const contadorAdentro = document.getElementById("contadorAdentro");
const contadorAfuera = document.getElementById("contadorAfuera");


const vistaCarrito = () => {
    containerProductosCarrito.innerHTML = "";
    
    carrito.forEach((el) => {
        //CREAR PRODUCTO EN CARRITO
        const productoEnCarrito = document.createElement("div");
        productoEnCarrito.className = "producto-carrito";
        productoEnCarrito.innerHTML = `
        <p>${el.cantidad}</p>
        <img src="${el.img}" alt="">
        <div>
            <h3>${el.nombre}</h3>
            <p>$${el.precio}</p>
        </div>
        <i class="fa-solid fa-xmark btn-borrar-${el.id}"></i>
        `;
    
        containerProductosCarrito.append(productoEnCarrito);
        
        const botonBorrar = document.querySelector(".btn-borrar-"+ el.id);

        botonBorrar.addEventListener(`click`, () => {
            eliminarProducto (el.id);
            Toastify({
                text: "Se quitó del carrito correctamente",
                duration: 2000,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                className: "info",
                style: {
                    background: "linear-gradient(to right, #e71010, #df5555)",
                }
            }).showToast();
        })
    })

    contador();

    const precioTotal = carrito.reduce((acumulador, el) => acumulador + (el.precio * el.cantidad), 0);
    
    footerCarrito.innerHTML = "";

    const totalCarrito = document.createElement("div");
    totalCarrito.className = "total-carrito";
    totalCarrito.innerHTML = `
    <h3>TOTAL</h3>
    <p>$${precioTotal}</p>
    <button>COMPRAR</button>
    `;
    footerCarrito.append(totalCarrito);
} 

btnCarrito.addEventListener(`click`, () => {
    cuerpoCarrito.classList.toggle("cuerpo-carrito-oculto");
    vistaCarrito();
})

btnCerrarCarrito.addEventListener(`click`, () => {
    cuerpoCarrito.classList.toggle("cuerpo-carrito-oculto");
})

const eliminarProducto = (id) => {

    const idProductoABorrar = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== idProductoABorrar;
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    vistaCarrito();
}

const contador = () => {
    const contadorTotal = carrito.reduce((acumulador, el) => acumulador + el.cantidad, 0);
    contadorAfuera.innerText = `${contadorTotal}`
    contadorAdentro.innerText = `TU CARRITO (${contadorTotal})`
}

contador();