// inspired by https://github.com/Distribuerede-Systemer-2017/javascript-client/blob/exercise/js/shop.js

$(document).ready(() => {

    //Loads the navbar
    SDK.NavBar.loadNav();

    const $itemList = $("#item-list");

    SDK.User.findItems((data, err) => {

        if (err){
            console.log(err);
        }

        let allItems = data;


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

            $itemList.append(canteenHtml);

        });

        $(".purchase-button").click(function () {
            const itemId = $(this).data("item-id");
            const item = data.find(item => item.itemId === itemId);
            SDK.User.addToBasket(item);
        });

    });

    $("#proceed-basket").click(() => {
        window.location.href = "basket.html";
    });
});




