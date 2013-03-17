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

  Template.item.items = function() {
    return Items.find({
      _id: Session.get("pId")
    }, {});
  };

  Template.item.rendered = function() {
    var disqus_shortname = 'cmykim';
    var disqus_identifier = 'myident';

    function loadDisqus() {
      (function() {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      })();
    }
    loadDisqus();
  };

  Template.all.items = function() {
    return Items.find({}, {});
  };

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
  Items.allow({
    'insert': function(userId, doc) {
      return true;
    }
  });
}