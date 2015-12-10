(function(){
Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return [ HTML.NAV({
    "class": "navbar navbar-default navbar-fixed-top"
  }, "\n	      ", HTML.DIV({
    "class": "container"
  }, "\n	        ", HTML.Raw('<div class="navbar-header">\n	          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\n	            <span class="sr-only">Toggle navigation</span>\n	            <span class="icon-bar"></span>\n	            <span class="icon-bar"></span>\n	            <span class="icon-bar"></span>\n	          </button>\n	          <a class="navbar-brand" href="/">HS4FS</a>\n	        </div>'), "\n	        ", HTML.DIV({
    id: "navbar",
    "class": "collapse navbar-collapse"
  }, "\n	          ", HTML.UL({
    "class": "nav navbar-nav"
  }, "\n	            ", HTML.Raw('<li class="active"><a href="/">Home</a></li>'), "\n	            ", HTML.Raw('<li><a href="/Cards">Cards</a></li>'), "\n	            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n	            	", HTML.LI(HTML.A({
      href: "/Cardbacks"
    }, "Card Backs")), "\n	            " ];
  }, function() {
    return [ "\n	            	", HTML.LI({
      "class": "disabled",
      "data-toggle": "tooltip",
      title: "Login to see Premium Cards"
    }, HTML.A("Card Backs")), "\n	            " ];
  }), "\n	          "), "\n	          ", HTML.DIV({
    "class": "nav navbar-nav navbar-right dropdown"
  }, "\n	      		", HTML.LI({
    id: "dropdownMenu1",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "true"
  }, Spacebars.include(view.lookupTemplate("loginButtons"))), "\n	  		  "), "\n        	"), HTML.Raw("<!--/.nav-collapse -->"), "\n      	  "), "\n    	"), HTML.Raw('\n	<div class="container">\n	<h1 class="text-center">Hearthstone Cards</h1>\n	  <div style="margin-top:50px;" class="row">\n	  </div>\n	</div>') ];
}));

}).call(this);
