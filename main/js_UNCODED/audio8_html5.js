/*
 * SHOUT - HTML5 Radio Player With Ads - ShoutCast and IceCast Support - v2.4
 *
 * Copyright 2017-2020, LambertGroup
 *
 */
var current_obj='';
var options='';
var audio8_html5_container='';
var audio8_html5_play_btn='';
var setCookie='';
var getCookie='';
// var changeSrc='';
// var audio8_html5_thumbsHolder='';
// var audio8_html5_Title='';
// var audio8_html5_TitleInside='';
// var audio8_html5_radioStation='';
// var audio8_html5_artistName='';
// var audio8_html5_Audio='';
// var audio8_html5_ximage='';
// var audio8_html5_xspeakers='';
// var audio8_html5_xgradient='';
(function($) {

	//vars
	var val = navigator.userAgent.toLowerCase();

	//functions
	function supports_mp3_audio(current_obj) {
			  var a = document.getElementById(current_obj.audioID);
			  return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
	}

	function detectBrowserAndAudio(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container) {
				//activate current
				$(current_obj.thumbsHolder_Thumbs[current_obj.current_img_no]).css({
					"background":options.playlistRecordBgOnColor,
					"border-bottom-color":options.playlistRecordBottomBorderOnColor,
					"color":options.playlistRecordTextOnColor
				});
				//auto scroll carousel if needed
				if (!current_obj.is_very_first) {
					carouselScroll(-1,current_obj,options,audio8_html5_thumbsHolder);
				}

				var currentAudio;
				//alert (current_obj.playlist_arr[current_obj.origID]['radiostream']);
				if (current_obj.playlist_arr[current_obj.origID]['radiostream']!='') {
						currentAudio=current_obj.playlist_arr[current_obj.origID]['radiostream'];
				} else {
					//nothing
				}

				//alert (currentAudio);
				return currentAudio;
			};


			function get_wiki_image(temp_artist_image,options,current_obj,audio8_html5_ximage,photo_path) {
					var photo_path=options.noImageAvailable;
					var ext_1="";
					var temp_iiurlparam_1="";
					if (temp_artist_image!='' && temp_artist_image!=undefined) {
							ext_1 = temp_artist_image.match(/\.([^\./\?\#]+)($|\?|\#)/)[1];
							if (ext_1=="jpg" || ext_1=="jpeg" || ext_1=="JPG" || ext_1=="JPEG") {
									temp_iiurlparam_1="&iiurlparam=qlow-500px";
							}
							//$.get( "https://commons.wikimedia.org/w/api.php?action=query&titles=Image:"+temp_artist_image+"&prop=imageinfo&format=xml&origin=*&iiprop=url", {}, function( xml ) {
							//$.get( "https://commons.wikimedia.org/w/api.php?action=query&titles=Image:"+temp_artist_image+"&prop=imageinfo&format=xml&origin=*&iiprop=url&iiurlparam=qlow-1000px", {}, function( xml ) {
							$.get( "https://commons.wikimedia.org/w/api.php?action=query&titles=Image:"+temp_artist_image+"&prop=imageinfo&format=xml&origin=*&iiprop=url"+temp_iiurlparam_1, {}, function( xml ) {
										///console.log("the image: ");console.log(xml);
										///console.log($("ii", xml).attr('url'));
										if ($("ii", xml).attr('thumburl')!='' && $("ii", xml).attr('thumburl')!=undefined) {
												//photo_path=$("ii", xml).attr('url');
												photo_path=$("ii", xml).attr('thumburl');
												current_obj.wiki_photo_path=photo_path;
												///console.log("unu");
										} else {
													if ($("ii", xml).attr('url')!='' && $("ii", xml).attr('url')!=undefined) {
															photo_path=$("ii", xml).attr('url');
															current_obj.wiki_photo_path=photo_path;
															///console.log("unu_bis");
													}
										}
										changeArtistImage(options,current_obj,audio8_html5_ximage,photo_path);
							});
					}

			}



			function removeAccents(str) {
				var temp_str;
			  var accents = "ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž’";
			  var accentsOut = "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz'";
				var i;
			  str = str.split('');
			  str.forEach(function(letter, index){
			    i = accents.indexOf(letter);
			    if (i != -1) {
			      str[index] = accentsOut[i];
			    }
			  })
			  temp_str=str.join('');
				return temp_str.trim();
			}


	function changeSrc(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_radioStation,audio8_html5_artistName,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient) {
			    clearInterval(current_obj.radioReaderAjaxInterval);

				//now_playing first call start
				$.get( options.pathToAjaxFiles+"radiowanjy/main/now_playing.php", {the_stream:current_obj.playlist_arr[current_obj.origID]['radiostream'],'_': $.now()}, function( data ) {
					current_obj.playlist_arr[current_obj.origID]['title']=data;
					changeCurrentSongTitle(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
				});
				//now_playing first call end
				changeCurrentSongTitle(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);

				//audio8_html5_Audio.type='audio/ogg; codecs="vorbis"';
				//document.getElementById(current_obj.audioID).type='audio/ogg; codecs="vorbis"';
				if (!current_obj.isFlashNeeded) {
					document.getElementById(current_obj.audioID).src=detectBrowserAndAudio(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container);
					document.getElementById(current_obj.audioID).load();
					if (options.autoPlay) {
						//console.log("H current_obj.cookie_autoPlay: "+current_obj.cookie_autoPlay+" -  options.autoPlay: "+options.autoPlay);
						audio8_html5_play_btn.click();
					} else {
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
					}
				} else {
					if (current_obj.myFlashObject!='') {
						setTimeout(function(){
								current_obj.myFlashObject.myAS3function(detectBrowserAndAudio(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container),options.initialVolume);
						}, 1000);
					}
				}


				//alert (audio8_html5_Audio.type );


				/*if (val.indexOf("android") != -1) {
					//nothing
				} else if ((val.indexOf("ipad") != -1 || val.indexOf("iphone") != -1 || val.indexOf("ipod") != -1 || val.indexOf("webos") != -1) && current_obj.is_very_first) {
					//nothing
					audio8_html5_play_btn.click();
				} else {
					if (options.autoPlay) {
						cancelAll();
						document.getElementById(current_obj.audioID).play();
						//audio8_html5_play_btn.click();
						audio8_html5_play_btn.addClass('AudioPause');
					} else {
						audio8_html5_play_btn.removeClass('AudioPause');
					}
					audio8_html5_play_btn.click();
				}*/

				if (options.showBanner) {
					current_obj.curBanner=0;
					clearInterval(current_obj.bannersInterval);
					//alert (current_obj.playlist_arr[current_obj.origID]['banners']);
					audio8_html5_ximage.parent().css({
						"display":"block"
					});
					audio8_html5_ximage.css({
						"display":"block"
					});
					if (current_obj.playlist_arr[current_obj.origID]['banners'].length<1) { // no banner defined
							audio8_html5_ximage.parent().css({
								"display":"none"
							});
							audio8_html5_ximage.css({
								"display":"none"
							});
					}
					if (current_obj.playlist_arr[current_obj.origID]['banners'].length>=1) {
							audio8_html5_ximage.parent().attr('href',current_obj.playlist_arr[current_obj.origID]['bannerlinks'][current_obj.curBanner]);
							audio8_html5_ximage.css({
								"background":"url("+current_obj.playlist_arr[current_obj.origID]['banners'][current_obj.curBanner]+") #000000",
								"background-repeat":"no-repeat",
								"background-position":"center center",
								'background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
								'-webkit-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
								'-moz-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
								'-o-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px'

							});
					}
					if (current_obj.playlist_arr[current_obj.origID]['banners'].length>=2) {
								current_obj.bannersInterval=setInterval(function(){
										if (current_obj.curBanner<(current_obj.playlist_arr[current_obj.origID]['banners'].length-1)) {
											current_obj.curBanner++;
										} else {
											current_obj.curBanner=0;
										}
										audio8_html5_ximage.css({
											"background":"url("+current_obj.playlist_arr[current_obj.origID]['banners'][current_obj.curBanner]+") #000000",
											'background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
											'-webkit-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
											'-moz-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
											'-o-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px'
										});
										audio8_html5_ximage.parent().attr('href',current_obj.playlist_arr[current_obj.origID]['bannerlinks'][current_obj.curBanner]);
								},options.bannerIntervalSeconds*1000);
					}
				}


				//now_playing interval call
				setTimeout(function(){
							current_obj.radioReaderAjaxInterval=setInterval(function(){
									$.get( options.pathToAjaxFiles+"radiowanjy/main/now_playing.php", {the_stream:current_obj.playlist_arr[current_obj.origID]['radiostream'],'_': $.now()}, function( data ) {
										current_obj.playlist_arr[current_obj.origID]['title']=data;
										changeCurrentSongTitle(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
									});
							},options.nowPlayingInterval*1000);
				},options.nowPlayingInterval*1000);
			};


	function goToRadioByUrl(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient) {
				//alert (current_obj.playlist_arr.length);
				var is_found=false;
				var j=0;
				while (j<current_obj.playlist_arr.length && !is_found && current_obj.playlist_arr.length>0) {
				//for (var j=0;j<current_obj.playlist_arr.length;j++) {
					  //alert (j+'    ---   '+current_obj.playlist_arr.length);
					  //urlLowerCases=current_obj.playlist_arr[j]['associatedpageurl'].toLowerCase();
					  //alert (current_obj.playlist_arr[j]['associatedpageurl']+ '  ==     '+current_obj.cur_loc);
					  if (current_obj.playlist_arr[j]['associatedpageurl']==current_obj.cur_loc) {
						 	is_found=true;

					   		current_obj.current_img_no=j;
							current_obj.origID=$("div[rel=\'"+current_obj.current_img_no+"\']").attr('data-origID');
							//alert (current_obj.current_img_no+' --  '+current_obj.origID);

							changeSrc(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_radioStation,audio8_html5_artistName,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
							carouselScroll(-1,current_obj,options,audio8_html5_thumbsHolder);
					  }
					  j++;
				}
				//alert (is_found+'  ---  '+j);

	}


	function changeArtistImage(options,current_obj,the_ximage,photo_path) {
				if (!options.showBanner) {
							the_ximage.css({
								"background":"url("+photo_path+") #000000",
								"background-repeat":"no-repeat",
								"background-position":"top center",
								"background-size":"cover",
								'-webkit-background-size':"cover",
								'-moz-background-size':"cover",
								'-o-background-size':"cover",
								"border-width":current_obj.newImageBorderWidth+"px",
								"border-color":options.imageBorderColor
							});
				}
	}


	function changeCurrentSongTitle(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient) {
				audio8_html5_Title.width(current_obj.titleWidth);
				audio8_html5_artistName.width(current_obj.titleWidth);
				audio8_html5_radioStation.width(current_obj.radioStationWidth);




				/*current_obj.curSongText='';
				if (options.showTitle && current_obj.playlist_arr[current_obj.origID]['title']!=null && current_obj.playlist_arr[current_obj.origID]['title']!='') {
	            	current_obj.curSongText+="<b>"+options.translateSongTitle+"</b>"+current_obj.playlist_arr[current_obj.origID]['title'];
	            }*/


				if (options.showRadioStation && current_obj.playlist_arr[current_obj.origID]['station']!=null && current_obj.playlist_arr[current_obj.origID]['station']!='') {
					audio8_html5_radioStation.html("<b>"+options.translateRadioStation+"</b>"+current_obj.playlist_arr[current_obj.origID]['station']);
				}

				var author_arr=current_obj.playlist_arr[current_obj.origID]['title'].split('-');
				var photo_path=options.noImageAvailable;
				// load details of the artist
				//MARIA MULDAUR
				author_arr[0]=author_arr[0].trim();
				if (author_arr.length>=2) {
					author_arr[1]=author_arr[1].trim();
				} else {
					author_arr[1]='';
				}
				if (author_arr.length>=3) {
					author_arr[0]=author_arr[0].trim()+"-"+author_arr[1].trim();
					author_arr[1]=author_arr[2].trim();
				}



					if (current_obj.prevSongTitle!=current_obj.playlist_arr[current_obj.origID]['title'] && options.showTitle) {

								audio8_html5_TitleInside.css({
									"width":"auto"
								});

								current_obj.isStationTitleInsideScrolling=false;
								current_obj.stationTitleInsideWait=0;
								audio8_html5_TitleInside.stop();
								audio8_html5_TitleInside.css({'margin-left':0});

								audio8_html5_TitleInside.html(author_arr[1]);
								audio8_html5_artistName.html(author_arr[0]);

								//alert (current_obj.prevSongTitle+'='+current_obj.playlist_arr[current_obj.origID]['title']);
								clearInterval(current_obj.timeupdateInterval);
								//alert (audio8_html5_Title.width()+'  ----  '+audio8_html5_TitleInside.width());
								if (audio8_html5_TitleInside.width()>current_obj.titleWidth) {
									current_obj.timeupdateInterval=setInterval(function(){
										//$( "#console" ).append( "<span>Test - </span>" );
										if (!current_obj.isStationTitleInsideScrolling && current_obj.stationTitleInsideWait>=5 && audio8_html5_TitleInside.width()>current_obj.titleWidth) {
											current_obj.isStationTitleInsideScrolling=true;
											current_obj.stationTitleInsideWait=0;
											audio8_html5_TitleInside.html(author_arr[1]+" **** "+author_arr[1]+" **** "+author_arr[1]+" **** "+author_arr[1]+" **** "+author_arr[1]+" **** ");
											audio8_html5_TitleInside.css({'margin-left':0});
											//alert (audio8_html5_TitleInside.width()+ '   -----   '+(current_obj.titleWidth-audio8_html5_TitleInside.width()));
											audio8_html5_TitleInside.stop().animate({
													'margin-left':(current_obj.titleWidth-audio8_html5_TitleInside.width())+'px'
											 }, parseInt((audio8_html5_TitleInside.width()-current_obj.titleWidth)*10000/150,10), 'linear', function() {
													// Animation complete.
													//parseInt((audio8_html5_TitleInside.width()-current_obj.titleWidth)*10000/150,10)
													  current_obj.isStationTitleInsideScrolling=false;
											});
										} else if (!current_obj.isStationTitleInsideScrolling && audio8_html5_TitleInside.width()>current_obj.titleWidth) {
											current_obj.stationTitleInsideWait++;
										}
									},300);
								} else { //center title
									audio8_html5_TitleInside.css({
										"width":"auto",
										'margin-left':0
									});
								}
								current_obj.prevSongTitle=current_obj.playlist_arr[current_obj.origID]['title'];

								//change image
								if (options.grabLastFmPhoto && author_arr[0].trim()!='' && !options.showBanner) {
										/*current_obj.lastfm.artist.getInfo({artist: author_arr[0]}, {success: function(data){
										//alert (data.artist.image.toSource());
											//[
												//{'#text':"http://userserve-ak.last.fm/serve/34/98245565.png", size:"small"},
												//{'#text':"http://userserve-ak.last.fm/serve/64/98245565.png", size:"medium"},
												//{'#text':"http://userserve-ak.last.fm/serve/126/98245565.png", size:"large"},
												//{'#text':"http://userserve-ak.last.fm/serve/252/98245565.png", size:"extralarge"},
												//{'#text':"http://userserve-ak.last.fm/serve/500/98245565/Cher+PNG.png", size:"mega"}
											//]
											//alert(data.artist.image[2]['#text']);
											*/
										/*$.get( "https://ws.audioscrobbler.com/2.0/?artist="+author_arr[0]+"&method=artist.getInfo&api_key="+options.lastFMApiKey+"&format=json", {}, function( data ) {
												//if (data.artist.image !== undefined) {
												if (data.hasOwnProperty('artist') && data.artist.hasOwnProperty('image')) {
															//alert ('data: '+data.artist.image[3]['#text'].trim());
															if (data.artist.image[3]['#text'].trim()!='') {
																			photo_path=data.artist.image[3]['#text'].trim();
																			changeArtistImage(options,current_obj,audio8_html5_ximage,photo_path);
															} else {
																changeArtistImage(options,current_obj,audio8_html5_ximage,photo_path);
															}
												} else {
															changeArtistImage(options,current_obj,audio8_html5_ximage,photo_path);
												}
										});*/

										var now_artist_name;
										var temp_artist_name;
										var xmlLine_name;
										var temp_artist_image='';
										current_obj.the_artist_id='';
										current_obj.the_wikidata_id='';
										photo_path=options.noImageAvailable;
										current_obj.wiki_photo_path=photo_path;
										clearTimeout(current_obj.musicbrainz_setTimeout);
										changeArtistImage(options,current_obj,audio8_html5_ximage,photo_path);
										author_arr[0]=author_arr[0].trim();
										if (author_arr[0]!='' && author_arr[0]!=undefined) {
														current_obj.musicbrainz_setTimeout=setTimeout(function(){
																			$.get( "https://musicbrainz.org/ws/2/artist/?query=artist:"+author_arr[0], {}, function( xml ) {
																						current_obj.the_artist_id='';
																						///console.log("first: ");console.log(xml);
																						now_artist_name=author_arr[0];
																						now_artist_name=now_artist_name.toLowerCase();
																						now_artist_name=removeAccents(now_artist_name);
																						$("artist", xml).each(function(){
																									xmlLine_name = $("name", this)[0];
																									if ($("name", this).length>0 && current_obj.the_artist_id=='') {
																											 temp_artist_name=$(xmlLine_name).text();
																											 temp_artist_name=temp_artist_name.toLowerCase();
																											 temp_artist_name=removeAccents(temp_artist_name);
																											 if (now_artist_name.toLowerCase()==temp_artist_name.toLowerCase()){
																														current_obj.the_artist_id=$(this).attr('id');
																											 }
																									}
																					 });

																					 ///console.log($("artist", xml)[0]);
																					 ///console.log($($("artist", xml)[0]).attr('id'));
																					 ///console.log("artist id:"+current_obj.the_artist_id);
																					 if (current_obj.the_artist_id=='' && author_arr[0]!='ROCK RADIO') {
																					 		current_obj.the_artist_id=$($("artist", xml)[0]).attr('id');
																					}

																					 if (current_obj.the_artist_id!='' && current_obj.the_artist_id!=undefined) {
																								 current_obj.musicbrainz_setTimeout=setTimeout(function() {
																												current_obj.the_wikidata_id='';
																												///console.log(current_obj.the_artist_id);
																												$.get( "https://musicbrainz.org/ws/2/artist/"+current_obj.the_artist_id+"?inc=url-rels", {}, function( xml ) {
																															///console.log("url-rels: ");console.log(xml);
																															$("relation", xml).each(function(){
																																		if ($(this).attr('type')=='image'){
																																						if ($("target", this).length>0) {
																																								temp_artist_image=$("target", this).text();
																																								///console.log(temp_artist_image);
																																								temp_artist_image=temp_artist_image.substr(temp_artist_image.indexOf('File:',10)+5, temp_artist_image.length);
																																								///console.log(temp_artist_image);
																																								get_wiki_image(temp_artist_image,options,current_obj,audio8_html5_ximage,photo_path);
																																						}
																																		} //('type')=='image'

																																		if ($(this).attr('type')=='wikidata') {
																																					if ($("target", this).length>0 && temp_artist_image=='') {
																																							///console.log($("target", this).text());
																																							current_obj.the_wikidata_id=$("target", this).text();
																																							//https://www.wikidata.org/wiki/
																																							current_obj.the_wikidata_id=current_obj.the_wikidata_id.substr(current_obj.the_wikidata_id.indexOf('/Q',10)+1, current_obj.the_wikidata_id.length);
																																							///console.log(current_obj.the_wikidata_id);
																																							$.get( "https://www.wikidata.org/w/api.php?action=wbgetclaims&entity="+current_obj.the_wikidata_id+"&property=P18&format=xml&origin=*", {}, function( xml ) {
																																										///console.log("!!!!!!!!!!!!wiki!!!!!!!!!!!!!! ");console.log(xml);
																																										temp_artist_image=$("datavalue", $("mainsnak", xml)).attr("value");
																																										///console.log(temp_artist_image);
																																										get_wiki_image(temp_artist_image,options,current_obj,audio8_html5_ximage,photo_path);
																																							});
																																					}
																																		} // ('type')=='wikidata'

																															});
																												});
																								}, 1500);
																					 }
																			});
														}, 1500);
										}


								} else {
									changeArtistImage(options,current_obj,audio8_html5_ximage,photo_path);
								}
					}

		}






		//playlist scroll
		function carouselScroll(direction,current_obj,options,audio8_html5_thumbsHolder) {
				if (current_obj.selectedCateg_total_images>options.numberOfThumbsPerScreen) {
							var MAX_TOP=(current_obj.thumbsHolder_ThumbHeight+1)*(current_obj.selectedCateg_total_images-options.numberOfThumbsPerScreen);
							var new_top=0;
							//alert (current_obj.audio8_html5_sliderVertical.slider( "option", "animate" ));
							audio8_html5_thumbsHolder.stop(true,true);
							//page scroll enabled
							$('html, body')
			            // Needed to remove previously bound handlers
			            .off('touchstart touchmove')
			            .on('touchstart touchmove', function (e) {
			                e.preventDefault();
			            });
							//page scroll enabled
							if (direction!=-1 && !current_obj.isCarouselScrolling) {
								current_obj.isCarouselScrolling=true;
								new_top=((direction<=2)?(-1)*MAX_TOP:parseInt(MAX_TOP*(direction-100)/100,10));
								if (new_top>0) {
									new_top=0;
								}
								audio8_html5_thumbsHolder.animate({
								    //opacity: 1,
								    //top:parseInt(MAX_TOP*(direction-100)/100,10)+'px'
									top:new_top+'px'
								  }, 1100, 'easeOutQuad', function() {
								    // Animation complete.
									  current_obj.isCarouselScrolling=false;
										//page scroll enabled
										$('html, body')
			            		.off('touchstart touchmove')
			            		.on('touchstart touchmove', function (e) {});
										//page scroll enabled
								});
							} else if (!current_obj.isCarouselScrolling && current_obj.selectedCateg_total_images>options.numberOfThumbsPerScreen) {
								current_obj.isCarouselScrolling=true;
								//audio8_html5_thumbsHolder.css('opacity','0.5');
								new_top=(-1)*parseInt((current_obj.thumbsHolder_ThumbHeight+1)*current_obj.current_img_no,10);
								if( Math.abs(new_top) > MAX_TOP ){ new_top = (-1)*MAX_TOP; }
								if (current_obj.selectedCateg_total_images>options.numberOfThumbsPerScreen && options.showPlaylist) {
									current_obj.audio8_html5_sliderVertical.slider( "value" , 100 + parseInt( new_top * 100 / MAX_TOP ) );
								}
								audio8_html5_thumbsHolder.animate({
								    //opacity: 1,
								    top:new_top+'px'
								  }, 500, 'easeOutCubic', function() {
								    // Animation complete.
									  current_obj.isCarouselScrolling=false;
										//page scroll enabled
										$('html, body')
			            		.off('touchstart touchmove')
			            		.on('touchstart touchmove', function (e) {});
										//page scroll enabled
								});
							}
					}
		};


		function arrangePlayerElements (options,current_obj,audio8_html5_play_btn,audio8_html5_next_btn,audio8_html5_prev_btn,audio8_html5_radioStation,audio8_html5_artistName,audio8_html5_Title,audio8_html5_volumeMute_btn,audio8_html5_volumeSlider,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient,audio8_html5_the_bars,audio8_html5_showHidePlaylist_btn,audio8_html5_popup_btn,audio8_html5_facebook_btn,audio8_html5_twitter_btn,audio8_html5_container,audio8_html5_frameBehindPlayerText) {
						//alert ( current_obj.newPlayerHeight);
						current_obj.numberOfButtonsRightSide=4;
						if (!options.showPlaylistBut) {
							current_obj.numberOfButtonsRightSide-=1;
						}

						if (!options.showPopupBut) {
							current_obj.numberOfButtonsRightSide-=1;
						}

						if (!options.showFacebookBut) {
							current_obj.numberOfButtonsRightSide-=1;
						}

						if (!options.showTwitterBut) {
							current_obj.numberOfButtonsRightSide-=1;
						}

						if (current_obj.numberOfButtonsRightSide<=2 && options.showBanner) {
							current_obj.resizePlayButton=true;
						}

						//restore to original
						if (options.showBanner && current_obj.resizePlayButton) {
										current_obj.newPlayerHeight=options.playerHeight;
										current_obj.playBtnMaxDiameter=current_obj.newPlayerHeight-14;
										if (options.bannerHeight>=90) {
											current_obj.playBtnNewDim=current_obj.playBtnMaxDiameter;
										} else {
											current_obj.playBtnNewDim=Math.min(current_obj.playBtnMaxDiameter,options.playerHeight-4);
										}

										current_obj.playTopPos=parseInt((current_obj.newPlayerHeight-current_obj.playBtnNewDim)/2,10);
										audio8_html5_play_btn.css({
											'top':current_obj.playTopPos+'px',
											'width':current_obj.playBtnNewDim+'px',
											'height':current_obj.playBtnNewDim+'px',
											'background-size': current_obj.playBtnNewDim+'px '+current_obj.playBtnNewDim+'px',
											'-webkit-background-size': current_obj.playBtnNewDim+'px '+current_obj.playBtnNewDim+'px',
											'-moz-background-size': current_obj.playBtnNewDim+'px '+current_obj.playBtnNewDim+'px',
											'-o-background-size': current_obj.playBtnNewDim+'px '+current_obj.playBtnNewDim+'px'
										});

										audio8_html5_frameBehindPlayerText.height(current_obj.newPlayerHeight);
										audio8_html5_container.height(current_obj.newPlayerHeight);

										audio8_html5_ximage.css({
											'width':current_obj.newBannerWidth+'px',
											'height':current_obj.newBannerHeight+'px',
											'left':current_obj.imageLeftPos+'px',
											'top':current_obj.imageTopPos+'px',
											'background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
											'-webkit-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
											'-moz-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
											'-o-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
											'padding':0,
											'margin':0
										});

						}

						//play
						current_obj.playTopPos=parseInt((current_obj.newPlayerHeight-audio8_html5_play_btn.height())/2,10);
						current_obj.playLeftPos=10;
						audio8_html5_play_btn.css({
							'top':current_obj.playTopPos+'px',
							'left':current_obj.playLeftPos+'px'
						});


						//next, prev buttons
						/*if (!options.showNextPrevBut) {
							audio8_html5_prev_btn.css({
								'display':'none',
								'width':0,
								'padding':0,
								'margin':0
							});
							audio8_html5_next_btn.css({
								'display':'none',
								'width':0,
								'padding':0,
								'margin':0
							});
						}
						current_obj.previousTopPos=current_obj.playTopPos+parseInt((audio8_html5_play_btn.height()-audio8_html5_prev_btn.height())/2,10);
						current_obj.previousLeftPos=current_obj.imageLeftPos-audio8_html5_prev_btn.width()-options.nextPrevAdditionalPadding;
						audio8_html5_prev_btn.css({
							'top':current_obj.previousTopPos+'px',
							'left':current_obj.previousLeftPos+'px'
						});

						current_obj.nextTopPos=current_obj.previousTopPos;
						current_obj.nextLeftPos=current_obj.imageLeftPos+(audio8_html5_ximage.width()+2*current_obj.newImageBorderWidth)+options.nextPrevAdditionalPadding;
						audio8_html5_next_btn.css({
							'top':current_obj.nextTopPos+'px',
							'left':current_obj.nextLeftPos+'px'
						});*/



						//station & title
						audio8_html5_Title.css({'color':options.songTitleColor});
						audio8_html5_artistName.css({'color':options.songTitleColor});
						audio8_html5_radioStation.css({'color':options.radioStationColor});
						//current_obj.titleWidth=options.titleWidth;
						/*if (!options.showTitle) {
							current_obj.titleWidth=0;
						}*/
						if (!options.showRadioStation) {
							current_obj.radioStationWidth=0;
						}


						current_obj.titleTopPos=current_obj.playTopPos+5;
						current_obj.titleLeftPos=current_obj.playLeftPos+audio8_html5_play_btn.width()+25;
						audio8_html5_Title.css({
							'top':current_obj.titleTopPos+'px',
							'left':current_obj.titleLeftPos+'px'
						});


						current_obj.artistNameTopPos=current_obj.titleTopPos+audio8_html5_Title.height()+2;
						current_obj.artistNameLeftPos=current_obj.titleLeftPos;
						audio8_html5_artistName.css({
							'top':current_obj.artistNameTopPos+'px',
							'left':current_obj.artistNameLeftPos+'px'
						});

						current_obj.radioStationTopPos=current_obj.artistNameTopPos+audio8_html5_artistName.height()+5;
						current_obj.radioStationLeftPos=current_obj.titleLeftPos;

						audio8_html5_radioStation.css({
							'top':current_obj.radioStationTopPos+'px',
							'left':current_obj.radioStationLeftPos+'px'
						});





						//volume
						if (!options.showVolume || options.playerHeight <94) {
							audio8_html5_volumeMute_btn.css({
								'display':'none',
								'width':0,
								'padding':0,
								'margin':0
							});
							audio8_html5_volumeSlider.css({
								'display':'none',
								'width':0,
								'padding':0,
								'margin':0
							});
						} else {
							current_obj.volumeTopPos=current_obj.radioStationTopPos+audio8_html5_radioStation.height()+10;
							current_obj.volumeLeftPos=current_obj.titleLeftPos;
							audio8_html5_volumeMute_btn.css({
								'top':current_obj.volumeTopPos+'px',
								'left':current_obj.volumeLeftPos+'px'
							});
							current_obj.volumesliderTopPos=current_obj.volumeTopPos+Math.floor((audio8_html5_volumeMute_btn.height()-audio8_html5_volumeSlider.height())/2);
							current_obj.volumesliderLeftPos=current_obj.volumeLeftPos+audio8_html5_volumeMute_btn.width()+current_obj.constantDistance;
							audio8_html5_volumeSlider.css({
								'top':current_obj.volumesliderTopPos+'px',
								'left':current_obj.volumesliderLeftPos+'px'
							});
						}


						//the image
						current_obj.imageTopPos=parseInt((current_obj.newPlayerHeight-audio8_html5_ximage.height())/2,10);
						current_obj.imageLeftPos=current_obj.titleLeftPos+current_obj.titleWidth+130;
						audio8_html5_ximage.css({
							'top':current_obj.imageTopPos+'px',
							'left':current_obj.imageLeftPos+'px'
						});
						changeArtistImage(options,current_obj,audio8_html5_ximage,current_obj.wiki_photo_path);
						//show elements after resize start
						if (options.showTitle) {
							audio8_html5_Title.css({
								'display':'block'
							});
							audio8_html5_artistName.css({
								'display':'block'
							});
						}
						if (options.showRadioStation) {
							audio8_html5_radioStation.css({
								'display':'block'
							});
						}
						if (options.showVolume) {
							audio8_html5_volumeMute_btn.css({
								'display':'block'
							});
							audio8_html5_volumeSlider.css({
								'display':'block'
								});
						}
						//show elements after resize end
						if (options.showBanner) {
								current_obj.newBannerWidth=options.bannerWidth;
								current_obj.newBannerHeight=options.bannerHeight;
								//current_obj.imageLeftPos=current_obj.titleLeftPos+current_obj.titleWidth+parseInt((options.playerWidth-current_obj.titleLeftPos-current_obj.titleWidth-current_obj.newBannerWidth-audio8_html5_showHidePlaylist_btn.width()-10)/2,10);
								current_obj.imageLeftPos=parseInt((options.playerWidth-current_obj.newBannerWidth)/2,10);

								if ( current_obj.imageLeftPos < (current_obj.titleLeftPos+current_obj.titleWidth+10) ) {
									current_obj.imageLeftPos=current_obj.titleLeftPos+current_obj.titleWidth+parseInt((options.playerWidth-current_obj.titleLeftPos-current_obj.titleWidth-current_obj.newBannerWidth-current_obj.rightSideButtonsDim-10)/2,10);
								}

								if ( current_obj.imageLeftPos < (current_obj.titleLeftPos+current_obj.titleWidth+10) ) {
									current_obj.imageLeftPos=current_obj.playLeftPos+audio8_html5_play_btn.width()+parseInt((options.playerWidth-current_obj.playLeftPos-audio8_html5_play_btn.width()-current_obj.newBannerWidth-current_obj.rightSideButtonsDim-10)/2,10);

									//hide elements after resize start
									if (options.showTitle) {
										audio8_html5_Title.css({
											'display':'none'
										});
										audio8_html5_artistName.css({
											'display':'none'
										});
									}
									if (options.showRadioStation) {
										audio8_html5_radioStation.css({
											'display':'none'
										});
									}
									if (options.showVolume) {
										audio8_html5_volumeMute_btn.css({
											'display':'none'
										});
										audio8_html5_volumeSlider.css({
											'display':'none'
										});
									}
									//hide elements after resize end
								}

								//smartphone
								if ( current_obj.imageLeftPos < (current_obj.playLeftPos+audio8_html5_play_btn.width()+10) ) {
									current_obj.newBannerWidth=options.playerWidth-current_obj.playLeftPos-audio8_html5_play_btn.width()-current_obj.rightSideButtonsDim-3*10; //audio8_html5_showHidePlaylist_btn.width()  .... 16
									current_obj.imageLeftPos=current_obj.playLeftPos+audio8_html5_play_btn.width()+parseInt((options.playerWidth-current_obj.playLeftPos-audio8_html5_play_btn.width()-current_obj.newBannerWidth-current_obj.rightSideButtonsDim-10)/2,10);
									current_obj.newBannerHeight=parseInt((current_obj.newBannerWidth*options.bannerHeight)/options.bannerWidth,10);
									//alert (current_obj.resizePlayButton);
									if (current_obj.resizePlayButton) {
												  current_obj.newPlayerHeight=current_obj.newBannerHeight+4;
												  current_obj.playBtnNewDim=current_obj.newBannerHeight-4;
												  current_obj.playTopPos=parseInt((current_obj.newPlayerHeight-current_obj.playBtnNewDim)/2,10);
													audio8_html5_play_btn.css({
														'top':current_obj.playTopPos+'px',
														'width':current_obj.playBtnNewDim+'px',
														'height':current_obj.playBtnNewDim+'px',
														'background-size': current_obj.playBtnNewDim+'px '+current_obj.playBtnNewDim+'px',
														'-webkit-background-size': current_obj.playBtnNewDim+'px '+current_obj.playBtnNewDim+'px',
														'-moz-background-size': current_obj.playBtnNewDim+'px '+current_obj.playBtnNewDim+'px',
														'-o-background-size': current_obj.playBtnNewDim+'px '+current_obj.playBtnNewDim+'px'
													});
													current_obj.imageLeftPos=current_obj.playLeftPos+audio8_html5_play_btn.width()+parseInt((options.playerWidth-current_obj.playLeftPos-audio8_html5_play_btn.width()-current_obj.newBannerWidth-current_obj.rightSideButtonsDim-10)/2,10);

													audio8_html5_frameBehindPlayerText.height(current_obj.newPlayerHeight);
													audio8_html5_container.height(current_obj.newPlayerHeight);

									}
								}

								current_obj.imageTopPos=parseInt((current_obj.newPlayerHeight-current_obj.newBannerHeight)/2,10);
								audio8_html5_ximage.css({
									'width':current_obj.newBannerWidth+'px',
									'height':current_obj.newBannerHeight+'px',
									'left':current_obj.imageLeftPos+'px',
									'top':current_obj.imageTopPos+'px',
									'background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
									'-webkit-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
									'-moz-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
									'-o-background-size': current_obj.newBannerWidth+'px '+current_obj.newBannerHeight+'px',
									'padding':0,
									'margin':0
								});
								audio8_html5_ximage.wrap( "<a href='#' target='"+options.bannerLinkTarget+"'></a>" );


								//hide the elements for the other version
								audio8_html5_the_bars.css ({
								  	'display':'none',
									'width':0,
									'height':0,
									'padding':0,
									'margin':0
								});
								audio8_html5_xspeakers.css ({
								  	'display':'none',
									'width':0,
									'height':0,
									'padding':0,
									'margin':0
								});
								audio8_html5_xgradient.css ({
								  	'display':'none',
									'width':0,
									'height':0,
									'padding':0,
									'margin':0
								});

						} else {
								/******************************/
								current_obj.newBannerWidth=600;
								current_obj.newBannerHeight=90;
								current_obj.newImageBorderWidth=options.imageBorderWidth

								audio8_html5_ximage.css({
									'display':'block',
									"border-width":current_obj.newImageBorderWidth+"px"
								});

								audio8_html5_xspeakers.css({
										'display':'block'
								});
								audio8_html5_the_bars.css({
										'display':'block'
								});
								if (options.showGradientOverBars) {
									audio8_html5_xgradient.css({
											'display':'block'
									});
								}


								if (options.playerWidth<360) {
									if (options.showTitle) {
										audio8_html5_Title.css({
											'display':'none'
										});
										audio8_html5_artistName.css({
											'display':'none'
										});
									}
									if (options.showRadioStation) {
										audio8_html5_radioStation.css({
											'display':'none'
										});
									}
								} else {
									if (options.showTitle) {
										audio8_html5_Title.css({
											'display':'block'
										});
										audio8_html5_artistName.css({
											'display':'block'
										});
									}
									if (options.showRadioStation) {
										audio8_html5_radioStation.css({
											'display':'block'
										});
									}
								}

								//current_obj.imageLeftPos=current_obj.titleLeftPos+current_obj.titleWidth+parseInt((options.playerWidth-current_obj.titleLeftPos-current_obj.titleWidth-current_obj.newBannerWidth-audio8_html5_showHidePlaylist_btn.width()-10)/2,10);
								current_obj.speakersLeftPos=parseInt((options.playerWidth-current_obj.newBannerWidth)/2,10);

								if ( current_obj.speakersLeftPos < (current_obj.titleLeftPos+current_obj.titleWidth) ) {
									current_obj.speakersLeftPos=current_obj.titleLeftPos+current_obj.titleWidth+parseInt((options.playerWidth-current_obj.titleLeftPos-current_obj.titleWidth-current_obj.newBannerWidth-current_obj.rightSideButtonsDim-10)/2,10);
								}

								if ( current_obj.speakersLeftPos < (current_obj.titleLeftPos+current_obj.titleWidth) ) {
									current_obj.speakersLeftPos=current_obj.playLeftPos+audio8_html5_play_btn.width()+parseInt((options.playerWidth-current_obj.playLeftPos-audio8_html5_play_btn.width()-current_obj.newBannerWidth-current_obj.rightSideButtonsDim-10)/2,10);

									current_obj.newImageBorderWidth=2;
									audio8_html5_ximage.css({
										"border-width":current_obj.newImageBorderWidth+"px"
									});
									//hide elements after resize start
									audio8_html5_xspeakers.css({
											'display':'none'
									});
									audio8_html5_the_bars.css({
											'display':'none'
									});
									audio8_html5_xgradient.css({
											'display':'none'
									});
									//hide elements after resize end
								}



								current_obj.speakersTopPos=parseInt((current_obj.newPlayerHeight-current_obj.newBannerHeight)/2,10);
								audio8_html5_xspeakers.css({
									'left':current_obj.speakersLeftPos+'px',
									'top':current_obj.speakersTopPos+'px',
									'padding':0,
									'margin':0
								});


								current_obj.imageLeftPos=current_obj.speakersLeftPos+parseInt((current_obj.newBannerWidth-audio8_html5_ximage.width())/2,10)-current_obj.newImageBorderWidth;
								if (audio8_html5_xspeakers.css('display')=='none') {
									current_obj.imageLeftPos=+parseInt((options.playerWidth-audio8_html5_ximage.width())/2,10)-current_obj.newImageBorderWidth;
								}
								current_obj.imageTopPos=parseInt((current_obj.newPlayerHeight-current_obj.newBannerHeight)/2,10)-current_obj.newImageBorderWidth;

								if ( current_obj.imageLeftPos < (current_obj.titleLeftPos+current_obj.titleWidth) ) {
									current_obj.imageLeftPos = current_obj.titleLeftPos+current_obj.titleWidth+parseInt((options.playerWidth-current_obj.titleLeftPos-current_obj.titleWidth-audio8_html5_ximage.width()-current_obj.rightSideButtonsDim-10)/2,10);
								}
								if ( current_obj.imageLeftPos < (current_obj.titleLeftPos+current_obj.titleWidth) ) {
									audio8_html5_ximage.css({
										'display':'none'
									});
								}
								/*alert (current_obj.titleWidth);
								if (options.showTitle) {
										audio8_html5_Title.width(current_obj.titleWidth);
										audio8_html5_artistName.width(current_obj.titleWidth);
										audio8_html5_radioStation.width(current_obj.radioStationWidth);
								}*/


								audio8_html5_ximage.css({
									'left':current_obj.imageLeftPos+'px',
									'top':current_obj.imageTopPos+'px',
									'padding':0,
									'margin':0
								});
								/******************************/

								//the_bars
								current_obj.thebarsTopPos=parseInt((current_obj.newPlayerHeight-audio8_html5_the_bars.height())/2,10);
								current_obj.thebarsLeftPos=current_obj.speakersLeftPos+70;  //91 some shifting position of the bars;  65+5 the audio speacker width
								audio8_html5_the_bars.css({
									'top':current_obj.thebarsTopPos+'px',
									'left':current_obj.thebarsLeftPos+'px'
								});
								$('.bar', audio8_html5_container).css({
									'background':options.barsColor
								});

								//gradient
								current_obj.gradientTopPos=parseInt((current_obj.newPlayerHeight-audio8_html5_xgradient.height())/2,10);
								current_obj.gradientLeftPos=current_obj.speakersLeftPos+65;  //91 some shifting position of the bars;  65+5 the audio speacker width
								audio8_html5_xgradient.css ({
									'top':current_obj.gradientTopPos+'px',
									'left':current_obj.gradientLeftPos+'px'
								});
						}




						//audio8_html5_showHidePlaylist_btn.height() .... 16
						current_obj.smallButtonDistance=parseInt( (current_obj.newPlayerHeight-current_obj.numberOfButtonsRightSide*16  ) /(current_obj.numberOfButtonsRightSide+1) , 10);

						//show/hide playlist
						if (!options.showPlaylistBut) {
							audio8_html5_showHidePlaylist_btn.css({
									'display':'none',
									'width':0,
									'height':0,
									'padding':0,
									'margin':0
							});
							current_obj.showhideplaylistTopPos=0;
						} else {
							current_obj.showhideplaylistTopPos=current_obj.smallButtonDistance;
							current_obj.showhideplaylistLeftPos=10;
							audio8_html5_showHidePlaylist_btn.css({
								'top':current_obj.showhideplaylistTopPos+'px',
								'right':current_obj.showhideplaylistLeftPos+'px'
							});
						}



						//popup
						current_obj.popupTopPos=current_obj.showhideplaylistTopPos+audio8_html5_showHidePlaylist_btn.height()+current_obj.smallButtonDistance;
						current_obj.popupLeftPos=10;
						if (!options.showPopupBut) {
								audio8_html5_popup_btn.css({
									'display':'none',
									'width':0,
									'height':0,
									'padding':0,
									'margin':0
								});
								current_obj.popupTopPos=current_obj.showhideplaylistTopPos+audio8_html5_showHidePlaylist_btn.height();
						} else {
							audio8_html5_popup_btn.css({
								'top':current_obj.popupTopPos+'px',
								'right':current_obj.popupLeftPos+'px'
							});
						}


						//facebook
						current_obj.facebookTopPos=current_obj.popupTopPos+audio8_html5_popup_btn.height()+current_obj.smallButtonDistance;
						current_obj.facebookLeftPos=10;
						if (!options.showFacebookBut) {
							audio8_html5_facebook_btn.css({
									'display':'none',
									'width':0,
									'height':0,
									'padding':0,
									'margin':0
							});
							current_obj.facebookTopPos=current_obj.popupTopPos+audio8_html5_popup_btn.height();
						} else {
							//current_obj.constantDistance;
							audio8_html5_facebook_btn.css({
								'top':current_obj.facebookTopPos+'px',
								'right':current_obj.facebookLeftPos+'px'
							});
						}



						//twitter
						current_obj.twitterTopPos=current_obj.facebookTopPos+audio8_html5_facebook_btn.height()+current_obj.smallButtonDistance;
						current_obj.twitterLeftPos=10;
						if (!options.showTwitterBut) {
							audio8_html5_twitter_btn.css({
									'display':'none',
									'width':0,
									'height':0,
									'padding':0,
									'margin':0
							});
						} else {
							audio8_html5_twitter_btn.css({
								'top':current_obj.twitterTopPos+'px',
								'right':current_obj.twitterLeftPos+'px'
							});
						}
			}



		function generateCategories(current_obj,options,audio8_html5_container,audio8_html5_thumbsHolder,audio8_html5_thumbsHolderWrapper,audio8_html5_thumbsHolderVisibleWrapper,audio8_html5_selectedCategDiv,audio8_html5_innerSelectedCategDiv,audio8_html5_searchDiv,audio8_html5_playlistPadding,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient) {
			  audio8_html5_thumbsHolder.stop(true,true);
			  current_obj.isCarouselScrolling=false;

			  audio8_html5_thumbsHolder.stop().animate({
				  'left': (-1)*audio8_html5_thumbsHolderVisibleWrapper.width()+'px'
			  }, 100, 'easeOutQuad', function() { //it was 600
				  // Animation complete.
					audio8_html5_thumbsHolder.html("");

//current_obj.numberOfCategories=current_obj.category_arr.length;
					for (var j=0;j<current_obj.category_arr.length;j++) {
							current_obj.thumbsHolder_Thumb = $('<div class="thumbsHolder_ThumbOFF" rel="'+ j +'"><div class="padding">'+current_obj.category_arr[j]+'</div></div>');
							audio8_html5_thumbsHolder.append(current_obj.thumbsHolder_Thumb);


							current_obj.thumbsHolder_Thumb.css({
								"top":(current_obj.thumbsHolder_Thumb.height()+1)*j+'px',
								"background":options.categoryRecordBgOffColor,
								"border-bottom-color":options.categoryRecordBottomBorderOffColor,
								"color":options.categoryRecordTextOffColor
							});

							//activate current
							if (current_obj.category_arr[j]==current_obj.selectedCateg) {
								current_obj.current_img_no=j;
								current_obj.thumbsHolder_Thumb.css({
									"background":options.categoryRecordBgOnColor,
									"border-bottom-color":options.categoryRecordBottomBorderOnColor,
									"color":options.categoryRecordTextOnColor
								});
							}
					}

					current_obj.selectedCateg_total_images=current_obj.numberOfCategories;
					current_obj.categsAreListed=true;

				  var new_selectedCategMarginBottom=0;
				  if (options.showCategories)
				  		new_selectedCategMarginBottom+=options.selectedCategMarginBottom;
				  if (options.showSearchArea)
				  		new_selectedCategMarginBottom+=options.selectedCategMarginBottom;

					audio8_html5_thumbsHolderWrapper.height(2*options.playlistPadding+(current_obj.thumbsHolder_Thumb.height()+1)*options.numberOfThumbsPerScreen+audio8_html5_selectedCategDiv.height()+audio8_html5_searchDiv.height()+new_selectedCategMarginBottom); //current_obj.thumbsHolder_Thumb.height()+1 - 1 is the border
					audio8_html5_thumbsHolderVisibleWrapper.height((current_obj.thumbsHolder_Thumb.height()+1)*options.numberOfThumbsPerScreen);
					audio8_html5_playlistPadding.css({'padding':options.playlistPadding+'px'});

					current_obj.thumbsHolder_Thumbs=$('.thumbsHolder_ThumbOFF', audio8_html5_container);

					//the playlist scroller
					if (current_obj.numberOfCategories>options.numberOfThumbsPerScreen && options.showPlaylist) {
						if (options.isPlaylistSliderInitialized) {
							current_obj.audio8_html5_sliderVertical.slider( "destroy" );
						}
						//alert (current_obj.numberOfCategories+'>'+options.numberOfThumbsPerScreen);
						current_obj.audio8_html5_sliderVertical.slider({
							orientation: "vertical",
							range: "min",
							min: 1,
							max: 100,
							step:1,
							value: 100,
							slide: function( event, ui ) {
								//alert( ui.value );
								carouselScroll(ui.value,current_obj,options,audio8_html5_thumbsHolder);
							}
						});
						 options.isPlaylistSliderInitialized=true;
						//var audio8_html5_selectedCategDiv = $('.selectedCategDiv', audio8_html5_container);
					    //var audio8_html5_searchDiv = $('.searchDiv', audio8_html5_container);
						var sliderVerticalTop_selectedCategMarginBottom=0;
						if (options.showSearchArea)
							  sliderVerticalTop_selectedCategMarginBottom+=options.selectedCategMarginBottom;
						current_obj.audio8_html5_sliderVertical.css({
							'display':'inline',
							'position':'absolute',
							'height':audio8_html5_thumbsHolderWrapper.height()-current_obj.rightSideButtonsDim-audio8_html5_selectedCategDiv.height()-new_selectedCategMarginBottom-audio8_html5_searchDiv.height()-2*options.playlistPadding+'px', // 16 is the height of  .slider-vertical.ui-slider .ui-slider-handle
							'left':audio8_html5_container.width()+2*options.playerPadding-current_obj.audio8_html5_sliderVertical.width()-options.playlistPadding+'px',
							//'top':(-1)*(audio8_html5_thumbsHolderWrapper.height()-options.playlistPadding-audio8_html5_selectedCategDiv.height()-sliderVerticalTop_selectedCategMarginBottom-2)+'px'
							 'bottom':current_obj.newPlayerHeight+options.playlistTopPos+options.playlistPadding+audio8_html5_searchDiv.height()+sliderVerticalTop_selectedCategMarginBottom+16+'px'  //16 = .ui-slider-handle
						});

						/*if (!options.showPlaylistOnInit) {
							current_obj.audio8_html5_sliderVertical.css({
								'opacity': 0,
								'display':'none'
							});
						}*/
						options.showPlaylistOnInit=true; // to prevent sliderVertical disappereance after yo show the playlist
						$('.thumbsHolder_ThumbOFF', audio8_html5_container).css({
							'width':audio8_html5_container.width()+2*options.playerPadding-current_obj.audio8_html5_sliderVertical.width()-2*options.playlistPadding-3+'px'
						});

					} else {
						if (options.isPlaylistSliderInitialized) {
							current_obj.audio8_html5_sliderVertical.slider( "destroy" );
							options.isPlaylistSliderInitialized=false;
						}
						$('.thumbsHolder_ThumbOFF', audio8_html5_container).css({
							'width':audio8_html5_container.width()+2*options.playerPadding-2*options.playlistPadding+'px'
						});
					}





					//tumbs nav

					current_obj.thumbsHolder_Thumbs.click(function() {
							var currentBut=$(this);
							var i=currentBut.attr('rel');
							current_obj.selectedCateg=current_obj.category_arr[i];
							setCookie(options,'cookie_firstCateg', current_obj.selectedCateg);
							audio8_html5_innerSelectedCategDiv.html(current_obj.selectedCateg);
							generatePlaylistByCateg(current_obj,options,audio8_html5_container,audio8_html5_thumbsHolder,audio8_html5_thumbsHolderWrapper,audio8_html5_thumbsHolderVisibleWrapper,audio8_html5_selectedCategDiv,audio8_html5_searchDiv,audio8_html5_playlistPadding,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);

					});


					current_obj.thumbsHolder_Thumbs.mouseover(function() {
						var currentBut=$(this);
						currentBut.css({
							"background":options.categoryRecordBgOnColor,
							"border-bottom-color":options.categoryRecordBottomBorderOnColor,
							"color":options.categoryRecordTextOnColor
						});
					});


					current_obj.thumbsHolder_Thumbs.mouseout(function() {
						var currentBut=$(this);
						var i=currentBut.attr('rel');
						if (current_obj.current_img_no!=i){
							currentBut.css({
								"background":options.categoryRecordBgOffColor,
								"border-bottom-color":options.categoryRecordBottomBorderOffColor,
								"color":options.categoryRecordTextOffColor
							});
						}
					});

				//carouselScroll(-1,current_obj,options,audio8_html5_thumbsHolder);
				// mouse wheel
				audio8_html5_thumbsHolderVisibleWrapper.mousewheel(function(event, delta, deltaX, deltaY) {
						if (current_obj.audio8_html5_sliderVertical.css('display')!='none') {
								event.preventDefault();
								var currentScrollVal=current_obj.audio8_html5_sliderVertical.slider( "value");
								//alert (currentScrollVal+' -- '+delta);
								if ( (parseInt(currentScrollVal)>1 && parseInt(delta)==-1) || (parseInt(currentScrollVal)<100 && parseInt(delta)==1) ) {
									currentScrollVal = currentScrollVal + delta;
									current_obj.audio8_html5_sliderVertical.slider( "value", currentScrollVal);
									carouselScroll(currentScrollVal,current_obj,options,audio8_html5_thumbsHolder)
									//alert (currentScrollVal);
								}
						}
				});

					audio8_html5_thumbsHolder.css({
						'top':0+'px'
					});
					audio8_html5_thumbsHolder.stop().animate({
						'left': 0+'px'
					}, 400, 'easeOutQuad', function() {
						// Animation complete.
			  		});
			  });




		}

		function generatePlaylistByCateg(current_obj,options,audio8_html5_container,audio8_html5_thumbsHolder,audio8_html5_thumbsHolderWrapper,audio8_html5_thumbsHolderVisibleWrapper,audio8_html5_selectedCategDiv,audio8_html5_searchDiv,audio8_html5_playlistPadding,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient) {
			audio8_html5_thumbsHolder.stop(true,true);
			current_obj.isCarouselScrolling=false;

			var stationLowerCases='';
			var elementFound=false;
			var animateDur=500;
			if (current_obj.is_very_first)
				animateDur=1;
			if (current_obj.search_val!='')
				animateDur=1;

			audio8_html5_thumbsHolder.stop().animate({
				  'left': (-1)*audio8_html5_thumbsHolderVisibleWrapper.width()+'px'
			}, animateDur, 'easeOutQuad', function() {
				  // Animation complete.
				  audio8_html5_thumbsHolder.html("");

				  current_obj.selectedCateg_total_images=0;
				  for (var j=0;j<current_obj.playlist_arr.length;j++) {
					  elementFound=false;
					  //alert (current_obj.search_val);
					  if (current_obj.search_val!='') {
						  stationLowerCases=current_obj.playlist_arr[j]['station'].toLowerCase();
						  //alert (stationLowerCases.indexOf(current_obj.search_val));
						  if (stationLowerCases.indexOf(current_obj.search_val)!=-1) {
						  		elementFound=true;
						  }
					  } else {
						  if (current_obj.playlist_arr[j]['category'].indexOf(current_obj.selectedCateg+';')!=-1) {
							  elementFound=true;
						  }
					  }

					  if (elementFound) {
						  current_obj.selectedCateg_total_images++;
						  current_obj.thumbsHolder_Thumb = $('<div class="thumbsHolder_ThumbOFF" rel="'+ (current_obj.selectedCateg_total_images-1) +'" data-origID="'+ j +'"><div class="padding">'+((options.showPlaylistNumber)?(current_obj.selectedCateg_total_images)+'. ':'')+current_obj.playlist_arr[j]['station']+'</div></div>');
						  audio8_html5_thumbsHolder.append(current_obj.thumbsHolder_Thumb);
						  if (current_obj.thumbsHolder_ThumbHeight==0) {
						  		current_obj.thumbsHolder_ThumbHeight=current_obj.thumbsHolder_Thumb.height();
						  }


						  current_obj.thumbsHolder_Thumb.css({
							  "top":(current_obj.thumbsHolder_ThumbHeight+1)*current_obj.selectedCateg_total_images+'px',
							  "background":options.playlistRecordBgOffColor,
							  "border-bottom-color":options.playlistRecordBottomBorderOffColor,
							  "color":options.playlistRecordTextOffColor
						  });



						  current_obj.current_img_no=0;

						  //activate playing one
						  if (current_obj.origID==$("div[rel=\'"+(current_obj.selectedCateg_total_images-1)+"\']").attr('data-origID')){
							  current_obj.thumbsHolder_Thumb.css({
								  "background":options.playlistRecordBgOnColor,
								  "border-bottom-color":options.playlistRecordBottomBorderOnColor,
								  "color":options.playlistRecordTextOnColor
							  });
						  }
					  }
				  }


				  current_obj.categsAreListed=false;

				  var new_selectedCategMarginBottom=0;
				  if (options.showCategories)
				  		new_selectedCategMarginBottom+=options.selectedCategMarginBottom;
				  if (options.showSearchArea)
				  		new_selectedCategMarginBottom+=options.selectedCategMarginBottom;
				  audio8_html5_thumbsHolderWrapper.height(2*options.playlistPadding+(current_obj.thumbsHolder_ThumbHeight+1)*options.numberOfThumbsPerScreen+audio8_html5_selectedCategDiv.height()+audio8_html5_searchDiv.height()+new_selectedCategMarginBottom); //current_obj.thumbsHolder_ThumbHeight+1 - 1 is the border
				  audio8_html5_thumbsHolderVisibleWrapper.height((current_obj.thumbsHolder_ThumbHeight+1)*options.numberOfThumbsPerScreen);
				  audio8_html5_playlistPadding.css({'padding':options.playlistPadding+'px'});

				  current_obj.thumbsHolder_Thumbs=$('.thumbsHolder_ThumbOFF', audio8_html5_container);


				  //the playlist scroller
				  if (current_obj.selectedCateg_total_images>options.numberOfThumbsPerScreen && options.showPlaylist) {

					  if (options.isPlaylistSliderInitialized) {
						  current_obj.audio8_html5_sliderVertical.slider( "destroy" );
					  }
					  current_obj.audio8_html5_sliderVertical.slider({
						  orientation: "vertical",
						  range: "min",
						  min: 1,
						  max: 100,
						  step:1,
						  value: 100,
						  slide: function( event, ui ) {
							  //alert( ui.value );
							  carouselScroll(ui.value,current_obj,options,audio8_html5_thumbsHolder);
						  }
					  });
					  options.isPlaylistSliderInitialized=true;
				  //var audio8_html5_selectedCategDiv = $('.selectedCategDiv', audio8_html5_container);
				  //var audio8_html5_searchDiv = $('.searchDiv', audio8_html5_container);


					  var sliderVerticalTop_selectedCategMarginBottom=0;
					  if (options.showSearchArea)
							sliderVerticalTop_selectedCategMarginBottom+=options.selectedCategMarginBottom;
					  current_obj.audio8_html5_sliderVertical.css({
						  'display':'inline',
						  'position':'absolute',
						  'height':audio8_html5_thumbsHolderWrapper.height()-current_obj.rightSideButtonsDim-audio8_html5_selectedCategDiv.height()-new_selectedCategMarginBottom-audio8_html5_searchDiv.height()-2*options.playlistPadding+'px', // 16 is the height of  .slider-vertical.ui-slider .ui-slider-handle
						  'left':audio8_html5_container.width()+2*options.playerPadding-current_obj.audio8_html5_sliderVertical.width()-options.playlistPadding+'px',
						  //'top':(-1)*(audio8_html5_thumbsHolderWrapper.height()-options.playlistPadding-audio8_html5_selectedCategDiv.height()-sliderVerticalTop_selectedCategMarginBottom-2)+'px'
						  'bottom':current_obj.newPlayerHeight+options.playlistTopPos+options.playlistPadding+audio8_html5_searchDiv.height()+sliderVerticalTop_selectedCategMarginBottom+16+'px'  //16 = .ui-slider-handle
					  });
					  if (!options.showPlaylistOnInit) {
						  current_obj.audio8_html5_sliderVertical.css({
							  'opacity': 0,
							  'display':'none'
						  });
					  }


					  options.showPlaylistOnInit=true; // to prevent sliderVertical disappereance after yo show the playlist

					  $('.thumbsHolder_ThumbOFF', audio8_html5_container).css({
						  'width':audio8_html5_container.width()+2*options.playerPadding-current_obj.audio8_html5_sliderVertical.width()-2*options.playlistPadding-3+'px'
					  });

				  } else {
					  if (options.isPlaylistSliderInitialized) {
							current_obj.audio8_html5_sliderVertical.slider( "destroy" );
							options.isPlaylistSliderInitialized=false;
					  }
					  $('.thumbsHolder_ThumbOFF', audio8_html5_container).css({
						  'width':audio8_html5_container.width()+2*options.playerPadding-2*options.playlistPadding+'px'
					  });
				  }


				//tumbs nav
				current_obj.thumbsHolder_Thumbs.click(function() {
						options.autoPlay=true;
						var currentBut=$(this);
						var i=currentBut.attr('rel');

						current_obj.thumbsHolder_Thumbs.css({
							"background":options.playlistRecordBgOffColor,
							"border-bottom-color":options.playlistRecordBottomBorderOffColor,
							"color":options.playlistRecordTextOffColor
						});

						current_obj.current_img_no=i;
						current_obj.origID=$("div[rel=\'"+current_obj.current_img_no+"\']").attr('data-origID');
						setCookie(options,'cookie_current_img_no', current_obj.current_img_no);
						setCookie(options,'cookie_origID', current_obj.origID);
						audio8_html5_play_btn.addClass('AudioPause');
						changeSrc(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_radioStation,audio8_html5_artistName,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
						carouselScroll(-1,current_obj,options,audio8_html5_thumbsHolder);
				});


				current_obj.thumbsHolder_Thumbs.mouseover(function() {
					var currentBut=$(this);
					currentBut.css({
						"background":options.playlistRecordBgOnColor,
						"border-bottom-color":options.playlistRecordBottomBorderOnColor,
						"color":options.playlistRecordTextOnColor
					});
				});


				current_obj.thumbsHolder_Thumbs.mouseout(function() {
					var currentBut=$(this);
					var i=currentBut.attr('rel');
					if (current_obj.origID!=$("div[rel=\'"+i+"\']").attr('data-origID')){
						currentBut.css({
							"background":options.playlistRecordBgOffColor,
							"border-bottom-color":options.playlistRecordBottomBorderOffColor,
							"color":options.playlistRecordTextOffColor
						});
					}
				});

				// mouse wheel
				audio8_html5_thumbsHolderVisibleWrapper.mousewheel(function(event, delta, deltaX, deltaY) {
						if (current_obj.audio8_html5_sliderVertical.css('display')!='none') {
								event.preventDefault();
								var currentScrollVal=current_obj.audio8_html5_sliderVertical.slider( "value");
								//alert (currentScrollVal+' -- '+delta);
								if ( (parseInt(currentScrollVal)>1 && parseInt(delta)==-1) || (parseInt(currentScrollVal)<100 && parseInt(delta)==1) ) {
									currentScrollVal = currentScrollVal + delta;
									current_obj.audio8_html5_sliderVertical.slider( "value", currentScrollVal);
									carouselScroll(currentScrollVal,current_obj,options,audio8_html5_thumbsHolder)
									//alert (currentScrollVal);
								}
						}
				});


				audio8_html5_thumbsHolder.css({
					'top':0+'px'
				});
				audio8_html5_thumbsHolder.stop().animate({
					'left': 0+'px'
				}, 400, 'easeOutQuad', function() {
					// Animation complete.
				});




				// check page change start
				current_obj.cur_loc=window.location.href;
				goToRadioByUrl(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
				//alert(current_obj.cur_loc);
				current_obj.cur_intv=setInterval(function(){
				if (current_obj.cur_loc!=window.location.href && current_obj.playlist_arr.length>0) {
					//alert(current_obj.cur_loc);
					current_obj.cur_loc=window.location.href;
					goToRadioByUrl(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
					//alert(current_obj.cur_loc);
				}
				}, 5000);
				// check page change end


			});



		}




	  //function setCookie(options,c_name,value,exdays)
		setCookie=function(options,c_name,value,maxAgeSeconds)
	  {
			  /*var exdate=new Date();
				//alert ("now: "+exdate.toUTCString());
			  exdate.setDate(exdate.getDate() + exdays);
			  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString())+";path=/";
				//alert (c_value);
			  document.cookie=c_name + "=" + c_value;*/
				//here 1.2.3 start
				if (maxAgeSeconds==null) {
					maxAgeSeconds=24*60*60;
				}
				//alert (c_name+'  ---  '+maxAgeSeconds);
				var maxAge = "; max-age=" + maxAgeSeconds;
				var cookieLevel='; path=/';
    		document.cookie = encodeURI(c_name) + "=" + encodeURI(value) + maxAge+cookieLevel;
				//here 1.2.3 end
	  }

	  getCookie=function(options,c_name)
	  {
			  var i,x,y,ARRcookies=document.cookie.split(";");
			  for (i=0;i<ARRcookies.length;i++)
			  {
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
				if (x==c_name)
				  {
				  return unescape(y);
				  }
				}
	  }




		function findNextVideoNumbers(current_obj,options,navigationFlag) {
					if (navigationFlag=='next') {
						if (current_obj.current_img_no==current_obj.selectedCateg_total_images-1)
							current_obj.current_img_no=0;
						else
							current_obj.current_img_no++;
					} else {
						if (current_obj.current_img_no-1<0)
							current_obj.current_img_no=current_obj.selectedCateg_total_images-1;
						else
							current_obj.current_img_no--;
					}

				current_obj.origID=$("div[rel=\'"+current_obj.current_img_no+"\']").attr('data-origID');
		};



		function cancelAll() {
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

		function getFlashMovieObject(movieName) {
		  if (window.document[movieName])
		  {
			  return window.document[movieName];
		  }
		  if (navigator.appName.indexOf("Microsoft Internet")==-1)
		  {
			if (document.embeds && document.embeds[movieName])
			  return document.embeds[movieName];
		  }
		  else // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
		  {
			return document.getElementById(movieName);
		  }
		}


		function getInternetExplorerVersion()
		// -1 - not IE
		// 7,8,9 etc
		{
		   var rv = -1; // Return value assumes failure.
		   if (navigator.appName == 'Microsoft Internet Explorer')
		   {
			  var ua = navigator.userAgent;
			  var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			  if (re.exec(ua) != null)
				 rv = parseFloat( RegExp.$1 );
		   }
		   else if (navigator.appName == 'Netscape')
		   {
			 var ua = navigator.userAgent;
			 var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
			 if (re.exec(ua) != null)
			   rv = parseFloat( RegExp.$1 );
		   }
		   return parseInt(rv,10);
		}


		function it_supports_mp3(current_obj) {
			  var to_retun=false;
			  if (!(!!(document.getElementById(current_obj.audioID).canPlayType) && ("no" != document.getElementById(current_obj.audioID).canPlayType("audio/mpeg")) && ("" != document.getElementById(current_obj.audioID).canPlayType("audio/mpeg")))) {
				  to_retun=true;
			  }
			  /*var v = document.getElementById(current_obj.audioID);
			  return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');*/
			  return to_retun;
		}



	  function popUpCleaner(audio8_html5_the_wrapper) {
				var allElems=$('body *');
				//var allElems=$('body > *'); //first level
				//alert (audio8_html5_the_wrapper.attr('class'));
				var lbg_target;
				var my_class_name;
				allElems.each(function(){
					lbg_target=$(this);
					//alert (this.className+'  --  '+this.innerHTML+'  --  '+ $.contains(lbg_target[0],audio8_html5_the_wrapper[0]));
					//alert (this.className+'  --  '+ $.contains(lbg_target[0],audio8_html5_the_wrapper[0])+'  --  '+$.contains(audio8_html5_the_wrapper[0], lbg_target[0]));
					//alert (lbg_target.attr('class')+'  --  '+$.contains(lbg_target[0],audio8_html5_the_wrapper[0]) );
					if ( $.contains(lbg_target[0],audio8_html5_the_wrapper[0]) ) {
						//is a div which contains the player
						//alert ("remove website  parent of the player: "+this.className);
						audio8_html5_the_wrapper.unwrap();
						popUpCleaner(audio8_html5_the_wrapper);
					} else {
						//alert (this.className+' --  '+$(this).find('.the_wrapper').className);
						//alert ( $.contains(audio8_html5_the_wrapper[0], lbg_target[0])+'  ||  '+this.className );
						//here 1.2.3 start
						my_class_name=this.className;
						my_class_name=String(my_class_name);
						//here 1.2.3 end
						if ( $.contains(audio8_html5_the_wrapper[0], lbg_target[0]) || my_class_name=='the_wrapper' || my_class_name.indexOf("audio8_html5")!=-1 ) {
							//nothing, is the player or inside the player
							//alert ("nothing: "+this.className);
						} else {
							//this.innerHTML="";
							//alert ("remove: "+this.className);
							this.remove();
						}
					}
				});
				//$('div').not('.the_wrapper').remove();
	  }



	/*$.audio8_html5 = {version: '1.6'};*/
	//core
	$.fn.audio8_html5 = function(options) {

		options = $.extend({},$.fn.audio8_html5.defaults, options);
		var ver_ie=getInternetExplorerVersion();
		//parse it
		return this.each(function() {
			var audio8_html5_Audio = $(this);


			//the controllers
			var audio8_html5_controlsDef = $('<div class="FrameBehindPlayerText"><div class="ximage"></div>  <div class="xspeakers"></div>  <div class="xgradient"></div></div>  <div class="AudioControls"> <a class="AudioCloseBut" title="Minimize"></a> <a class="AudioFacebook" title="Facebook"></a><a class="AudioTwitter" title="Twitter"></a><a class="AudioPopup" title="Popup"></a><a class="AudioPlay" title="Play/Pause"></a><a class="AudioPrev" title="Previous"></a><a class="AudioNext" title="Next"></a><a class="AudioShowHidePlaylist" title="Show/Hide Playlist"></a><a class="VolumeButton" title="Mute/Unmute"></a><div class="VolumeSlider"></div>   </div>   <div class="songTitle"><div class="songTitleInside"></div></div>  <div class="artistName"></div>  <div class="radioStation"></div>     <div class="thumbsHolderWrapper"><div class="playlistPadding"><div class="selectedCategDiv"><div class="innerSelectedCategDiv">reading the categories...</div></div> <div class="thumbsHolderVisibleWrapper"><div class="thumbsHolder"></div></div><div class="searchDiv"><input class="search_term" type="text" value="search..." /></div></div></div>  <div class="slider-vertical"></div>');

			var audio8_html5_the_bars=$('<div class="barsContainer"><div class="bars perspectiveDownZero"><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div><div class="bar sound2"></div></div><div class="bars"><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div><div class="bar sound"></div></div></div>');



			//the elements
			audio8_html5_container = audio8_html5_Audio.parent('.audio8_html5');
			//alert (audio8_html5_container.attr('class')+'  --  '+audio8_html5_container.parent().attr('class'));
			//var audio8_html5_border = $(this).parent();
			//alert (audio8_html5_border.attr('class')+'   ---   '+audio8_html5_container.attr('class'));  // the same

			audio8_html5_container.addClass(options.skin);
			audio8_html5_container.append(audio8_html5_controlsDef);
			audio8_html5_container.append(audio8_html5_the_bars);

			var audio8_html5_frameBehindPlayerText = $('.FrameBehindPlayerText', audio8_html5_container);
			var audio8_html5_controls = $('.AudioControls', audio8_html5_container);
			var audio8_html5_facebook_btn = $('.AudioFacebook', audio8_html5_container);
			var audio8_html5_twitter_btn = $('.AudioTwitter', audio8_html5_container);
			audio8_html5_play_btn = $('.AudioPlay', audio8_html5_container);
			var audio8_html5_prev_btn = $('.AudioPrev', audio8_html5_container);
			var audio8_html5_next_btn = $('.AudioNext', audio8_html5_container);
			var audio8_html5_showHidePlaylist_btn = $('.AudioShowHidePlaylist', audio8_html5_container);
			var audio8_html5_popup_btn = $('.AudioPopup', audio8_html5_container);
			var audio8_html5_volumeMute_btn = $('.VolumeButton', audio8_html5_container);
			var audio8_html5_volumeSlider = $('.VolumeSlider', audio8_html5_container);
			audio8_html5_Title = $('.songTitle', audio8_html5_container);
			audio8_html5_TitleInside = $('.songTitleInside', audio8_html5_container);
			audio8_html5_radioStation = $('.radioStation', audio8_html5_container);
			audio8_html5_artistName = $('.artistName', audio8_html5_container);
			audio8_html5_ximage = $('.ximage', audio8_html5_container);
			audio8_html5_xspeakers = $('.xspeakers', audio8_html5_container);
			audio8_html5_xgradient = $('.xgradient', audio8_html5_container);

			var audio8_html5_min = $('.AudioCloseBut', audio8_html5_container);

			var ver_ie=getInternetExplorerVersion();

			/**********if (val.indexOf("ipad") != -1 || val.indexOf("iphone") != -1 || val.indexOf("ipod") != -1 || val.indexOf("webos") != -1 || navigator.userAgent.indexOf('Android') != -1) {
				options.autoPlay=false;
			}*************/


			//initilize the player with the options
			audio8_html5_container.css({
				//'background':options.playerBg,
				'background':"transparent",
				'padding':options.playerPadding+'px'
			});


			audio8_html5_frameBehindPlayerText.css({
				'background':options.playerBackgroundColor,
				'opacity':options.playerBackgroundOpacity/100,
				'border-bottom':options.beneathTitleBackgroundBorderWidth+'px solid '+options.beneathTitleBackgroundBorderColor
			});



			current_obj = {
				current_img_no:0,
				origID:0,
				is_very_first:true,
				total_images:0,
				selectedCateg_total_images:0,
				numberOfCategories:0,
				is_changeSrc:false,
				timeupdateInterval:'',
				totalTime:'',
				playlist_arr:'',
				isCarouselScrolling:false,
				isStationTitleInsideScrolling:false,
				curSongText:'',
				prevSongTitle:'',
				stationTitleInsideWait:0,
				audioPlayerWidth:0,

				category_arr:'',
				selectedCateg:'',
				categsAreListed:false,
				thumbsHolder_Thumb:$('<div class="thumbsHolder_ThumbOFF" rel="0"><div class="padding">test</div></div>'),
				thumbsHolder_ThumbHeight:0,
				thumbsHolder_Thumbs:'',

				search_val:'',

				constantDistance:5,
				playerTopMargin:23,
				titleWidth:options.titleWidth,
				radioStationWidth:options.titleWidth,
				radioStationTopPos:0,
				radioStationLeftPos:0,
				titleTopPos:0,
				titleLeftPos:0,
				imageTopPos:0,
				imageLeftPos:0,
				playTopPos:0,
				playLeftPos:0,
				playBtnMaxDiameter:80,
				playBtnNewDim:80,
				previousTopPos:0,
				previousLeftPos:0,
				nextTopPos:0,
				nextLeftPos:0,
				volumeTopPos:0,
				volumeLeftPos:0,
				volumesliderTopPos:0,
				volumesliderLeftPos:0,
				showhideplaylistTopPos:0,
				showhideplaylistLeftPos:0,
				smallButtonDistance:0,
				popupTopPos:0,
				popupLeftPos:0,
				facebookTopPos:0,
				facebookLeftPos:0,
				twitterTopPos:0,
				twitterLeftPos:0,
				rightSideButtonsDim:16,
				artistNameTopPos:0,
				artistNameLeftPos:0,

				thebarsTopPos:0,
				thebarsLeftPos:0,
				speakersLeftPos:0,
				speakersTopPos:0,
				gradientLeftPos:0,
				gradientTopPos:0,

				numberOfButtonsRightSide:4,
				resizePlayButton:false,

				origParentFloat:'',
				origParentPaddingTop:'',
				origParentPaddingRight:'',
				origParentPaddingBottom:'',
				origParentPaddingLeft:'',

				windowWidth:0,

				audioID:'',
				audioObj:'',//remove it
				radioReaderAjaxInterval:'',
				totalRadioStationsNo:0,
				ajaxReturnedRadioStationsNo:0,
				lastfm:'',

				isFlashNeeded:true,
				myFlashObject:'',
				rndNum:0,
				prevVolumeVal:1,
				cur_loc:'',
				cur_intv:'',

				isMinified:false,
				cookie_isMinified:false,
				cookie_current_img_no:0,
				cookie_origID:0,
				cookie_initialVolume:0,
				cookie_muteVolume:0,
				cookie_autoPlay:false,
				cookie_firstCateg:'',
				cookie_popupWin:'',

				newImageBorderWidth:options.imageBorderWidth,

				newBannerWidth:options.bannerWidth,
				newBannerHeight:options.bannerHeight,
				newPlayerHeight:options.playerHeight,
				bannersInterval:'',
				curBanner:0,

				the_artist_id:'',
				the_wikidata_id:'',
				musicbrainz_setTimeout:'',
				wiki_photo_path:options.noImageAvailable

			};


			current_obj.audioID=audio8_html5_Audio.attr('id');

			if (options.nowPlayingInterval<35) {
					options.nowPlayingInterval=40;
			}

			current_obj.isFlashNeeded=it_supports_mp3(current_obj);
			if (ver_ie!=-1) {
				//if (ver_ie!=9) {
					current_obj.isFlashNeeded=true;
				//}
			}
			//alert (current_obj.isFlashNeeded);


			if (!options.showBanner) {
				audio8_html5_ximage.addClass('lbg_border_radius');
				current_obj.newBannerWidth=728;
				current_obj.newBannerHeight=90;

				if (options.showGradientOverBars) {
					audio8_html5_xgradient.css ({
						"background": "-moz-linear-gradient(left, "+options.playerBackgroundColor+" 0%, rgba(245,245,245,0) 51%, "+options.playerBackgroundColor+" 100%)",
						"filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='"+options.playerBackgroundColor+"', endColorstr='"+options.playerBackgroundColor+"', GradientType=1 )"
					});
					audio8_html5_xgradient.css ({
						"background": "-webkit-gradient(left top, right top, color-stop(0%, "+options.playerBackgroundColor+"), color-stop(51%, rgba(245,245,245,0)), color-stop(100%, "+options.playerBackgroundColor+"))"
					});
					audio8_html5_xgradient.css ({
						"background": "-webkit-linear-gradient(left, "+options.playerBackgroundColor+" 0%, rgba(245,245,245,0) 51%, "+options.playerBackgroundColor+" 100%)"
					});
					audio8_html5_xgradient.css ({
						"background": "-o-linear-gradient(left, "+options.playerBackgroundColor+" 0%, rgba(245,245,245,0) 51%, "+options.playerBackgroundColor+" 100%)"
					});
					audio8_html5_xgradient.css ({
						"background": "-ms-linear-gradient(left, "+options.playerBackgroundColor+" 0%, rgba(245,245,245,0) 51%, "+options.playerBackgroundColor+" 100%)"
					});
					audio8_html5_xgradient.css ({
						"background": "linear-gradient(to right, "+options.playerBackgroundColor+" 0%, rgba(245,245,245,0) 51%, "+options.playerBackgroundColor+" 100%)"
					});


				} else {
					audio8_html5_xgradient.css ({
						'display':'none',
						'width':0,
						'height':0,
						'padding':0,
						'margin':0
					});
				}
			} else {
				audio8_html5_the_bars.remove();

			}
//document.cookie = 'cookie_popupWin' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//alert ('new2');
			current_obj.cookie_popupWin=getCookie(options,'cookie_popupWin');
			//alert ('cookie_popupWin: '+current_obj.cookie_popupWin);

			//alert (window.self.name);
			if (window.self.name=='audio8_PopupName') {
				options.sticky=false;
				options.showPopupBut=false;

				audio8_html5_container.parent().css({
					/*'top':(-1)*parseInt(audio8_html5_ximage.css('top').substring(0, audio8_html5_ximage.css('top').length-2),10)+'px',*/
					'left':0,
					'position':'absolute'
				});
				//audio8_html5_container.unwrap();
				$('body').css({
					'background-color':'#999999 !important',
					'min-width':'305px'
				});
				document.getElementsByTagName("body")[0].style.marginTop='0px';
				document.getElementsByTagName("body")[0].style.marginBottom='0px';
				document.getElementsByTagName("body")[0].style.marginLeft='0px';
				document.getElementsByTagName("body")[0].style.marginRight='0px';
				document.getElementsByTagName("body")[0].style.paddingTop='0px';
				document.getElementsByTagName("body")[0].style.paddingBottom='0px';
				document.getElementsByTagName("body")[0].style.paddingLeft='0px';
				document.getElementsByTagName("body")[0].style.paddingRight='0px';

				/*for (i=0;i<20;i++) {
					//alert (audio8_html5_container.parent().className);
					audio8_html5_container.unwrap();
				}*/
				//alert (audio8_html5_container.parent().attr('class'));
				popUpCleaner(audio8_html5_container);

			}


			if (options.sticky || window.self.name=='audio8_PopupName') {
				//cookie start
				//current_obj.cookie_firstCateg=getCookie(options,'cookie_firstCateg');  /moved up where the categs are generated
				//alert (current_obj.cookie_current_img_no);

				current_obj.cookie_current_img_no=getCookie(options,'cookie_current_img_no');
				current_obj.cookie_origID=getCookie(options,'cookie_origID');
				if (current_obj.cookie_current_img_no!=undefined) {
					current_obj.current_img_no=current_obj.cookie_current_img_no;
					if (current_obj.cookie_origID!=undefined) {
						current_obj.origID=current_obj.cookie_origID;
					}
				}

				current_obj.cookie_autoPlay=getCookie(options,'cookie_autoPlay');
				//console.log("A current_obj.cookie_autoPlay: "+current_obj.cookie_autoPlay+" -  options.autoPlay: "+options.autoPlay);
				if (current_obj.cookie_autoPlay!=undefined) {
					if (current_obj.cookie_autoPlay=='true')
						options.autoPlay=true;
					else
						options.autoPlay=false;
					//alert ("if: "+current_obj.cookie_autoPlay+'  -  '+options.autoPlay+'  -  '+current_obj.cookie_timePlayed);
					//console.log("B current_obj.cookie_autoPlay: "+current_obj.cookie_autoPlay+" -  options.autoPlay: "+options.autoPlay);
				} else {
					//alert ("else: "+current_obj.cookie_autoPlay+'  -  '+options.autoPlay+'  -  '+current_obj.cookie_timePlayed);
				}
				if (val.indexOf("ipad") != -1 || val.indexOf("iphone") != -1 || val.indexOf("ipod") != -1 || val.indexOf("webos") != -1 || navigator.userAgent.indexOf('Android') != -1) 				{
					options.autoPlay=false;
					//console.log("C current_obj.cookie_autoPlay: "+current_obj.cookie_autoPlay+" -  options.autoPlay: "+options.autoPlay);
				}
				//console.log("D current_obj.cookie_autoPlay: "+current_obj.cookie_autoPlay+" -  options.autoPlay: "+options.autoPlay);


				//chrome and safari on mac auto-play restrictions 2018 start + firefox 2019 start
				//alert (current_obj.cookie_autoPlay);
				if (current_obj.cookie_autoPlay!='true') {
							//alert (navigator.vendor+'  ---  '+navigator.platform+'  ---  '+navigator.userAgent);
							if ((navigator.userAgent.indexOf("Opera")==-1 &&  navigator.userAgent.indexOf('OPR')) == -1  ) {  // is NOT Opera
										if (navigator.userAgent.indexOf("Chrome")!=-1 && navigator.vendor.indexOf('Google')!=-1 ) { //is chrome
												options.autoPlay=false;
												//alert ('is chrome');
										}
										if (navigator.userAgent.indexOf('Firefox') > -1) {
												options.autoPlay=false;
												//alert ('is firefox');
										}
										if (navigator.userAgent.indexOf("Safari")!=-1 && navigator.vendor.indexOf('Apple')!=-1 && navigator.platform.indexOf('Win')==-1) { //is safari on mac
											options.autoPlay=false;
											//alert ('is safari');
										}
							}
				}
				//chrome and safari on mac auto-play restrictions 2018 end + firefox 2019 start


				current_obj.cookie_initialVolume=getCookie(options,'cookie_initialVolume');
				if (current_obj.cookie_initialVolume) {
					options.initialVolume=current_obj.cookie_initialVolume;
				}

				current_obj.cookie_muteVolume=getCookie(options,'cookie_muteVolume');
				if (current_obj.cookie_muteVolume>=1) {
					setTimeout(function(){
						audio8_html5_volumeMute_btn.click();
					}, 300);

				}

				current_obj.cookie_firstCateg=getCookie(options,'cookie_firstCateg');
				if (current_obj.cookie_firstCateg!=undefined) {
					options.firstCateg=current_obj.cookie_firstCateg;
				}
				//cookie  end
			}



			if (options.sticky) {
						audio8_html5_min.css({
							'background':options.playerBackgroundColor,
							'color': options.minButtonColor
						});
						audio8_html5_min.html(options.minimizeButtonText);
						if (options.minimizeButtonText=='') { //add arrows
								//audio8_html5_min.addClass('audio8_html5_arrow_down');
								audio8_html5_min.append( '<div class="audio8_html5_arrow_div audio8_html5_arrow_down"></div>' );
								jQuery('.audio8_html5_arrow_div').css({
									'border-bottom-color':options.minButtonColor,
									'border-top-color':options.minButtonColor
								});
								audio8_html5_min.width('auto');
						}

						audio8_html5_min.click(function() {
									//alert (options.startMinified+' -- '+current_obj.cookie_isMinified);
									var animation_duration=500;
									var aux_bottom=0;
									var aux_pointerEvents='auto';
									if (current_obj.isMinified) {
										aux_bottom=0;
										current_obj.isMinified=false;
									} else {
										aux_bottom=(-1)*(current_obj.newPlayerHeight+1);
										aux_pointerEvents='none';
										current_obj.isMinified=true;
									}
									setCookie(options,'cookie_isMinified', current_obj.isMinified);

									if (options.minimizeButtonText=='') { //we have arrows
											if (current_obj.isMinified) {
												$('.audio8_html5_arrow_div').removeClass('audio8_html5_arrow_down');
												$('.audio8_html5_arrow_div').addClass('audio8_html5_arrow_up');
											} else {
												$('.audio8_html5_arrow_div').removeClass('audio8_html5_arrow_up');
												$('.audio8_html5_arrow_div').addClass('audio8_html5_arrow_down');
											}

									}

									if (options.showBanner) {
											audio8_html5_container.css({
												'bottom': aux_bottom+'px',
												'left':'0px'
											});
									} else {
											audio8_html5_container.animate({
												'bottom': aux_bottom+'px'
											}, animation_duration, 'easeOutQuad', function() {
												// Animation complete.
												//alert ("complete");
												//alert (current_obj.isMinified);
												$('.audio8_html5_sticky').css({
													'pointer-events': aux_pointerEvents
												});
														audio8_html5_container.css({
															'left':'0px'
														});
											});
									}
						});

						audio8_html5_min.mouseover(function() {
									audio8_html5_min.css({
										'color': options.minButtonHoverColor
									});
									if (options.minimizeButtonText=='') { //I have arrows
											jQuery('.audio8_html5_arrow_div').css({
												'border-bottom-color':options.minButtonHoverColor,
												'border-top-color':options.minButtonHoverColor
											});
									}
						});
						audio8_html5_min.mouseout(function() {
							audio8_html5_min.css({
								'color': options.minButtonColor
							});
							if (options.minimizeButtonText=='') { //I have arrows
									jQuery('.audio8_html5_arrow_div').css({
										'border-bottom-color':options.minButtonColor,
										'border-top-color':options.minButtonColor
									});
							}
						});



			} else {
						audio8_html5_container.parent().removeClass('audio8_html5_sticky');
						audio8_html5_container.parent().addClass('the_wrapper');
			}


			// set player height
			/*****if (options.playerHeight<94) {
				options.playerHeight=94;
			}******/
			audio8_html5_container.height(current_obj.newPlayerHeight);




			//audio8_html5_border.width(options.playerWidth+10);
			/*if (options.sticky) {
				options.playerWidth=$(window).width();
			} else {
				options.playerWidth=audio8_html5_container.parent().width();
			}*/
			options.playerWidth=audio8_html5_container.parent().width();
			audio8_html5_container.width(options.playerWidth);
			options.origWidth=options.playerWidth;



			audio8_html5_frameBehindPlayerText.css({
				'top':0+'px',
				'left':0+'px',
				'height':current_obj.newPlayerHeight+'px'
			});






			//popup
			if (options.showPopupBut) {
				audio8_html5_popup_btn.click(function() {
					//alert (location.href);
					clearInterval(current_obj.timeupdateInterval);
					clearInterval(current_obj.radioReaderAjaxInterval);
					clearInterval(current_obj.bannersInterval);


					/*setCookie(options,'cookie_current_img_no', current_obj.current_img_no);
					setCookie(options,'cookie_origID', current_obj.origID);
					if (document.getElementById(current_obj.audioID).muted) {
						setCookie(options,'cookie_muteVolume', 1);
					} else {
						setCookie(options,'cookie_muteVolume', 0);
					}

					if (document.getElementById(current_obj.audioID).paused) {
						setCookie(options,'cookie_autoPlay', false);
					} else {
						setCookie(options,'cookie_autoPlay', true);
					}

					setCookie(options,'cookie_initialVolume', audio8_html5_volumeSlider.slider('value'));
					setCookie(options,'cookie_firstCateg', current_obj.selectedCateg);	*/

					//audio8_html5_container.parent()[0].innerHTML="";
					audio8_html5_container.parent().remove();

					current_obj.cookie_popupWin=window.open(location.href, 'audio8_PopupName', 'width='+options.popupWidth+', height='+options.popupHeight+', left=24, top=24, scrollbars=no, resizable');
					current_obj.cookie_popupWin.focus();
					setCookie(options,'cookie_popupWin', current_obj.cookie_popupWin,1201);
					/*return false;*/
					//audio8_html5_container.css({'display':'none'});

				});
			}


			//facebook
			if (options.showFacebookBut) {
					  window.fbAsyncInit = function() {
						FB.init({
						  appId:options.facebookAppID,
						  version:'v3.2',
						  status:true,
						  cookie:true,
						  xfbml:true
						});
					  };

					  (function(d, s, id){
						 var js, fjs = d.getElementsByTagName(s)[0];
						 if (d.getElementById(id)) {return;}
						 js = d.createElement(s); js.id = id;
						 js.src = "//connect.facebook.com/en_US/sdk.js";
						 fjs.parentNode.insertBefore(js, fjs);
					   }(document, 'script', 'facebook-jssdk'));

						audio8_html5_facebook_btn.click(function() {
							/*var imageLink=current_obj.playlist_arr[current_obj.origID]['image'];
							var pathArray = window.location.pathname.split( '/' );
							if (imageLink.indexOf('http://')!=-1 || imageLink.indexOf('https://')!=-1) {
								//imageLink=current_obj.playlist_arr[current_obj.origID]['image'];
							} else {
								if (pathArray[pathArray.length-1].indexOf('.')!=-1) {
									pathArray.pop();
								}
								imageLink=window.location.protocol+'//'+window.location.host+'/'+pathArray.join('/')+'/'+current_obj.playlist_arr[current_obj.origID]['image'];
							}*/
							//alert (imageLink);
							/*FB.ui(
							  {
							   method: 'feed',
							   name: options.facebookShareTitle,
							   caption: current_obj.playlist_arr[current_obj.origID]['station'],
							   description: options.facebookShareDescription,
							   link: document.URL
							   //picture: imageLink
							  },
							  function(response) {
								//if (response && response.post_id) {
								  //alert('Post was published.');
								//} else {
								  //alert('Post was not published.');
								//}
							}
							);*/

							FB.ui({
								method: 'share_open_graph',
								//method: 'share',
								action_type: 'og.likes',
								//action_type: 'og.shares',
								action_properties: JSON.stringify({
									object: {
										'og:url': document.URL,
										'og:title': options.facebookShareTitle,
										'og:description': options.facebookShareDescription/*,
										'og:image': imageLink*/
									}
								})
							},
							function (response) {
								// Action after response
							});
						});
			}


			//twitter
			if (options.showTwitterBut) {
					audio8_html5_twitter_btn.click(function() {
						var myURL = "http://www.google.com";
						var my_text=current_obj.playlist_arr[current_obj.origID]['station'].replace("%", "percent");
						my_text=my_text.replace("&", " and ");
						window.open("https://twitter.com/intent/tweet?url=" + document.URL+ "&text="+my_text,"Twitter","status = 1, left = 430, top = 270, height = 550, width = 420, resizable = 0");
					});
			}












			/*audio8_html5_frameBehindPlayerText.css({
				'top':0+'px',
				'left':0+'px',
				'height':parseInt(audio8_html5_container.height()/2,10)+'px'
			});			*/



			arrangePlayerElements(options,current_obj,audio8_html5_play_btn,audio8_html5_next_btn,audio8_html5_prev_btn,audio8_html5_radioStation,audio8_html5_artistName,audio8_html5_Title,audio8_html5_volumeMute_btn,audio8_html5_volumeSlider,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient,audio8_html5_the_bars,audio8_html5_showHidePlaylist_btn,audio8_html5_popup_btn,audio8_html5_facebook_btn,audio8_html5_twitter_btn,audio8_html5_container,audio8_html5_frameBehindPlayerText);


			//generate playlist
			var currentCarouselTop=0;
			var audio8_html5_thumbsHolderWrapper = $('.thumbsHolderWrapper', audio8_html5_container);
			var audio8_html5_playlistPadding = $('.playlistPadding', audio8_html5_container);
			var audio8_html5_thumbsHolderVisibleWrapper = $('.thumbsHolderVisibleWrapper', audio8_html5_container);
			audio8_html5_thumbsHolder = $('.thumbsHolder', audio8_html5_container);
			current_obj.audio8_html5_sliderVertical = $('.slider-vertical', audio8_html5_container);
			var audio8_html5_selectedCategDiv = $('.selectedCategDiv', audio8_html5_container);
			var audio8_html5_innerSelectedCategDiv = $('.innerSelectedCategDiv', audio8_html5_container);
			var audio8_html5_searchDiv = $('.searchDiv', audio8_html5_container);
			var audio8_html5_search_term = $('.search_term', audio8_html5_container);

			audio8_html5_playlistPadding.css({'padding':options.playlistPadding+'px'});
			audio8_html5_thumbsHolderVisibleWrapper.append('<div class="readingData">'+options.translateReadingData+'</div>');

			if (!options.showPlaylist) {
				//audio8_html5_thumbsHolderWrapper.css({'display':'none'});
				audio8_html5_thumbsHolderWrapper.css({'opacity':0});
			}

			if (!options.showPlaylistOnInit) {
				audio8_html5_thumbsHolderWrapper.css({
					    'opacity': 0,
						'visibility':'hidden',
						'margin-top':'-20px'/*,
						'display':'none'*/
				});

				audio8_html5_frameBehindPlayerText.css({
					'background':options.playerBackgroundColor,
					'opacity':options.playerBackgroundOpacity/100,
					'border-bottom':options.beneathTitleBackgroundBorderWidth+'px solid '+options.beneathTitleBackgroundBorderColor
				});
			}

			audio8_html5_selectedCategDiv.css({
				'background-color':options.selectedCategBg,
				'background-position':'10px 50%',
				'margin-bottom':options.selectedCategMarginBottom+'px'
			});
			audio8_html5_innerSelectedCategDiv.css({
				'color':options.selectedCategOffColor,
				'background-position':(options.playerWidth-2*options.playlistPadding-20)+'px 50%'
			});


			if (!options.showCategories) {
				audio8_html5_selectedCategDiv.css({
					'display':'none',
					'width':0,
					'height':0,
					'padding':0,
					'margin':0
				});
				//options.selectedCategMarginBottom=0;
			}



			audio8_html5_searchDiv.css({
				'background-color':options.searchAreaBg,
				'margin-top':options.selectedCategMarginBottom+'px'
			});

			audio8_html5_search_term.val(options.searchInputText);
			audio8_html5_search_term.css({
				'width':parseInt((options.playerWidth-2*options.playlistPadding)-37,10)+'px',
				'background-color':options.searchInputBg,
				'border-color':options.searchInputBorderColor,
				'color':options.searchInputTextColor
			});


			if (!options.showSearchArea) {
				audio8_html5_searchDiv.css({
					'display':'none',
					'width':0,
					'height':0,
					'padding':0,
					'margin':0
				});
			}

			audio8_html5_thumbsHolderWrapper.css({
				'width':audio8_html5_container.width()+2*options.playerPadding+'px',
				/*'top':current_obj.newPlayerHeight+options.playlistTopPos+'px',*/
				'bottom':((-1)*current_obj.newPlayerHeight)+'px',
				'left':'0px',
				'background':options.playlistBgColor

			});

			audio8_html5_thumbsHolderVisibleWrapper.width(audio8_html5_container.width());

			/*$.get( options.pathToAjaxFiles+"streamtitle.php", {the_stream:'http://209.236.126.18:8002/;','_': $.now()}, function( data ) {
 				 alert( "Data Loaded: " + data );
			});*/

			//audio8_html5_thumbsHolder.append("<p>reading data...</p>");
			current_obj.playlist_arr=new Array();
			current_obj.category_arr=new Array();
			var resultsSplit_arr=new Array();

			var playlistElements = $('.xaudioplaylist', audio8_html5_container).children();
			playlistElements.each(function() { // ul-s
	            currentElement = $(this);
	            current_obj.total_images++;
	            current_obj.playlist_arr[current_obj.total_images-1]=new Array();
	            current_obj.playlist_arr[current_obj.total_images-1]['title']='';
	            current_obj.playlist_arr[current_obj.total_images-1]['station']='';
	            current_obj.playlist_arr[current_obj.total_images-1]['image']='';
				current_obj.playlist_arr[current_obj.total_images-1]['category']='';
				current_obj.playlist_arr[current_obj.total_images-1]['radiostream']='';
				current_obj.playlist_arr[current_obj.total_images-1]['associatedpageurl']='';
				current_obj.playlist_arr[current_obj.total_images-1]['banners']='';
				current_obj.playlist_arr[current_obj.total_images-1]['bannerlinks']='';
	           /* current_obj.playlist_arr[current_obj.total_images-1]['sources_mp3']='';
	            current_obj.playlist_arr[current_obj.total_images-1]['sources_ogg']='';*/

	            //alert (currentElement.find('.xtitle').html())
	            if (currentElement.find('.xtitle').html()!=null) {
	            	current_obj.playlist_arr[current_obj.total_images-1]['title']=currentElement.find('.xtitle').html();
	            }



	            if (currentElement.find('.xstation').html()!=null) {
	            	current_obj.playlist_arr[current_obj.total_images-1]['station']=currentElement.find('.xstation').html();
	            }

	            if (currentElement.find('.ximage').html()!=null) {
	            	current_obj.playlist_arr[current_obj.total_images-1]['image']=currentElement.find('.ximage').html();
	            }
				if (currentElement.find('.xcategory').html()!=null) {
	            	current_obj.playlist_arr[current_obj.total_images-1]['category']=options.translateAllRadioStations+';'+currentElement.find('.xcategory').html()+';';
					if (!options.grabStreamnameAndGenre) {
							 var my_resultsSplit_arr=new Array();
							 my_resultsSplit_arr = current_obj.playlist_arr[current_obj.total_images-1]['category'].split(';');
							 for (var j=0;j<my_resultsSplit_arr.length;j++) {
								my_resultsSplit_arr[j]=my_resultsSplit_arr[j].trim();
								if (current_obj.category_arr.indexOf(my_resultsSplit_arr[j])===-1 && my_resultsSplit_arr[j]!='') {
									current_obj.category_arr.push(my_resultsSplit_arr[j]);
								}
							 }
					}
				}

				if (currentElement.find('.xassociatedpageurl').html()!=null) {
	            	current_obj.playlist_arr[current_obj.total_images-1]['associatedpageurl']=currentElement.find('.xassociatedpageurl').html();
	            }

				if (currentElement.find('.xbanners').html()!=null) {
	            	//current_obj.playlist_arr[current_obj.total_images-1]['banners']=currentElement.find('.xbanners').html();
					current_obj.playlist_arr[current_obj.total_images-1]['banners']=Array();
					current_obj.playlist_arr[current_obj.total_images-1]['bannerlinks']=Array();
					var z=currentElement.find('.xbanners');
					z.children("div").each(function(){
						current_obj.playlist_arr[current_obj.total_images-1]['banners'].push( $(this).attr('data-banner') );
						current_obj.playlist_arr[current_obj.total_images-1]['bannerlinks'].push( $(this).attr('data-link') );
						//alert ( $(this).attr('data-banner'))
						 //do something
					});


	            }

				/*if (currentElement.find('.xcategory').html()!=null) {
	            	current_obj.playlist_arr[current_obj.total_images-1]['category']=currentElement.find('.xcategory').html();

				   resultsSplit_arr = current_obj.playlist_arr[current_obj.total_images-1]['category'].split(';');
				   for (var j=0;j<resultsSplit_arr.length;j++) {
					  if (current_obj.category_arr.indexOf(resultsSplit_arr[j])===-1) {
						  current_obj.category_arr.push(resultsSplit_arr[j]);
					  }
				   }
	            }*/

				if (currentElement.find('.xradiostream').html()!=null) {
	            	current_obj.playlist_arr[current_obj.total_images-1]['radiostream']=currentElement.find('.xradiostream').html();

					//start to add '/;' or ';' if is missing start
					// if (current_obj.playlist_arr[current_obj.total_images-1]['radiostream'].indexOf("/",9)==-1) {
					// 	current_obj.playlist_arr[current_obj.total_images-1]['radiostream']=current_obj.playlist_arr[current_obj.total_images-1]['radiostream']+'/;';
					// }
					// if (current_obj.playlist_arr[current_obj.total_images-1]['radiostream'].charAt(current_obj.playlist_arr[current_obj.total_images-1]['radiostream'].length - 1)=='/') {
					// 	current_obj.playlist_arr[current_obj.total_images-1]['radiostream']=current_obj.playlist_arr[current_obj.total_images-1]['radiostream']+';';
					// }
					//start to add '/;' or ';' if is missing end

					current_obj.totalRadioStationsNo++;
					if (options.grabStreamnameAndGenre) {
							$.get( options.pathToAjaxFiles+"radiowanjy/main/streamandgenre.php", {the_stream:current_obj.playlist_arr[current_obj.total_images-1]['radiostream'], cur_i:(current_obj.total_images-1), translateAllRadioStations:options.translateAllRadioStations,'_': $.now()}, function( data ) {
									 current_obj.ajaxReturnedRadioStationsNo++;
									 var data_arr=data.split("#----#");
									 /*if (data_arr.length>=1) {
										  current_obj.playlist_arr[data_arr[0]]['station']='';
									 }*/
									 if (data_arr.length>=2) {
										  if (current_obj.playlist_arr[data_arr[0]]['station']=='') {
											 current_obj.playlist_arr[data_arr[0]]['station']=data_arr[1];
										  }
									 }
									 if (data_arr.length>=3) {
										  if (current_obj.playlist_arr[data_arr[0]]['category']=='') {
											 current_obj.playlist_arr[data_arr[0]]['category']=data_arr[2]+';';
										  }
									 }

									 if (current_obj.playlist_arr[data_arr[0]]['category']=='') {
											 current_obj.playlist_arr[data_arr[0]]['category']=options.translateAllRadioStations;
									 }

									 //categs start
									 var resultsSplit_arr=new Array();
									 resultsSplit_arr = current_obj.playlist_arr[data_arr[0]]['category'].split(';');
									 for (var j=0;j<resultsSplit_arr.length;j++) {
										resultsSplit_arr[j]=resultsSplit_arr[j].trim();
										if (current_obj.category_arr.indexOf(resultsSplit_arr[j])===-1 && resultsSplit_arr[j]!='') {
											current_obj.category_arr.push(resultsSplit_arr[j]);
										}
									 }
									  //categs end
									 //alert (current_obj.ajaxReturnedRadioStationsNo+ '  --  '+current_obj.totalRadioStationsNo);
									 //first initialization
									 if (current_obj.ajaxReturnedRadioStationsNo==current_obj.totalRadioStationsNo) {
											current_obj.numberOfCategories=current_obj.category_arr.length;
											current_obj.selectedCateg=options.firstCateg;
											current_obj.category_arr.sort();
											if (options.firstCateg=='' && current_obj.category_arr.indexOf(options.firstCateg)===-1) {
												current_obj.selectedCateg=current_obj.category_arr[0];
											}
											audio8_html5_innerSelectedCategDiv.html(current_obj.selectedCateg);

											$( ".readingData" ).remove();

											generatePlaylistByCateg(current_obj,options,audio8_html5_container,audio8_html5_thumbsHolder,audio8_html5_thumbsHolderWrapper,audio8_html5_thumbsHolderVisibleWrapper,audio8_html5_selectedCategDiv,audio8_html5_searchDiv,audio8_html5_playlistPadding,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
											if (options.showPlaylistOnLoad) {
												setTimeout(function(){
														audio8_html5_showHidePlaylist_btn.click();
												}, 1000);
											}
									}
							});
					}  //if (options.grabStreamnameAndGenre) {
	            }

				/*if (currentElement.find('.xsources_mp3').html()!=null) {
	            	current_obj.playlist_arr[current_obj.total_images-1]['sources_mp3']=currentElement.find('.xsources_mp3').html();
	            }

	            if (currentElement.find('.xsources_ogg').html()!=null) {
	            	current_obj.playlist_arr[current_obj.total_images-1]['sources_ogg']=currentElement.find('.xsources_ogg').html();
	            }*/

			});


			if (!options.grabStreamnameAndGenre) {
									current_obj.numberOfCategories=current_obj.category_arr.length;
									current_obj.selectedCateg=options.firstCateg;
									current_obj.category_arr.sort();
									if (options.firstCateg=='' && current_obj.category_arr.indexOf(options.firstCateg)===-1) {
										current_obj.selectedCateg=current_obj.category_arr[0];
									}
									audio8_html5_innerSelectedCategDiv.html(current_obj.selectedCateg);

									$( ".readingData" ).remove();

									generatePlaylistByCateg(current_obj,options,audio8_html5_container,audio8_html5_thumbsHolder,audio8_html5_thumbsHolderWrapper,audio8_html5_thumbsHolderVisibleWrapper,audio8_html5_selectedCategDiv,audio8_html5_searchDiv,audio8_html5_playlistPadding,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
									if (options.showPlaylistOnLoad) {
										setTimeout(function(){
												audio8_html5_showHidePlaylist_btn.click();
										}, 1000);
									}

			}



			/*current_obj.numberOfCategories=current_obj.category_arr.length;
			current_obj.category_arr.sort();
			current_obj.selectedCateg=options.firstCateg;
			if (options.firstCateg=='' && current_obj.category_arr.indexOf(options.firstCateg)===-1) {
				current_obj.selectedCateg=current_obj.category_arr[0];
			}
			audio8_html5_innerSelectedCategDiv.html(current_obj.selectedCateg);
            //generate playlist for the first time
			if (current_obj.totalRadioStationsNo<=0) {
	//generatePlaylistByCateg(current_obj,options,audio8_html5_container,audio8_html5_thumbsHolder,audio8_html5_thumbsHolderWrapper,audio8_html5_thumbsHolderVisibleWrapper,audio8_html5_selectedCategDiv,audio8_html5_searchDiv,audio8_html5_playlistPadding,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
			}*/


//alert (audio8_html5_container.css("top"));



			/*// create a Cache object
			if (options.grabLastFmPhoto) {
				var cache = new LastFMCache();
				current_obj.lastfm = new LastFM({
					apiKey    : options.lastFMApiKey,
					apiSecret : options.lastFMSecret,
					cache     : cache
				});
			}*/





			//selectedCategDiv
			audio8_html5_selectedCategDiv.click(function() {
				current_obj.search_val='';
			    audio8_html5_search_term.val(options.searchInputText);

				generateCategories(current_obj,options,audio8_html5_container,audio8_html5_thumbsHolder,audio8_html5_thumbsHolderWrapper,audio8_html5_thumbsHolderVisibleWrapper,audio8_html5_selectedCategDiv,audio8_html5_innerSelectedCategDiv,audio8_html5_searchDiv,audio8_html5_playlistPadding,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
			});



			audio8_html5_selectedCategDiv.mouseover(function() {
				audio8_html5_innerSelectedCategDiv.css({
					'color':options.selectedCategOnColor
				});
			});


			audio8_html5_selectedCategDiv.mouseout(function() {
				audio8_html5_innerSelectedCategDiv.css({
					'color':options.selectedCategOffColor
				});
			});






			//start initialize volume slider
			audio8_html5_volumeSlider.slider({
				value: options.initialVolume,
				step: 0.05,
				orientation: "horizontal",
				range: "min",
				max: 1,
				animate: true,
				slide:function(e,ui){
						//document.getElementById(current_obj.audioID).muted=false;
						options.initialVolume=ui.value;
						if (!current_obj.isFlashNeeded) {
							document.getElementById(current_obj.audioID).volume=ui.value;
							setCookie(options,'cookie_initialVolume', ui.value);
						} else {
							current_obj.myFlashObject.myAS3function(detectBrowserAndAudio(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container),options.initialVolume);
						}
				},
				stop:function(e,ui){

				}
			});
			document.getElementById(current_obj.audioID).volume=options.initialVolume;
			audio8_html5_volumeSlider.css({'background':options.volumeOffColor});
			$(".ui-slider-range",audio8_html5_volumeSlider).css({'background':options.volumeOnColor});
			//end initialize volume slider

// var play_btns = document.getElementsByClassName("play-btn");
// for(var i=0;i<play_btns.length;i++){
// 	play_btns[i].addEventListener("click", function(){
// 		document.getElementById("lbg_audio8_html5_shoutcast_2").removeAttribute("src");
// 		document.getElementById("lbg_audio8_html5_shoutcast_2").setAttribute("src", this.getAttribute("srcc"));
// 		if(this.classList.contains("playing")){
// 			if(document.getElementsByClassName("playing")[0]!=undefined){
// 				document.getElementsByClassName("playing")[0].classList.remove("fa-pause-circle");
// 				document.getElementsByClassName("playing")[0].classList.add("fa-play-circle");
// 				document.getElementsByClassName("playing")[0].classList.remove("playing");
// 			}
// 			this.classList.remove("fa-pause-circle");
// 			this.classList.add("fa-play-circle");
// 			cancelAll();
// 			if (!current_obj.isFlashNeeded) {
// 							document.getElementById(current_obj.audioID).pause();
// 						} else {
// 							current_obj.myFlashObject.myAS3function("_pause_radio_stream_",options.initialVolume);
// 						}
// 						if (!options.showBanner) {
// 							$('.sound', audio8_html5_container).css({
// 								'-webkit-animation-play-state':'paused',
// 								'-moz-animation-play-state':'paused',
// 								'-ms-animation-play-state':'paused',
// 								'-o-animation-play-state':'paused',
// 								'animation-play-state':'paused'
// 							});
// 							$('.sound2', audio8_html5_container).css({
// 								'-webkit-animation-play-state':'paused',
// 								'-moz-animation-play-state':'paused',
// 								'-ms-animation-play-state':'paused',
// 								'-o-animation-play-state':'paused',
// 								'animation-play-state':'paused'
// 							});
// 						}

// 						audio8_html5_play_btn.removeClass('AudioPause');
// 						setCookie(options,'cookie_autoPlay', false);
// 						current_obj.cookie_autoPlay=getCookie(options,'cookie_autoPlay');
// 		}else{
// 			if(document.getElementsByClassName("playing")[0]!=undefined){
// 				document.getElementsByClassName("playing")[0].classList.remove("fa-pause-circle");
// 				document.getElementsByClassName("playing")[0].classList.add("fa-play-circle");
// 				document.getElementsByClassName("playing")[0].classList.remove("playing");
// 			}
// 			this.classList.add("playing");
// 			this.classList.add("fa-pause-circle");
// 			this.classList.remove("fa-play-circle");
// 			cancelAll();
// 			if (!current_obj.isFlashNeeded) {
// 							//v 1.5.0
// 							document.getElementById(current_obj.audioID).src=this.getAttribute("srcc");
// 							//v 1.5.0
// 							document.getElementById(current_obj.audioID).play();
// 						} else {
// 							current_obj.myFlashObject.myAS3function("_play_radio_stream_",options.initialVolume);
// 						}

// 						if (!options.showBanner) {
// 							$('.sound', audio8_html5_container).css({
// 								'-webkit-animation-play-state':'running',
// 								'-moz-animation-play-state':'running',
// 								'-ms-animation-play-state':'running',
// 								'-o-animation-play-state':'running',
// 								'animation-play-state':'running'
// 							});
// 							$('.sound2', audio8_html5_container).css({
// 								'-webkit-animation-play-state':'running',
// 								'-moz-animation-play-state':'running',
// 								'-ms-animation-play-state':'running',
// 								'-o-animation-play-state':'running',
// 								'animation-play-state':'running'
// 							});
// 						}

// 						audio8_html5_play_btn.addClass('AudioPause');
// 						setCookie(options,'cookie_autoPlay', true);
// 						current_obj.cookie_autoPlay=getCookie(options,'cookie_autoPlay');
// 		}
		// var is_paused;
		// 			if (current_obj.isFlashNeeded) {
		// 				is_paused=!audio8_html5_play_btn.hasClass('AudioPause');
		// 			} else {
		// 				is_paused=document.getElementById(current_obj.audioID).paused;
		// 			}
		// 			cancelAll();
		// 			if (is_paused == false) {
		// 				if (!current_obj.isFlashNeeded) {
		// 					document.getElementById(current_obj.audioID).pause();
		// 				} else {
		// 					current_obj.myFlashObject.myAS3function("_pause_radio_stream_",options.initialVolume);
		// 				}
		// 				if (!options.showBanner) {
		// 					$('.sound', audio8_html5_container).css({
		// 						'-webkit-animation-play-state':'paused',
		// 						'-moz-animation-play-state':'paused',
		// 						'-ms-animation-play-state':'paused',
		// 						'-o-animation-play-state':'paused',
		// 						'animation-play-state':'paused'
		// 					});
		// 					$('.sound2', audio8_html5_container).css({
		// 						'-webkit-animation-play-state':'paused',
		// 						'-moz-animation-play-state':'paused',
		// 						'-ms-animation-play-state':'paused',
		// 						'-o-animation-play-state':'paused',
		// 						'animation-play-state':'paused'
		// 					});
		// 				}

		// 				audio8_html5_play_btn.removeClass('AudioPause');
		// 				setCookie(options,'cookie_autoPlay', false);
		// 				current_obj.cookie_autoPlay=getCookie(options,'cookie_autoPlay');
		// 				//console.log("E current_obj.cookie_autoPlay: "+current_obj.cookie_autoPlay+" -  options.autoPlay: "+options.autoPlay);
		// 			} else {
		// 				if (!current_obj.isFlashNeeded) {
		// 					//v 1.5.0
		// 					document.getElementById(current_obj.audioID).src=detectBrowserAndAudio(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container);
		// 					document.getElementById(current_obj.audioID).load();
		// 					//v 1.5.0
		// 					document.getElementById(current_obj.audioID).play();
		// 				} else {
		// 					current_obj.myFlashObject.myAS3function("_play_radio_stream_",options.initialVolume);
		// 				}

		// 				if (!options.showBanner) {
		// 					$('.sound', audio8_html5_container).css({
		// 						'-webkit-animation-play-state':'running',
		// 						'-moz-animation-play-state':'running',
		// 						'-ms-animation-play-state':'running',
		// 						'-o-animation-play-state':'running',
		// 						'animation-play-state':'running'
		// 					});
		// 					$('.sound2', audio8_html5_container).css({
		// 						'-webkit-animation-play-state':'running',
		// 						'-moz-animation-play-state':'running',
		// 						'-ms-animation-play-state':'running',
		// 						'-o-animation-play-state':'running',
		// 						'animation-play-state':'running'
		// 					});
		// 				}

		// 				audio8_html5_play_btn.addClass('AudioPause');
		// 				setCookie(options,'cookie_autoPlay', true);
		// 				current_obj.cookie_autoPlay=getCookie(options,'cookie_autoPlay');
		// 				//console.log("F current_obj.cookie_autoPlay: "+current_obj.cookie_autoPlay+" -  options.autoPlay: "+options.autoPlay);
		// 			}
// 	})
// }

			//buttons start
			audio8_html5_play_btn.click(function() {
					var is_paused;
					if (current_obj.isFlashNeeded) {
						is_paused=!audio8_html5_play_btn.hasClass('AudioPause');
					} else {
						is_paused=document.getElementById(current_obj.audioID).paused;
					}
					cancelAll();
					if (is_paused == false) {
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
						$(".play-btn").removeClass("playing");
						$(".play-btn").removeClass("fa-pause-circle");
						$(".play-btn").addClass("fa-play-circle");
						// var src = document.getElementById("lbg_audio8_html5_shoutcast_2").getAttribute("src");
						// $(".play-btn[srcc='"+src+"']")
						// $(".play-btn[srcc='"+src+"']").addClass("fa-pause-circle");
						// $(".play-btn[srcc='"+src+"']").removeClass("fa-play-circle");
						audio8_html5_play_btn.removeClass('AudioPause');
						setCookie(options,'cookie_autoPlay', false);
						current_obj.cookie_autoPlay=getCookie(options,'cookie_autoPlay');
						//console.log("E current_obj.cookie_autoPlay: "+current_obj.cookie_autoPlay+" -  options.autoPlay: "+options.autoPlay);
					} else {
						if (!current_obj.isFlashNeeded) {
							//v 1.5.0
							document.getElementById(current_obj.audioID).src=detectBrowserAndAudio(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container);
							document.getElementById(current_obj.audioID).load();
							//v 1.5.0
							document.getElementById(current_obj.audioID).play();
						} else {
							current_obj.myFlashObject.myAS3function("_play_radio_stream_",options.initialVolume);
						}

						if (!options.showBanner) {
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
						}
						var src = document.getElementById("lbg_audio8_html5_shoutcast_2").getAttribute("src");
						// $(".play-btn[srcc='"+src+"']")
						$(".play-btn[srcc='"+src+"']").addClass("fa-pause-circle");
						$(".play-btn[srcc='"+src+"']").removeClass("fa-play-circle");
						// console.log(src);
						audio8_html5_play_btn.addClass('AudioPause');
						setCookie(options,'cookie_autoPlay', true);
						current_obj.cookie_autoPlay=getCookie(options,'cookie_autoPlay');
						//console.log("F current_obj.cookie_autoPlay: "+current_obj.cookie_autoPlay+" -  options.autoPlay: "+options.autoPlay);
					}
			});



			document.getElementById(current_obj.audioID).oncanplay = function() {
				//alert("Can start playing video");
			};
			document.getElementById(current_obj.audioID).onerror = function(e) {
					//console.log ("Error " + document.getElementById(current_obj.audioID).error.code + "; details: " + document.getElementById(current_obj.audioID).error.message);
				if (audio8_html5_play_btn.hasClass('AudioPause') && document.getElementById(current_obj.audioID).error.code>1) {
						//console.log("G current_obj.cookie_autoPlay: "+current_obj.cookie_autoPlay+" -  options.autoPlay: "+options.autoPlay);
						audio8_html5_play_btn.click();
				}
			};

			/*audio8_html5_next_btn.click(function() {
				if (!current_obj.categsAreListed) {
					if (current_obj.is_very_first) {
						audio8_html5_play_btn.addClass('AudioPause');
						options.autoPlay=true;
						//$(current_obj.thumbsHolder_Thumbs[current_obj.current_img_no]).removeClass('thumbsHolder_ThumbON');
						current_obj.thumbsHolder_Thumbs.css({
							"background":options.playlistRecordBgOffColor,
							"border-bottom-color":options.playlistRecordBottomBorderOffColor,
							"color":options.playlistRecordTextOffColor
						});


						findNextVideoNumbers(current_obj,options,'next');


						changeSrc(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_radioStation,audio8_html5_artistName,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
						carouselScroll(-1,current_obj,options,audio8_html5_thumbsHolder);
					}
				}
			});

			audio8_html5_prev_btn.click(function() {
				if (!current_obj.categsAreListed) {
					if (current_obj.is_very_first) {
						audio8_html5_play_btn.addClass('AudioPause');
						options.autoPlay=true;
						//$(current_obj.thumbsHolder_Thumbs[current_obj.current_img_no]).removeClass('thumbsHolder_ThumbON');
						current_obj.thumbsHolder_Thumbs.css({
							"background":options.playlistRecordBgOffColor,
							"border-bottom-color":options.playlistRecordBottomBorderOffColor,
							"color":options.playlistRecordTextOffColor
						});


						findNextVideoNumbers(current_obj,options,'previous');

						changeSrc(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_radioStation,audio8_html5_artistName,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
						carouselScroll(-1,current_obj,options,audio8_html5_thumbsHolder);
					}
				}
			});	*/


			audio8_html5_showHidePlaylist_btn.click(function() {
				var aux_bottom;
				audio8_html5_thumbsHolderWrapper.css({
						'visibility':'visible'
				});
				//alert (audio8_html5_thumbsHolderWrapper.css('margin-top').substring(0, audio8_html5_thumbsHolderWrapper.css('margin-top').length-2));
				//alert (audio8_html5_thumbsHolderWrapper.css('bottom').substring(0, audio8_html5_thumbsHolderWrapper.css('bottom').length-2));
				if (audio8_html5_thumbsHolderWrapper.css('bottom').substring(0, audio8_html5_thumbsHolderWrapper.css('bottom').length-2) < 0) {
					var aux_opacity=1;
					var aux_display='block';
					//aux_margin_top="0px";
					//the playlist height can't be determine until is generated (it connects to all the servers to grab the info)
					var aux_thumbsHolderWrapper_height=2*options.playlistPadding+(30+1)*options.numberOfThumbsPerScreen+audio8_html5_selectedCategDiv.height()+audio8_html5_searchDiv.height();
					//var aux_margin_top=(-1)*(Math.max(audio8_html5_thumbsHolderWrapper.height(),aux_thumbsHolderWrapper_height)+125)+'px';
					aux_bottom=current_obj.newPlayerHeight+options.playlistTopPos;
					audio8_html5_thumbsHolderWrapper.css({
						'display':aux_display
					});


					audio8_html5_frameBehindPlayerText.css({
						'background':options.playerBackgroundColor,
						'opacity':options.playerBackgroundOpacity/100,
						'border-bottom':options.beneathTitleBackgroundBorderWidth+'px solid '+options.beneathTitleBackgroundBorderColor
					});
					if (options.sticky) {
						audio8_html5_min.css({
							'display':'none'
						});
					} else {
						audio8_html5_container.animate({
							   'top':audio8_html5_thumbsHolderWrapper.height()+options.playlistTopPos+'px'
							  }, 500, 'swing', function() {
								// Animation complete.
						});
						audio8_html5_container.parent().animate({
							   'height':audio8_html5_container.height()+audio8_html5_thumbsHolderWrapper.height()+options.playlistTopPos+'px'
							  }, 500, 'swing', function() {
								// Animation complete.
						});
					}
				} else {
					aux_opacity=0;
					aux_display='none';
					aux_bottom=((-1)*current_obj.newPlayerHeight);

					if (current_obj.selectedCateg_total_images>options.numberOfThumbsPerScreen)
						current_obj.audio8_html5_sliderVertical.css({
							'opacity': 0,
							'display':'none'
						});
					audio8_html5_frameBehindPlayerText.css({
						'background':options.playerBackgroundColor,
						'opacity':options.playerBackgroundOpacity/100,
						'border-bottom':options.beneathTitleBackgroundBorderWidth+'px solid '+options.beneathTitleBackgroundBorderColor
					});
					if (options.sticky) {
						audio8_html5_min.css({
							'display':'block'
						});
					} else {
						audio8_html5_container.animate({
							   'top':0+'px'
							  }, 500, 'swing', function() {
								// Animation complete.
						});
						audio8_html5_container.parent().animate({
							   'height':audio8_html5_container.height()+'px'
							  }, 500, 'swing', function() {
								// Animation complete.
						});
					}
				}
				audio8_html5_thumbsHolderWrapper.css({
						'opacity': 1,
						'display':'block'
				});
				audio8_html5_thumbsHolderWrapper.animate({
					   'opacity': aux_opacity,
						/*'margin-top':aux_margin_top*/
						'bottom':aux_bottom+'px'

					  }, 500, 'swing', function() {
					    // Animation complete.
						audio8_html5_thumbsHolderWrapper.css({
							'display':aux_display
						});

					if (current_obj.selectedCateg_total_images>options.numberOfThumbsPerScreen) {
						current_obj.audio8_html5_sliderVertical.css({
							'opacity': 1,
							'display':aux_display
						});
					}
				});

				//audio8_html5_frameBehindPlayerText.fadeToggle( "fast", function() {
					//complete
			    //});


			});

			audio8_html5_volumeMute_btn.click(function() {
				if (!document.getElementById(current_obj.audioID).muted) {
					document.getElementById(current_obj.audioID).muted=true;
					audio8_html5_volumeMute_btn.addClass('VolumeButtonMuted');
					setCookie(options,'cookie_muteVolume', 1);
					if (current_obj.isFlashNeeded) {
						current_obj.prevVolumeVal=options.initialVolume;
						options.initialVolume=0;
						current_obj.myFlashObject.myAS3function(detectBrowserAndAudio(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container),options.initialVolume);
					}
				} else {
					document.getElementById(current_obj.audioID).muted=false;
					audio8_html5_volumeMute_btn.removeClass('VolumeButtonMuted');
					setCookie(options,'cookie_muteVolume', 0);
					if (current_obj.isFlashNeeded) {
						options.initialVolume=current_obj.prevVolumeVal;
						current_obj.myFlashObject.myAS3function(detectBrowserAndAudio(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container),options.initialVolume);
					}
				}
			});



			//buttons end

				/*$.audio8_html5.goToStation = function(p) {
					//alert ("p: "+p);
					audio8_html5_next_btn.click();
				}	*/


			audio8_html5_thumbsHolder.swipe( {
				swipeStatus:function(event, phase, direction, distance, duration, fingerCount)
				{
					//$('#logulmeu').html("phase: "+phase+"<br>direction: "+direction+"<br>distance: "+distance);
					if (direction=='up' || direction=='down') {
						if (distance!=0) {
							  currentScrollVal=current_obj.audio8_html5_sliderVertical.slider( "value");
							  if (direction=="up") {
									currentScrollVal = currentScrollVal - 1.5;
							  } else {
									currentScrollVal = currentScrollVal + 1.5;
							  }
							  current_obj.audio8_html5_sliderVertical.slider( "value", currentScrollVal);
								$('html, body')
				            // Needed to remove previously bound handlers
				            .off('touchstart touchmove')
				            .on('touchstart touchmove', function (e) {
				                e.preventDefault();
				            });
							 carouselScroll(currentScrollVal,current_obj,options,audio8_html5_thumbsHolder)
						}
					}

				  //Here we can check the:
				  //phase : 'start', 'move', 'end', 'cancel'
				  //direction : 'left', 'right', 'up', 'down'
				  //distance : Distance finger is from initial touch point in px
				  //duration : Length of swipe in MS
				  //fingerCount : the number of fingers used
				  },

				  threshold:100,
				  maxTimeThreshold:500,
				  fingers:'all'
			});


			//search area functions
			audio8_html5_search_term.on('click', function() {
				$(this).val('');
			});
			audio8_html5_search_term.on('input', function() {
				//alert( $(this).val() );
				current_obj.search_val=audio8_html5_search_term.val().toLowerCase();
				generatePlaylistByCateg(current_obj,options,audio8_html5_container,audio8_html5_thumbsHolder,audio8_html5_thumbsHolderWrapper,audio8_html5_thumbsHolderVisibleWrapper,audio8_html5_selectedCategDiv,audio8_html5_searchDiv,audio8_html5_playlistPadding,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
			});






			//initialize first Audio
			if (options.sticky) {
				audio8_html5_container.css({
					'left':'-5000px'
				});
				current_obj.cookie_isMinified=getCookie(options,'cookie_isMinified');
				//alert (current_obj.cookie_isMinified);
				if (options.startMinified && current_obj.cookie_isMinified==undefined) {
					audio8_html5_min.click();
				}

				if (current_obj.cookie_isMinified!=undefined && current_obj.cookie_isMinified=='true' && !options.is_lbgSite) {
					//var autoMinimizePlayer=function () {
						audio8_html5_min.click();
						//alert ($('.audio8_html5_sticky').css('left'));
					///}
				} else {
						audio8_html5_container.css({
							'left':'0px'
						});
				}
			}

			if (current_obj.isFlashNeeded) {
					//flash fallback
					current_obj.rndNum=parseInt(Math.random() * (999999 - 1000) + 1000);
					audio8_html5_container.append("<div id='swfHolder"+current_obj.rndNum+"'></div>");
					var fn = function() {
						var att = { data:options.pathToAjaxFiles+"flash_player.swf", width:"0", height:"0" };
						var par = { flashvars:"streamUrl="+current_obj.playlist_arr[current_obj.origID]['radiostream']+"&autoPlay="+options.autoPlay+"&initialVolume="+options.initialVolume };
						var id = "swfHolder"+current_obj.rndNum;
						current_obj.myFlashObject = swfobject.createSWF(att, par, id);
						//alert (current_obj.rndNum+'  --  '+current_obj.myFlashObject);
					};
					swfobject.addDomLoadEvent(fn);
					//flash fallback
					if (options.autoPlay) {
							audio8_html5_play_btn.addClass('AudioPause');
					}
			}

			changeSrc(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_radioStation,audio8_html5_artistName,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
			if (val.indexOf("ipad") != -1 || val.indexOf("iphone") != -1 || val.indexOf("ipod") != -1 || val.indexOf("webos") != -1) {
					audio8_html5_play_btn.removeClass('AudioPause');
			}

			/*current_obj.radioReaderAjaxInterval=setInterval(function(){
					$.get( options.pathToAjaxFiles+"now_playing.php", {the_stream:current_obj.playlist_arr[current_obj.origID]['radiostream'],'_': $.now()}, function( data ) {
						current_obj.playlist_arr[current_obj.origID]['title']=data;
						changeCurrentSongTitle(current_obj,options,audio8_html5_thumbsHolder,audio8_html5_container,audio8_html5_play_btn,audio8_html5_Title,audio8_html5_TitleInside,audio8_html5_artistName,audio8_html5_radioStation,audio8_html5_Audio,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient);
					});
			},options.nowPlayingInterval*1000);	*/





			var doResize = function() {
				  current_obj.prevSongTitle="";
				  /*if (current_obj.origParentFloat=='') {
					  current_obj.origParentFloat=audio8_html5_container.parent().css('float');
					  current_obj.origParentPaddingTop=audio8_html5_container.parent().css('padding-top');
					  current_obj.origParentPaddingRight=audio8_html5_container.parent().css('padding-right');
					  current_obj.origParentPaddingBottom=audio8_html5_container.parent().css('padding-bottom');
					  current_obj.origParentPaddingLeft=audio8_html5_container.parent().css('padding-left');
				  }		*/

				  //alert (options.playerWidth+'  !=    '+options.origWidth +'   ||   '+options.playerWidth+'   >    '+$(window).width());

				 /* if (options.playerWidth!=options.origWidth) {
						  audio8_html5_container.parent().css({
							  'float':'none',
							  'padding-top':0,
							  'padding-right':0,
							  'padding-bottom':0,
							  'padding-left':0
						  });
				  } else {
					  audio8_html5_container.parent().css({
						  'float':current_obj.origParentFloat,
						  'padding-top':current_obj.origParentPaddingTop,
						  'padding-right':current_obj.origParentPaddingRight,
						  'padding-bottom':current_obj.origParentPaddingBottom,
						  'padding-left':current_obj.origParentPaddingLeft
					  });
				  }		*/
				/*audio8_html5_container.parent().css({
						  'float':'none'
					  });*/

				  var responsiveWidth=audio8_html5_container.parent().parent().width();
					if (options.sticky) {
					  responsiveWidth=$(window).width();
				  }
				  //var new_numberOfButtonsRightSide=current_obj.numberOfButtonsRightSide;

				  //var responsiveHeight=audio8_html5_container.parent().height();



				  /*if (options.responsiveRelativeToBrowser) {
					  responsiveWidth=$(window).width();
					  responsiveHeight=$(window).height();
				  }*/





					if (audio8_html5_container.width()!=responsiveWidth) {
						//alert (audio8_html5_container.width()+"!="+responsiveWidth);
						  /*if (options.origWidth>responsiveWidth) {
							  options.playerWidth=responsiveWidth;
						  } else {
							  options.playerWidth=options.origWidth;
						  }*/

						   options.playerWidth=responsiveWidth;
						  //alert (options.playerWidth);

 						  //alert(audio8_html5_container.width()+' -- '+responsiveWidth+' -- '+options.playerWidth);


						  if (audio8_html5_container.width()!=options.playerWidth) {
						  		  audio8_html5_container.width(options.playerWidth);


								  arrangePlayerElements(options,current_obj,audio8_html5_play_btn,audio8_html5_next_btn,audio8_html5_prev_btn,audio8_html5_radioStation,audio8_html5_artistName,audio8_html5_Title,audio8_html5_volumeMute_btn,audio8_html5_volumeSlider,audio8_html5_ximage,audio8_html5_xspeakers,audio8_html5_xgradient,audio8_html5_the_bars,audio8_html5_showHidePlaylist_btn,audio8_html5_popup_btn,audio8_html5_facebook_btn,audio8_html5_twitter_btn,audio8_html5_container,audio8_html5_frameBehindPlayerText);




								  audio8_html5_thumbsHolderWrapper.width(audio8_html5_container.width()+2*options.playerPadding);
								  audio8_html5_thumbsHolderVisibleWrapper.width(audio8_html5_container.width())
								  //audio8_html5_thumbsHolder.width(audio8_html5_container.width()+2*options.playerPadding);
								  //audio8_html5_playlistPadding.css({'padding':options.playlistPadding+'px'});

								  //current_obj.thumbsHolder_Thumbs.width(audio8_html5_container.width()-2*options.playlistPadding);


								  audio8_html5_selectedCategDiv.width(options.playerWidth-2*options.playlistPadding);
								  audio8_html5_innerSelectedCategDiv.css({
									  'background-position':(options.playerWidth-2*options.playlistPadding-20)+'px 50%'
								  });


								  //the playlist elements
								  if (current_obj.selectedCateg_total_images>options.numberOfThumbsPerScreen && options.showPlaylist) {
									  current_obj.audio8_html5_sliderVertical.css({
										  'left':audio8_html5_container.width()+2*options.playerPadding-current_obj.audio8_html5_sliderVertical.width()-options.playlistPadding+'px'						  							      });
									  $('.thumbsHolder_ThumbOFF', audio8_html5_container).css({
										  'width':audio8_html5_container.width()+2*options.playerPadding-current_obj.audio8_html5_sliderVertical.width()-2*options.playlistPadding-3+'px'
									  });
								  } else {
									  $('.thumbsHolder_ThumbOFF', audio8_html5_container).css({
										  'width':audio8_html5_container.width()+2*options.playerPadding-2*options.playlistPadding+'px'
									  });
								  }


								  audio8_html5_search_term.css({
									  'width':parseInt((options.playerWidth-2*options.playlistPadding)-50,10)+'px'
								  });
						  }

						  /*if (options.playerWidth<$(window).width()) {
							  audio8_html5_container.parent().css({
								  'float':current_obj.origParentFloat,
								  'padding-top':current_obj.origParentPaddingTop,
								  'padding-right':current_obj.origParentPaddingRight,
								  'padding-bottom':current_obj.origParentPaddingBottom,
								  'padding-left':current_obj.origParentPaddingLeft
							  });
						  }	*/


				  }


					/*if (options.playerWidth<445) {

					} else {


					}	*/
			};

			var TO = false;
			$(window).resize(function() {
				doResizeNow=true;

				if (ver_ie!=-1 && ver_ie==9 && current_obj.windowWidth==0)
					doResizeNow=false;


				if (current_obj.windowWidth==$(window).width()) {
					doResizeNow=false;
					if (options.windowCurOrientation!=window.orientation && navigator.userAgent.indexOf('Android') != -1) {
						options.windowCurOrientation=window.orientation;
						doResizeNow=true;
					}
				} else {
					/*if (current_obj.windowWidth===0 && (val.indexOf("ipad") != -1 || val.indexOf("iphone") != -1 || val.indexOf("ipod") != -1 || val.indexOf("webos") != -1))
						doResizeNow=false;*/
					current_obj.windowWidth=$(window).width();
				}

				if (options.responsive && doResizeNow) {
					 if(TO !== false)
						clearTimeout(TO);


					 TO = setTimeout(function(){ doResize() }, 300); //300 is time in miliseconds
				}
			});



			if (options.responsive) {
				doResize();
			}

			//setCookie(options,'cookie_popupWin', current_obj.cookie_popupWin,1);
			//current_obj.cookie_popupWin='';
			//alert (current_obj.cookie_popupWin);
			if (current_obj.cookie_popupWin && window.name!='audio8_PopupName') {
					audio8_html5_container.parent().remove();
			}
			$(window).on("beforeunload", function() {
				if (window.name=='audio8_PopupName') {
						setCookie(options,'cookie_popupWin', current_obj.cookie_popupWin,1); //clear the cookie
						current_obj.cookie_popupWin=null;
				}
			});
			/*win_obj.onclose = function () {
				document.cookie = "cookie_popupWin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				current_obj.cookie_popupWin=null;
        return confirm("Do you really want to close?");
			}*/


		});
	};


	//
	// plugin customization variables
	//
	$.fn.audio8_html5.defaults = {
		  playerWidth:5000,//removed
			playerHeight:94, //min height 94

			/*beneathTitleBackgroundColor_VisiblePlaylist:"#f5f5f5", //hidden
			beneathTitleBackgroundOpacity_VisiblePlaylist:100, //hidden
			beneathTitleBackgroundColor_HiddenPlaylist:"#f5f5f5", //hidden
			beneathTitleBackgroundOpacity_HiddenPlaylist:100, //hidden*/
			playerBackgroundColor:"#f5f5f5",
			playerBackgroundOpacity:100,

			beneathTitleBackgroundBorderColor:"#f5f5f5", //hidden
			beneathTitleBackgroundBorderWidth:0, //hidden

			titleWidth:200,
			skin: 'darkHover',
			initialVolume:0.5,
			autoPlay:true,
			loop:true,//removed
			playerPadding: 0, //removed
			playerBg: '#000000',//removed
			volumeOffColor: '#cccccc',
			volumeOnColor: '#9f9f9f',
			timerColor: '#ffffff',//removed
			songTitleColor: '#000000',
			radioStationColor: '#000000',

			frameBehindPlayerColor: '#000000', //removed

			imageBorderWidth:26, //removed
			imageBorderColor:'#f5f5f5',

			showFacebookBut:true,
			facebookAppID:'',
			facebookShareTitle:'SHOUT - HTML5 Radio Player With Ads - ShoutCast and IceCast Support',
			facebookShareDescription:'A top-notch responsive HTML5 Radio Player with ads support, compatible with all major browsers and mobile devices.',
			showVolume:true,
			showTwitterBut:true,
			showPopupBut:true,
			showRadioStation:true,
			showTitle:true,
			showPlaylistBut:true,
			showPlaylist:true, //removed
			showPlaylistOnInit:false, //removed
			showNextPrevBut:false, //removed
			showPlaylistOnLoad:false, //new

			showBanner:true,
			bannerWidth:728,
			bannerHeight:90,
			bannerIntervalSeconds:5,
			bannerLinkTarget:'_blank',

			sticky:true,
			minimizeButtonText:'open / close',
			is_lbgSite:false,

			nextPrevAdditionalPadding:-5, //removed




			translateRadioStation:"Radio Station: ",
			translateReadingData:"reading data...",
			translateAllRadioStations:"ALL RADIO STATIONS",

			playlistTopPos:5,
			playlistBgColor:'#f5f5f5',
			playlistRecordBgOffColor:'#ffffff',
			playlistRecordBgOnColor:'#d1d1d1',
			playlistRecordBottomBorderOffColor:'#bbbbbb',
			playlistRecordBottomBorderOnColor:'#bbbbbb',
			playlistRecordTextOffColor:'#777777',
			playlistRecordTextOnColor:'#000000',

			categoryRecordBgOffColor:'#222222',
			categoryRecordBgOnColor:'#333333',
			categoryRecordBottomBorderOffColor:'#2f2f2f',
			categoryRecordBottomBorderOnColor:'#2f2f2f',
			categoryRecordTextOffColor:'#777777',
			categoryRecordTextOnColor:'#00b4f9',

			numberOfThumbsPerScreen:7,
			playlistPadding:18,

			showCategories:true,
			firstCateg:'ALL RADIO STATIONS',
			selectedCategBg: '#555555',
			selectedCategOffColor: '#FFFFFF',
			selectedCategOnColor: '#00b4f9',
			selectedCategMarginBottom:12,

			showSearchArea:true,
			searchAreaBg: '#555555',
			searchInputText:' search...',
			searchInputBg:'#cccccc',
			searchInputBorderColor:'#333333',
			searchInputTextColor:'#333333',

			minButtonColor:'#333333',
			minButtonHoverColor:'#000000',
			startMinified:false,


			responsive:true,  //hidden
			showPlaylistNumber:true,

			popupWidth:1100,
			popupHeight:500,

			barsColor:'#000000',
			showGradientOverBars:true,

			nowPlayingInterval:30,
			grabLastFmPhoto:true,
			grabStreamnameAndGenre:true,

			pathToAjaxFiles:'',
			noImageAvailable:'noimageavailable.jpg',

			lastFMApiKey:'',
			lastFMSecret:'',



			origWidth:0,
			isSliderInitialized:false,
			isProgressInitialized:false,
			isPlaylistSliderInitialized:false

	};

})(jQuery);
