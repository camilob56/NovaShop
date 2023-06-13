let productos = [];

fetch("./JS/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contProductos = document.querySelector('#cont-productos');
const btnsCategorias = document.querySelectorAll('.btn-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
let btnProducto = document.querySelectorAll('.producto-btn');
const numero = document.querySelector('#numero');

/**
 * Cargar los productos
 * @param {string} productosElegidos | Detecta el producto elegido
 * Creamos la estructura de html con sus respectivas clases 
 */
function cargarProductos(productosElegidos){

    contProductos.innerHTML = '';

    productosElegidos.forEach(producto => {

        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-btn" id="${producto.id}">Agregar al carrito</button>
            </div>
            `;

            contProductos.append(div);

    })

    actualizarBtnProducto();

}



/**
 * Cargar productos por categoria
 * Si el id del elmento es diferente a todos el titulo principal cambia dependiendo la categoria
 * de lo contrario el titulo principal es de Todos los productos en el menu 
 */
btnsCategorias.forEach(boton =>{
    boton.addEventListener('click', (e) => {

        btnsCategorias.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if(e.currentTarget.id != 'todos'){

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productoBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productoBoton);
        }else {
            tituloPrincipal.innerText = 'Todos los productos';
            cargarProductos(productos);
        }


    })
});

/*
 * Detecto los click en cada boton de agregar al carrito
 */
function actualizarBtnProducto(){
    btnProducto = document.querySelectorAll('.producto-btn');

    btnProducto.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    })
}


let productoEnCarrito;
let productoEnCarritoLS = localStorage.getItem('productos-en-carrito');

if(productoEnCarritoLS){
    productoEnCarrito = JSON.parse(productoEnCarritoLS);
    actualizarNumero();
}else {
    productoEnCarrito = [];
}

/**
 * 
 * @param {string} e | Elemento busca el id del boton
 * Detectamos el id del producto agregado y sumamos la cantidad de este
 * Agregamos el producto al array
 */

function agregarAlCarrito(e){


    Toastify({
        text: "PRODUCTO AGREGADO",
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
    const productoAgregado = productos.find(producto => producto.id === idBtn);
    
    if((productoEnCarrito.some(producto => producto.id === idBtn))){
        const index = productoEnCarrito.findIndex(producto => producto.id === idBtn);
        productoEnCarrito[index].cantidad++;
    }else {
        productoAgregado.cantidad = 1;
        productoEnCarrito.push(productoAgregado);
    }

    actualizarNumero();

    localStorage.setItem('productos-en-carrito', JSON.stringify(productoEnCarrito));

}

function actualizarNumero(){
    let nuevoNumero = productoEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}

