Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/character', {
  name: 'character',
  template: 'character'
});

Router.route('/inventory', {
  name: 'inventory',
  template: 'inventory'
});

Router.route('/abilities', {
  name: 'abilities',
  template: 'abilities'
});

Router.route('/companions', {
  name: 'companions',
  template: 'companions'
});

Router.route('/about', {
  name: 'about',
  template: 'about'
});

Router.route('/contact', {
  name: 'contact',
  template: 'contact'
});

Router.route('/register', {
  name: 'register',
  template: 'register'
});

Router.route('/login', {
  name: 'login',
  template: 'login'
});

if (Meteor.isClient) {

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

  Template.login.events({
    'submit form': function(event){
      event.preventDefault();
      var username = $('[name=username]').val();
      var password = $('[name=password]').val();
      Meteor.loginWithPassword(username, password, function(error){
        if(error){
          console.log(error.reason);
        } else {
          Router.go("home");
        }
      });
    }
  });

  Template.navTopRight.events({
    'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
    }
  });

  Template.register.events({
    'submit form': function(event){
      event.preventDefault();
      var email = $('[name=email]').val();
      var username = $('[name=username]').val();
      var password = $('[name=password]').val();
      Accounts.createUser({
        email: email,
        username: username,
        password: password,
      }, function(error){
        if(error){
          console.log(error.reason);
        } else {
          Router.go('home');
        }
      });
    }
  });

}

if (Meteor.isClient) {
  Meteor.methods({
    'createCharacter': function(){
      
    }
  });
}