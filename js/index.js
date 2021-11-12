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

VINYLS.forEach((element) => {
    let container = document.createElement("div");
    container.classList.add("col");
    const vinylCard = `
    <div class="cards">
        <a href="./pages/product.html">
            <img src="${element.image}" />
            <p class="parrafo-cards fs-5">${element.artist} - ${element.title}</p>
        </a>
    </div>`;
    container.innerHTML = vinylCard;
    document.getElementsByClassName("product-list")[0].appendChild(container);
});

let menu = () => {
    alert("Bienvenido/a a la tienda!");
    let sum = 0;
    let quantity = 0;
    let option = 0;
    while (option != 3) {
        option = prompt(
            "Para ingresar discos al carrito, ingrese 1, para finalizar su compra, presione 2, para salir, presione 3"
        );

        switch (option) {
            case "1":
                let index = -1;
                while (index != 0) {
                    index = prompt(
                        "Ingresa un número del 1 al 12 para ingresar un vinilo al carrito, para terminar tu selección, presiona 0."
                    );
                    if (index >= 1 && index <= 12) {
                        sum += VINYLS[parseInt(index) - 1].price;
                        quantity++;
                    } else if (index == 0) break;
                    else alert("Por favor, ingresa un número entre 0 y 12");
                }
                break;
            case "2":
                alert(`El precio total por los ${quantity} discos será ${sum}`);
                break;
            case "3":
                alert("Gracias por usar nuestro servicio! Vuelva pronto!");
                break;
            default:
                alert("Por favor, ingrese un valor del 1 al 3");
                break;
        }
    }
};

menu();
