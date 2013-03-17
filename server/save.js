Meteor.methods({
	saveFile: function(blob, title) {
		Items.insert({
			image: blob,
			title: title,
			timestamp: Date.now()
		}, function(err, id) {
			if (id) {
				//Meteor.Router.to('/p/' + id);
			}
		});
	}
});