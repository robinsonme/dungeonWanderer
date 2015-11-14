
Stats = new Meteor.Collection('stats');

if (Meteor.isClient) {


  Template.createCharacter.events({
    'submit form': function(event){
      event.preventDefault();
      var characterName = $('[name=characterName]').val();
      var race = $('[name=race]').val();
      var gender = $('[name=gender').val();
      Meteor.call('createNewCharacter', characterName, race, gender, function(error, results) {
        if (error){
          console.log(error.reason);
        } else {
          $('[name="characterName"]').val('');
          $('[name=race]').val("Human");
          $('#createCharacter').on('hidden.bs.modal', function() {
              Router.go('character', { _id: results });
            });
          $('#createCharacter').modal('hide');
        }
    });
    }
  });

  Template.characters.events({
    'click .delete-character': function(event){
      event.preventDefault();
      var currentUser = Meteor.userId();
      var documentID = this._id;
      var confirm = window.confirm("Delete this character permenantly?");
      if(confirm){
        Characters.remove({ _id: documentID });
      }
    }
  });

  Template.characters.onCreated(function(){
    this.subscribe('characters');
  });







  Template.characters.helpers({
    'character': function(){
      var currentUser = Meteor.userId();
      return Characters.find({ createdBy: currentUser }, {sort: {name: 1}});
    },
    'maxCharactersReached': function(){
      var currentUser = Meteor.userId();
      var numChars = Characters.find({ createdBy: currentUser }).count();
      if(numChars >= 10) {
        return false;
      } else {
        return true;
      }
    }
  });

  Template.statsTemp.helpers({
    'stats': function(){
      var currentCharacter = this._id;
      var characterStats = Stats.findOne({ createdByCharacter: currentCharacter });
      return characterStats;
    },
    'currency': function(){
      var currentCharacter = this._id;
      var characterStats = Stats.findOne({ createdByCharacter: currentCharacter });
      var currency = characterStats.currency;
      Meteor.call('currencyConversion', currency, function(error, results) {
        if (error){
          console.log(error.reason);
        } else {
          console.log(results);
          console.log(currency);
          return currency;
        }
      });
    }
  });
}

if (Meteor.isServer) {

  Meteor.methods({
    'createNewCharacter': function(characterName, race, gender){
      var currentUser = Meteor.userId();
      var data = {
        name: characterName,
        race: race,
        gender: gender,
        createdBy: currentUser,
        createdAt: new Date(),
        level: 1
      }

      if(!currentUser){
        throw new Meteor.Error("not-logged-in", "You're not logged in!!");
      }

      Characters.insert(data);
      Users.update({_id: currentUser}, {$inc: {characterCount: 1}});

      var characterId = Characters.findOne({ name: characterName });
      Meteor.call('createCharacterStats', characterId._id);
      return characterId._id;
    },

    'createCharacterStats': function(characterId){
      var currentUser = Meteor.userId();
      var data = {
        createdBy: currentUser,
        createdByCharacter: characterId,
        experience: 0,
        expToNext: 10,
        currentHealth: 10,
        maxHealth: 10,
        currentMana: 10,
        maxMana: 10,
        currency: 10
      }

      if(!currentUser) {
        throw new Meteor.Error("not-logged-in", "You're not logged in!!");
      }

      Stats.insert(data);
    },

    'currencyConversion': function(currency){
      var currencyAmount = "";
      var silver = 100;
      var gold = silver * 100;
      var platinum = gold * 1000;
      var electrum = platinum * 1000;
      electrumAmount = Math.floor(currency/electrum);
      currency = currency % electrum;
      platinumAmount = Math.floor(currency/platinum);
      currency = currency % platinum;
      goldAmount = Math.floor(currency/gold);
      currency = currency % gold;
      silverAmount = Math.floor(currency/silver);
      currency = currency % silver;
      if(electrumAmount > 0){
        currencyAmount = electrumAmount + "e " + platinumAmount + "p " + goldAmount + "g " + silverAmount + "s " + currency + "c";
        return currencyAmount;
      } else if (platinumAmount > 0) {
        currencyAmount = platinumAmount + "p "+ goldAmount + "g " + silverAmount + "s " + currency + "c";
        return currencyAmount;
      } else if (goldAmount > 0) {
        currencyAmount = goldAmount + "g " + silverAmount + "s " + currency + "c";
        return currencyAmount;
      } else if (silverAmount > 0) {
        currencyAmount = silverAmount + "s " + currency + "c";
        return currencyAmount;
      } else {
        currencyAmount = currency + "c";
        return currencyAmount;
      }
    }
  });
}
