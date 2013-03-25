Meteor.saveFile = function(blob, title, description) {
  Items.insert({
    image: blob,
    title: title,
    description: description,
    views: 0,
    timestamp: Date.now()
  }, function(err, id) {
    if (id) {
      Meteor.Router.to('/p/' + id);
    }
  });
};
