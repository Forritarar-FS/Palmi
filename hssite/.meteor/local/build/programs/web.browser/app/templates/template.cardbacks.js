(function(){
Template.__checkName("cardbacks");
Template["cardbacks"] = new Template("Template.cardbacks", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n", HTML.NAV({
      "class": "navbar navbar-default navbar-fixed-top"
    }, "\n	      ", HTML.DIV({
      "class": "container"
    }, "\n	        ", HTML.DIV({
      "class": "navbar-header"
    }, "\n	          ", HTML.BUTTON({
      type: "button",
      "class": "navbar-toggle collapsed",
      "data-toggle": "collapse",
      "data-target": "#navbar",
      "aria-expanded": "false",
      "aria-controls": "navbar"
    }, "\n	            ", HTML.SPAN({
      "class": "sr-only"
    }, "Toggle navigation"), "\n	            ", HTML.SPAN({
      "class": "icon-bar"
    }), "\n	            ", HTML.SPAN({
      "class": "icon-bar"
    }), "\n	            ", HTML.SPAN({
      "class": "icon-bar"
    }), "\n	          "), "\n	          ", HTML.A({
      "class": "navbar-brand",
      href: "/"
    }, "HS4FS"), "\n	        "), "\n	        ", HTML.DIV({
      id: "navbar",
      "class": "collapse navbar-collapse"
    }, "\n	          ", HTML.UL({
      "class": "nav navbar-nav"
    }, "\n	            ", HTML.LI(HTML.A({
      href: "../"
    }, "Home")), "\n	            ", HTML.LI(HTML.A({
      href: "/Cards"
    }, "Cards")), "\n				", HTML.LI({
      "class": "active"
    }, HTML.A({
      href: "/Cardbacks"
    }, "Card Backs")), "\n	          "), "\n	          ", HTML.DIV({
      "class": "nav navbar-nav navbar-right dropdown"
    }, "\n	      		", HTML.LI({
      id: "dropdownMenu1",
      "data-toggle": "dropdown",
      "aria-haspopup": "true",
      "aria-expanded": "true"
    }, Spacebars.include(view.lookupTemplate("loginButtons"))), "\n	  		  "), "\n        	"), HTML.Comment("/.nav-collapse "), "\n      	  "), "\n    	"), "\n    	", HTML.DIV({
      id: "loading"
    }, "\n    		", Spacebars.include(view.lookupTemplate("spinner")), "\n    	"), "\n	", HTML.DIV({
      onload: "cardbacks()",
      "class": "container"
    }, "\n	", HTML.H1({
      "class": "text-center"
    }, "Hearthstone Cards"), "\n	  ", HTML.DIV({
      id: "cardbacks",
      style: "margin-top:50px;",
      "class": "row"
    }, "\n	  	\n	  "), "\n	"), "\n" ];
  }, function() {
    return [ "\n", HTML.SCRIPT("Router.go('home');"), "\n" ];
  });
}));

}).call(this);
