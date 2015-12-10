(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV("\n		", HTML.DIV({
    id: "div",
    style: "margin-top:50px;",
    "class": "row"
  }, "\n	  		", Spacebars.include(view.lookupTemplate("Router")), "\n	  	"), "\n	");
}));
Meteor.startup(Template.body.renderToDocument);

}).call(this);
