Template.registerHelper("softwareVersion", function(){
  if(Meteor.settings.public.softwareVersion){
    return "v" + Meteor.settings.public.softwareVersion;
  }
});
