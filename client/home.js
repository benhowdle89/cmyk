if(Meteor.isClient) {

/*====================================*\
  @ Home events
\*====================================*/

  Template.home.events({
    'submit #create': function(e) {
      e.preventDefault();

      var
      title = $('#title').val(),
      desc  = $('#description').val(),
      image = $('.preview img');

      if (!image) {
        alert('You forgot to upload something!');
        return false;
      }
      if (!title.length) {
        alert('You need to add a title!');
        return false;
      }

      Meteor.saveFile(image.attr('src'), title, desc);
      return false;
    }
  });

/*====================================*\
  @ Home Rendered
\*====================================*/

  Template.home.rendered = function() {
    window.CMYK = window.CMYK || {};

    CMYK.Upload = {
      init: function() {
        var upload   = $('.upload');
        this.file    = $('#file', upload);
        this.button  = $('.button', upload);
        this.preview = $('.preview i', upload);
        this.image   = null;
        this.bind();
      },
      bind: function() {
        var self = this;
        this.button.click(function(e) {
          e.preventDefault();
          self.file.click();
        });
        this.file.change(function(evt) {
          if(window.FileReader) self.update(evt);
        });
      },
      update: function(evt) {
        var self, rder, file;

        self = this;
        file = evt.target.files[0];
        rder = new FileReader();

        rder.onload = (function(f) {
          if(f.size > 5000000){
            console.log('too big');
            return;
          }
          return function(e) {
            self.updatePreview(e.target.result);
          };
        })(file);

        rder.readAsDataURL(file);
      },
      updatePreview: function(uri) {
        if(!this.image) this.buildPreview();
        this.image.attr('src', uri);
        if(!this.loaded & (this.loaded = 1))
        this.preview.parent().show().addClass('new');
      },
      buildPreview: function() {
        this.image = $('<img>').appendTo(this.preview);
      }
    };

    CMYK.Upload.init();
  };

}
