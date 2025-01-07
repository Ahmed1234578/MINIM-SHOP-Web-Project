$(document).ready(function() {
    $("#EmI").on("input", validateEmail);
    $("#PI").on("input", validatePassword);
    $("#CPI").on("input", validateConfirmPassword);
    $("#AI").on("input", validateAddress);
    $("#PhI").on("change", validatePhoto);

    $("#editProfileForm").submit(function(event) {
        event.preventDefault();
        if (EditPFun()) {
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                data: new FormData(this),
                processData: false,
                contentType: false,
                success: function(response) {
                   
                    alert("Profile updated successfully!");
                    history.back();
                },
                error: function(error) {
                    // Handle error
                    alert("Error: " + error.responseText);
                }
            });
        }
    });
});

function EditPFun() {
    var Email = $("#EmI").val();
    var Password = $("#PI").val();
    var ConfPassword = $("#CPI").val();
    var Photo = $("#PhI").val();
    var Address = $("#AI").val();

    var emailErr = passwordErr = confpasswordErr = photoErr = addressErr = true;

    if (Photo == "") {
        $("#PHV").text("The photo is required.");
    } else {
        $("#PHV").text("");
        photoErr = false;
    }

    if (Address == "") {
        $("#AV").text("The address must not be empty.");
        $("#AI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        $("#AV").text("");
        $("#AI").css({"background-color": "white", "border-color": "black"});
        addressErr = false;
    }

    const isValid = Password.length >= 8 &&
        /[A-Z]/.test(Password) &&
        /\d/.test(Password) &&
        /[@$!%*?&#]/.test(Password);

    if (Password == "") {
        $("#PV").text("The password must not be empty.");
        $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else if (!isValid) {
        $("#PV").text("Password must be 8+ chars, include uppercase, number, and special character.");
        $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        $("#PV").text("");
        $("#PI").css({"background-color": "white", "border-color": "black"});
        passwordErr = false;
    }

    if (ConfPassword == "") {
        $("#CPV").text("This field must not be empty.");
        $("#CPI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else if (ConfPassword != Password) {
        $("#CPV").text("Passwords do not match.");
        $("#CPI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        $("#CPV").text("");
        $("#CPI").css({"background-color": "white", "border-color": "black"});
        confpasswordErr = false;
    }

    if (Email == "") {
        $("#EV").text("The email must not be empty.");
        $("#EmI").css({"background-color": "#ffe6e6", "border-color": "red"});
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(Email) === false) {
            $("#EV").text("Invalid email address.");
            $("#EmI").css({"background-color": "#ffe6e6", "border-color": "red"});
        } else if (Email.includes(".admin")) {
            $("#EV").text("Admins can't register, please log in.");
            $("#EmI").css({"background-color": "#ffe6e6", "border-color": "red"});
        } else {
            $("#EV").text("");
            $("#EmI").css({"background-color": "white", "border-color": "black"});
            emailErr = false;
        }
    }

    return !(emailErr || confpasswordErr || passwordErr || photoErr || addressErr);
}

function validateEmail() {
    let Email = $("#EmI").val();
    let emailPattern = /^\S+@\S+\.\S+$/;
    if (!Email.match(emailPattern) || Email.includes(".admin")) {
        $("#EV").text("Invalid email address or domain.");
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
    let isValid = Password.length >= 8 &&
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
    let ConfPassword = $("#CPI").val();
    if (ConfPassword !== Password) {
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
    history.back();
}
