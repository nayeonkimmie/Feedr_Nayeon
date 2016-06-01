//Choose news source
$("#selectSource").on('click', 'li', function() {
	var currentFeed = $(this).text();
	$("#currentSource").html(currentFeed);
	//OR $("#currentSource").html(event.target.textContent);
	//OR $("#currentSource").html($(this).text());
	displayFeed(currentFeed);
});

//function to run once the news source is chosen
function displayFeed(myCurrentFeed) {
	switch(myCurrentFeed) {
		case "Reddit" : {
			$.ajax({ //same as $(document).ajax
				url: 'https://www.reddit.com/top.json',
				datatype: 'json',
				data: {},
				method: 'GET',
				success: function(response) {
					var myRedditObj = response.data.children;
					myRedditObj.forEach(function(item) {

						//article feed
						var eachArticle = '<article class="article">';
							eachArticle += '<section class="featuredImage"><img src="' + item.data.thumbnail + '" alt="" /></section>';
							eachArticle += '<section class="articleContent"><a href="#"><h3>' + item.data.title + '</h3></a>';
							eachArticle += '<h6>' + item.data.author + '</h6></section>';
							eachArticle += '<section class="impressions">' + item.data.ups + '</section>';
							eachArticle += '<div class="clearfix"></div></article>';

						$('#main').append(eachArticle);

						//open popup
						var popupWindow = '<a href="#" class="closePopUp">x</a>';
							popupWindow += '<div class="container">';
							popupWindow += '<h1>' + item.data.title + '</h1>';
							popupWindow += '<p>' + item.data + '</p>';//I can't find out the path for the content of each article. It seems like each object/article has a different path to its content.
							popupWindow += '<a href="' + item.data.url + '" class="popUpAction" target="_blank">Read more from source</a></div>';

						$('.article').click(function() {
							$('#popUp').append(popupWindow);
							$('#popUp').show().removeClass('hidden loader');
						});

						//close popup
						$('div#popUp').on("click", "a.closePopUp", function() {
							$('div#popUp').hide().addClass('hidden');
						});

						//search
						$('#search').click(function() {
							$('#search').toggleClass('active');
							//if ($('input').val() included keyword?) {
								//show the keyword searched with articles that contain the keyword
						});


					});
				},
				error: function(response) {
					console.log('error');
				}
			});
			console.log("I did Reddit");
			break;
		}
		default: {
			console.log("This should never show up");
		};
	};
};
