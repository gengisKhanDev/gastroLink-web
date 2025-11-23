initFlatpickr = (obj) => {
  $(document).ready(function(){
    setTimeout(function(){
      if(!obj.selector){
        obj.selector = `input[type="date"]`;
      }
      if(!obj.defaultDate){
        obj.defaultDate = "today";
      }

      if(!obj.dateFormat){
        obj.dateFormat = "Z";
      }

      flatpickr(obj.selector, {
        altInput: true,
        altFormat: "F j, Y",
        inline: obj.inline,
        animate: obj.animate,
        minDate: obj.minDate,
        maxDate: obj.maxDate,
        defaultDate: obj.defaultDate,
        enableTime: obj.enableTime,
        dateFormat: obj.dateFormat
      });
    }, 1250);
  });
}

disableFlatpickrDates = (obj) => {
  $(document).ready(function(){
    setTimeout(function(){
      if(!obj.selector){
        obj.selector = `input[type="date"]`;
      }
      if(!obj.defaultDate){
        obj.defaultDate = "today";
      }

      if(!obj.dateFormat){
        obj.dateFormat = "Z";
      }

      flatpickr(obj.selector, {
        altInput: true,
        altFormat: "F j, Y",
        inline: obj.inline,
        minDate: obj.minDate,
        dateFormat: "m-d-Y",
        disable: ""
      });
    }, 1250);
  });
}
