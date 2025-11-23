let quillEditor = null;

initQuillEditor = (selector, html) => {
  $(document).ready(function(){
    setTimeout(function(){
      if($(".ql-container").length === 0){
        quillEditor = new Quill(selector, {
          theme: "snow",
          placeholder: "Write description",
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],

              [{ "header": 1 }, { "header": 2 }, { "header": 3 }],
              [{ "list": "ordered"}, { "list": "bullet" }],
              [{ "script": "sub"}, { "script": "super" }],
              [{ "indent": "-1"}, { "indent": "+1" }],
              [{ "direction": "rtl" }],

              [{ "size": ["small", false, "large", "huge"] }],
              [{ "header": [1, 2, 3, 4, 5, 6, false] }],

              [{ "color": [] }, { "background": [] }],
              [{ "font": [] }],
              [{ "align": [] }],

              ["clean"]
            ]
          }
        });
      }

      if(html != "undefined"){
        const delta = quillEditor.clipboard.convert(html);
        quillEditor.setContents(delta, "silent");
      }
    }, 750);
  });
}

getQuillEditor = () => {
  return quillEditor.root.innerHTML;
}

Template.member_body.events({
  "click #addTextEvent"(){
    Meteor.call("business.addDescriptionHTML",  Meteor.user().business.id, quillEditor.root.innerHTML,
      function(error, result){
      if(error){
        console.log(error);
        yoloAlert("error");
        disableBtn("#addTextEvent", false, `<i class="fas fa-save"></i> Save Description`);
      }
      else {
        yoloAlert("success", "Updated Text!");
        disableBtn("#addTextEvent", false, `<i class="fas fa-save"></i> Save Description`);
      }
    });
  }
});