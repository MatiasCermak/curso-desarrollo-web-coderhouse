const VINYLS = [
    {
        title: "The Slow Rush",
        artist: "Tame Impala",
        image: "./img/disc1.png",
        price: 1300,
    },
    {
        title: "Plastic Beach",
        artist: "Gorillaz",
        image: "./img/disc2.jpg",
        price: 1100,
    },
    {
        title: "In The Court Of The Crimson King",
        artist: "King Crimson",
        image: "./img/disc4.jpg",
        price: 1500,
    },
    {
        title: "Holy Diver",
        artist: "DIO",
        image: "./img/disc3.jpg",
        price: 1500,
    },
    {
        title: "Wish You Were Here",
        artist: "Pink Floyd",
        image: "./img/disc5.jpg",
        price: 1700,
    },
    {
        title: "Rumours",
        artist: "Fleetwood Mac",
        image: "./img/disc6.jpg",
        price: 1300,
    },
    {
        title: "Sweetener",
        artist: "Ariana Grande",
        image: "./img/disc7.jpg",
        price: 1200,
    },
    {
        title: "Aladdin Sane",
        artist: "David Bowie",
        image: "./img/disc8.jpg",
        price: 1000,
    },
    {
        title: "The Dark Side Of The Moon",
        artist: "Pink Floyd",
        image: "./img/disc9.jpg",
        price: 1800,
    },
    {
        title: "Unknown Pleasures",
        artist: "Joy Division",
        image: "./img/disc10.jpg",
        price: 1300,
    },
    {
        title: "Come Fly With Me",
        artist: "Frank Sinatra",
        image: "./img/disc11.jpg",
        price: 1550,
    },
    {
        title: "Blond",
        artist: "Frank Ocean",
        image: "./img/disc12.jpg",
        price: 1300,
    },
];

//Clase con operaciones de
class ProductCart {
    constructor() {
        this.list = [];
    }

    init() {
        let cartString = window.localStorage.getItem("vinylrec-cart");
        if (cartString != null || cartString != "") {
            this.list = JSON.parse(cartString);
            this.render();
        }
    }

    save() {
        let cartString = JSON.stringify(this.list);
        window.localStorage.setItem("vinylrec-cart", cartString);
    }

    append(index) {
        let product = VINYLS[index];
        this.list.push(product);
        this.save();
        this.render();
    }

    clear() {
        this.list = [];
        this.save();
    }

    delete(index) {
        this.list.splice(index, 1);
        this.save();
        this.render();
    }

    render() {
        let shopcartList = document.getElementById("shopcart_list");
        shopcartList.innerHTML = "";
        this.list.forEach((element, index) => {
            let elem = document.createElement("li");
            elem.innerHTML = `<div class="dropdown-item d-flex justify-content-between"><div href="#">${element.artist} - ${element.title} | Precio: ${element.price}</div><a href="#" id="${index}"><span class="material-icons" >
            close
            </span></a></div>`;
            elem.children[0].children[1].addEventListener("click", deleteFromCart);
            shopcartList.appendChild(elem);
        });
    }
}

let shopCart = new ProductCart();

shopCart.init();

VINYLS.forEach((element, index) => {
    let container = document.createElement("div");
    container.classList.add("col");
    const vinylCard = `
    <div class="cards">
        <a href="./pages/product.html">
            <img src="${element.image}" />
            <p class="parrafo-cards fs-5" id="${index}">${element.artist} - ${element.title}</p>
        </a>
    </div>`;
    container.innerHTML = vinylCard;
    container.children[0].children[0].children[1].addEventListener("click", addToCart);
    document.getElementsByClassName("product-list")[0].appendChild(container);
});

//Event listeners

function addToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    shopCart.append(e.target.id);
}

function deleteFromCart(e) {
    e.preventDefault();
    e.stopPropagation();
    shopCart.delete(e.target.id);
}
