Meteor.publish('characters', function(){
  var currentUser = this.userId;
  return Characters.find({createdBy: currentUser});
});

Meteor.publish('stats', function(currentCharacter){
  var currentUser = this.userId;
  return Stats.find({ createdBy: currentUser, createdByCharacter: currentCharacter });
});

Meteor.publish('characterCount', function(){
  var currentUser = this.userId;
  return Meteor.users.find({_id: currentUser}, {characterCount: 1});
});
