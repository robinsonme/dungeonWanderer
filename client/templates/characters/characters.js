Template.characters.helpers({
  'character': function(){
    var currentUser = Meteor.userId();
    return Characters.find({ createdBy: currentUser }, {sort: {name: 1}});
  },
  'maxCharactersReached': function(){
    var currentUser = Meteor.userId();
    var numChars = Characters.find({ createdBy: currentUser }).count();
    if(numChars >= 10) {
      return true;
    } else {
      return false;
    }
  },
  'characterCount': function() {
    var currentUser = Meteor.userId();
    var numChars = Characters.find({ createdBy: currentUser }).count();
    return numChars;
  }
});
Template.characters.events({
  'click .delete-character': function(event){
    event.preventDefault();
    var currentUser = Meteor.userId();
    var documentID = this._id;
    var confirm = window.confirm("Delete this character permenantly?");
    if(confirm){
      Meteor.call('deleteCharacter', documentID);
    }
  }
});

Template.characters.onCreated(function(){
  this.subscribe('characters');
});
