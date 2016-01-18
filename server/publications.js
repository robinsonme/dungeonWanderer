Meteor.publish('characterCount', function(){
  var currentUser = this.userId;
  return Meteor.users.find({_id: currentUser}, {characterCount: 1});
});

Meteor.publish('characters', function(){
  var currentUser = this.userId;
  return Characters.find({createdBy: currentUser});
});

Meteor.publish('stats', function(currentCharacter){
  return Stats.find({ createdByCharacter: currentCharacter });
});

Meteor.publish('equipment', function (currentCharacter) {
  return Equipment.find({ createdByCharacter: currentCharacter });
});

Meteor.publish('enemies', function () {
  return Enemies.find({});
});
