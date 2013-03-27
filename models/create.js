Meteor.saveFile = function(blob, title, description) {
  if(!blob || !title || !description || (typeof blob !== 'string')) return;
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
