if(Meteor.isClient) {

/*====================================*\
  @ Item events
\*====================================*/

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

/*====================================*\
  @ Item Renders
\*====================================*/

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

/*====================================*\
  @ Helpers
\*====================================*/

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

}
