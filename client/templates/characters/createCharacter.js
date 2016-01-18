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
        Router.go('character', { _id: results });
      }
  });
  }
});
