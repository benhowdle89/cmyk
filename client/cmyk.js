var Items    = new Meteor.Collection("Items");
var Comments = new Meteor.Collection("Comments");

if(Meteor.isClient) {

/*====================================*\
  @ Routes
\*====================================*/

  Meteor.Router.add({
    '/':       'home',
    '/create': 'create',
    '/p/:id': function(id) {
      Session.set('pId', id);
      Items.update({
        _id: id
      }, {
        $inc: { views: 1 }
      });
      return 'item';
    }
  });

/*====================================*\
  @ Server
\*====================================*/

  if(Meteor.isServer) {
    Meteor.startup(function() {
      // code to run on server at startup
      Meteor.publish("items", function(id) {
        return Items.find({ _id: id });
      });

      Meteor.publish("comments", function(id) {
        return Comments.find({ itemId: id });
      });
    });

    Items.allow({
      'insert': function(userId, doc) { return true; },
      'update': function(userId, doc) { return true; },
      'remove': function(userId, doc) { return true; }
    });
  }

/*====================================*\
  @ Autorun
\*====================================*/

  Meteor.autorun(function() {
    Meteor.subscribe("items", Session.get("pId"));
    Meteor.subscribe("comments", Session.get("pId"));
  });

}
