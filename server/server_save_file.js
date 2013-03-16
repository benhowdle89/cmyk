/**
 * TODO support other encodings:
 * http://stackoverflow.com/questions/7329128/how-to-write-binary-data-to-a-file-using-node-js
 */

Meteor.methods({
  saveFile: function(blob, name, path, encoding) {
    Items.insert({image : blob});
  }
});