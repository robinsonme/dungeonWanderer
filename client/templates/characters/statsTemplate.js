Template.statsTemplate.helpers({
  'stats': function(){
    var characterStats = Stats.findOne({});
    return characterStats;
  },
  'currency': function(number){
    if (number || number === 0) {
      var num = number;
      num = Math.floor(num);
      var currencyAmount = "";
      var silver = 100;
      var gold = silver * 100;
      var platinum = gold * 1000;
      var electrum = platinum * 1000;
      electrumAmount = Math.floor(num/electrum);
      num = num % electrum;
      platinumAmount = Math.floor(num/platinum);
      num = num % platinum;
      goldAmount = Math.floor(num/gold);
      num = num % gold;
      silverAmount = Math.floor(num/silver);
      num = num % silver;
      if(electrumAmount > 0){
        currencyAmount = electrumAmount + "e " + platinumAmount + "p " + goldAmount + "g " + silverAmount + "s " + num + "c";
        return currencyAmount;
      } else if (platinumAmount > 0) {
        currencyAmount = platinumAmount + "p "+ goldAmount + "g " + silverAmount + "s " + num + "c";
        return currencyAmount;
      } else if (goldAmount > 0) {
        currencyAmount = goldAmount + "g " + silverAmount + "s " + num + "c";
        return currencyAmount;
      } else if (silverAmount > 0) {
        currencyAmount = silverAmount + "s " + num + "c";
        return currencyAmount;
      } else {
        currencyAmount = num + "c";
        return currencyAmount;
      }
    } else {
      return undefined;
    }

  }
});

Template.statsTemplate.onCreated(function() {
  var character = Characters.findOne({});
  Meteor.subscribe('stats', character._id);
});
