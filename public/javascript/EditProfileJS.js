$(document).ready(function() {
    $("#EI").on("input", validateEmail);
    $("#PI").on("input", validatePassword);
    $("#PNI").on("input", validatePhoneNumber);
    $("#AI").on("input", validateAddress);

    $("form").submit(function(event) {
        event.preventDefault();
        if (validateEmail() && validatePassword() && validatePhoneNumber() && validateAddress()) {
            $.ajax({
                type: "POST",
                url: "/your-endpoint",
                data: $(this).serialize(),
                success: function(response) {
                    location.replace("/admin/AdminPage");
                },
                error: function(error) {
                    alert("Error: " + error.responseText);
                }
            });
        }
    });
});

function validateEmail() {
    let Email = $("#EI").val();
    let emailPattern = /^[A-Za-z0-9]+@[a-z]+\.[a-z]{2,4}(\.[a-z]{2,4})?$/;
    if (!Email.match(emailPattern) || !Email.includes(".admin")) {
        $("#EV").text("Invalid email. Must include '@' and '.admin' and be a valid domain.");
        $("#EI").css({"background-color": "#ffe6e6", "border-color": "red"});
        return false;
    } else {
        $("#EV").text("");
        $("#EI").css({"background-color": "white", "border-color": "black"});
        return true;
    }
}

function validatePassword() {
    let Password = $("#PI").val();
    let passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#.?!@$%^&*-])[A-Za-z\d#.?!@$%^&*-]{8,}$/;
    if (!Password.match(passwordPattern)) {
        $("#PV").text("Password must be at least 8 characters long, with a capital letter, lowercase letter, number, and special character.");
        $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
        return false;
    } else {
        $("#PV").text("");
        $("#PI").css({"background-color": "white", "border-color": "black"});
        return true;
    }
}

function validatePhoneNumber() {
    let PNumber = $("#PNI").val();
    let phonePattern = /^\d{11}$/;
    let validPrefixes = ["010", "011", "012", "015"];
    if (!PNumber.match(phonePattern) || !validPrefixes.includes(PNumber.slice(0, 3))) {
        $("#PNV").text("Invalid phone number. Must be 11 digits and start with 010, 011, 012, or 015.");
        $("#PNI").css({"background-color": "#ffe6e6", "border-color": "red"});
        return false;
    } else {
        $("#PNV").text("");
        $("#PNI").css({"background-color": "white", "border-color": "black"});
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

function CanFun() {
    location.replace("/admin/AdminPage");
}
