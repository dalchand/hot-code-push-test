var Documents = new Meteor.Collection("documents");

Meteor.methods({
    setId: function(id){
      try {
        if(id != null)
          check(id, String);
        console.log("id: " + id);
        this.setUserId(id);
      } catch(e){
        throw Meteor.Error(500, 'Internal server error');
      }
    }
  });

  Meteor.startup(function(){
    if(!Documents.findOne()) {
      for(var i = 0; i < 10; i++) {
        Documents.insert({title: "this is document " + i});

      }
    }
  })

  Meteor.publish("documents", function(){
    var self = this;
    console.log(self.userId);
    if(self.userId){
      return Documents.find({});
    } else {
	    self.ready();
	  }
  });