// inspired by https://github.com/Distribuerede-Systemer-2017/javascript-client/blob/exercise/js/shop.js

$(document).ready(() => {

    //Loads the navbar
    SDK.NavBar.loadNav();

    const $itemList = $("#item-list");

    // Kalder findItems fra sdk.js
    SDK.User.findItems((data, err) => {

        // Opretter en variabel der har all items stored
        let allItems = data;

        //  Kører forEach loop med et objekt af Item
        allItems.forEach((item) => {

            const canteenHtml = `
        <div class="col-lg-4 item-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${item.itemName}</h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt>Description</dt>
                        <dd>${item.itemDescription}</dd>
                      </dl>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-4 price-label">
                            <p>Kr. <span class="price-amount">${item.itemPrice}</span></p>
                        </div>
                        <div class="col-lg-8 text-right">
                             <button class="btn btn-success purchase-button" data-item-id="${item.itemId}">Add to basket</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

            // Tilføjer HTML kode via append
            $itemList.append(canteenHtml);

        });

        //Knap til at kunne tilføje item til din localstorage "basket"
        $(".purchase-button").click(function () {
            const itemId = $(this).data("item-id");
            const item = data.find(item => item.itemId === itemId);
            SDK.User.addToBasket(item);
        });

    });

    // Knap der fører videre til basket.html
    $("#proceed-basket").click(() => {
        window.location.href = "basket.html";
    });
});




