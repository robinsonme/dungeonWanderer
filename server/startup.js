Meteor.startup(function(){
  if (Enemies.find().count() === 0) {
    var data = {
      enemy1: {
        name: "Enemy 1",
        stats: {
          hp: 10,
          mana: 10,
          attack: 1,
          defense: 1
        }
      },
      enemy2: {
        name: "Enemy 2",
        stats: {
          hp: 10,
          mana: 10,
          attack: 2,
          defense: 2
        }
      },
      enemy3: {
        name: "Enemy 3",
        stats: {
          hp: 10,
          mana: 10,
          attack: 3,
          defense: 3
        }
      },
      enemy4: {
        name: "Enemy 4",
        stats: {
          hp: 10,
          mana: 10,
          attack: 4,
          defense: 4
        }
      },
      enemy5: {
        name: "Enemy 5",
        stats: {
          hp: 10,
          mana: 10,
          attack: 5,
          defense: 5
        }
      },
      enemy6: {
        name: "Enemy 6",
        stats: {
          hp: 10,
          mana: 10,
          attack: 6,
          defense: 6
        }
      },
      enemy7: {
        name: "Enemy 7",
        stats: {
          hp: 10,
          mana: 10,
          attack: 7,
          defense: 7
        }
      },
      enemy8: {
        name: "Enemy 8",
        stats: {
          hp: 10,
          mana: 10,
          attack: 8,
          defense: 8
        }
      },
      enemy9: {
        name: "Enemy 9",
        stats: {
          hp: 10,
          mana: 10,
          attack: 9,
          defense: 9
        }
      },
      enemy10: {
        name: "Enemy 10",
        stats: {
          hp: 10,
          mana: 10,
          attack: 10,
          defense: 10
        }
      }
    }

    Enemies.insert(data);
  }
});
