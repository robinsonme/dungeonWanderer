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

function newFight() {
  var elem = document.getElementById('fight');
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      gameData.gold += gameData.goldPerClick
      update("goldOnHand", format(gameData.gold, "scientific") + " Gold on Hand")
      document.getElementById('exploreBtn').disabled = false;
      elem.style.width = width + "%";
    } else {
      width++;
      elem.style.width = width + "%";
      document.getElementById('fightBtn').disabled = true;
    }
  }
}
