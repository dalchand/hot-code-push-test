if (Meteor.isClient) {
  
  var setId = function(id) {
    Meteor.call("setId", id, function(error, result){
        if(!error) {
            Meteor.subscribe("documents");
        }     
    });
  }

  Meteor.startup(function(){
      console.log("startup called");
      setId("xyz");
  });
  
}

if (Meteor.isServer) {
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

  var Documents = new Meteor.Collection("documents");

  Meteor.publish("documents", function(){
    var self = this;
    console.log(self.userId);
    if(self.userId){
      return Documents.find({userId: self.userId});
    }
  });
}
