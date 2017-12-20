// inspired by https://github.com/Distribuerede-Systemer-2017/javascript-client/blob/exercise/js/login.js

$(document).ready(() => {

    SDK.NavBar.loadNav();



    $("#login-button").click(() => {

            const username = $("#inputUsername").val();
            const password = $("#inputPassword").val();

            SDK.LoginOut.login(username, password, (data, err) => {

                var code

                setTimeout(function() {

                    code = statusCode;

                if (code == 401) {
                    $(".form-group").addClass("has-error");
                    console.log("login error");
                    window.alert("Login failed.");
                }
                else if (code == 400) {
                    console.log(err);
                    $(".form-group").addClass("has-error");
                    console.log("login error");

                } else {
                    console.log("login success");
                    window.location.href = "canteen.html";
                }

            }, 500);
        });
    });

    $("#create-user-button").click(() => {
        window.location.href = "create-user.html";
    });

});