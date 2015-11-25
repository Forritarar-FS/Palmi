

var r = new XMLHttpRequest();
r.open("GET", "https://omgvamp-hearthstone-v1.p.mashape.com/cards", true);
r.onreadystatechange = function () {
  if (r.readyState != 4 || r.status != 200) return;
  var api = r.responseText;
  var jsonResponse = JSON.parse(api);
  console.log("Success: " , jsonResponse);
  var div = document.getElementById('div');
  var cardType1 = "Weapon";
  var cardType2 = "Spell";
  var cardType3 = "Minion";
  var cardPack = ["Basic", "Classic", "Blackrock Mountain", "Goblins vs Gnomes", "Naxxramas", "The Grand Tournament", "The League of Explorers"];
  for (var o = 0; o < cardPack.length; o++) {
	  for (var i = jsonResponse[cardPack[o]].length - 1; i >= 0; i--) {
	  	if (jsonResponse[cardPack[o]][i]['type'] == cardType1 || jsonResponse[cardPack[o]][i]['type'] == cardType2 || jsonResponse[cardPack[o]][i]['type'] == cardType3 ) {
	  		div.innerHTML = div.innerHTML + "<div class='col-md-2'><img src=' " + (jsonResponse[cardPack[o]][i].img) + "'></div>";
	  	}
	  };
   };
};
r.setRequestHeader("X-Mashape-Key", "5M5za2r26Umsh5IcTFstcBnN25Zlp1hgRnJjsnOnw7fBHjLyCf");
r.send("banana=yellow");
/*	
unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
.header("X-Mashape-Key", "5M5za2r26Umsh5IcTFstcBnN25Zlp1hgRnJjsnOnw7fBHjLyCf")
.end(function (result) {
  var div = document.getElementById('div');
  div.innerHTML = div.innerHTML + (result.status, result.headers, result.body);
});
*/

};