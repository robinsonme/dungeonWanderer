Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
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
  },
  waitOn: function(){
    var currentCharacter = this.params._id;
    return Meteor.subscribe('stats', currentCharacter);
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
