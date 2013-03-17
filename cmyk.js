var Items = new Meteor.Collection("Items");

if (Meteor.isClient) {

  Meteor.Router.add({
    '/': 'home',
    '/create': 'create',
    '/p/:id': function(id) {
      Session.set('pId', id);
      return 'item';
    },
    '/all': 'all'
  });

  Template.create.events({
    'click button': function() {
      var files = document.getElementById('file').files;
      var title = document.getElementById('title').value;
      Meteor.saveFile(files[0], title);
    }
  });

  Template.item.item = function() {
    Items.findOne(Session.get("pId"));
  };

  Template.all.items = function() {
    return Items.find({}, {});
  };

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    Items.allow({
      'insert': function(){
        return true;
      }
    });
  });
}