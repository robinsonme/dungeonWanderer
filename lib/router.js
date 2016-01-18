Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});

var mustBeSignedIn = function() {
  if (!(Meteor.user())) {
    Router.go('home');
  } else {
    this.next();
  }
};

Router.route('/', {
  name: 'home',
  template: 'home',
  onBeforeAction: function() {
    if (!(Meteor.user())) {
      this.next();
    } else {
      Router.go('characters');
    }
  }
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
  },
  waitOn: function(){
    return [ Meteor.subscribe('characters') ];
  }
});

Router.route('/character/:_id/dungeon', {
  name: 'dungeon',
  template: 'dungeon',
  data: function(){
    var currentCharacter = this.params._id;
    return Characters.findOne({ _id: currentCharacter });
  },
  waitOn: function(){
    return [ Meteor.subscribe('characters') ];
  }
});

Router.route('/character/:_id/inventory', {
  name: 'inventory',
  template: 'inventory',
  data: function(){
    var currentCharacter = this.params._id;
    return Characters.findOne({ _id: currentCharacter });
  },
  waitOn: function(){
    return [ Meteor.subscribe('characters') ];
  }
});

Router.route('/character/:_id/abilities', {
  name: 'abilities',
  template: 'abilities',
  data: function(){
    var currentCharacter = this.params._id;
    return Characters.findOne({ _id: currentCharacter });
  },
  waitOn: function(){
    return [ Meteor.subscribe('characters') ];
  }
});

Router.route('/character/:_id/companions', {
  name: 'companions',
  template: 'companions',
  data: function(){
    var currentCharacter = this.params._id;
    return Characters.findOne({ _id: currentCharacter });
  },
  waitOn: function(){
    return [ Meteor.subscribe('characters') ];
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

Router.onBeforeAction(mustBeSignedIn, {except: ['home', 'about', 'contact', 'cancel', 'success']});

Router.route('/cancel', {
  name: 'cancel'
});

Router.route('/success', {
  name: 'success'
});
