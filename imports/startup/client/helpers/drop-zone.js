uploadImage = (obj, event, callback) => {
  const files = event.target.files;

  $("#dropZone h4").html(`<i class="fa fa-spin fa-spinner" aria-hidden="true"></i> Uploading...`);

  if(files.length >= 2){
    yoloAlert("error", "You can only upload one file!")
    $("#dropZone h4").html(obj.text);
    return;
  }

  if(event.target.files[0].size >= 20485760){
    yoloAlert("error", "File size too big!");
    $("#dropZone h4").html(obj.text);
    return;
  }

  if(window.FileReader){
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function(file){
      if(obj.width && obj.height){
        var image = new Image();
        image.src = reader.result;
        image.onload = function() {
          if(this.width != obj.width && this.height != obj.height){
            yoloAlert("error", `Incorrect resolution, please upload a file with ${obj.width}px x ${obj.height}px`);
            return;
          }
          else {
            $("#dropZone h4").html(obj.text);
            callback({
              base64: reader.result,
              type: files[0].type,
              name: files[0].name
            });
            }
        };
      }
      else {
        $("#dropZone h4").html(obj.text);
        callback({
          base64: reader.result,
          type: files[0].type,
          name: files[0].name
        });
      }
    };
    reader.onerror = function (error) {
      console.log(error);
      $("#dropZone h4").html(obj.text);
      yoloAlert("error");
    }
  }
  else {
    yoloAlert("error", "FileReader is not supported in this browser.")
  }
}
