// listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmarks);

// Save bookmarks
function saveBookmarks(e)
{
	// Get form value
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	
	// validating for empty blocks
	if(!siteName || !siteUrl) {
		//alert('Please fill in the form!');
		var warning = document.getElementById('warning');
		warning.innerHTML = '<div  class="alert alert-warning"> '+
							'<strong>Warning! </strong> Please fill in the form! '+
							'</div>';
		return false;
	}

	// validating for correct form of url
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)) {

		//alert('Please use a valid Url');
		var warning = document.getElementById('warning');
		warning.innerHTML = '<div  class="alert alert-warning"> '+
							'<strong>Warning! </strong> Please enter a valid Url! '+
							'</div>';
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	// localStorage.setItem('item', 'Suras!'); 
	// console.log(localStorage.getItem('item'));

	if(localStorage.getItem('bookmarks') === null){
		
		// Initialize the array
		var bookmarks = [];
		
		// Add to array
		bookmarks.push(bookmark);
		
		// Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		
		// get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		
		// Add bookmarks to array
		bookmarks.push(bookmark);

		// Re-Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// Reload the page again.
	//fetchBookmarks();
	
	location.reload(true);
	// prevent form from submitting
	e.preventDefault();
}

function deleteBookmark(url) {

	// get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i=0; i<bookmarks.length; i++) {

		if(bookmarks[i].url == url) {

			// remove from array.
			bookmarks.splice(i, 1);
		}
	}

	// Re-Set to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Reload the page again.
	//fetchBookmarks();
	location.reload(true);
}

function fetchBookmarks() {

	// get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	var bookMarksResults = document.getElementById('bookmarksResults');

	// Buils output
	//bookMarksResults.innerHTML = 'blue';

	var l=bookmarks.length;
	//console.log(l);
	for(var i = 0; i < l; i++){

		var name = bookmarks[i].name;
	 	var url = bookmarks[i].url;

	 	bookMarksResults.innerHTML += '<div class="well well-lg">'+
	 								  '<h3>'+ (i+1) + '. '+ name +
	 								  ' <a class="btn btn-success" target="_blank" href="'+url+'">Visit</a> ' + 
	 								  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '
	 								  '</h3>'+
	 								  '</div> '+
	 								  '<br>';
	}
}