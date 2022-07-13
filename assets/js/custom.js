var input = document.querySelector("#phone");
    window.intlTelInput(input, {
      // allowDropdown: false,
      // autoHideDialCode: false,
      // autoPlaceholder: "off",
      // dropdownContainer: document.body,
      // excludeCountries: ["us"],
      // formatOnDisplay: false,
      // geoIpLookup: function(callback) {
      //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      //     var countryCode = (resp && resp.country) ? resp.country : "";
      //     callback(countryCode);
      //   });
      // },
      // hiddenInput: "full_number",
      // initialCountry: "auto",
      // localizedCountries: { 'de': 'Deutschland' },
      // nationalMode: false,
      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
      // placeholderNumberType: "MOBILE",
      // preferredCountries: ['cn', 'jp'],
      // separateDialCode: true,
      utilsScript: "radiowanjy/phone_plugin/js/utils.js",
    });
var rows = document.getElementById("radio-station").querySelectorAll(".radio-row");
function gotoGenre(){
	document.getElementById("popular-genre").firstElementChild.scrollIntoView();
}
function gotoFeature(){
	document.getElementById("feature-element").firstElementChild.scrollIntoView();
}
function gotoPopular(){
	document.getElementById("popular-element").firstElementChild.scrollIntoView();
}
function gotoDJ(){
	document.getElementById("dj-element").firstElementChild.scrollIntoView();
}
function gotoNews(){
	document.getElementById("news-element").firstElementChild.scrollIntoView();
}
document.getElementById("totop-btn").addEventListener("click", function(){
	document.documentElement.scrollTop = 0;
})
function show_all_stations(){
	for(var j=0;j<rows.length;j++) rows[j].style.display="flex";
	document.getElementById("all-radio").innerHTML= "All Radio Stations"
}
var change_lang = document.getElementsByClassName("change-lang");
var lang_en = ['Home', 'Category', 'Genre', 'Feature', 'Popular', 'DJ', 'News', 'Become a DJ', 'Search', 'Radio From', 'Other Countries', 'Music from 150 radio Stations', 'Tune in to thousands of internet radio stations live right now!', 'Popular Genres', 'All Radio Stations', 'FEATURES', 'POPULAR', 'NEWs', 'DJ']
var lang_ar = ['الرئيسية', 'التصنيفات', '', 'محطات الراديو المميزة', 'محطات الراديو الشهيرة', 'دي جي خاص', 'محطات الراديو الإخبارية', 'امتلك الراديو الخاص بك', 'بحث', 'محطات الراديو من البلدان', 'باقي الدول', 'موسيقى من 150 محطة إذاعية', 'استمع إلى آلاف المحطات الإذاعية عبر الإنترنت مباشرة', 'الأنواع', 'جميع محطات الراديو', 'محطات الراديو المميزة', 'محطات الراديو الشهيرة', 'محطات الراديو الإخبارية', 'دي جي خاص']
function to_rtl(){
	var header=document.getElementById("header");
	var navbar=document.getElementById("navbar-wrap");
	if(header.classList.contains("rtl")){
		header.classList.remove("rtl")
		navbar.classList.remove('ml-auto')
		navbar.classList.add('mr-auto')
		for(var i=0;i<change_lang.length;i++){
			change_lang[i].innerHTML = lang_en[i]
		}
	}else{
		header.classList.add("rtl")
		navbar.classList.add('ml-auto')
		navbar.classList.remove('mr-auto')
		for(var i=0;i<change_lang.length;i++){
			change_lang[i].innerHTML = lang_ar[i]
		}
	}
}
var pop_card=document.getElementsByClassName("pop-card");
for(var i=0;i<pop_card.length;i++){
	pop_card[i].addEventListener("click", function(){
		var pop_content = this.innerHTML;
		document.getElementById("all-radio").innerHTML = pop_content + " Radio Stations"
		for(var j=0;j<rows.length;j++){
			var genre_div = rows[j].firstElementChild.querySelectorAll(".genres-div")[0].innerHTML.toString();
			if(genre_div.indexOf(pop_content)==-1){
				rows[j].style.display="none";
			}else rows[j].style.display="flex";
		}
	})
}
var country_toggle = document.getElementById("country-toggle-btn");
country_toggle.addEventListener("click", function(){
	var country_select = document.getElementById("country-select");
	if(country_select.classList.contains("show")) country_select.classList.remove("show");
	else country_select.classList.add("show");
})
var country_item = document.getElementsByClassName("country-item");
for(var i=0;i<country_item.length;i++){
	country_item[i].addEventListener("click", function(){
		var country_name = this.getAttribute("title")
		document.getElementById("all-radio").innerHTML = country_name + " Radio Stations"
		for(var j=0;j<rows.length;j++){
			var row_country = rows[j].firstElementChild.querySelectorAll(".play-btn")[0].getAttribute("country").toString();
			if(row_country.indexOf(country_name)==-1){
				rows[j].style.display="none";
			}else rows[j].style.display="flex";
		}
	})
}
// var play_btns = document.getElementsByClassName("play-btn");
// console.log(document.getElementsByClassName("playing")[0])
// for(var i=0;i<play_btns.length;i++){
// 	play_btns[i].addEventListener("click", function(){
// 		if(this.classList.contains("playing")){
// 			if(document.getElementsByClassName("playing")[0]!=undefined){
// 				document.getElementsByClassName("playing")[0].classList.remove("fa-pause-circle");
// 				document.getElementsByClassName("playing")[0].classList.add("fa-play-circle");
// 				document.getElementsByClassName("playing")[0].classList.remove("playing");
// 			}
// 			this.classList.remove("fa-pause-circle");
// 			this.classList.add("fa-play-circle");
// 		}else{
// 			if(document.getElementsByClassName("playing")[0]!=undefined){
// 				document.getElementsByClassName("playing")[0].classList.remove("fa-pause-circle");
// 				document.getElementsByClassName("playing")[0].classList.add("fa-play-circle");
// 				document.getElementsByClassName("playing")[0].classList.remove("playing");
// 			}
// 			this.classList.add("playing");
// 			this.classList.add("fa-pause-circle");
// 			this.classList.remove("fa-play-circle");
// 		}
// 	})
// }
$(document).ready( function () {
    $('#table_id').DataTable();
} );




