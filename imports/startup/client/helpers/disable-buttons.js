//THIS FUNCTION IS USED TO ENABLE OR DISABLE BUTTONS
disableBtn = (selector, disable, defaultHTML) => {
  if(selector == "form"){
    $("button[type='submit']").prop("disabled", disable);
    if(disable){
      $("button[type='submit']").html(`<i class="fas fa-spin fa-spinner"></i> Loading...`);
    }
    else {
      $("button[type='submit']").html(defaultHTML);
    }
  }
  else {
    $(selector).prop("disabled", disable);
    if(disable) {
      $(selector).html(`<i class="fas fa-spin fa-spinner"></i> Loading...`);
    }
    else {
      $(selector).html(defaultHTML);
    }
  }
};
