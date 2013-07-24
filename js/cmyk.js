Items = new Meteor.Collection("items");
Comments = new Meteor.Collection("comments");

if (Meteor.isClient) {

  Meteor.startup(function() {

    Deps.autorun(function() {
      Meteor.subscribe("Items", Session.get('pId'));
      Meteor.subscribe("Comments");
    });

  });

  /*====================================*\
  @ Routes
\*====================================*/

  Meteor.Router.add({
    '/': 'home',
    '/create': 'create',
    '/p/:id': function(id) {
      Session.set('pId', id);
      Items.update({
        _id: id
      }, {
        $inc: {
          views: 1
        }
      });
      return 'item';
    }
  });

}

/*====================================*\
  @ Server
\*====================================*/

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    Meteor.publish("Items", function(id) {
      return Items.find({
        _id: id
      });
    });

    Meteor.publish("Comments", function(id) {
      return Comments.find();
    });
  });

  Items.allow({
    'insert': function(userId, doc) {
      return true;
    },
    'update': function(userId, doc) {
      return true;
    },
    'remove': function(userId, doc) {
      return true;
    }
  });

  Comments.allow({
    'insert': function(userId, doc) {
      return true;
    },
    'update': function(userId, doc) {
      return true;
    },
    'remove': function(userId, doc) {
      return true;
    }
  });

  Meteor.methods({
    saveFile: function(blob, title, description) {
      if (!blob || !title || !description || (typeof blob !== 'string')) return;
      return Items.insert({
        image: blob,
        title: title,
        description: description,
        views: 0,
        timestamp: Date.now()
      }, function(err, id) {

      });
    },

    saveComment: function(content, itemId) {
      var user = Meteor.user();
      return Comments.insert({
        itemId: itemId,
        name: (user) ? user.profile.name : '',
        content: content,
        timestamp: Date.now()
      }, function(err, id) {

      });
    }


  });

}