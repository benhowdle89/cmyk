var Items = new Meteor.Collection("Items");
var Comments = new Meteor.Collection("Comments");

if (Meteor.isClient) {

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

  Template.home.events({
    'submit #create': function(e) {
      e.preventDefault();
      var title = document.getElementById('title').value;
      var description = document.getElementById('description').value;

      if (!$('.preview img').length) {
        alert('You forgot to upload something!');
        return false;
      }
      if (!title.length) {
        alert('You need to add a title!');
        return false;
      }
      Meteor.saveFile($('.preview img').attr('src'), title, description);
      return false;
    }
  });

  Template.item.events({
    'click #submitComment': function() {
      var input = $('#newComment');
      if (input.val().length) {
        Meteor.saveComment(input.val(), this._id);
        input.val('');
      }
    }
  });

  Template.item.items = function() {
    return Items.find({
      _id: Session.get("pId")
    }, {});
  };

  Template.item.comments = function() {
    return Comments.find({
      itemId: this._id
    }, {
      sort: {
        timestamp: -1
      }
    });
  };

  Template.item.date = function(date) {
    return timeDifference(Date.now(), date);
  };

  var timeDifference = function(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  };

  Template.home.rendered = function() {
    $('html').addClass('index');
    (function(window, document) {

      var tmp,

      Upload = {
        init: function() {
          tmp = $('.upload');
          this.file = $('#file', tmp);
          this.button = $('.button', tmp);
          this.preview = $('.preview i', tmp);
          this.previmg = null;
          this.bind();
        },
        bind: function(ref) {
          var self = this;
          this.button.click(function() {
            self.file.click();
          });
          this.file.change(function(e) {
            if (window.FileReader) self.update(e);
          });
        },
        update: function(evt) {
          var self, rder, file;

          self = this;
          file = evt.target.files[0];
          rder = new FileReader();

          rder.onload = (function(f) {
            return function(e) {
              self.updatePreview(e.target.result);
            };
          })(file);

          rder.readAsDataURL(file);
        },
        updatePreview: function(uri) {
          if (!this.previmg) this.buildPreview();
          this.previmg.attr('src', uri);
          if (!this.added && (this.added = 1)) {
            this.preview.parent().show().addClass('new');
          }
        },
        buildPreview: function() {
          this.previmg = $('<img>').appendTo(this.preview);
        }
      };

      Upload.init();

    })(window, document);

  };

  Template.item.rendered = function() {
    $('html').removeClass('index');
    setInterval(function() {
      $('.comment-date').each(function() {
        var cDate = $(this);
        var newDate = timeDifference(Date.now(), cDate.attr('data-time'));
        cDate.text(newDate);
      });
    }, 1000);
  };

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
    Meteor.publish("items", function(id) {
      return Items.find({
        _id: id
      });
    });

    Meteor.publish("comments", function(id) {
      return Comments.find({
        itemId: id
      });
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
}

if (Meteor.isClient) {
  Meteor.autorun(function() {
    Meteor.subscribe("items", Session.get("pId"));
  });
  Meteor.autorun(function() {
    Meteor.subscribe("comments", Session.get("pId"));
  });
}