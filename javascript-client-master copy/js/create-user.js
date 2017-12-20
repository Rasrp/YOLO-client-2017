$(document).ready(() => {

    SDK.NavBar.loadNav();

    $("#create-new-user-button").click(() => {

        const username = $("#inputNewUsername").val();
        const password = $("#inputNewPassword").val();

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