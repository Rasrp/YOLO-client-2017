$(document).ready(() => {

    SDK.NavBar.loadNav();
    SDK.Staff.findOrders((data, err) => {

       // let allOrders = data;

        const $orderStaffList = $("#order-staff-list");

            if (err){
                console.log(err);
            }

            let allOrders = data;


            allOrders.forEach((order) => {
                if (!order.isReady) {
                    let $items = [];
                    let $orderPrice = 0;

                    for (let i = 0; i < order.items.length; i++) {

                        if ($items.length >= 1) {
                            $items += ", " + order.items[i].itemName;
                        }

                        else {
                            $items += order.items[i].itemName;
                        }

                        $orderPrice += parseInt(order.items[i].itemPrice);

                    }


                    const ordersHtml = `
        <div class="col-lg-4 item-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title"><b>Order ID:</b> ${order.orderId}</h3>
                    <h3 class="panel-title"><b>User ID:</b> ${order.User_userId}</h3>
                    <h3 class="panel-title"><b>Time:</b> ${order.orderTime} </h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt>Items:</dt>
                        <dd>${$items}</dd>
                      </dl>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-4 price-label">
                            <p><b>Price: </b> <span class="price-amount">kr. ${$orderPrice} </span></p>
                        </div>
                        <div class="col-lg-8 text-right">
                             <button class="btn btn-success make-ready-button" data-order-id="${order.orderId}">Make ready</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
                    $orderStaffList.append(ordersHtml);
                }
            });

        $(".make-ready-button").click(function () {
            const orderId = $(this).data("order-id");
            console.log(orderId);
            const order = data.find(order => order.orderId === orderId);

            console.log(order);
            SDK.Staff.makeReady(orderId, (err) => {
                window.alert("Order is ready");
                window.location.reload (true);
            })
        });


    });


});
