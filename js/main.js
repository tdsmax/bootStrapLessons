	/**
	* @author Tarandeep Singh 
	* @date  2016-01-17
	* @description This is the Projects Main Js File it contains all the core functionality of this project 
	*/

	(function($, w,d){

		function updateNavBar(d){
			var chapters = Object.keys(d);
			for(var i=0;i<chapters.length;i++){
				$("<a></a>", {class: "btn-link btn-xs", id:chapters[i]}).text(d[chapters[i]]).appendTo($("<li></li>").appendTo(nav));
			}
		}

		nav.on('click','li a', function(e){
			makeAjaxCall(e.target.id);
		});

		/**
		* Load config file and update navigation panel in the main file
		*/
		function makeAjaxClass(id){
			var id = id || "config/lessonsLink.json";

			var xhr = new XMLHttpRequest(), data, nav = $("#lessonsNav");

			xhr.onreadystatechange = function(e){
				if(xhr.readyState == 4 && xhr.status === 200){
					data = JSON.parse(xhr.responseText);
					updateNavBar(data);
				}
			}

			xhr.open("GET", id, true);
			xhr.setRequestHeader('Content-type', 'text/html');
			//xhr.setRequestHeader('Content-type', 'application/json');
			xhr.send();
		}

		//Init Ajax Call For Lessons
		makeAjaxClass();

	})(jQuery, window, document, undefined)