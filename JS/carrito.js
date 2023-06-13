let productoEnCarrito = localStorage.getItem('productos-en-carrito');
productoEnCarrito = JSON.parse(productoEnCarrito);

const CtnCarritoVacio = document.querySelector('#carrito-vacio');
const CtnCarritoProductos = document.querySelector('#carrito-productos');
const CtnCarritoAcciones = document.querySelector('#carrito-acciones');
const CtnCarritoComprado = document.querySelector('#carrito-comprado');
let btnsEliminar = document.querySelectorAll('.carrito-producto-eliminar');
const btnVaciar = document.querySelector('#carrito-acciones-vaciar');
const contTotal = document.querySelector('#total');
const btnComprar = document.querySelector('#carrito-acciones-comprar');
const btnsCategorias = document.querySelectorAll('.btn-categoria');

function cargarProductoEnCarrito (){

    if(productoEnCarrito && productoEnCarrito.length > 0){

        CtnCarritoVacio.classList.add('disabled');
        CtnCarritoProductos.classList.remove('disabled');
        CtnCarritoAcciones.classList.remove('disabled');
        CtnCarritoComprado.classList.add('disabled');
    
        CtnCarritoProductos.innerHTML = '';
    
        productoEnCarrito.forEach(producto => { 
        
            const div = document.createElement('div');
            div.classList.add('carrito-producto');
            div.innerHTML = `
                <img class="carrito-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${(producto.precio * producto.cantidad).toFixed(3)}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class=" fa-xs bi bi-trash-fill"></i></button>
            
            `
    
            CtnCarritoProductos.append(div);
    
        })
    
        
    
    }else {
    
        CtnCarritoVacio.classList.remove('disabled');
        CtnCarritoProductos.classList.add('disabled');
        CtnCarritoAcciones.classList.add('disabled');
        CtnCarritoComprado.classList.add('disabled');
    
    
    }

    actualizarBtnEliminar();
    actualizarTotal();

}


cargarProductoEnCarrito();


function actualizarBtnEliminar(){
    btnsEliminar = document.querySelectorAll('.carrito-producto-eliminar');

    btnsEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarDeCarrito);
    })
}

function eliminarDeCarrito(e){

    Toastify({
        text: "PRODUCTO ELIMINADO",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #83c5be, #006d77)",
            borderRadius: "2rem",
            fontSize: ".75rem"
        },
        offset: {
            x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();



    const idBtn = e.currentTarget.id;
    const index = productoEnCarrito.findIndex(producto => producto.id === idBtn);
    
    productoEnCarrito.splice(index, 1);
    cargarProductoEnCarrito();

    localStorage.setItem('productos-en-carrito', JSON.stringify(productoEnCarrito));

}

btnVaciar.addEventListener('click', vaciarCarrito);

function vaciarCarrito() {


    swal({
        title: "¿ Estas seguro ?",
        text: `Se eliminaran ${productoEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos del carrito !`,
        icon: "info",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {

        productoEnCarrito.length = 0;
        localStorage.setItem('productos-en-carrito', JSON.stringify(productoEnCarrito));
        cargarProductoEnCarrito();
        swal("Tus productos han sido eliminados", {
            icon: "success",
            
        });
        } else {
        swal("Tus productos estan a salvo !");
        }
    });

    
}

function actualizarTotal() {
    const totalResultado = productoEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0).toFixed([3]);
    total.innerText = `${totalResultado}`;
}

btnComprar.addEventListener('click', comprarCarrito);

function comprarCarrito() {
    productoEnCarrito.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(productoEnCarrito));

    CtnCarritoVacio.classList.add('disabled');
    CtnCarritoProductos.classList.add('disabled');
    CtnCarritoAcciones.classList.add('disabled');
    CtnCarritoComprado.classList.remove('disabled');

}