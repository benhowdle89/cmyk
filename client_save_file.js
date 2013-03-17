Meteor.saveFile = function(blob, title) {
	var fileReader = new FileReader(),
		method, encoding = 'binary',
		type = type || 'binary';
	fileReader.onload = function(file) {
		Items.insert({
			image: file.srcElement.result,
			title: title,
			timestamp: Date.now()
		}, function(err, id) {
			if (id) {
				Meteor.Router.to('/p/' + id);
			}
		});
	};
	fileReader.readAsDataURL(blob);
};