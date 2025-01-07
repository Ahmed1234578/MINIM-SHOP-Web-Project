$(document).ready(function() {
    $("#EmI").on("input", validateEmail);
    $("#PI").on("input", validatePassword);

    $("#loginForm").submit(function(event) {
        event.preventDefault();
        if (loginFun()) {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: $(this).serialize(),
                success: function(response) {
                    // Redirect to the appropriate page based on user type
                    location.replace(response.redirectUrl);
                },
                error: function(xhr, status, error) {
                    let errorMessage = xhr.responseText;
                    alert(errorMessage);
                }
            });
        }
    });
});

function loginFun() {
    var Email = $("#EmI").val();
    var Password = $("#PI").val();

    var emailErr = passwordErr = true;

    if (Email == "") {
        $("#EV").text("The email must not be empty.");
        $("#EmI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(Email) === false) {
            $("#EV").text("Invalid email address.");
            $("#EmI").css({"background-color": "#ffe6e6", "border-color": "red"});
        } else {
            $("#EV").text("");
            $("#EmI").css({"background-color": "white", "border-color": "black"});
            emailErr = false;
        }
    }

    if (Password == "") {
        $("#PV").text("The password must not be empty.");
        $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        if (Password.length < 8 && Password.length > 0) {
            $("#PV").text("The password must be at least 8 characters long.");
            $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
        } else {
            $("#PV").text("");
            $("#PI").css({"background-color": "white", "border-color": "black"});
            passwordErr = false;
        }
    }
    return !(emailErr || passwordErr);
}

function validateEmail() {
    let Email = $("#EmI").val();
    if (Email == "") {
        $("#EV").text("Email must not be empty");
        $("#EmI").css({"background-color": "#ffe6e6", "border-color": "red"});
        return false;
    } else {
        $("#EV").text("");
        $("#EmI").css({"background-color": "white", "border-color": "black"});
        return true;
    }
}

function validatePassword() {
    let Password = $("#PI").val();
    if (Password.length < 8) {
        $("#PV").text("The password must be at least 8 characters long.");
        $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
        return false;
    } else {
        $("#PV").text("");
        $("#PI").css({"background-color": "white", "border-color": "black"});
        return true;
    }
}

function CanFun() {
    location.replace("/");
}
