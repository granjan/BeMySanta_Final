function menu_click(id) {
	
	var nums = document.getElementById("menu_ul");
	var listItem = nums.getElementsByTagName("li");
	
	for (var i=0; i < listItem.length; i++) {
		listItem[i].classList.remove('active');
	}	
	
	document.getElementById(id).classList.add('active');
};

jQuery("document").ready(function($){	
	var nav = $('.nav-container');	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 136) {
			nav.addClass("f-nav");
		} else {
			nav.removeClass("f-nav");
		}
	}); 
});

function showWishes() {
	var items = [
	    { WishId: "Apple", ChildName: "80", Gender : "3", ChildAge : "240", Wish: "Toy Car", EmployeeName: "", EmployeeRacfId: "", Building: "", Floor: "", Status: "Incomplete"  },
	    { WishId: "Apple", ChildName: "80", Gender : "3", ChildAge : "240", Wish: "Toy Car", EmployeeName: "", EmployeeRacfId: "", Building: "", Floor: "", Status: "Registered"  },
	    { WishId: "Apple", ChildName: "80", Gender : "3", ChildAge : "240", Wish: "Toy Car", EmployeeName: "", EmployeeRacfId: "", Building: "", Floor: "", Status: "Completed"  },
	    { WishId: "Apple", ChildName: "80", Gender : "3", ChildAge : "240", Wish: "Toy Car", EmployeeName: "", EmployeeRacfId: "", Building: "", Floor: "", Status: "Registered"  },
	    { WishId: "Apple", ChildName: "80", Gender : "3", ChildAge : "240", Wish: "Toy Car", EmployeeName: "", EmployeeRacfId: "", Building: "", Floor: "", Status: "Incomplete"  }
	];
	
	var rows = "";
	for (var i=0; i < items.length; i++) {		
	    rows += "<tr><td>" + items[i].WishId + "</td><td>" + items[i].ChildName + "</td><td>" + items[i].Gender + "</td><td>" + items[i].ChildAge + "</td><td>" + items[i].Wish + "</td><td>" + items[i].EmployeeName + "</td><td>" + items[i].EmployeeRacfId + "</td><td>" + items[i].Building + "</td><td>" + items[i].Floor + "</td><td>" + items[i].Status + "</td></tr>";
	}
	
	$(rows).appendTo("#wishTable tbody");
	
	$(rows).appendTo("#wishesSearchTable tbody");
	
	$(rows).appendTo("#wishesSearchByIdTable tbody");
};

/*$(document).ready(function() {
    $('#faq-list h2').click(function() {

        $(this).next('.answer').slideToggle(500);
        $(this).toggleClass('close');

    });
});*/