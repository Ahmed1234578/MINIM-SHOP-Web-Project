$(document).ready(function() {
    $("#FNI").on("input", validateFullName);
    $("#EmI").on("input", validateEmail);
    $("#PI").on("input", validatePassword);
    $("#CPI").on("input", validateConfirmPassword);
    $("#AI").on("input", validateAddress);
    $("#PhI").on("change", validatePhoto);

    $("#registerForm").submit(function(event) {
        event.preventDefault();
        if (RegisterFun()) {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: new FormData(this),
                processData: false,
                contentType: false,
                success: function(response) {
                    if (response.redirectUrl) {
                        location.replace(response.redirectUrl);
                    } else {
                        alert(response.message);
                    }
                },
                error: function(xhr, status, error) {
                    let errorMessage = xhr.responseJSON ? xhr.responseJSON.message : 'Error: ' + xhr.responseText;
                    alert(errorMessage);
                }
            });
        }
    });
});

function RegisterFun() {
    var FullName = $("#FNI").val();
    var Email = $("#EmI").val();
    var Password = $("#PI").val();
    var ConfirmPassword = $("#CPI").val();
    var Photo = $("#PhI").val();
    var Address = $("#AI").val();

    var fullNameErr = emailErr = passwordErr = confPasswordErr = photoErr = addressErr = true;

    if (FullName == "") {
        $("#FNV").text("The full name must not be empty.");
        $("#FNI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        $("#FNV").text("");
        $("#FNI").css({"background-color": "white", "border-color": "black"});
        fullNameErr = false;
    }

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

    const isValidPassword = Password.length >= 8 &&
        /[A-Z]/.test(Password) &&
        /\d/.test(Password) &&
        /[@$!%*?&#]/.test(Password);

    if (Password == "") {
        $("#PV").text("The password must not be empty.");
        $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else if (!isValidPassword) {
        $("#PV").text("Password must be 8+ chars, include uppercase, number, and special character.");
        $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        $("#PV").text("");
        $("#PI").css({"background-color": "white", "border-color": "black"});
        passwordErr = false;
    }

    if (ConfirmPassword == "") {
        $("#CPV").text("This field must not be empty.");
        $("#CPI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else if (ConfirmPassword != Password) {
        $("#CPV").text("Passwords do not match.");
        $("#CPI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        $("#CPV").text("");
        $("#CPI").css({"background-color": "white", "border-color": "black"});
        confPasswordErr = false;
    }

    if (Address == "") {
        $("#AV").text("The address must not be empty.");
        $("#AI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        $("#AV").text("");
        $("#AI").css({"background-color": "white", "border-color": "black"});
        addressErr = false;
    }

    if (Photo == "") {
        $("#PHV").text("The photo is required.");
        $("#PhI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        $("#PHV").text("");
        $("#PhI").css({"background-color": "white", "border-color": "black"});
        photoErr = false;
    }

    return !(fullNameErr || emailErr || passwordErr || confPasswordErr || addressErr || photoErr);
}

function validateFullName() {
    let FullName = $("#FNI").val();
    if (FullName == "") {
        $("#FNV").text("The full name must not be empty.");
        $("#FNI").css({"background-color": "#ffe6e6", "border-color": "red"});
        return false;
    } else {
        $("#FNV").text("");
        $("#FNI").css({"background-color": "white", "border-color": "black"});
        return true;
    }
}

function validateEmail() {
    let Email = $("#EmI").val();
    let emailPattern = /^\S+@\S+\.\S+$/;
    if (!Email.match(emailPattern)) {
        $("#EV").text("Invalid email address.");
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
    const isValid = Password.length >= 8 &&
        /[A-Z]/.test(Password) &&
        /\d/.test(Password) &&
        /[@$!%*?&#]/.test(Password);
    if (!isValid) {
        $("#PV").text("Password must be 8+ chars, include uppercase, number, and special character.");
        $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
        return false;
    } else {
        $("#PV").text("");
        $("#PI").css({"background-color": "white", "border-color": "black"});
        return true;
    }
}

function validateConfirmPassword() {
    let Password = $("#PI").val();
    let ConfirmPassword = $("#CPI").val();
    if (ConfirmPassword !== Password) {
        $("#CPV").text("Passwords do not match.");
        $("#CPI").css({"background-color": "#ffe6e6", "border-color": "red"});
        return false;
    } else {
        $("#CPV").text("");
        $("#CPI").css({"background-color": "white", "border-color": "black"});
        return true;
    }
}

function validateAddress() {
    let Address = $("#AI").val();
    if (!Address) {
        $("#AV").text("The address must not be empty.");
        $("#AI").css({"background-color": "#ffe6e6", "border-color": "red"});
        return false;
    } else {
        $("#AV").text("");
        $("#AI").css({"background-color": "white", "border-color": "black"});
        return true;
    }
}

function validatePhoto() {
    let Photo = $("#PhI").val();
    if (!Photo) {
        $("#PHV").text("The photo is required.");
        $("#PhI").css({"background-color": "#ffe6e6", "border-color": "red"});
        return false;
    } else {
        $("#PHV").text("");
        $("#PhI").css({"background-color": "white", "border-color": "black"});
        return true;
    }
}



function CanFun() {
    location.replace("/");
}
