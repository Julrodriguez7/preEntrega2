const containerItems = document.getElementById("containerItems");
const seccionDetalle = document.querySelector(".seccion-detalle");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//CREAR ITEMS EN TIENDA
productos.forEach((el) => {
    const item = document.createElement ("div");
    item.className = "item";
    item.innerHTML = `
    <img src="${el.img}" alt="">
    <h3>${el.nombre}</h3>
    <p>$${el.precio}</p>
    <div class="footer-item" id="contenedor-${el.id}">

    </div>
    `;

    containerItems.append(item);

    const contenedorBotones = document.getElementById("contenedor-" + el.id);

    //CREAR ICONO DETALLE PRODUCTO
    const btnDetalle = document.createElement ("i");
    btnDetalle.classList.add("fa-solid", "fa-plus", "btn-detalle");

    contenedorBotones.appendChild(btnDetalle);
    
    //ACCIÓN MOSTRAR DETALLE
    btnDetalle.addEventListener(`click`, (e) => {

        seccionDetalle.innerHTML = ""
        seccionDetalle.style.display = "block";
        const detalle = e.target.classList.contains("btn-detalle");
        
        if(detalle){
            const mostrarDetalle = document.createElement("div");
            mostrarDetalle.className = "container-detalle";
            mostrarDetalle.innerHTML = `
            <div class="detalle-producto">
            <div class="header-detalle">
                <img src="../img/icono.png" alt="">
                <h3>Descripción</h3>
                <i class="fa-regular fa-rectangle-xmark" id="cerrarDetalle"></i>
            </div>
            <p>${el.descripcion}</p>
            </div>
            `
            seccionDetalle.append(mostrarDetalle);
        }

        const btnCerrarDetalle = document.querySelector("#cerrarDetalle");

        btnCerrarDetalle.addEventListener(`click`, () => {
            seccionDetalle.style.display = "none";
        })
    })

    //CREAR ICONO AGREGAR CARRITO
    const btnAgregarCarrito = document.createElement ("i");
    btnAgregarCarrito.classList.add("fa-solid", "fa-cart-plus", "btn-agregar");

    contenedorBotones.appendChild(btnAgregarCarrito);

    //ACCIÓN AGREGAR CARRITO
    btnAgregarCarrito.addEventListener(`click`, () => {
        const buscarProductoRepetido = carrito.some((enCarrito) => enCarrito.id === el.id);

        const ingresoProductos = {
            cantidad: 1,
            id: el.id,
            nombre: el.nombre,
            precio: el.precio,
            img: el.img,
        };

        //AGREGAR CANTIDAD
        if(buscarProductoRepetido){
            carrito.map((enCarrito) => {
                if (enCarrito.id === el.id){
                    return enCarrito.cantidad++
                };
            })
        }else{    
            carrito = [...carrito, ingresoProductos];
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        Toastify({
            text: "Se agregó al carrito correctamente",
            duration: 2000,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            className: "info",
            style: {
                background: "linear-gradient(to right, #05b90b, #5adf55)",
            }
        }).showToast();
        vistaCarrito();
    })
})