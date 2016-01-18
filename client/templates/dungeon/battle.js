Template.battle.helpers({
  'characterStats': function() {
    var characterStats = Stats.findOne({});
    return characterStats;
  },
  'enemy': function() {
    enemy = Enemies.findOne();
    if (enemy) {
      var number = Math.floor((Math.random() * 10) + 1);
      var randomEnemy = "enemy" + number;
      enemy = Enemies.findOne()[randomEnemy];
      return enemy;
    } else {
      return undefined;
    }
  },
});

Template.battle.onCreated(function() {
  var character = Characters.findOne({});
  Meteor.subscribe('stats', character._id);
  Meteor.subscribe('enemies');
});
