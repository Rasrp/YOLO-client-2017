$(document).ready(() => {

    //Loader navigation bar
    SDK.NavBar.loadNav();

    //Kalder SDK metoden findOrders, til at hente alle ordre objeker
    SDK.Staff.findOrders((data, err) => {

        let allOrders = data;
        var ordersIsEmpty;

        //For each loop der kører igennem alle objekter af ordre
        allOrders.forEach((order) => {

            ordersIsEmpty = 0;

                let id = order.orderId;
                let isReady = order.isReady;
                let time = order.orderTime;
                let $items = [];
                let $orderPrice = 0;

                // Hvis en ordre har samme User ID som den user der er logget ind, så printer den ordren ud for brugeren
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

                    // Tilføjer HTML ved append
                    $(".orderUserList").append(
                        "<tr id=" + id + ">" +
                        "<td>" + id + "</td>" +
                        "<td>" + time + "</td>" +
                        "<td>" + $items + "</td>" +
                        "<td>" + isReady + "</td>" +
                        "</tr>");

                }
                else {
                        /*Displayer en anden HTML kode, på baggrund af at der ikke var nogle ordre i databasen med samme
                            User ID som */
                        ordersIsEmpty = 1;

             }

        });

        //Kører alternativ HTML kode, siden der ikke er nogle tidligere ordrer for brugeren
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