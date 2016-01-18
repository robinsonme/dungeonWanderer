Meteor.methods({
  'createNewCharacter': function(characterName, race, gender){
    var currentUser = Meteor.user();
    var data = {
      name: characterName,
      race: race,
      gender: gender,
      createdBy: currentUser._id,
      createdAt: new Date(),
      level: 1
    }

    if(!currentUser){
      throw new Meteor.Error("not-logged-in", "You're not logged in!!");
    }

    Characters.insert(data);

    var character = Characters.findOne({ name: characterName });
    Meteor.call('createCharacterStats', character._id);
    Meteor.call('createCharacterEquipment', character._id);
    return character._id;
  },

  'createCharacterStats': function(characterId){
    var currentUser = Meteor.user();
    var data = {
      createdByCharacter: characterId,
      experience: 0,
      expToNext: 10,
      currentHealth: 10,
      maxHealth: 10,
      currentMana: 10,
      maxMana: 10,
      attack: 5,
      defense: 5,
      currency: 10
    }

    if(!currentUser) {
      throw new Meteor.Error("not-logged-in", "You're not logged in!!");
    }

    Stats.insert(data);
  },
  'createCharacterEquipment': function(characterId){
    var currentUser = Meteor.user();
    var data = {
      createdByCharacter: characterId,
      helm: "Helm",
      neck: "",
      mainHand: "",
      offHand: "",
      rRing: "",
      lRing: "",
      gloves: "",
      chest: "",
      belt: "",
      leggings: "",
      boots: "",
      potionOne: "",
      potionTwo: "",
      potionThree: "",
      potionFour: "",
      potionFive: "",
    }

    if(!currentUser) {
      throw new Meteor.Error("not-logged-in", "You're not logged in!!");
    }

    Equipment.insert(data);
  },
});
