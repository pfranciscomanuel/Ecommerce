//variables
let listaProductos = document.getElementById('container-productos');
let containerProducts = document.querySelector('.productos');
let containerCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total');
let cantidadProduct = document.querySelector('.cantidad-product');
let finalizar = document.getElementById('finalizar-compra');
let botonFinalizar = document.querySelector(".botons");


//arrays
let productos = [];
let carrito = [];
let productosFinalesTotales = [];
//variables vacias
let totalCard = 0;
let numeroProduct = 0;



//lista de productos
class producto {
    constructor(id, nombre, precio, stock, descripcion, image) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.descripcion = descripcion;
        this.image = image;
    }
}

let productoUno = new producto(0001, "Laptop", 17000.00, 30, "Computadora Portatil", "./images/products/laptop.jpg");
let productoDos = new producto(0002, "Alexa", 700.00, 20, "Asistente Virtual", "./images/products/alexa.png");
let productoTres = new producto(0003, "Silla Gamer", 2000.00, 10, "Silla Ergonomica profesional", "./images/products/silla.jpg");
let productoCuatro = new producto(0004, "Tarjeta GeForce", 5000.00, 30, "Tarjeta Grafica", "./images/products/Nvidia.png");
let productoCinco = new producto(0005, "Smartwatch", 1000.99, 30, "Reloj Inteligente", "./images/products/smart.png");
let productoSeis = new producto(0006, "ipad pro", 15000.00, 20, "Dispositivo Portatil", "./images/products/ipad.png");
let productoSiete = new producto(0007, "logitech g733", 1700.00, 10, "Audifonos Inalambricos", "./images/products/audifonos.png");
let productoOcho = new producto(00011, "iphone 11", 12000.00, 30, "Telefono inteligente", "./images/products/iphone.png");

productos.push(productoUno, productoDos, productoTres, productoCuatro, productoCinco, productoSeis, productoSiete, productoOcho)


for (const lista of productos) {
    listaProductos.innerHTML += `
<div class="carts">
                <div>
                    <img src=${lista.image} alt="">                    
                </div>
                <h2 class="title">${lista.nombre}</h2>
                <p class="description">${lista.descripcion}</p>
                <p class="precio-product">$<span>${lista.precio}</span></p>
                <a href="" data-id="${lista.id}" class="btn-add-cart">Añadir al carrito</a>
            </div>
`


}

//funciones

loadEventListenrs();
function loadEventListenrs() {

    //USANDO JQUERY PARA APARECER CARRITO
    $(".fa").mouseover(function () {
        $("#products-id").css("display", "block");
    }
    )

    $(".close-btn").click(function () {
        $("#products-id").css("display", "none");
    })
    //FIN JQUERY
    containerProducts.addEventListener('click', agregarProducto);

    containerCart.addEventListener('click', deleteProducto);

    finalizar.addEventListener('click', finalizarCompra);

    botonFinalizar.addEventListener("click", compraFinal)
}

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement;
        seleccionarProducts(selectProduct);
    }
}

function deleteProducto(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        carrito.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.cantidad);




                totalCard = totalCard - priceReduce;

                totalCard = totalCard.toFixed(2);
            }
        });
        carrito = carrito.filter(product => product.id !== deleteId);

        numeroProduct--;





    }

    mostrarCarrito();
}

function seleccionarProducts(product) {
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }



    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    //console.log(totalCard)
    totalCard = totalCard.toFixed(2);

    const exist = carrito.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = carrito.map(product => {
            if (product.id === infoProduct.id) {
                product.cantidad++;
                return product;
            } else {
                return product
            }
        });
        carrito = [...pro];
    } else {
        carrito = [...carrito, infoProduct]
        numeroProduct++;
    }
    mostrarCarrito();

}

function mostrarCarrito() {
    clearHtml();
    carrito.forEach(product => {
        const { image, title, price, cantidad, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">S/${price}</h5>
                <h6>Cantidad: ${cantidad}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
            
        `;

        containerCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        cantidadProduct.innerHTML = numeroProduct;
    });
}
function clearHtml() {
    containerCart.innerHTML = '';
}

function finalizarCompra() {

    carrito.forEach(product => {
        const { image, title, price, cantidad, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">S/${price}</h5>
                <h6>Cantidad: ${cantidad}</h6>
            </div>
                        
            
        `;

        let inyectarProductosFinales = document.querySelector(".productos-finales")

        inyectarProductosFinales.appendChild(row);
        let precioTotalFinales = document.querySelector(".price-total-finales")

        precioTotalFinales.innerHTML = totalCard;

    })

    let finalizarCompraContainer = document.querySelector(".finalizar-compra-container")
    finalizarCompraContainer.style.display = 'block'

    let cartProducts = document.querySelector(".cart-products")
    cartProducts.style.display = 'none'

    let conteinerProductos = document.querySelector(".container-products")
    conteinerProductos.style.display = 'none'

}



function compraFinal() {
    let finalizarCompra = document.querySelector(".finalizar-compra-container")
    finalizarCompra.style.display = 'none'
    let gracias = document.querySelector(".gracias")
    gracias.style.display = 'block'


}









