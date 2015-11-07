Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/characters', {
  name: 'characters',
  template: 'characters'
});

Router.route('/character/:_id', {
  name: 'character',
  template: 'character',
  data: function(){
    var currentCharacter = this.params._id;
    return Characters.findOne({ _id: currentCharacter });
  }
});

Router.route('/character/:_id/inventory', {
  name: 'inventory',
  template: 'inventory',
  data: function(){
    var currentCharacter = this.params._id;
    return Characters.findOne({ _id: currentCharacter });
  }
});

Router.route('/character/:_id/abilities', {
  name: 'abilities',
  template: 'abilities',
  data: function(){
    var currentCharacter = this.params._id;
    return Characters.findOne({ _id: currentCharacter });
  }
});

Router.route('/character/:_id/companions', {
  name: 'companions',
  template: 'companions',
  data: function(){
    var currentCharacter = this.params._id;
    return Characters.findOne({ _id: currentCharacter });
  }
});

Router.route('/about', {
  name: 'about',
  template: 'about'
});

Router.route('/contact', {
  name: 'contact',
  template: 'contact'
});

Characters = new Meteor.Collection('characters');

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });

  Template.createCharacter.events({
    'submit form': function(event){
      event.preventDefault();
      var characterName = $('[name=characterName]').val();
      var currentUser = Meteor.userId();
      Characters.insert({
        name: characterName,
        createdBy: currentUser,
        createdAt: new Date(),
        level: 1
      }, function(error, results) {
        $('[name="characterName"]').val('');
        $('#createCharacter').on('hidden.bs.modal', function() {
            Router.go('character', { _id: results });
          });
        $('#createCharacter').modal('hide');
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
  })

  Template.navTopLeft.helpers({
    'activeIfTemplateIs': function(template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
  });

  Template.navTopRight.helpers({
    'activeIfTemplateIs': function(template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
  });

  Template.navLeftSide.helpers({
    'activeIfTemplateIs': function(template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
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

  Template.characterCount.helpers({
    'totalCharacters': function(){
      var currentUser = Meteor.userId();
      return Characters.find({ createdBy: currentUser }).count();
    },
    'maxCharacters': function(){
      var currentUser = Meteor.userId();
      // Setup for a later max number of characters and a way to increase that.
    }
  });
}

if (Meteor.isClient) {
  
}