if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


Router.route('/', function () {
  this.layout('home');
});

Router.route('/Cards', function () {
  this.layout('cards');
});

Router.configure({
  layoutTemplate: 'main'
});