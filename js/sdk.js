// inspired by https://github.com/Distribuerede-Systemer-2017/javascript-client/blob/exercise/js/sdk.js
var statusCode = 200;
const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(data, status, xhr);
                statusCode = xhr.status;
            },
            error: (xhr, status, errorThrown) => {
                console.log("ajax error")
                cb({xhr: xhr, status: status, error: errorThrown});
                statusCode = xhr.status;
            }
        });

    },

    User: {

        // Current user
        current: () => {
            return SDK.Storage.load("token");
        },

        // Adder til localstorage basket, med et objekt af Item
        addToBasket: (item) => {
            let basket = SDK.Storage.load("basket");

            if (!basket) {
                return SDK.Storage.persist("basket", [{
                    count: 1,
                    item: item
                }]);
            }

            let foundItem = basket.find(i => i.item.itemId === item.itemId);
            if (foundItem) {
                let i = basket.indexOf(foundItem);
                basket[i].count++;
            } else {
                basket.push({
                    count: 1,
                    item: item
                });
            }

            SDK.Storage.persist("basket", basket);
        },

        // Finder alle items i databasen
        findItems: (cb) => {
            SDK.request({
                method: "GET",
                url: "/user/getItems",
                headers: {authorization: SDK.Storage.load("token")}
            }, cb);
        },

        //Laver en user på baggrund af input af username og password
        create: (username, password, cb) => {
            SDK.request({
                method: "POST",
                url: "/user/createUser",
                data: {
                    username: username,
                    password: password
                },
                headers: {authorization: SDK.Storage.load("token")}
            }, (err) => {

                if (err) {
                    return cb(err);
                }

                cb(null);
            })


        },

    },



    Order: {
        //Create order på baggrund af user_Id og item objekter
        create: (user_Id, items, cb) => {
            SDK.request({
                method: "POST",
                url: "/user/createOrder",
                data:{
                    User_userId: user_Id,
                    items: items
                },
                headers: {authorization: "Bearer" + SDK.Storage.load("token")}
            }, (err) => {

                if (err) {
                    return cb(err);
                }

                //success
                cb(null);
            })
        },

    },

    Staff: {
        //Finder alle ordrer på serveren
        findOrders: (cb) => {
            SDK.request({method: "GET",
                url: "/staff/getOrders"},
                cb);
        },

        //Markerer en ordre som klar, på baggrund  af en ordre ID
        makeReady: (orderId, cb) => {
            console.log(orderId);
            SDK.request({
                    method: "POST",
                    url: "/staff/makeReady/" + orderId,
                    headers: {authorization: "Bearer" + SDK.Storage.load("token")
                    },
                    data: {
                        orderId : orderId
                    }
                }, (err) => {

                if (err) {return cb(err);}

                cb(null);
            });
        }
    },

    LoginOut: {
        //Logger ind og giver dig storer user ID, token, username og isPersonnel boolean værdi
        login: (username, password, cb) => {

            SDK.request({
                method: "POST",
                url: "/start/login",
                data: {
                    username: username,
                    password: password
                },
                headers: {authorization: SDK.Storage.load("token")}
            }, (data, err) => {
                SDK.Storage.persist("token", data.token);
                SDK.Storage.persist("userId", data.user_id);
                SDK.Storage.persist("username", data.username);
                SDK.Storage.persist("isPersonnel", data.isPersonel);

                cb(null);
            });
        },

        //Fjerner alle localstorage værdier, hvilket ikke giver dig validering til noget
        logout: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("userId");
            SDK.Storage.remove("username");
            SDK.Storage.remove("isPersonnel");
            SDK.Storage.remove("basket");
            window.location.href = "login.html";
        },

    },

    NavBar: {
        //Loader navigation bar
        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {

                //På baggrund af om du har en token og hvilken boolean værdi isPersonnel er sat til, viser den en forskellig navbar
                const token = SDK.Storage.load("token");
                const isPersonnel = SDK.Storage.load("isPersonnel");

                if (token && isPersonnel) {
                    $(".navbar-right").html(`
            <li><a href="order-staff.html">Open Orders</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
                } else if (token && !isPersonnel) {
                        $(".navbar-right").html(`
            <li><a href="order-user.html">Your orders</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="login.html">Login <span class="sr-only">(current)</span></a></li>
          `);
                }
                $("#logout-link").click(() => SDK.LoginOut.logout());
                cb && cb();
            });
        }
    },


    // Storage til at store værdier lokalt i localstorage
    Storage: {
        prefix: "CBSCanteenSDK",
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }
    }
};