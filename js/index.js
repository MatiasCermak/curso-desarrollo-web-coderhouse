const VINYLS_URL = "../data/products.json";

//Clase con operaciones de
class ProductCart {
    constructor() {
        this.list = [];
        this.purchaseUrl = "https://61986f4c164fa60017c2307b.mockapi.io/api/v1/ShopCarts";
    }

    init() {
        let cartString = window.localStorage.getItem("vinylrec-cart");
        if (cartString != null && cartString != "") {
            this.list = JSON.parse(cartString);
            this.render();
        }
    }

    save() {
        let cartString = JSON.stringify(this.list);
        window.localStorage.setItem("vinylrec-cart", cartString);
    }

    append(product) {
        this.list.push(product);
        this.save();
        alert(`${product.title} añadido al carrrito con éxito.`);
        this.render();
    }

    clear() {
        this.list = [];
        this.save();
        this.render();
    }

    delete(index) {
        this.list.splice(index, 1);
        this.save();
        this.render();
    }

    postPurchase() {
        if (this.list.length == 0) {
            alert("No posees discos en tu carrito.");
            return;
        }
        fetch(this.purchaseUrl, this.postPurchase, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ createdAt: Date.now(), vinyls: this.list }),
        }).then((res) => {
            if (res.ok) {
                alert("Compra realizada con éxito.");
                shopCart.clear();
            } else {
                alert("Algo ha fallado con tu compra, por favor intenta de nuevo.");
            }
        });
    }

    render() {
        let counter = 0;
        let totalSum = 0;
        $("#shopcart_list").html("");
        this.list.forEach((element, index) => {
            totalSum += element.price;
            counter += 1;
            let elem = document.createElement("li");
            elem.innerHTML = `<div class="dropdown-item d-flex justify-content-between"><div href="#">${element.artist} - ${element.title} | Precio: ${element.price}</div><span class="delete_item material-icons" id="${index}">
            close
            </span></div>`;
            $("#shopcart_list").append(elem);
        });
        let total = document.createElement("li");
        total.innerHTML = `<div class="d-flex justify-content-center">Cantidad de productos: ${counter} | Total: ${totalSum}</div>`;
        $("#shopcart_list").append(total);
        let buyBtn = document.createElement("li");
        buyBtn.innerHTML = `<div class="d-flex justify-content-center"><button class="card__btn"> Comprar </button></div>`;
        buyBtn.children[0].addEventListener("click", purchaseCart);
        $("#shopcart_list").append(buyBtn);
        $(".delete_item").on("click", deleteFromCart);
    }
}

let shopCart = new ProductCart();

shopCart.init();

$.ajax({
    url: VINYLS_URL,
    dataType: "json",
    success: function (data) {
        var items = [];
        data.forEach((element, index) => {
            let container = document.createElement("div");
            container.classList.add("col");
            const vinylCard = `
            <div class="cards">
                <a href="./pages/product.html">
                    <img src="${element.image}" />
                    <p class="parrafo-cards fs-5">${element.artist} - ${element.title}</p>
                    <div class="card__btn-container"><button class="card__btn" id="${index}"> Añadir al carrito </button></div>
                </a>
            </div>`;
            container.innerHTML = vinylCard;
            container.children[0].children[0].children[2].children[0].addEventListener("click", addToCart);
            document.getElementsByClassName("product-list")[0].appendChild(container);
        });
    },
});

//Event listeners

function purchaseCart(e) {
    e.preventDefault();
    e.stopPropagation();
    shopCart.postPurchase();
}

function addToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    $.ajax({
        url: VINYLS_URL,
        dataType: "json",
        success: function (data) {
            shopCart.append(data[parseInt(e.target.id)]);
        },
    });
}
function deleteFromCart(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.id);
    shopCart.delete(parseInt(e.target.id));
}
