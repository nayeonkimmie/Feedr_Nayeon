// authentication????????

//Choose news source
$("#selectSource").on('click', 'li', function() {//delegating
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
						var eachArticle = $('#main').append($('<article class="article"></article>'));
							var featuredImage = $('article.article').append($('<section class="featuredImage"><img src="images/article_placeholder_1.jpg" alt="" /></section>'));
							var articleContent = $('article').append($('<section class="articleContent"><a href="#"><h3>' + item.data.title + '</h3></a><h6>' + item.data.author + '</h6></section>'));
							var likes = $('article').append($('<section class="impressions">' + item.data.ups + '</section>'));
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


//opening popup (delegation)
$('#main').on("click", "article", function() {
	$(this).addClass("loaderShow");
});


/*
//Search function
$('#search').mouseover(function() {
	//upon clicking the search button, show the input field
	$('input').show();
	//if ($('input').val() included keyword?) {
		//show the keyword searched with articles that contain the keyword
	}
});

*/









