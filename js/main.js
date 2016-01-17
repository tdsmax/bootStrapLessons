	/**
	* @author Tarandeep Singh 
	* @date  2016-01-17
	* @description This is the Projects Main Js File it contains all the core functionality of this project 
	*/

	(function($, w,d){

		var xhr = new XMLHttpRequest(), lessonsData, data, nav = $("#lessonsNav"), contentContainer = $("#content");

		function updateNavBar(d){
			lessonsData = d;
			var chapters = Object.keys(d);
			for(var i=0;i<chapters.length;i++){
				$("<a></a>", {class: "btn-link btn-xs", id:chapters[i]}).text(d[chapters[i]]).appendTo($("<li></li>").appendTo(nav));
			}
		}

		function updateContent(d){
			contentContainer.empty();
			contentContainer.append($.parseHTML(d));
		}

		/**
		* Load config file and update navigation panel in the main file
		*/
		function makeAjaxCall(id, type, clb){

			if(id ===  undefined){
				return;
			}

			xhr.onreadystatechange = function(e){
				if(xhr.readyState == 4 && xhr.status === 200){
					data = type === "json" ? JSON.parse(xhr.responseText) : xhr.responseText; 
					clb(data);
				}
			}

			xhr.open("GET", id, true);
			xhr.setRequestHeader('Content-type', 'text/html');
			//xhr.setRequestHeader('Content-type', 'application/json');
			xhr.send();
		}

		//Init Ajax Call For Lessons
		makeAjaxCall("config/lessonsLink.json", 'json', updateNavBar);

		nav.on('click','li a', function(e){
			makeAjaxCall(lessonsData[e.target.id]+".html", "html", updateContent);
		});

	})(jQuery, window, document, undefined)