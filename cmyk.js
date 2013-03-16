var Items = new Meteor.Collection("Items");

if (Meteor.isClient) {
  Template.example.events({
    'click button': function() {
      var files = document.getElementById('file').files;
      var title = document.getElementById('title').value;
      Meteor.saveFile(files[0], title);
    }
  });

  Template.items.events({
    'click': function(){
      Items.remove(this._id);
    }
  });

  Template.items.items = function() {
    return Items.find({
      userId: Meteor.userId()
    }, {
      sort: {
        timestamp: -1
      }
    });
  };

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}