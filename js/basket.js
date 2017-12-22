// inspired by https://github.com/Distribuerede-Systemer-2017/javascript-client/blob/exercise/js/checkout.js

$(document).ready(() => {

    // Loads Navigation bar
    SDK.NavBar.loadNav();


    const $modalTbody = $("#basket-tbody");
    const $checkoutActions = $("#checkout-actions");

    //Opretter funktion loadBasket()
    function loadBasket() {
        const currentUser = SDK.User.current();
        const item = SDK.Storage.load("basket") || [];
        let total = 0;

        //Kører forEach loop igennem alle items der ligger i localstorage "basket"
        item.forEach(entry => {
            let subtotal = entry.item.itemPrice * entry.count;
            total += subtotal;
            // Appender en html tabel med variablerne fra Item objektet
            $modalTbody.append(`
        <tr>
            <td colspan="1"></td>
            <td>${entry.item.itemName}</td>
            <td>${entry.count}</td>
            <td>kr. ${entry.item.itemPrice}</td>
            <td>kr. ${subtotal}</td>
        </tr>
      `);
        });

        $modalTbody.append(`
      <tr>
        <td colspan="3"></td>
        <td><b>Subtotal</b></td>
        <td>kr. ${total}</td>
      </tr>
    `);

        if (currentUser) {
            $checkoutActions.append(`
      <button class="btn btn-success btn-lg" id="checkout-button">Checkout</button>
    `);
        }
        else {
            $checkoutActions.append(`
      <a href="login.html">
        <button class="btn btn-primary btn-lg">Log in to checkout</button>
      </a>
    `);
        }
    }

    loadBasket();

    //Knap til at ryde contents fra basket, via localstorage
    $("#clear-basket-button").click(() => {
        SDK.Storage.remove("basket");
        window.location.href = "basket.html";
    });

    //Knap til at checkout og
    $("#checkout-button").click(() => {
        let userId = SDK.Storage.load("userId");
        let basket = SDK.Storage.load("basket");
        let itemList = [];

        //forEach loop der tilføjer alle items der ligger i basket til en ny arrayList
        basket.forEach((item, i, basket) => {
            itemList.push(basket[i].item);
        });

        // Laver en ordre på baggrund UserID og den item arrayList der blev oprættet
        SDK.Order.create(userId, itemList, (data, err)=>{
            if (err) {
                console.log("error.");
            }
            else {
                SDK.Storage.remove("basket");
                window.alert("Order confirmed!");
                window.location.href = "canteen.html";

            }
        });


    });

});