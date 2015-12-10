(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// hssite.js                                                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
if (Meteor.isClient) {                                                 // 2
  var r = new XMLHttpRequest();                                        // 3
  r.open("GET", "https://omgvamp-hearthstone-v1.p.mashape.com/cards", true);
  r.onreadystatechange = function () {                                 // 5
    if (r.readyState != 4 || r.status != 200) return;                  // 6
    console.log("Success: ", r.responseText);                          // 7
    var div = document.getElementById('div');                          // 8
    for (var i = r.responseText.Basic.length - 1; i >= 0; i--) {       // 9
      div.innerHTML = div.innerHTML + "<img src=' " + r.responseText.Basic[i].img + "'>";
    };                                                                 //
  };                                                                   //
  r.setRequestHeader("X-Mashape-Key", "5M5za2r26Umsh5IcTFstcBnN25Zlp1hgRnJjsnOnw7fBHjLyCf");
  r.send("banana=yellow");                                             // 14
  /*	                                                                  //
  unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")    //
  .header("X-Mashape-Key", "5M5za2r26Umsh5IcTFstcBnN25Zlp1hgRnJjsnOnw7fBHjLyCf")
  .end(function (result) {                                             //
    var div = document.getElementById('div');                          //
    div.innerHTML = div.innerHTML + (result.status, result.headers, result.body);
  });                                                                  //
  */                                                                   //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=hssite.js.map
