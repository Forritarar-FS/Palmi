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
          div.innerHTML = div.innerHTML + "<div class='card col-md-2'><img onload='loadImage()'' src=' " + jsonResponse[cardPack[o]][i].img + "'></div>";
        }                                                              //
      };                                                               //
    };                                                                 //
  };                                                                   //
                                                                       //
  r.setRequestHeader("X-Mashape-Key", "5M5za2r26Umsh5IcTFstcBnN25Zlp1hgRnJjsnOnw7fBHjLyCf");
  r.send("banana=yellow");                                             // 27
                                                                       //
  r.open("GET", "https://omgvamp-hearthstone-v1.p.mashape.com/cardbacks", true);
  r.onreadystatechange = function () {                                 // 31
    if (r.readyState != 4 || r.status != 200) return;                  // 32
    var api = r.responseText;                                          // 33
    var jsonResponse = JSON.parse(api);                                // 34
    console.log("Success: ", jsonResponse);                            // 35
    var divi = document.getElementById('cardbacks');                   // 36
    for (var i = jsonResponse.length - 1; i >= 0; i--) {               // 37
      divi.innerHTML = divi.innerHTML + "<div class='card col-md-2'><img src=' " + jsonResponse[i].imgAnimated + "'></div>";
    };                                                                 //
  };                                                                   //
                                                                       //
  r.setRequestHeader("X-Mashape-Key", "5M5za2r26Umsh5IcTFstcBnN25Zlp1hgRnJjsnOnw7fBHjLyCf");
  r.send("banana=yellow");                                             // 43
                                                                       //
  /*	                                                                  //
  unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")    //
  .header("X-Mashape-Key", "5M5za2r26Umsh5IcTFstcBnN25Zlp1hgRnJjsnOnw7fBHjLyCf")
  .end(function (result) {                                             //
    var div = document.getElementById('div');                          //
    div.innerHTML = div.innerHTML + (result.status, result.headers, result.body);
  });                                                                  //
  */                                                                   //
                                                                       //
  function loadImage() {                                               // 54
    $("#loading").hide();                                              // 55
  }                                                                    //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);
