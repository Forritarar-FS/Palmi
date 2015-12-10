(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// routes/routes.js                                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Router.route('/', function () {                                        // 1
  this.render('home');                                                 // 2
});                                                                    //
Router.route('/cards', function () {                                   // 4
  this.render('cards');                                                // 5
});                                                                    //
Router.route('/Cardbacks', function () {                               // 7
  this.render('cardbacks');                                            // 8
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=routes.js.map
