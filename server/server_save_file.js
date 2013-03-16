/**
 * TODO support other encodings:
 * http://stackoverflow.com/questions/7329128/how-to-write-binary-data-to-a-file-using-node-js
 */

Meteor.methods({
  saveFile: function(blob, title) {
    var user = Meteor.user();
    Items.insert({image : blob, userId: Meteor.userId(), title: title, username: user.profile.name, timestamp: Date.now()});
  }
});