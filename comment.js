Meteor.saveComment = function(content, itemId) {
	var user = Meteor.user();
	Comments.insert({
		itemId: itemId,
		name: (user) ? user.profile.name : '',
		content: content,
		timestamp: Date.now()
	}, function(err, id) {

	});
};