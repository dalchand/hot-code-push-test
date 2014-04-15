var Documents = new Meteor.Collection("documents");

var setId = function(id) {
  Meteor.call("setId", id, function(error, result){
      if(!error) {
          Meteor.subscribe("documents");

      }     
  });
}

Template.hello.documents = function() {
	return Documents.find();
}

Meteor.startup(function(){
    console.log("startup called");
    setId("xyz");
});
