// inspired by https://github.com/Distribuerede-Systemer-2017/javascript-client/blob/exercise/js/login.js

$(document).ready(() => {

    //Loader naviagtion bar
    SDK.NavBar.loadNav();

    // Knap til at udføre login
    $("#login-button").click(() => {

            const username = $("#inputUsername").val();
            const password = $("#inputPassword").val();

            // Kalder SDK metode der logger dig på baggrund af username of password
            SDK.LoginOut.login(username, password, (data, err) => {

                //Succes kode der skal validere om det var succesfuld kald eller eg
                var code

                //Timeout function der giver severen tid til at svare før klienten aggerer
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

    // Knap der fører videre til create user
    $("#create-user-button").click(() => {
        window.location.href = "create-user.html";
    });

});