yoloAlert = (type, text, timeout) => {
  $("body .yolo-alert").remove();

  $("body").prepend(`
    <div class="yolo-alert" id="yoloAlert">
      <span class="close-btn" onclick="this.parentElement.style.display='none';">&times;</span>

      <div class="yoloDiv">
        <span class="text" id="text"></span>
      </div>
    </div>
  `);

  $("#yoloAlert").removeClass("success");
  $("#yoloAlert").removeClass("error");
  $("#yoloAlert").removeClass("warning");

  $("#yoloAlert").addClass("success");

  let alertTimeout = 4000;
  $(document).ready(function() {
    switch(type){
      case "success": {
        $("#yoloAlert").addClass("success");
        break;
      }
      case "error": {
        $("#yoloAlert").addClass("error");
        break;
      }
      case "warning": {
        $("#yoloAlert").addClass("warning");
        break;
      }
      case "info": {
        $("#yoloAlert").addClass("info");
        break;
      }
      default: {
        $("#yoloAlert").addClass("info");
        break;
      }
    }

    if(timeout != undefined){
      alertTimeout = timeout;
    }
    if(typeof text === "undefined"){
      $("#yoloAlert #text").text("Something went wrong...");
    }
    else {
      $("#yoloAlert #text").text(text);
    }

    $("#yoloAlert").show(function () {
      setTimeout(function(){
        $("#yoloAlert").fadeOut();
        $("body #yoloAlert").remove();
      }, alertTimeout);
    });
  });
}
