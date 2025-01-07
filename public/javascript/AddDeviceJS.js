$(document).ready(function() {
  $("#NI").on("input", function() {
      if ($(this).val() == "") {
          $("#NV").html("Name must not be empty.");
          $(this).css({"background-color": "#ffe6e6", "border-color": "red"});
      } else {
          $("#NV").html("");
          $(this).css({"background-color": "white", "border-color": "black"});
      }
  });

  $("#PI").on("input", function() {
      let price = $(this).val();
      if (price == "") {
          $("#PV").html("Price must not be empty.");
          $(this).css({"background-color": "#ffe6e6", "border-color": "red"});
      } else {
          $("#PV").html("");
          $(this).css({"background-color": "white", "border-color": "black"});
          if (isNaN(price) || price <= 0) {
              $("#PV").html("Invalid price.");
              $(this).css({"background-color": "#ffe6e6", "border-color": "red"});
          } else {
              $("#PV").html("");
              $(this).css({"background-color": "white", "border-color": "black"});
          }
      }
  });

  $("#HDDI").on("input", function() {
      let hdd = $(this).val();
      if (hdd == "") {
          $("#HV").html("Quantity field must not be empty.");
          $(this).css({"background-color": "#ffe6e6", "border-color": "red"});
      } else {
          $("#HV").html("");
          $(this).css({"background-color": "white", "border-color": "black"});
          if (isNaN(hdd) || hdd <= 0) {
              $("#HV").html("Invalid value.");
              $(this).css({"background-color": "#ffe6e6", "border-color": "red"});
          } else {
              $("#HV").html("");
              $(this).css({"background-color": "white", "border-color": "black"});
          }
      }
  });

  $("#RAMI").on("input", function() {
      let ram = $(this).val();
      if (ram == "") {
          $("#RV").html("RAM size must not be empty.");
          $(this).css({"background-color": "#ffe6e6", "border-color": "red"});
      } else {
          $("#RV").html("");
          $(this).css({"background-color": "white", "border-color": "black"});
          if (isNaN(ram) || ram <= 0) {
              $("#RV").html("Invalid value.");
              $(this).css({"background-color": "#ffe6e6", "border-color": "red"});
          } else {
              $("#RV").html("");
              $(this).css({"background-color": "white", "border-color": "black"});
          }
      }
  });

  $("#SPI").on("input", function() {
      let screen_space = $(this).val();
      if (screen_space == "") {
          $("#SPV").html("Screen space must not be empty.");
          $(this).css({"background-color": "#ffe6e6", "border-color": "red"});
      } else {
          $("#SPV").html("");
          $(this).css({"background-color": "white", "border-color": "black"});
          if (isNaN(screen_space) || screen_space <= 0) {
              $("#SPV").html("Invalid space.");
              $(this).css({"background-color": "#ffe6e6", "border-color": "red"});
          } else {
              $("#SPV").html("");
              $(this).css({"background-color": "white", "border-color": "black"});
          }
      }
  });

  $("#PhI").on("input", function() {
      if ($(this).val() == "") {
          $("#PHV").html("The photo is required.");
      } else {
          $("#PHV").html("");
      }
  });

  $("#submitButton").click(function(event) {
      event.preventDefault(); 

      let name = $("#NI").val();
      let price = $("#PI").val();
      let hdd = $("#HDDI").val();
      let ram = $("#RAMI").val();
      let screen_space = $("#SPI").val();
      let photo = $("#PhI").val();

      let names = name != "";
      let prices = !isNaN(price) && price > 0;
      let hdds = !isNaN(hdd) && hdd > 0;
      let rams = !isNaN(ram) && ram > 0;
      let screen_space_s = !isNaN(screen_space) && screen_space > 0;
      let photos = photo != "";

      if (names && prices && hdds && rams && screen_space_s && photos) {
          $.ajax({
              type: "POST",
              url: "/admin/AdminPage",
              data: new FormData($("#addForm")[0]),
              processData: false,
              contentType: false,
              success: function(response) {
                  window.location.replace("/admin/AdminPage");
              },
              error: function(xhr, status, error) {
                  let errorMessage = xhr.responseJSON ? xhr.responseJSON.message : 'Error: ' + xhr.responseText;
                  alert(errorMessage);
              }
          });
      }
  });

  $("#cancelButton").click(function() {
      window.location.replace("/admin/AdminPage");
  });
});
