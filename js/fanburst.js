var fbArtistBaseURL = "https://api.fanburst.com/users/search?query="
var fbTrackBaseURL = "https://api.fanburst.com/tracks/"

function fbSearch (artistSearch) {
	console.log("=======fanburst==========")
	var fbSection = $("#fb-row");
	//Condition where the artist name has a space
	var artistWithSpace = artistSearch;
	// var artistWithSpace = "drake"
	var artist = artistWithSpace.split(" ").join("+");


	var fbArtistURL = fbArtistBaseURL+artist
	console.log("======= fanburst artist URL : " +fbArtistURL+ "==========")

	$.ajax({
		url: fbArtistURL,
		type: "GET",
        cors: true ,
	}).done(function(artistIdData){
		console.log("=======fanburst==========")
		console.log(artistIdData)
		console.log("======= fanburst arist ID ========")
		var artistID = artistIdData.user.name
		var artistName = artistIdData.user.name
		console.log(artistID)
		console.log(artistName)

		if (artistID) {
			var fbIdURL = fbTrackBaseURL+artistID
			console.log("fanburst artist id URL : ==== " + fbIdURL)
			$.ajax({
				url: fbIdURL,
				type: "GET",
				cors: true,
			}).done(function(trackData) {
				console.log("Track Data for fanburst ---- ")
				console.log(trackData)

				fbSection.empty();

				//loop through and add tracks
				var fbEmbed  = (trackData.items[0].uri);
				var fbtrackURI = "https://open.fanburst.com/embed?uri="+fbEmbed+"&theme=black"
				// fbIframe.attr("src", fbtrack);
				var col5Div = $('<div class="col-sm-12">');

				console.log("---- fanburst URL : ====== " + fbTrackURI )
				console.log("---- fanburst Name : ====== " + trackData.title)
				col5Div.html('<iframe src="'+fbTrackURI+'" width="100%" height="400" frameborder="0" allowtransparency="true" ></iframe>');
				fbSection.append(col5Div)
				console.log("---- fb append is hapenning ----")

			})
		}
	})
}

console.log(fbSearch());

$(document).ready(function() {
	$("#searchButton").on("click", function(){
		fbSearch($("#search").val());
	})
})