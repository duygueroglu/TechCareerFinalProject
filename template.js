
//TODO LIST
//variable
    var listItemObject = {
        title: 'Todo List App',
        listCounter: 'Number of Daily To-Dos',
        data: []
      }; //LIST CLEAR
      
      var clearList = function clearList() {
        listItemObject.data = [];
        formTutorial();
      }; //onSubmit
      
      
      function formOnSubmit(event) {
        //form bileşenin submit olmaması
        event.preventDefault();
        var formInputData = event.target.elements.formInput.value; //console.log(formInputData);
      
        if (formInputData) {
          listItemObject.data.push(formInputData);
          formTutorial();
          console.log('Added: ' + formInputData);
          event.target.elements.formInput.value = '';
        }
      }
      
      function formTutorial() {
        var form = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", {
          className: "text-center44 text-uppercase mt-5"
        }, listItemObject.title), /*#__PURE__*/React.createElement("p", null, listItemObject.listCounter, " : ", listItemObject.data.length), /*#__PURE__*/React.createElement("ul", null, listItemObject.data.map(function (temp) {
          return /*#__PURE__*/React.createElement("li", {
            key: temp.toString()
          }, " ", temp, " ");
        })), /*#__PURE__*/React.createElement("form", {
          onSubmit: formOnSubmit
        }, /*#__PURE__*/React.createElement("div", {
          className: "row"
        }, /*#__PURE__*/React.createElement("div", {
          className: "col-md-6"
        }, /*#__PURE__*/React.createElement("input", {
          type: "text",
          className: "form-control",
          name: "formInput"
        })), /*#__PURE__*/React.createElement("div", {
          className: "col-md-6"
        }, /*#__PURE__*/React.createElement("button", {
          className: "btn btn-warning mr-3",
          style: {
            fontSize: '.6rem'
          },
          type: "submit"
        }, "Send"), /*#__PURE__*/React.createElement("button", {
          onClick: clearList,
          className: "btn btn-danger",
          style: {
            fontSize: '.6rem'
          }
        }, "Clear")))));
        ReactDOM.render(form, document.getElementById('todolistId'));
      }
      
      formTutorial(); 


//upper case - lower case sensitivity
jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};


$(document).ready(function () {

    // function triggered
    $("#searchTags").keyup(function(){

        // input alma
        var value = $("#searchTags").val();
        // varsa, olan tagdeki değerleri göster, olmayanları gizle
        if(value.length!=0){		
            $("#menu li").hide();
            $("#menu li:contains("+value+")").show();
        }
        else{
            $("#menu li").show();
        }
    });
});

//! değişkenler
const cartBtn = document.querySelector(".cart-btn");
const clearCartBtn = document.querySelector(".btn-clear");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total-value");
const cartContent = document.querySelector(".cart-list");
const productsDOM = document.querySelector("#products-dom");

//buton ve cart için boş array
let cart = [];
let buttonsDOM = [];


//! işlem önceliği için sıralama yapma, örn ürünler sıralandıktan sonra butonidler gelsin vs.
//! async await-fetch, mockapi kullanıldı.


//api ile iletişim kurulan class
class Products {
  //sıraya aldığımız için async
    async getProducts() {
        try {
            let result = await fetch("https://62757fa115458100a6a49b05.mockapi.io/products");
            let data = await result.json();
            let products = data;
            console.log(products);
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

//apiden alınan dataların ui'ye geçirildiği yer
class UI {
    displayProducts(products) {
        let result = "";
        products.forEach(item => {
            result += `
            <div class="col-lg-4 col-md-6">
                <div class="product">
                    <div class="product-image">
                        <img src="${item.image}" alt="product" class="img-fluid" />
                    </div>
                    <div class="product-hover">
                        <span class="product-title">${item.title}</span>
                        <span class="product-price">$ ${item.price}</span>
                        <button class="btn-add-to-cart" data-id=${item.id}>
                            <i class="fas fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>
            `});
        productsDOM.innerHTML = result;
    }

    getBagButtons() {
        const buttons = [...document.querySelectorAll(".btn-add-to-cart")];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.setAttribute("disabled", "disabled");
                button.style.opacity = ".3";
            } else {
                button.addEventListener("click", event => {
                    event.target.disabled = true;
                    event.target.style.opacity = ".3";
                    //* ürünleri al
                    let cartItem = { ...Storage.getProduct(id), amount: 1 };
                    //* carta ürün ekle
                    cart = [...cart, cartItem];
                    //* locale kaydet
                    Storage.saveCart(cart);
                    //* cart verileri kaydet
                    this.saveCartValues(cart);
                    //* display cart item
                    this.addCartItem(cartItem)
                    //* cart göster
                    this.showCart();
                })
            }
        })
    }

    saveCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });

        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }

    //carta ürün eklenince
    addCartItem(item) {
        const li = document.createElement("li");
        li.classList.add("cart-list-item");
        li.innerHTML = `
            <div class="cart-left">
                <div class="cart-left-image">
                    <img src="${item.image}" alt="product" class="img-fluid" />
                </div>
                <div class="cart-left-info">
                    <a class="cart-left-info-title" href="#">${item.title}</a>
                    <span class="cart-left-info-price">$ ${item.price}</span>
                </div>
            </div>
            <div class="cart-right">
                <div class="cart-right-quantity">
                    <button class="quantity-minus" data-id=${item.id}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.amount}</span>
                    <button class="quantity-plus" data-id=${item.id}>
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-right-remove">
                    <button class="cart-remove-btn" data-id=${item.id}>
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartContent.appendChild(li);
    }

    showCart() {
        cartBtn.click();
    }

    setupAPP() {
        cart = Storage.getCart();
        this.saveCartValues(cart);
        this.populateCart(cart);
    }

    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }

    //arttırıp azaltma ve silme
    cartLogic() {
        clearCartBtn.addEventListener("click", () => {
            this.clearCart();
        })

        cartContent.addEventListener("click", event => {
            if (event.target.classList.contains("cart-remove-btn")) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                removeItem.parentElement.parentElement.parentElement.remove();
                this.removeItem(id);
            } else if (event.target.classList.contains("quantity-minus")) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart);
                    this.saveCartValues(cart);
                    lowerAmount.nextElementSibling.innerText = tempItem.amount;
                } else {
                    lowerAmount.parentElement.parentElement.parentElement.remove();
                    this.removeItem(id);
                }
            } else if (event.target.classList.contains("quantity-plus")) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cart.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cart);
                this.saveCartValues(cart);
                addAmount.previousElementSibling.innerText = tempItem.amount;
            }
        })
    }


    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0])
        }
    }

    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.saveCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSinleButton(id);
        button.disabled = false;
        button.style.opacity = "1";
    }

    getSinleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}

//local storage'a kaydedilen yer, baştaki boş product ve cart arraylerini doldurup refresh sonrası verilerin kayıtlı kalması
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }

    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    static getCart() {
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    }
}

//datalar yüklenince
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    ui.setupAPP();

    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getBagButtons();
        ui.cartLogic();
    })
});

