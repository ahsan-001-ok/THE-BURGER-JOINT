// MENU DATA

const products = [

    // BURGERS

    {
        id: 1,
        name: "Smash Beef Burger",
        price: 650,
        category: "burger",
        description: "Juicy smashed beef patty with cheese and signature sauce.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
    },

    {
        id: 2,
        name: "Nashville Hot Burger",
        price: 750,
        category: "burger",
        description: "Crispy spicy chicken with Nashville hot seasoning.",
        image: "https://www.seriouseats.com/thmb/zZLQZ3IvBpcq-NfahgHLZYwvbwg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20231117-SEA-NashvilleHotChicken-VictorProtasio-01-83231777673a434fa85b8f0ef524b4c9.jpg"
    },

    {
        id: 3,
        name: "Jammy Jam Burger",
        price: 800,
        category: "burger",
        description: "A delicious burger with a sweet and savoury jam twist.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgp05PKJ18dovjxHzyowemKT-R7F8Nt73z_VesEXpkt9Cxog4swHlMew&s=10"
    },

    {
        id: 4,
        name: "Nashville Sando",
        price: 700,
        category: "burger",
        description: "Crispy Nashville chicken sandwich with creamy slaw.",
        image: "https://t4.ftcdn.net/jpg/22/19/20/15/360_F_2219201529_xVLAIKkMzuQfdWaJFja1Mxc0sCal1LHS.jpg"
    },


    // CHICKEN

    {
        id: 5,
        name: "Nashville Tenders",
        price: 650,
        category: "chicken",
        description: "Crispy chicken tenders coated in Nashville spices.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUtRQMC1j-Dk-8vwqb2ZaZe4RE9UshAj5pJyq0Jy8kaeXzcLB-FjriuEE&s=10"
    },

    {
        id: 6,
        name: "Regular Chicken Tenders",
        price: 550,
        category: "chicken",
        description: "Golden crispy chicken tenders served fresh.",
        image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Fried-Chicken-Strips_EXPS_FT24_25184_JR_0301_1.jpg"
    },

    {
        id: 7,
        name: "Injected Roast",
        price: 850,
        category: "chicken",
        description: "Juicy, flavour-packed roast chicken.",
        image: "https://assets.licious.in/oms/0ff65812-d707-3d1f-1dec-f87abe445650/original/1792008246875.jpg"
    },


    // DESSERTS

    {
        id: 8,
        name: "Chocolate Brownie",
        price: 300,
        category: "dessert",
        description: "Rich, fudgy chocolate brownie.",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"
    },

    {
        id: 9,
        name: "Glazed Donut",
        price: 200,
        category: "dessert",
        description: "Soft and fluffy donut with sweet glaze.",
        image: "https://assets.epicurious.com/photos/54b0226d766062b20344580a/1:1/w_2560%2Cc_limit/51160200_glazed-doughnuts_1x1.jpg"
    },

    {
        id: 10,
        name: "Cinnamon Roll",
        price: 350,
        category: "dessert",
        description: "Soft cinnamon roll with delicious sweet icing.",
        image: "https://www.sustainablecooks.com/wp-content/uploads/2024/03/overnight-cinnamon-rolls-11.jpg"
    }

];


// CART ARRAY

let cart = [];


// ADD-ON PRICES

const addons = {

    sauce: 50,

    cheese: 100,

    patty: 200

};


// DISPLAY MENU

function displayMenu() {

    const burgerMenu = document.getElementById("burger-menu");

    const chickenMenu = document.getElementById("chicken-menu");

    const dessertMenu = document.getElementById("dessert-menu");


    products.forEach(product => {

        let options = "";


        // Add-ons for non-dessert items

        if (product.category !== "dessert") {

            options = `

                <div class="custom-options">

                    <strong>Customize your order:</strong>

                    <label>
                        <input type="checkbox" id="sauce-${product.id}">
                        Extra Sauce (+Rs. 50)
                    </label>

                    <label>
                        <input type="checkbox" id="cheese-${product.id}">
                        Extra Cheese (+Rs. 100)
                    </label>

                    <label>
                        <input type="checkbox" id="patty-${product.id}">
                        Extra Patty (+Rs. 200)
                    </label>

                </div>

            `;

        }


        const card = document.createElement("div");

        card.className = "food-card";


        card.innerHTML = `

            <img src="${product.image}" alt="${product.name}">

            <div class="food-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="price">
                    Rs. ${product.price}
                </div>

                ${options}

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})">

                    ADD TO CART +

                </button>

            </div>

        `;


        if (product.category === "burger") {

            burgerMenu.appendChild(card);

        }

        else if (product.category === "chicken") {

            chickenMenu.appendChild(card);

        }

        else {

            dessertMenu.appendChild(card);

        }

    });

}


// ADD TO CART

function addToCart(id) {

    const product = products.find(p => p.id === id);

    let extraPrice = 0;

    let selectedAddons = [];


    const sauce = document.getElementById(`sauce-${id}`);

    const cheese = document.getElementById(`cheese-${id}`);

    const patty = document.getElementById(`patty-${id}`);


    if (sauce && sauce.checked) {

        extraPrice += addons.sauce;

        selectedAddons.push("Extra Sauce");

        sauce.checked = false;

    }


    if (cheese && cheese.checked) {

        extraPrice += addons.cheese;

        selectedAddons.push("Extra Cheese");

        cheese.checked = false;

    }


    if (patty && patty.checked) {

        extraPrice += addons.patty;

        selectedAddons.push("Extra Patty");

        patty.checked = false;

    }


    const finalPrice = product.price + extraPrice;


    cart.push({

        id: Date.now(),

        productId: product.id,

        name: product.name,

        price: finalPrice,

        addons: selectedAddons,

        quantity: 1

    });


    updateCart();

    alert(product.name + " added to cart!");

}


// UPDATE CART

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");


    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;


        const div = document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <h4>${item.name}</h4>

            <p>Rs. ${item.price} each</p>

            <p>
                ${item.addons.length > 0
                    ? item.addons.join(", ")
                    : "No extras"}
            </p>

            <div class="quantity-controls">

                <button onclick="changeQuantity(${item.id}, -1)">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

            </div>

            <p>
                Subtotal: Rs. ${item.price * item.quantity}
            </p>

            <button
                class="remove-button"
                onclick="removeItem(${item.id})">

                Remove

            </button>

        `;


        cartItems.appendChild(div);

    });


    cartCount.innerText = count;

    cartTotal.innerText = total;


    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty!</p>";

    }

}


// CHANGE QUANTITY

function changeQuantity(id, amount) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;


    if (item.quantity <= 0) {

        removeItem(id);

        return;

    }


    updateCart();

}


// REMOVE ITEM

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

}


// OPEN / CLOSE CART

function toggleCart() {

    document.getElementById("cart-panel")
        .classList.toggle("active");

}


// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    let total = cart.reduce((sum, item) => {

        return sum + (item.price * item.quantity);

    }, 0);


    alert(

        "Thank you for ordering from The Burger Joint!\n\n" +

        "Your total bill is Rs. " + total +

        "\n\nYour order has been recorded in this demo."

    );


    cart = [];

    updateCart();

    toggleCart();

}


// INITIALIZE WEBSITE

displayMenu();

updateCart();