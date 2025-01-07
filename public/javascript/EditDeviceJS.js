$(document).ready(function() {
  $("#PI").on("input", validatePrice);
  $("#HDDI").on("input", validateDescription);
  $("#RAMI").on("input", validateRAM);
  $("#SPI").on("input", validateScreenSpace);
  $("#PhI").on("change", validatePhoto);

  $("#editDeviceForm").submit(function(event) {
      event.preventDefault();
      if (EditFun()) {
          $.ajax({
              type: "POST",
              url: $(this).attr("action"),
              data: new FormData(this),
              processData: false,
              contentType: false,
              success: function(response) {
                  alert("Device updated successfully!");
                  location.replace("/admin/ManageDevices");
              },
              error: function(error) {
                  // Handle error
                  alert("Error: " + error.responseText);
              }
          });
      }
  });
});

function EditFun() {
  var Price = $("#PI").val();
  var Description = $("#HDDI").val();
  var RAM = $("#RAMI").val();
  var ScreenSpace = $("#SPI").val();
  var Photo = $("#PhI").val();

  var priceErr = descriptionErr = ramErr = screenSpaceErr = photoErr = true;

  if (Price == "") {
      $("#PV").text("The price must not be empty.");
      $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
  } else if (isNaN(Price) || Price <= 0) {
      $("#PV").text("Invalid price. Must be a positive number.");
      $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
  } else {
      $("#PV").text("");
      $("#PI").css({"background-color": "white", "border-color": "black"});
      priceErr = false;
  }

  if (Description == "") {
      $("#HV").text("The description must not be empty.");
      $("#HDDI").css({"background-color": "#ffe6e6", "border-color": "red"});
  } else {
      $("#HV").text("");
      $("#HDDI").css({"background-color": "white", "border-color": "black"});
      descriptionErr = false;
  }

  if (RAM == "" || isNaN(RAM) || RAM <= 0) {
      $("#RV").text("Invalid RAM. Must be a positive number.");
      $("#RAMI").css({"background-color": "#ffe6e6", "border-color": "red"});
  } else {
      $("#RV").text("");
      $("#RAMI").css({"background-color": "white", "border-color": "black"});
      ramErr = false;
  }

  if (ScreenSpace == "" || isNaN(ScreenSpace) || ScreenSpace <= 0) {
      $("#SPV").text("Invalid screen space. Must be a positive number.");
      $("#SPI").css({"background-color": "#ffe6e6", "border-color": "red"});
  } else {
      $("#SPV").text("");
      $("#SPI").css({"background-color": "white", "border-color": "black"});
      screenSpaceErr = false;
  }

  if (Photo == "") {
      $("#PHV").text("The photo is required.");
      $("#PhI").css({"background-color": "#ffe6e6", "border-color": "red"});
  } else {
      $("#PHV").text("");
      $("#PhI").css({"background-color": "white", "border-color": "black"});
      photoErr = false;
  }

  return !(priceErr || descriptionErr || ramErr || screenSpaceErr || photoErr);
}

function validatePrice() {
  let Price = $("#PI").val();
  if (Price == "" ) {
      $("#PV").text("Price must not be empty.");
      $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
      return false;
  } else if(isNaN(Price) || Price <= 0){
    $("#PV").text("Invalid price.");
      $("#PI").css({"background-color": "#ffe6e6", "border-color": "red"});
      return false;
    
  }else {
      $("#PV").text("");
      $("#PI").css({"background-color": "white", "border-color": "black"});
      return true;
  }
}

function validateDescription() {
  let Description = $("#HDDI").val();
  if (Description == "") {
      $("#HV").text("The description must not be empty.");
      $("#HDDI").css({"background-color": "#ffe6e6", "border-color": "red"});
      return false;
  } else {
      $("#HV").text("");
      $("#HDDI").css({"background-color": "white", "border-color": "black"});
      return true;
  }
}

function validateRAM() {
  let RAM = $("#RAMI").val();
  if (RAM == "") {
      $("#RV").text("RAM must not be empty.");
      $("#RAMI").css({"background-color": "#ffe6e6", "border-color": "red"});
      return false;
  } else if(isNaN(RAM) || RAM <= 0){
    $("#RV").text("Invalid RAM.");
      $("#RAMI").css({"background-color": "#ffe6e6", "border-color": "red"});
      return false;
    
  }else {
      $("#RV").text("");
      $("#RAMI").css({"background-color": "white", "border-color": "black"});
      return true;
  }
}

function validateScreenSpace() {
  let ScreenSpace = $("#SPI").val();
  if (ScreenSpace == "" ) {
      $("#SPV").text("Screen space must not be empty.");
      $("#SPI").css({"background-color": "#ffe6e6", "border-color": "red"});
      return false;
  } else if(isNaN(ScreenSpace) || ScreenSpace <= 0){
    $("#SPV").text("Invalid screen space.");
      $("#SPI").css({"background-color": "#ffe6e6", "border-color": "red"});
      return false;
    
  }else {
      $("#SPV").text("");
      $("#SPI").css({"background-color": "white", "border-color": "black"});
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
  location.replace("/admin/AdminPage");
}