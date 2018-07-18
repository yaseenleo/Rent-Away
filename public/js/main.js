/*price range*/

var config = {
    apiKey: "AIzaSyA7rfBhIutZdEG0R7xANM3Wy27lV7GP2-Q",
    authDomain: "yaseen-site.firebaseapp.com",
    databaseURL: "https://yaseen-site.firebaseio.com",
    projectId: "yaseen-site",
    storageBucket: "yaseen-site.appspot.com",
    messagingSenderId: "1093689830600"
  };
  firebase.initializeApp(config);
 $('#sl2').slider();

	var RGBChange = function() {
	  $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
	};	
		
/*scroll to top*/

$(document).ready(function(){
	$(function () {
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});
});
	// Get the modal
	var modal = document.getElementById('myModal');
	var cartmodal = document.getElementById("cartmodal");
	var cartmodalBtn = document.getElementById("cartBtn");
	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");
	
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	
	// When the user clicks the button, open the modal 
	btn.onclick = function() {
		modal.style.display = "inline-block";

	}
	cartmodalBtn.onclick = function(){
		cartmodal.style.display = "inline-style";
	}
	
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
 	function signin(){
		 alert("signin in progress");
		var email = document.getElementById("signin-email-text").value;
		var password = document.getElementById("signin-password-text").value;
		alert(email);
		firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
			alert("signin success");
			localStorage.user=email;
document.getElementById("userid").innerHTML= "<i class='fa fa-user'></i>"+localStorage.user;

		})
 	}
    function signup(){

 	var email = document.getElementById("signup-email-text").value;
	var password = document.getElementById("signup-password-text").value;	
		 firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
			 alert("success");
		 }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			if(errorCode==="auth/email-already-in-use"){
				window.alert("email id already in use");

			}
			else if(errorCode==="auth/weak-password"){
				window.alert("password is weak");

			}
			window.alert = errorCode;
			var errorMessage = error.message;
			// ...
		  });
		}
	
	
	// var signup_btn= document.getElementById("signup-btn");
	// addEventListener("click",signup_btn,function(){
	// 	var email = document.getElementById("signup-email-text").value;
	// 	window.alert(email);
	// })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

	