(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// hssite.js                                                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       //
if (Meteor.isClient) {                                                 // 2
  var r = new window.XMLHttpRequest();                                 // 3
  r.open("GET", "https://omgvamp-hearthstone-v1.p.mashape.com/cards", true);
  r.onreadystatechange = function () {                                 // 5
    if (r.readyState != 4 || r.status != 200) return;                  // 6
    var api = r.responseText;                                          // 7
    var jsonResponse = JSON.parse(api);                                // 8
    console.log("Success: ", jsonResponse);                            // 9
    var div = document.getElementById('div');                          // 10
    var cardType1 = "Weapon";                                          // 11
    var cardType2 = "Spell";                                           // 12
    var cardType3 = "Minion";                                          // 13
    var cardPack = ["Basic", "Classic", "Blackrock Mountain", "Goblins vs Gnomes", "Naxxramas", "The Grand Tournament", "The League of Explorers"];
    for (var o = 0; o < cardPack.length; o++) {                        // 15
      for (var i = jsonResponse[cardPack[o]].length - 1; i >= 0; i--) {
        if (jsonResponse[cardPack[o]][i]['type'] == cardType1 || jsonResponse[cardPack[o]][i]['type'] == cardType2 || jsonResponse[cardPack[o]][i]['type'] == cardType3) {
          div.innerHTML = div.innerHTML + "<div class='col-md-2'><img src=' " + jsonResponse[cardPack[o]][i].img + "'></div>";
        }                                                              //
      };                                                               //
    };                                                                 //
  };                                                                   //
  r.setRequestHeader("X-Mashape-Key", "5M5za2r26Umsh5IcTFstcBnN25Zlp1hgRnJjsnOnw7fBHjLyCf");
  r.send("banana=yellow");                                             // 24
  /*	                                                                  //
  unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")    //
  .header("X-Mashape-Key", "5M5za2r26Umsh5IcTFstcBnN25Zlp1hgRnJjsnOnw7fBHjLyCf")
  .end(function (result) {                                             //
    var div = document.getElementById('div');                          //
    div.innerHTML = div.innerHTML + (result.status, result.headers, result.body);
  });                                                                  //
  */                                                                   //
  while (1 == 1) {                                                     // 33
    console.log(document.readyState);                                  // 34
    setTimeout(10000);                                                 // 35
  }                                                                    //
                                                                       //
  if (document.readyState === 'complete') {                            // 38
    alert("Complete");                                                 // 39
    console.log("Complete");                                           // 40
  };                                                                   //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=hssite.js.map
