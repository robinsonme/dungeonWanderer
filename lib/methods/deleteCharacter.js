Meteor.methods({
  'deleteCharacter': function(characterId) {
    var currentUser = Meteor.user();
    var character = Characters.findOne({ createdBy: currentUser._id, _id: characterId });
    var stats = Stats.findOne({createdByCharacter: characterId});
    var equipment = Equipment.findOne({createdByCharacter: characterId});

    Equipment.remove({_id:equipment._id});
    Stats.remove({_id: stats._id});
    Characters.remove({_id: character._id});
  }
});
