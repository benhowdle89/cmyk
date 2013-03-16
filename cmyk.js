var Items = new Meteor.Collection("Items");

if (Meteor.isClient) {
  Template.example.events({
    'click button': function() {
      var files = document.getElementById('file');
      _.each(files.files, function(file) {
        Meteor.saveFile(file, file.name);
      });
    }
  });

  Template.items.items = function() {
    return Items.find({}, {});
  };

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}