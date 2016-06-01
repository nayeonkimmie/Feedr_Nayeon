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
						
						//news feed
						var eachArticle = '<article class="article">'; //each article
							eachArticle += '<section class="featuredImage"><img src="images/article_placeholder_1.jpg" alt="" /></section>';//each objects have different struction for the images. How do I get images for its particular article?
							eachArticle += '<section class="articleContent"><a href="#"><h3>' + item.data.title + '</h3></a>';
							eachArticle += '<h6>' + item.data.author + '</h6></section>'; //article content
							eachArticle += '<section class="impressions">' + item.data.ups + '</section>'; //likes
							eachArticle += '<div class="clearfix"></div></article>'; //clearfix 
						$('#main').append(eachArticle);
						
						//open popup
						$('.article').click(function(item) {					  
							var popupWindow = '<a href="#" class="closePopUp">x</a>';
								popupWindow += '<div class="container">';
								popupWindow += '<h1>' + /*item.data.title*/'Hi' +'</h1>';
								popupWindow += '<p>' + /*item.data.secure_media.oembed.description*/'How are you?' + '</p>';
								popupWindow += '<a href="#" class="popUpAction" target="_blank">Read more from source</a></div>';
							$('#popUp').append(popupWindow);
							$('#popUp').show().removeClass('hidden loader');
						});
						
						//close popup
						$('div#popUp').on("click", "a.closePopUp", function() {
							$('div#popUp').hide().addClass('hidden');
						});
					});
										/*
					$('#main').on("click", "article", function(item) {
						$('div#popUp').show().removeClass('hidden');
					
						$('div.container').append($('<h1>'));
						//$('h1').html(item.data.title);
						
						$('div.container').append($('<p>').html("Content of the article"));
						
						//?????? $('.loader').hide();
					
					
					<div id="popUp" class="loader hidden">
						<a href="#" class="closePopUp">x</a>
							<div class="container">
								<h1>Title</h1>
								<p>Story</p>
								<a href="#" class="popUpAction" target="_blank">Read more from source</a>
							</div>
					</div>
										
					//search
					$('#search').click(function() {
						//upon clicking the search button, show the input field
						$('#search').toggleClass('active');
						//if ($('input').val() included keyword?) {
							//show the keyword searched with articles that contain the keyword
					});	
				
					*/
					
					
					
					
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