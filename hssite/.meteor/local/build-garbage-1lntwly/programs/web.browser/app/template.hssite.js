(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    id: "div"
  }, "\n	  ", Spacebars.include(view.lookupTemplate("Router")), "\n	");
}));
Meteor.startup(Template.body.renderToDocument);

}).call(this);
