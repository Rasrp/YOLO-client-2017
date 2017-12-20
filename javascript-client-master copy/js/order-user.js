$(document).ready(() => {

    SDK.NavBar.loadNav();
    SDK.Staff.findOrders((data, err) => {

        if (err){
            console.log(err);
        }

        let allOrders = data;
        var ordersIsEmpty;

        allOrders.forEach((order) => {

            ordersIsEmpty = 0;

                let id = order.orderId;
                let isReady = order.isReady;
                let time = order.orderTime;
                let $items = [];
                let $orderPrice = 0;

                if (order.User_userId == SDK.Storage.load("userId")) {
                    console.log("1");
                    for (let i = 0; i < order.items.length; i++) {

                        if ($items.length >= 1) {
                            $items += ", " + order.items[i].itemName;
                        }

                        else {
                            $items += order.items[i].itemName;
                        }

                        $orderPrice += parseInt(order.items[i].itemPrice);


                    }

                    $(".orderUserList").append(
                        "<tr id=" + id + ">" +
                        "<td>" + id + "</td>" +
                        "<td>" + time + "</td>" +
                        "<td>" + $items + "</td>" +
                        "<td>" + isReady + "</td>" +
                        "</tr>");

                }
                else {

                        ordersIsEmpty = 1;

             }

        });

        if (ordersIsEmpty == 1) {
            $(".page-header").html(`
                           <hr class="my-4">
                           <h1><font color="red">You have no previous orders!</font></h1>
                        `);
            $(".ordertable").html(`
                        `);

            console.log("2");
            setTimeout(function () {
                window.location.href = ("canteen.html");
            }, 2000)
        }

    });


});