function cancellAll() {
	//alert ($("audio").attr('id'));
	//$("audio")[0].pause();
	$("audio").each(function() {
		$('.sound').css({
			'-webkit-animation-play-state':'paused',
			'-moz-animation-play-state':'paused',
			'-ms-animation-play-state':'paused',
			'-o-animation-play-state':'paused',
			'animation-play-state':'paused'
		});
		$('.sound2').css({
			'-webkit-animation-play-state':'paused',
			'-moz-animation-play-state':'paused',
			'-ms-animation-play-state':'paused',
			'-o-animation-play-state':'paused',
			'animation-play-state':'paused'
		});

		$('.AudioPlay').removeClass('AudioPause');
		$(this)[0].pause();
	});
}

var play_btns = document.getElementsByClassName("play-btn");
for(var i=0;i<play_btns.length;i++){
	play_btns[i].addEventListener("click", function(){
		// document.getElementById("lbg_audio8_html5_shoutcast_2").removeAttribute("src");
		// document.getElementById("lbg_audio8_html5_shoutcast_2").setAttribute("src", this.getAttribute("srcc"));
		if(this.classList.contains("playing")){
			// if(document.getElementsByClassName("playing")[0]!=undefined){
			// 	document.getElementsByClassName("playing")[0].classList.remove("fa-pause-circle");
			// 	document.getElementsByClassName("playing")[0].classList.add("fa-play-circle");
			// 	document.getElementsByClassName("playing")[0].classList.remove("playing");
			// }
			var src = this.getAttribute("srcc");
			$('.playing').removeClass("fa-pause-circle");
			$('.playing').addClass("fa-play-circle");
			$('.playing').removeClass("playing");
			cancellAll();
			if (!current_obj.isFlashNeeded) {
							document.getElementById(current_obj.audioID).pause();
						} else {
							current_obj.myFlashObject.myAS3function("_pause_radio_stream_",options.initialVolume);
						}
						if (!options.showBanner) {
							$('.sound', audio8_html5_container).css({
								'-webkit-animation-play-state':'paused',
								'-moz-animation-play-state':'paused',
								'-ms-animation-play-state':'paused',
								'-o-animation-play-state':'paused',
								'animation-play-state':'paused'
							});
							$('.sound2', audio8_html5_container).css({
								'-webkit-animation-play-state':'paused',
								'-moz-animation-play-state':'paused',
								'-ms-animation-play-state':'paused',
								'-o-animation-play-state':'paused',
								'animation-play-state':'paused'
							});
						}

						audio8_html5_play_btn.removeClass('AudioPause');
						setCookie(options,'cookie_autoPlay', false);
						current_obj.cookie_autoPlay=getCookie(options,'cookie_autoPlay');
		}else{
			var src = this.getAttribute("srcc");
			var isrc = this.getAttribute("isrc");
			$(".play-btn").attr("class", "far play-btn fa-play-circle");
			$(".play-btn[srcc='"+src+"']").addClass("fa-pause-circle");
			$(".play-btn[srcc='"+src+"']").removeClass("fa-play-circle");
			$(".play-btn[srcc='"+src+"']").addClass("playing");
			var _this=this;
			cancellAll();
			current_obj.playlist_arr[current_obj.total_images-1]['radiostream']=_this.getAttribute("srcc");
			document.getElementById("lbg_audio8_html5_shoutcast_2").src=_this.getAttribute("srcc");
			// changeSrc(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_radioStation,audio8_html5_artistName,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
			$('.sound', audio8_html5_container).css({
				'-webkit-animation-play-state':'running',
				'-moz-animation-play-state':'running',
				'-ms-animation-play-state':'running',
				'-o-animation-play-state':'running',
				'animation-play-state':'running'
			});
			$('.sound2', audio8_html5_container).css({
				'-webkit-animation-play-state':'running',
				'-moz-animation-play-state':'running',
				'-ms-animation-play-state':'running',
				'-o-animation-play-state':'running',
				'animation-play-state':'running'
			});
			// audio8_html5_ximage.html("<img src='admin_panel/uploads/radios/"+isrc+">");
			if(isrc!=null) $(".ximage").css("background-image", "url('admin_portal/uploads/radios/"+isrc+"')")
				else $(".ximage").css("background-image", "url('radiowanjy/main/noimageavailable.jpg')")
			audio8_html5_play_btn.addClass('AudioPause');
			setCookie(options,'cookie_autoPlay', true);
			current_obj.cookie_autoPlay=getCookie(options,'cookie_autoPlay');
			document.getElementById(current_obj.audioID).play();
		}
	})
}