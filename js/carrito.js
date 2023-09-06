
const datosCompra = {
    nombre:"",
    apellido:"",
    dni:"",
    email:"",
}

//FUNCIÓN ELIMINAR PRODUCTO
const eliminarProducto = (id) => {

    const idProductoABorrar = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== idProductoABorrar;
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    vistaCarrito();
}

//FUNCIÓN CONTAR PRODUCTOS
const contador = () => {
    const contadorTotal = carrito.reduce((acumulador, el) => acumulador + el.cantidad, 0);
    contadorAfuera.innerText = `${contadorTotal}`
    contadorAdentro.innerText = `TU CARRITO (${contadorTotal})`
}

//FUNCION CONTENIDO DEL CARRITO
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

        //ACCIÓN BORRAR
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

    //CALCULAR PRECIO TOTAL Y CANTIDAD DE PRODUCTOS
    contador();

    const precioTotal = carrito.reduce((acumulador, el) => acumulador + (el.precio * el.cantidad), 0);
    
    footerCarrito.innerHTML = "";

    const totalCarrito = document.createElement("div");
    totalCarrito.className = "total-carrito";
    totalCarrito.innerHTML = `
    <h3>TOTAL</h3>
    <p>$${precioTotal}</p>
    <button class="boton-comprar">COMPRAR</button>
    `;
    footerCarrito.append(totalCarrito);

    const btnComprar = document.querySelector(".boton-comprar");

    //ACCION COMPRAR
    btnComprar.addEventListener(`click`, () => {
        
        if(carrito.length !== 0){
            seccionCompra.style.display = "block";
            productosComprados.innerHTML = ``;
            carrito.forEach((el) => {
                const productoEnCompra = document.createElement("div");
                productoEnCompra.className = "producto-compra";
                productoEnCompra.innerHTML = `
                <p>${el.cantidad}</p>
                <img src="${el.img}" alt="">
                <div>
                    <h3>${el.nombre}</h3>
                    <p>$${el.precio}</p>
                </div>    
                `
                productosComprados.append(productoEnCompra);
            })

            totalCompra.innerHTML = ``;

            const totalDeCompra = document.createElement("p");
            totalDeCompra.innerHTML = `
            TOTAL: $${precioTotal}
            `
            totalCompra.append(totalDeCompra);

            const inputsCompra = document.querySelectorAll("#input");

            inputsCompra.forEach((element) => {
                element.addEventListener("input", (event) => {
                    if(event.target.name === "nombre"){
                        datosCompra.nombre = event.target.value;
                    }
                    if(event.target.name === "apellido"){
                        datosCompra.apellido = event.target.value;
                    }
                    if(event.target.name === "dni"){
                        datosCompra.dni = event.target.value;
                    }
                    if(event.target.name === "email"){
                        datosCompra.email = event.target.value;
                    }
                });
            })

            btnConfirmarCompra.addEventListener(`click`, () => {

                Swal.fire({
                    title:`<strong>Gracias ${datosCompra.nombre} ${datosCompra.apellido} su compra se registró con éxito.</strong>`,
                    icon: 'success',
                    html:
                        `Nos comunicaremos vía email para coordinar método de pago y forma de envío.`,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up" onclick="location.reload()"> C o n t i n u a r</i>',
                })
                
                localStorage.clear();
            })

        
        }else{
            Swal.fire({
                icon: 'error',
                title: 'NO HAY ARTÍCULOS EN EL CARRITO',
                showConfirmButton: false,
                timer: 1500
              })
        }

    })

    btnCerrarCompra.addEventListener(`click`, () => {
        seccionCompra.style.display = "none";
    })

} 

btnCarrito.addEventListener(`click`, () => {
    cuerpoCarrito.classList.toggle("cuerpo-carrito-oculto");
    vistaCarrito();
})

btnCerrarCarrito.addEventListener(`click`, () => {
    cuerpoCarrito.classList.toggle("cuerpo-carrito-oculto");
})

contador();
