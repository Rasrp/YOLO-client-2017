// inspired by https://github.com/Distribuerede-Systemer-2017/javascript-client/blob/master/js/login.js
$(document).ready(() => {

    SDK.NavBar.loadNav();

    //Knap til at udføre create new user
    $("#create-new-user-button").click(() => {

        const username = $("#inputNewUsername").val();
        const password = $("#inputNewPassword").val();

        // Kalder SDK metode der opretter ny bruger igennem serveren og så på databasen, på baggrund af username og password
        SDK.User.create(username, password, (data, err) => {

            if (data.userCreated === "false"){
                window.alert("User not created, already exists");
            }
            else{
                window.alert("User has been created!")
                window.location.href = "login.html";
            }
        });

    });

});