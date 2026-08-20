var USE_ICONS = true;

$(document).ready(function () {

	String.prototype.KWS = function () {
		return this.replace(/\s/g, '');
	};

	String.prototype.Flarify = function () {
		return "[" + this + "](#c-" + this.toLowerCase().KWS() + ")";
	};

	initialPPS = $(".pps").html();

	$('.drag-counter').data("drag-counter", 0);
	$('.team-combined-score input').data("kills", 0);
	$('.team-combined-score input').data("deaths", 0);
	$('.team-combined-score input').data("assists", 0);
	$('#series-result').data("blue-score", 0);
	$('#series-result').data("red-score", 0);

	/** clones the main done in html for Game 1 for games 2-5 **/
	for (i = 1; i <= 4; i++) {
		var mainClone = $("#panels > div:nth-child(2)").clone();
		$("#panels > div:nth-child(2)").after(mainClone);
	};

	/* load any saved inputs */
	// inputs with id
	$('#div-thread-info input').each(function (e) {
		var key = $(this).attr('id');
		var value = localStorage.getItem(key);
		if (value !== null) {
			$(this).val(value);
		}
	});

	$('#panels > div:nth-child(1) input').each(function (e) {
		var key = $(this).attr('class');
		var value = localStorage.getItem(key);
		if (value !== null) {
			$(this).val(value);
		}
	});
	
	$("#live-thread-checkbox").prop('checked', "true"==localStorage.getItem("live-thread-checkbox"));
	$("#advantage-checkbox").prop('checked', "true"==localStorage.getItem("advantage-checkbox"));
	$("#final-checkbox").prop('checked', "true"==localStorage.getItem("final-checkbox"));
	$("#epl-checkbox").prop('checked', "true"==localStorage.getItem("epl-checkbox"));
	$("#pmt-checkbox").prop('checked', "true"==localStorage.getItem("pmt-checkbox"));

	// inputs with class
	for (i = 1; i <= 6; i++) {
		$('#panels > div:nth-child(' + i + ') select').each(function (e) {
			var key = i + "_" + $(this).attr('class');
			var value = localStorage.getItem(key);
			if (value !== null && value !== '' && value !== 'null') {
				$(this).append('<option selected="selected" value="' + value + '">' + value + '</option>');
			}
		});
		$('#panels > div:nth-child(' + i + ') .team-pps:nth-child(1) .players').each(function (e) {
			$(this).sortable();
		});

		$('#panels > div:nth-child(' + i + ') .team-pps:nth-child(2) .players').each(function (e) {
			$(this).sortable();
		});

		$('#panels > div:nth-child(' + i + ') .drag-counter').each(function (e) {
			var key = i + "drag_counter";
			var val = localStorage.getItem(key);
			if (val !== null && val !== undefined && val !== '') {
				$(this).data('drag-counter', Number(val));
			}
		});	
		
		if (i > 1) {
			$("#panels > div:nth-child(" + i + ") #left-side-checkbox").prop('checked', "true"==localStorage.getItem(i + "left-side-checkbox"));
			$("#panels > div:nth-child(" + i + ") #simple-scores-checkbox").prop('checked', "true"==localStorage.getItem(i + "simple-scores-checkbox"));
			$("#panels > div:nth-child(" + i + ") #simple-stats-checkbox").prop('checked', "true"==localStorage.getItem(i + "simple-stats-checkbox"));
			

			$('#panels > .main:nth-child(' + i + ') input').each(function (e) {
				var key = i + "_" + $(this).attr('class');
				var value = localStorage.getItem(key);
				if (value !== null) {
					$(this).val(value);
					var myParent = $(this).parent();
					if (myParent.is('span') && $(this).attr('list') && $(this).attr('list') == 'championz') {
						myParent.removeClass().addClass("flair flair-" + $(this).val().toLowerCase().KWS());
					}
				}
			});
			
			$('#panels > .main:nth-child(' + i + ') textarea').each(function (e) {
				var key = i + "_" + $(this).attr('class');
				var value = localStorage.getItem(key);
				if (value !== null) {
					$(this).val(value);
				}
			});
		}
	}
	
	$('#panels > div:nth-child(7) input').each(function (e) {
		var key = $(this).attr('class');
		var value = localStorage.getItem(key);
		if (value !== null) {
			$(this).val(value);
		}
	});

	/** copy button */
	var clipboard = new Clipboard('button.btn');

	clipboard.on('success', function (e) {
		e.clearSelection();
		$("body").scrollTop(0);
	});

	clipboard.on('error', function (e) {
		alert("Error copying! Use control+c instead");
	});

	$(":input").inputmask();
	$(":input.game-time").inputmask({
		suffix: 'm'
	});
	$("#fade").removeClass('hidden');
	$("#loading-teams-popup").removeClass('hidden');

	var myEvent = window.attachEvent || window.addEventListener;
	var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compatable

	myEvent(chkevent, function (e) { // For >=IE7, Chrome, Firefox
		var someInput = '#create input[type=text]';
		$(someInput).each(function () {
			console.log($(this));
			if ($(this).val() != '') {
				var confirmationMessage = 'Warning: You will lose all inputs you did!'; // a space
				(e || window.event).returnValue = confirmationMessage;
				return confirmationMessage;
			}
		});
	});

	$(".picks input, .bans span > input").on('blur', function () {
		$(this).parent().removeClass().addClass("flair flair-" + $(this).val().toLowerCase().KWS());
	});

	$("#btn-reset").on('click', function () {	
		$('.game-infos select option').each(function () {
			if (!$(this).is('[disabled=disabled]') && !$(this).is('.game-map, .game-map > option') && !$(this).is('.game-infos-poll, .game-infos-poll > input')) {
				$(this).remove();
			}
		});

		$('.drag-counter').data("drag-counter", 0);
		$('#series-result').data("blue-score", 0);
		$('#series-result').data("red-score", 0);
		$('.bans span.flair').removeClass();

		// re set picks as sortable
		$(".players").sortable();

		// re-set the trigger to blur and add the span.
		$(".scores-adr input").inputmask();
		$(".scores-rating input").inputmask();
		
		var eName = $('#event-name').val();
		var eLink = $('#live-thread-link').val();
		var checked = $('#live-thread-checkbox').val();
		document.getElementById("create").reset();
		$('#event-name').val(eName);
		$('#live-thread-link').val(eLink);
		$('#live-thread-checkbox').val(checked);
		
	});
	
	$("#btn-reset2").on('click', function () {	
		$('.game-infos select option').each(function () {
			if (!$(this).is('[disabled=disabled]') && !$(this).is('.game-map, .game-map > option') && !$(this).is('.game-infos-poll, .game-infos-poll > input')) {
				$(this).remove();
			}
		});

		$('.drag-counter').data("drag-counter", 0);
		$('#series-result').data("blue-score", 0);
		$('#series-result').data("red-score", 0);
		$('.bans span.flair').removeClass();

		// re set picks as sortable
		$(".players").sortable();

		// re-set the trigger to blur and add the span.
		$(".scores-adr input").inputmask();
		$(".scores-rating input").inputmask();
		
	});

	$('#select-event-name').change(function () {
		var key = $(this).val();
		console.log("key=" + key);
		if (key == "") {
			$('#event-name').val("");
			$('#lolesports-link').val("");
			$('#liquipedia-link').val("");
		}
	});

	$('select.winner').change(function () {
		console.log("winner selected for some game");
		var resultInput = $('#series-result');
		var oldBlueScore = resultInput.data("blue-score");
		var oldRedScore = resultInput.data("red-score");
		var gameWinner = $(this).val();
		console.log(gameWinner);
		console.log(resultInput.data("blue-team"));
		console.log(resultInput.data("red-team"));
		if (gameWinner == resultInput.data("blue-team")) {
			resultInput.data("blue-score", oldBlueScore + 1);
			console.log("winner: blue team");
		} else if (gameWinner == resultInput.data("red-team")) {
			resultInput.data("red-score", oldRedScore + 1);
			console.log("winner: red team");
		}
		resultInput.val(resultInput.data("blue-score") + "-" + resultInput.data("red-score"));
	});

	$('#playoffs-checkbox').change(function () {
		updateEventInfos($('#select-event-name').val());
	});
	
	$('#advantage-checkbox').change(function () {
		var resultInput = $('#series-result');
		var oldBlueScore = resultInput.data("blue-score");
		var oldRedScore = resultInput.data("red-score");
		if ($(this).is(":checked")) {
			resultInput.data("blue-score", oldBlueScore + 1);
		} else {
			resultInput.data("blue-score", oldBlueScore - 1);
		}
		resultInput.val(resultInput.data("blue-score") + "-" + resultInput.data("red-score"));
	});

	$('#live-thread-checkbox').change(function () {
		if ($(this).is(":checked")) {
			$("#live-thread-link").prop({
				disabled: false
			});
		} else {
			$("#live-thread-link").prop({
				disabled: true
			});
		}
	});

	$('#use-icons-checkbox').change(function () {
		USE_ICONS = TRUE;
	});
	/*
		$("#tabList li.btn-veto").click(function() {
			$("#tabList li").removeClass('selected');
			$(this).addClass('selected');
			$("#panels .main, #panels #output-tab").css("display", "none");
			$("#panels .veto-tab").css("display", "inline-block");
		});
	*/
	$("#tabList li.btn-game").click(function () {
		index = $(this).index();
		$("#tabList li").removeClass('selected');
		$(this).addClass('selected');
		$("#panels .main, #panels #output-tab, #panels .veto-tab, #panels .highlights-tab").css("display", "none");
		$("#panels > div:nth-child(" + (index + 1) + ")").css("display", "inline-block");
		InsertMaps();
	});

	/** When clicking on tab Output **/
	$("#tabList li#btn-output").click(function () {
		$("#tabList li").removeClass('selected');
		$(this).addClass('selected');
		$("#panels .main, #panels .veto-tab, #panels .highlights-tab").css("display", "none");
		$("#panels #output-tab").css("display", "inline-block");
		InsertMaps();
		
		var resultInput = $('#series-result');
		var oldBlueScore = resultInput.data("blue-score");
		var oldRedScore = resultInput.data("red-score");
		if ($('#advantage-checkbox').is(":checked")) {
			resultInput.data("blue-score", 1);
		} else {
			resultInput.data("blue-score", 0);
		}
		resultInput.data("red-score", 0);
		resultInput.val(resultInput.data("blue-score") + "-" + resultInput.data("red-score"));

		data = [];
		data[0] = {};

		$("#panels > div:nth-child(1) input").each(function () {
			if ($(this).attr("class")) {
				if (!$(this).attr("o")) {
					var inputClass = $(this).attr("class");
					console.log(inputClass);
					data[0][inputClass] = {};
					if ($(this).parent().parent().hasClass('maps-left') || $(this).parent().parent().hasClass('maps-right')) {
						if ($(this).val() == "") {
							data[0][inputClass].value = "";
						} else {
							var mapo = "**" + $(this).val() + "**";
							data[0][inputClass].value = mapo;
						}
					} else if (['MP1', 'MP2', 'MP3', 'MP4', 'MP5', 'MP6', 'MP7'].indexOf(inputClass) >= 0) {   //$(this).parent().hasClass("select-maps")
						mapPick = $(this).val();
						console.log(inputClass + ": " + mapPick);
						if (mapPick == "") {
							data[0][inputClass].value = " ";
						} else if (["mirage", "vertigo", "ancient", "inferno", "nuke", "overpass", "anubis", "dust2", "cbble", "train", "cache"].indexOf(mapPick) >= 0) {
							data[0][inputClass].value = "[" + mapPick + "](#map-" + mapPick + ")";
						} else {
							data[0][inputClass].value = "**" + mapPick + "**";
						}
					} else {
						data[0][inputClass].value = $(this).val();
					}
				}
			}
		});
		
		for (i = 1; i <7; i++) {
			var resultInput = $('#series-result');
			var oldBlueScore = resultInput.data("blue-score");
			var oldRedScore = resultInput.data("red-score");
			var gameWinner = $("#panels > div:nth-child(" + (i + 1) + ") .winner").val();
			if (gameWinner == $("#team-1-name").val()) {
				resultInput.data("blue-score", oldBlueScore + 1);
				console.log("winner: blue team");
			} else if (gameWinner == $("#team-2-name").val()) {
				resultInput.data("red-score", oldRedScore + 1);
				console.log("winner: red team");
			}
			resultInput.val(resultInput.data("blue-score") + "-" + resultInput.data("red-score"));
			
			//} else if (gameWinner == resultInput.data("red-team")) {
		}

		var team1GID = $("#panels > div:nth-child(1) .maint1").val();
		var team2GID = $("#panels > div:nth-child(1) .maint2").val();

		// If the team isn't already in the database, add them to the database
		if (!TEAMS[team1GID])
			TEAMS[team1GID] = {"LOGO":"lang-un", "LOGOW":"FALSE", "Initials":team1GID, "HLTV Name":team1GID, "Name":team1GID, 
							"PLAYER 1":"", "PLAYER 2":"", "PLAYER 3":"", "PLAYER 4":"", "PLAYER 5":"", "PLAYER 6":"", 
							"Wiki":"", "HLTV":"", "Official Site":"", "Twitter":"", "Facebook":"", "Instagram":"", 
							"YouTube":"", "Twitch":"", "Subreddit":"", "TikTok":"", "Weibo":""};
		if (!TEAMS[team2GID])
			TEAMS[team2GID] = {"LOGO":"lang-un", "LOGOW":"FALSE", "Initials":team2GID, "HLTV Name":team2GID, "Name":team2GID, 
							"PLAYER 1":"", "PLAYER 2":"", "PLAYER 3":"", "PLAYER 4":"", "PLAYER 5":"", "PLAYER 6":"", 
							"Wiki":"", "HLTV":"", "Official Site":"", "Twitter":"", "Facebook":"", "Instagram":"", 
							"YouTube":"", "Twitch":"", "Subreddit":"", "TikTok":"", "Weibo":""};

		// event name
		data[0]["event-name"] = {};
		data[0]["event-name"].value = $("#event-name").val();

		// Event Settings
		if (EVENTS[data[0]["event-name"].value]) {

			// Flag for event location
			data[0]["event-flag"] = {};
			data[0]["event-flag"].value = Flagify(EVENTS[data[0]["event-name"].value]["Flag"]);

			// Name of city / online region of event
			city = EVENTS[data[0]["event-name"].value]["City"];
			data[0]["event-city"] = {};
			data[0]["event-city"].value = city

			// Prize pool
			prize = EVENTS[data[0]["event-name"].value]["Prize"];
			if (prize == '' || prize == null) prize = "$0";
			data[0]["event-prize"] = {};
			data[0]["event-prize"].value = prize;

			// Event type (LAN or Online)
			data[0]["event-type"] = {};
			if (city == "North America" || city == "South America" || city == "Europe" || city == "Asia" || city == "Oceania" || city == "Africa") {
				data[0]["event-type"].value = "Online";
			} else {
				data[0]["event-type"].value = "LAN";
			}

			// Event HLTV Page
			data[0]["event-hltv"] = {};
			data[0]["event-hltv"].value = EVENTS[data[0]["event-name"].value]["HLTV"];

			// Event Liquipedia Page
			data[0]['event-liquipedia'] = {};
			data[0]['event-liquipedia'] = EVENTS[data[0]["event-name"].value]["Liquipedia"];
		}

		// Match type
		data[0]["match-type"] = {};
		data[0]["match-type"].value = $("#match-type").val();

		// HLTV url
		data[0]["hltv-url"] = {};
		data[0]["hltv-url"].value = $('#hltv-url').val();

		// live thread link
		data[0]["live-thread-link"] = {};
		data[0]["live-thread-link"].value = $("#live-thread-link").val();

		// Team White
		data[0]["IconWTA1"] = {};
		data[0]["IconWTA1"].value = IconifyW(team1GID);
		data[0]["IconWTA2"] = {};
		data[0]["IconWTA2"].value = IconifyW(team2GID);
		data[0]["IconWT1"] = {};
		data[0]["IconWT1"].value = IconifyW(team1GID);
		data[0]["IconWT2"] = {};
		data[0]["IconWT2"].value = IconifyW(team2GID);

		data[0]["IconVWTA1"] = {};
		data[0]["IconVWTA1"].value = IconifyVetoW(team1GID);
		data[0]["IconVWTA2"] = {};
		data[0]["IconVWTA2"].value = IconifyVetoW(team2GID);

		// Team1 Initials
		data[0]["Team1Initials"] = {};
		data[0]["Team1Initials"].value = Initialsa(team1GID);

		// Team2 Initials
		data[0]["Team2Initials"] = {};
		data[0]["Team2Initials"].value = Initialsa(team2GID);

		data[0]["IconStatsT1"] = {};
		data[0]["IconStatsT1"].value = IconifyStats(team1GID);
		data[0]["IconStatsT2"] = {};
		data[0]["IconStatsT2"].value = IconifyStats(team2GID);

		for (i = 1; i < 6; i++) {
			// check if this tab has teams filled
			var team1ID = $("#panels > div:nth-child(" + i + ") .T1").val();
			var team2ID = $("#panels > div:nth-child(" + i + ") .T2").val();

			if (!team1ID) team1ID = $("#panels > div:nth-child(" + i + ") .maint1").val();
			if (!team2ID) team2ID = $("#panels > div:nth-child(" + i + ") .maint2").val();

			if (team1ID && team2ID && team1ID != "" && team2ID != "") {
				data[i] = {};
				$("#panels > div:nth-child(" + (i) + ") input").each(function (e) {
					if (!$(this).attr("o")) {
						var inputClass = $(this).attr("class");
						data[i][inputClass] = {};
						if ($(this).parent().parent().hasClass("scores")) {
							if ($(this).val() == "") {
								data[i][inputClass].value = "0";
							} else {
								var playerScore = $(this).val();
								data[i][inputClass].value = playerScore;
							}
						}  else if ($(this).parent().parent().hasClass("scores-adr")) {
							if ($(this).val() == "") {
								data[i][inputClass].value = "0.00";
							} else {
								var playerScore = $(this).val();
								data[i][inputClass].value = playerScore;
							}
						} else if ($(this).parent().parent().hasClass("scores-rating")) {
							if ($(this).val() == "") {
								data[i][inputClass].value = "0.00";
							} else {
								var playerScore = $(this).val();
								data[i][inputClass].value = playerScore;
							}
						} else if ($(this).parent().parent().hasClass("side-scores")) {
							if ($(this).val() == "") {
								data[i][inputClass].value = "0";
							} else {
								var sideScore = $(this).val();
								data[i][inputClass].value = sideScore;
							}
						} else {
							data[i][inputClass].value = $(this).val();
						}
					}
				});
				var inputVal = "";
				
				// Team1 Initials
				data[i]["Team1Initials"] = {};
				data[i]["Team1Initials"].value = Initialsa(team1ID);

				// Team2 Initials
				data[i]["Team2Initials"] = {};
				data[i]["Team2Initials"].value = Initialsa(team2ID);

				// Team White
				data[i]["IconWT1"] = {};
				data[i]["IconWT1"].value = IconifyW(team1ID);
				data[i]["IconWT2"] = {};
				data[i]["IconWT2"].value = IconifyW(team2ID);
				
				data[i]["IconStatsT1"] = {};
				data[i]["IconStatsT1"].value = IconifyStats(team1ID);
				data[i]["IconStatsT2"] = {};
				data[i]["IconStatsT2"].value = IconifyStats(team2ID);

				if (i > 1) {
					// winner of each game
					inputVal = $("#panels > div:nth-child(" + i + ") .winner").val();
					if (inputVal == null || inputVal == '') {
						inputVal = 'tbd';
					}
					data[i]["winner"] = {};
					data[i]["winner"].value = inputVal;

					// map of each game
					inputVal = $("#panels > div:nth-child(" + i + ") .game-map").val();
					if (inputVal == null || inputVal == '') {
						inputVal = 'tbd';
					}
					data[0]["pergame-map" + (i-1)] = {};
					data[0]["pergame-map" + (i-1)].value = inputVal;

					// match-history link of each game
					inputVal = $("#panels > div:nth-child(" + i + ") .match-history").val();
					if (inputVal == null || inputVal == '') {
						inputVal = 'https://www.hltv.org/stats/matches';
					}
					data[i]["match-history"] = {};
					data[i]["match-history"].value = inputVal;

					// game number
					data[i]["gameX"] = {};
					data[i]["gameX"].value = i;

					//Total rounds
					var roundCounterTemp = 0;
					data[i]["LRounds" + (i-1)] = {};
					data[i]["LRoundst"] = {};
					for (var c = 1; c <= 12; c++) {
						var LName = "";
						if (c < 10) {
							LName = c;
						} else {
							LName = "X" + (c % 10);
						}

						if (data[i]["L" + LName].value != null && data[i]["L" + LName].value != '')
							roundCounterTemp += parseInt(data[i]["L" + LName].value);
						else
							roundCounterTemp += 0;
							
					}
					data[i]["LRounds" + (i-1)].value = roundCounterTemp;
					data[i]["LRoundst"].value = roundCounterTemp;

					roundCounterTemp = 0;
					data[i]["RRounds" + (i-1)] = {};
					data[i]["RRoundst"] = {};
					for (var c = 1; c <= 12; c++) {
						var RName = "";
						if (c < 10) {
							RName = c;
						} else {
							RName = "X" + (c % 10);
						}

						if (data[i]["R" + RName].value != null && data[i]["R" + RName].value != '')
							roundCounterTemp += parseInt(data[i]["R" + RName].value);
						else
							roundCounterTemp += 0;
					}
					data[i]["RRounds" + (i-1)].value = roundCounterTemp;
					data[i]["RRoundst"].value = roundCounterTemp;
				}

				var index = 0;
				var playerNumber = 0;
				$("#panels > div:nth-child(" + (i) + ") [o]").each(function () {
					index++;
					if (index < 6) { //team 1 (players 1-5)
						playerNumber = index;
					} else if ( (index > 6) && (index < 11) ) { //team 2 (players 6-9 = indexes 7-10)
						playerNumber = index - 1;
					} else if (index == 11) { //team 2 last player (player 10 = index 11), represented by roman numeral X
						playerNumber = "X";
					}
					if ( (index != 6) && (index != 12) ) { //don't include extra player on each team (players 11 and 12 = indexes 6 and 12)
						data[i]["P" + playerNumber] = {};
						data[i]["P" + playerNumber].value = Flagify($(this).val());
						data[i]["P" + playerNumber].order = $(this).attr("o");
					} else if (index == 6) {
						data[i]["C1"] = {};
						data[i]["C1"].value = Flagify($(this).val());
					} else if (index == 12) {
						data[i]["C2"] = {};
						data[i]["C2"].value = Flagify($(this).val());
					}
				});
				
				var team1Rating = 0;
				var team2Rating = 0;
				for (var c = 1; c <= 10; c++) {
					if (c < 6) {
						team1Rating += parseFloat($("#panels > div:nth-child(" + i + ") .RA" + c).val());
					} else if (c < 10) {
						team2Rating += parseFloat($("#panels > div:nth-child(" + i + ") .RA" + c).val());
					} else {
						team2Rating += parseFloat($("#panels > div:nth-child(" + i + ") .RAX").val());
					}
				}
				
				data[i]["RAT1"] = {};
				data[i]["RAT1"].value = (team1Rating / 5.0).toFixed(2);
				data[i]["RAT2"] = {};
				data[i]["RAT2"].value = (team2Rating / 5.0).toFixed(2);
				
				$("#panels > div:nth-child(" + i + ") [o]").each(function () {
					index++
					if (index < 6) { //team 1
						team1Rating += index;
					} else {
						team2Rating += index;
					}
				});
			} else if (i > 1) {
				var inputVal = $("#panels > div:nth-child(" + i + ") .game-map").val();
				if (inputVal != null && inputVal != '') {
					data[0]["pergame-map" + (i-1)] = {};
					console.log("pergame-map" + (i-1) + " = " + inputVal);
					data[0]["pergame-map" + (i-1)].value = inputVal;
				}
			}
		}

		// series result
		inputVal = $("#series-result").val();
		if (inputVal == null || inputVal == '') {
			inputVal = '0-0';
		}
		data[0]["series-result"] = {};
		data[0]["series-result"].value = inputVal;
		
		//winner and loser name/icon
		inputVal = inputVal.split("-");
		if (Number(inputVal[1]) > Number(inputVal[0])) {
			data[0]["IconWinner"] = {};
			data[0]["IconWinner"].value = Iconify(team2GID);
			data[0]["WinnerName"] = {};
			data[0]["WinnerName"].value = team2GID
			data[0]["IconLoser"] = {};
			data[0]["IconLoser"].value = Iconify(team1GID);
			data[0]["LoserName"] = {};
			data[0]["LoserName"].value = team1GID
		} else {
			data[0]["IconWinner"] = {};
			data[0]["IconWinner"].value = Iconify(team1GID);
			data[0]["WinnerName"] = {};
			data[0]["WinnerName"].value = team1GID
			data[0]["IconLoser"] = {};
			data[0]["IconLoser"].value = Iconify(team2GID);
			data[0]["LoserName"] = {};
			data[0]["LoserName"].value = team2GID
		}
			

		// series context
		inputVal = $("#winners-context").val().trim();
		if ($("#winner-next-opponent").val() != "") {
			if (inputVal != '') {
				inputVal += ' and ';
			}
			try { 
				inputVal += "will face " + Iconify($("#winner-next-opponent").val()) + " " + $("#winner-next-opponent").val();
			} catch {
				inputVal += "will face " + $("#winner-next-opponent").val();
			}

			if ($("#winner-next-opponent2").val() != "") {
				try {
					inputVal += " or " + Iconify($("#winner-next-opponent2").val()) + " " + $("#winner-next-opponent2").val();
				} catch {
					inputVal += " or " + $("#winner-next-opponent2").val();
				}
			}
		} else if ($("#winner-next-opponent2").val() != "") {
			if (inputVal != '') {
				inputVal += ' and ';
			}
			try {
				inputVal += "will face " + Iconify($("#winner-next-opponent2").val()) + " " + $("#winner-next-opponent2").val();
			} catch {
				inputVal += "will face " + $("#winner-next-opponent2").val();
			}
		}
		data[0]["series-context1"] = {};
		data[0]["series-context1"].value = inputVal;
		
		inputVal = $("#losers-context").val().trim();
		if ($("#loser-next-opponent").val() != "") {
			if (inputVal != '') {
				inputVal += ' and ';
			}
			try {
				inputVal += "will face " + Iconify($("#loser-next-opponent").val()) + " " + $("#loser-next-opponent").val();
			} catch {
				inputVal += "will face " + $("#loser-next-opponent").val();
			}
			if ($("#loser-next-opponent2").val() != "") {
				try {
					inputVal += " or " + Iconify($("#loser-next-opponent2").val()) + " " + $("#loser-next-opponent2").val();
				} catch {
					inputVal += " or " + $("#loser-next-opponent2").val();
				}
			}
		} else if ($("#loser-next-opponent2").val() != "") {
			if (inputVal != '') {
				inputVal += ' and ';
			}
			try {
				inputVal += "will face " + Iconify($("#loser-next-opponent2").val()) + " " + $("#loser-next-opponent2").val();
			} catch {
				inputVal += "will face " + $("#loser-next-opponent2").val();
			}
		}
		data[0]["series-context2"] = {};
		data[0]["series-context2"].value = inputVal;

		// T1 for the series result
		inputVal = team1GID;
		if (inputVal == null || inputVal == '') {
			inputVal = 'tbd';
		}
		data[0]["Team1name"] = {};
		data[0]["Team1name"].value = inputVal;
		
		data[0]["Team1Default"] = {};
		data[0]["Team1Default"].value = inputVal.replace(" ", " ^");

		// T2 for the series result
		inputVal = team2GID;
		if (inputVal == null || inputVal == '') {
			inputVal = 'tbd';
		}
		data[0]["Team2name"] = {};
		data[0]["Team2name"].value = inputVal;

		if (TEAMS[team1GID]) {

			T1ut = {
				string: $("#panels > div:nth-child(1) .maint1").val()
			}

			T1ut.wk = "";
			T1ut.hl = "";
			T1ut.os = "";
			T1ut.tw = "";
			T1ut.fb = "";
			T1ut.ig = "";
			T1ut.tk = "";
			T1ut.wb = "";
			T1ut.yt = "";
			T1ut.tv = "";
			T1ut.sb = "";

			if (TEAMS[T1ut.string]["Wiki"] != "" && TEAMS[T1ut.string]["Wiki"] != null) {
				T1ut.wk = " | [Liquipedia](" + TEAMS[T1ut.string]["Wiki"] + ")" || "";
			}
			if (TEAMS[T1ut.string]["HLTV"] != "" && TEAMS[T1ut.string]["HLTV"] != null) {
				T1ut.hl = " | [HLTV](" + TEAMS[T1ut.string]["HLTV"] + ")" || "";
			}
			if (TEAMS[T1ut.string]["Official Site"] != "" && TEAMS[T1ut.string]["Official Site"] != null) {
				T1ut.os = " | [Official Site](" + TEAMS[T1ut.string]["Official Site"] + ")" || "";
			}
			if (TEAMS[T1ut.string]["Twitter"] != "" && TEAMS[T1ut.string]["Twitter"] != null) {
				T1ut.tw = " | [Twitter](" + TEAMS[T1ut.string]["Twitter"] + ")" || "";
			}
			if (TEAMS[T1ut.string]["Facebook"] != "" && TEAMS[T1ut.string]["Facebook"] != null) {
				T1ut.fb = " | [Facebook](" + TEAMS[T1ut.string]["Facebook"] + ")" || "";
			}
			if (TEAMS[T1ut.string]["Instagram"] != "" && TEAMS[T1ut.string]["Instagram"] != null) {
				T1ut.ig = " | [Instagram](" + TEAMS[T1ut.string]["Instagram"] + ")" || "";
			}
			if (TEAMS[T1ut.string]["TikTok"] != "" && TEAMS[T1ut.string]["TikTok"] != null) {
				T1ut.tk = " | [TikTok](" + TEAMS[T1ut.string]["TikTok"] + ")" || "";
			}
			if (TEAMS[T1ut.string]["Weibo"] != "" && TEAMS[T1ut.string]["Weibo"] != null) {
				T1ut.wb = " | [Weibo](" + TEAMS[T1ut.string]["Weibo"] + ")" || "";
			}
			if (TEAMS[T1ut.string]["YouTube"] != "" && TEAMS[T1ut.string]["YouTube"] != null) {
				T1ut.yt = " | [YouTube](" + TEAMS[T1ut.string]["YouTube"] + ")" || "";
			}
			if (TEAMS[T1ut.string]["Twitch"] != "" && TEAMS[T1ut.string]["Twitch"] != null) {
				T1ut.tv = " | [Twitch](" + TEAMS[T1ut.string]["Twitch"] + ")" || "";
			}
			if (TEAMS[T1ut.string]["Subreddit"] != "" && TEAMS[T1ut.string]["Subreddit"] != null) {
				T1ut.sb = " | [Subreddit](" + TEAMS[T1ut.string]["Subreddit"] + ")" || "";
			}

			data[0]["team1info"] = {
				value: Iconify(team1GID) + " **" + team1GID + "**" + T1ut.wk + T1ut.hl + T1ut.os + T1ut.tw + T1ut.fb + T1ut.ig + T1ut.tk + T1ut.wb + T1ut.yt + T1ut.tv + T1ut.sb
			};
		}

		if (TEAMS[team2GID]) {

			T2ut = {
				string: $("#panels > div:nth-child(1) .maint2").val()
			}

			T2ut.wk = "";
			T2ut.hl = "";
			T2ut.os = "";
			T2ut.tw = "";
			T2ut.fb = "";
			T2ut.ig = "";
			T2ut.tk = "";
			T2ut.wb = "";
			T2ut.yt = "";
			T2ut.tv = "";
			T2ut.sb = "";

			if (TEAMS[T2ut.string]["Wiki"] != "" && TEAMS[T2ut.string]["Wiki"] != null) {
				T2ut.wk = " | [Liquipedia](" + TEAMS[T2ut.string]["Wiki"] + ")" || "";
			}
			if (TEAMS[T2ut.string]["HLTV"] != "" && TEAMS[T2ut.string]["HLTV"] != null) {
				T2ut.hl = " | [HLTV](" + TEAMS[T2ut.string]["HLTV"] + ")" || "";
			}
			if (TEAMS[T2ut.string]["Official Site"] != "" && TEAMS[T2ut.string]["Official Site"] != null) {
				T2ut.os = " | [Official Site](" + TEAMS[T2ut.string]["Official Site"] + ")" || "";
			}
			if (TEAMS[T2ut.string]["Twitter"] != "" && TEAMS[T2ut.string]["Twitter"] != null) {
				T2ut.tw = " | [Twitter](" + TEAMS[T2ut.string]["Twitter"] + ")" || "";
			}
			if (TEAMS[T2ut.string]["Facebook"] != "" && TEAMS[T2ut.string]["Facebook"] != null) {
				T2ut.fb = " | [Facebook](" + TEAMS[T2ut.string]["Facebook"] + ")" || "";
			}
			if (TEAMS[T2ut.string]["Instagram"] != "" && TEAMS[T2ut.string]["Instagram"] != null) {
				T2ut.ig = " | [Instagram](" + TEAMS[T2ut.string]["Instagram"] + ")" || "";
			}
			if (TEAMS[T2ut.string]["TikTok"] != "" && TEAMS[T2ut.string]["TikTok"] != null) {
				T2ut.tk = " | [TikTok](" + TEAMS[T2ut.string]["TikTok"] + ")" || "";
			}
			if (TEAMS[T2ut.string]["Weibo"] != "" && TEAMS[T2ut.string]["Weibo"] != null) {
				T2ut.wb = " | [Weibo](" + TEAMS[T2ut.string]["Weibo"] + ")" || "";
			}
			if (TEAMS[T2ut.string]["YouTube"] != "" && TEAMS[T2ut.string]["YouTube"] != null) {
				T2ut.yt = " | [YouTube](" + TEAMS[T2ut.string]["YouTube"] + ")" || "";
			}
			if (TEAMS[T2ut.string]["Twitch"] != "" && TEAMS[T2ut.string]["Twitch"] != null) {
				T2ut.tv = " | [Twitch](" + TEAMS[T2ut.string]["Twitch"] + ")" || "";
			}
			if (TEAMS[T2ut.string]["Subreddit"] != "" && TEAMS[T2ut.string]["Subreddit"] != null) {
				T2ut.sb = " | [Subreddit](" + TEAMS[T2ut.string]["Subreddit"] + ")" || "";
			}
			data[0]["team2info"] = {
				value: Iconify(team2GID) + " **" + team2GID + "**" + T2ut.wk + T2ut.hl + T2ut.os + T2ut.tw + T2ut.fb + T2ut.ig + T2ut.tk + T2ut.wb + T2ut.yt + T2ut.tv + T2ut.sb
			};
		}
		
		var highlights = "";
		
		for (var c = 1; c <= 12; c++) {
			var LName = "";
			if (c < 10) {
				HName = c;
			} else {
				HName = "X" + (c % 10);
			}
			
			var htitle = $("#panels > div:nth-child(7) .HT" + HName).val();
			var hlink = $("#panels > div:nth-child(7) .HL" + HName).val();
			if (htitle == "" || hlink == "") {
				break
			}
			
			highlights += "[" + htitle + "](" + hlink + ")  \r" 
			
		}
		
		
		// Suffix to add to "#header-infos" indicating whether there's a live thread
		var liveThreadSuffix = "";

		// If the live thread box isn't checked, add "-no-live-thread" to the suffix
		if (!$("#live-thread-checkbox").is(":checked")) {
			liveThreadSuffix += "-no-live-thread"
		}

		var iconsSuffix = "";

		// Start the header with the main match result
		var header = $("#header-event-name").val();
		
		// Add advantage info if the box is checked
		if ($("#advantage-checkbox").is(":checked")) {
			header += $("#header-default").val();
		}

		// Loop through maps played and add the scores for each map
		for (i = 2; i < 7; i++) {
			if ($('#panels > div:nth-child(' + i + ') .game-map').val() != "" && $('#panels > div:nth-child(' + i + ') .game-map').val() != null) {
				if ($('#panels > div:nth-child(' + i + ') .T1').val() != null && $('#panels > div:nth-child(' + i + ') .T1').val() != "") {
					console.log(i + $('#panels > div:nth-child(1) .maint1').val() + $('#panels > div:nth-child(' + i + ') .T1').val());
					if ($('#panels > div:nth-child(1) .maint1').val() == $('#panels > div:nth-child(' + i + ') .T1').val()) {
						console.log("map " + (i-1) + " is backwards");
						header += $("#header-map-scores" + (i - 1) + "-b").val();
					} else {
						console.log("map " + (i-1) + " is normal");
						header += $("#header-map-scores" + (i - 1)).val();
					}
				} else {
					console.log("map " + (i-1) + " is not played");
					header += $("#header-map-scores" + (i - 1) + "-np").val();
				}
			}
		}
		
		// Add a note explaining default advantage
		if ($("#advantage-checkbox").is(":checked")) {
			header += $("#header-default-note").val();
		}
		
		// Add context info about a Grand Final result
		if ($("#final-checkbox").is(":checked")) {
			if ((data.length > 0) && (data[1]["series-context2"].value != '') && (data[1]["series-context2"].value != null)) {
				header += $("#header-series-context-final2").val();
			} else {
				header += $("#header-series-context-final").val();
			}

		// Both teams have context info
		} else if ( (data.length > 0) && (data[1]["series-context1"]) && (data[1]["series-context1"].value != '') && (data[1]["series-context2"]) && (data[1]["series-context2"].value != '') ) {
			header += $("#header-series-context-both").val();

		// Only winning team has context info
		} else if ( (data.length > 0) && (data[1]["series-context1"]) && (data[1]["series-context1"].value != '') ) {
			header += $("#header-series-context1").val();

		// Only losing team has context info
		} else if ( (data.length > 0) && (data[1]["series-context2"]) && (data[1]["series-context2"].value != '') ) {
			header += $("#header-series-context2").val();
		}

		// Add ender to the header, with alternate form for a fake bo2
		if ($("#epl-checkbox").is(":checked")) {
			header += $("#header-end-fake-bo2").val();
		} else {
			header += $("#header-end").val();
		}

		// Add the VRS info if it's not empty
		if ($("#panels > div:nth-child(1) .VRSA1").val()) {

			data[0]["VRSTA1"] = {};
			data[0]["VRSTA1"].value = parseInt($("#panels > div:nth-child(1) .VRST1").val()) + parseInt($("#panels > div:nth-child(1) .VRSD1").val());
			data[0]["VRSTA2"] = {};
			data[0]["VRSTA2"].value = parseInt($("#panels > div:nth-child(1) .VRST2").val()) + parseInt($("#panels > div:nth-child(1) .VRSD2").val());

			header += $("#vrs-prediction").val();
		}

		// Get the main team names
		var team1ID = $("#panels > div:nth-child(1) .maint1").val();
		var team2ID = $("#panels > div:nth-child(1) .maint2").val();

		// If there's TEAM data for these team names, add their team information
		if (TEAMS[team1ID] && TEAMS[team2ID]) {
			header += $("#header-teams-infos").val();
		}

		// Add event discussion info
		header += $("#header-infos" + liveThreadSuffix).val();

		// If we have event setting data for this event, add the event setting section
		if (EVENTS[data[0]["event-name"].value]) {
			console.log("adding event setting text to output");
			header += $("#event-setting").val();
		}

		// Add the coach for team 1
		data[0]['C1'] = {};
		if ((TEAMS[team1ID]["PLAYER 6"].endsWith('(c)'))) {
			data[0]['C1'].value = Flagify(TEAMS[team1ID]["PLAYER 6"].split(' (')[0]);
		} else {
			data[0]['C1'].value = "-";
		}
			
		// Add the coach for team 2
		data[0]['C2'] = {};
		if (TEAMS[team2ID]["PLAYER 6"].endsWith('(c)')) {
			data[0]['C2'].value = Flagify(TEAMS[team2ID]["PLAYER 6"].split(' (')[0]);
		} else {
			data[0]['C2'].value = "-"
		}

		// Add the coach information
		if (data[0]['C1'] != "-" || data[0]['C2'] != "-") {
			header += $("#team-coaches").val();
		}

		// Add veto information
		if ($("#epl-checkbox").is(":checked")) { // If the match consists of 2 bo1s, don't include vetoes
			header += "";
		} else {
			header += $("#vetoes" + CountMaps()).val();
		}

		// The main output
		var main = "";

		// Transition strings
		var transition = $("#transition").val();
		var string = "";

		// Add the header to main
		main += header;

		// Get team 1 name and icon
		data[0]["T1"] = {};
		data[0]["T1"].value = team1GID;
		data[0]["IconT1"] = {};
		data[0]["IconT1"].value = Iconify(team1GID);

		// Get team 2 name and icon
		data[0]["T2"] = {};
		data[0]["T2"].value = team2GID;
		data[0]["IconT2"] = {};
		data[0]["IconT2"].value = Iconify(team2GID);

		// Add the overall stats if filled out
		if ($("#panels > div:nth-child(1) .K1").val() != null) {
			main += $('textarea#overall-scoreboard-stats').val();
		}

		// Replace placeholders with matches data (index 0)
		for (j in data[0]) {
			main = SearchReplace("%" + j, data[0][j], main);
		}

		// Replace placeholders with veto / overall stats data (index 1)
		for (j in data[1]) {
			main = SearchReplace("%" + j, data[1][j], main);
		}

		for (i = 2; i < data.length; i++) {
			if (!data[i]["P1"])
				continue;
			if (!($("#panels > div:nth-child(" + (i) + ") .T1").val() == null || $("#panels > div:nth-child(" + (i) + ") .T1").val() == '')) {
				main += transition; /* adds the horizontal line between games */
				/*
				 * build one game output before giving it to the function that replaces
				 * the %variables in textareas with the data inputted
				 * (depending on region and use old style for stats)
				 */
				if (CountMapsPlayed() == 1) {
					main += $('textarea#main-match-details-one').val();
				} else {
					main += $('textarea#main-match-details').val();
				}

				var sBInfos = 'textarea#main-scoreboard-infos';
				if ($("#panels > div:nth-child(" + (i) + ") #left-side-checkbox").is(":checked")) {
					sBInfos += '-swap';
				}
				
				if ($("#panels > div:nth-child(" + (i+1) + ") #simple-scores-checkbox").is(":checked")) 
					main += $('textarea#main-scoreboard-infos-simple').val();
				else if ($("#panels > div:nth-child(" + (i) + ") .LX1").val() != '' && $("#panels > div:nth-child(" + (i) + ") .LX1").val() != null)
					main += $(sBInfos + '-ot5').val();
				else if ($("#panels > div:nth-child(" + (i) + ") .L9").val() != '' && $("#panels > div:nth-child(" + (i) + ") .L9").val() != null)
					main += $(sBInfos + '-ot4').val();
				else if ($("#panels > div:nth-child(" + (i) + ") .L7").val() != '' && $("#panels > div:nth-child(" + (i) + ") .L7").val() != null)
					main += $(sBInfos + '-ot3').val();
				else if ($("#panels > div:nth-child(" + (i) + ") .L5").val() != '' && $("#panels > div:nth-child(" + (i) + ") .L5").val() != null)
					main += $(sBInfos + '-ot2').val();
				else if ($("#panels > div:nth-child(" + (i) + ") .L3").val() != '' && $("#panels > div:nth-child(" + (i) + ") .L3").val() != null)
					main += $(sBInfos + '-ot1').val();
				else
					main += $(sBInfos).val();
				
				if (['1', '2', '3', '4'].indexOf($("#panels > div:nth-child(" + (i) + ") .PNum").val()) > -1) {
					numP = $("#panels > div:nth-child(" + (i + 1) + ") .PNum").val()
					main += $('textarea#main-scoreboard-stats-' + numP + 'v' + numP).val().replace("_","");
				} else if ($("#panels > div:nth-child(" + (i+1) + ") #simple-stats-checkbox").is(":checked")) {
					main += $('textarea#main-scoreboard-stats-simple').val();
				} else {		
					main += $('textarea#main-scoreboard-stats').val().replace("_","");
				}
			}
			for (j in data[i]) {
				main = SearchReplace("%" + j, data[i][j], main);
			}
		}

		for (j in data[0]) {
			main = SearchReplace("%" + j, data[0][j], main);
		}
		
		var lastTransition = $("#last-transition").val();
		main += lastTransition;
		
		if (highlights != "") {
			main += "#Highlights\r\r" + highlights + "\r---\r\r" 
			
		}

		if ($("#pmt-checkbox").is(":checked"))
			main += $("#end").val();

		// set the value of the output textarea so users can copy
		$("#output-textarea").val(string + main);

		var title = "";
		title += $('textarea#title').val();

		for (j in data[0]) {
			title = SearchReplace("%" + j, data[0][j], title);
		}

		// Set the value of the title textarea so users can copy
		$("#title-textarea").val(title);
	});

	$('#panels > div:nth-child(1) .maint1').blur(function () {
		var teamID = $(this).val();
		console.log("team1: " + teamID);
		var teamFullName = "";
		if (TEAMS[teamID] != null && TEAMS[teamID] != "") {
			$(this).css('border-color', '#2ecc40');
			teamFullName = TEAMS[teamID]["Name"];
		} else {
			$(this).css('border-color', '#fffb36');
			teamFullName = teamID;
			TEAMS[teamID] = {"LOGO":"lang-un", "LOGOW":"FALSE", "Initials":teamID, "HLTV Name":teamID, "Name":teamID, "PLAYER 1":"", "PLAYER 2":"", "PLAYER 3":"", "PLAYER 4":"", "PLAYER 5":"", "PLAYER 6":"", "Wiki":"", "HLTV":"", "Official Site":"", "Twitter":"", "Facebook":"", "Instagram":"", "YouTube":"", "Twitch":"", "Subreddit":"", "TikTok":"", "Weibo":""}
		}
		$('#Team1name').val(teamFullName);
		$('#series-result').data('blue-team', teamFullName);
	});

	$('#panels > div:nth-child(1) .maint2').blur(function () {
		var teamID = $(this).val();
		console.log("team2: " + teamID);
		var teamFullName = "";
		if (TEAMS[teamID] != null && TEAMS[teamID] != "") {
			$(this).css('border-color', '#2ecc40');
			teamFullName = TEAMS[teamID]["Name"];
		} else {
			$(this).css('border-color', '#fffb36');
			teamFullName = teamID;
			TEAMS[teamID] = {"LOGO":"lang-un", "LOGOW":"FALSE", "Initials":teamID, "HLTV Name":teamID, "Name":teamID, "PLAYER 1":"", "PLAYER 2":"", "PLAYER 3":"", "PLAYER 4":"", "PLAYER 5":"", "PLAYER 6":"", "Wiki":"", "HLTV":"", "Official Site":"", "Twitter":"", "Facebook":"", "Instagram":"", "YouTube":"", "Twitch":"", "Subreddit":"", "TikTok":"", "Weibo":""}
		}
		$('#Team2name').val(teamFullName);
		$('#series-result').data('red-team', teamFullName);
	});

	// Copy and paste info for the main page
	$(".hltvmaintable").blur(function () {
		var hltvTable = $(this).val();
		var hltvTableLines = hltvTable.split("\n");
		var team1Name = "";
		var team2Name = "";
		var lineVals = "";
		var foundTeam1 = false;
		var foundTeam2 = false;

		/**dictionary for creating css flags from emojis **/
		var countryDict = {	
			"Afghanistan": "🇦🇫","Albania": "🇦🇱","Algeria": "🇩🇿","Andorra": "🇦🇩","Angola": "🇦🇴","Antiga and Barbuda": "🇦🇬","Argentina": "🇦🇷","Armenia": "🇦🇲","Australia": "🇦🇺","Austria": "🇦🇹","Azerbaijan": "🇦🇿",
			"Bahamas": "🇧🇸","Bahrain": "🇧🇭","Bangladesh": "🇧🇩","Barbados": "🇧🇧","Belarus": "🇧🇾","Belgium": "🇧🇪","Belize": "🇧🇿","Benin": "🇧🇯","Bhutan": "🇧🇹","Bolivia": "🇧🇴","Bosnia and Herzegovina": "🇧🇦","Botswana": "🇧🇼","Brazil": "🇧🇷","Brunei": "🇧🇳","Bulgaria": "🇧🇬","Burkina Faso": "🇧🇫","Burundi": "🇧🇮",
			"Cambodia": "🇰🇭","Cameroon": "🇨🇲","Canada": "🇨🇦","Cape Verde": "🇨🇻","Central African Republic": "🇨🇫","Chad": "🇹🇩","Chile": "🇨🇱","China": "🇨🇳","Colombia": "🇨🇴","Comoros": "🇰🇲","Republic of the Congo": "🇨🇬","Democratic Republic of the Congo": "🇨🇩","Costa Rica": "🇨🇷","Cote d'Ivoire": "🇨🇮","Croatia": "🇭🇷","Cuba": "🇨🇺","Cyprus": "🇨🇾","Czechia": "🇨🇿","Czech Republic": "🇨🇿",
			"Denmark": "🇩🇰","Djibouti": "🇩🇯","Dominica": "🇩🇲","Dominican Republic": "🇩🇴",
			"Ecuador": "🇪🇨","Egypt": "🇪🇬","El Salvador": "🇸🇻","Equatorial Guinea": "🇬🇶","Eritrea": "🇪🇷","Estonia": "🇪🇪","Eswatini": "🇸🇿","Ethiopia": "🇪🇹",
			"Faroe Islands": "🇫🇴","Fiji": "🇫🇯","Finland": "🇫🇮","France": "🇫🇷","French Guiana": "🇬🇫",
			"Gabon": "🇬🇦","Gambia": "🇬🇲","Georgia": "🇬🇪","Germany": "🇩🇪","Ghana": "🇬🇭","Greece": "🇬🇷","Grenada": "🇬🇩","Guatemala": "🇬🇹","Guinea-Bissau": "🇬🇼","Guyana": "🇬🇾",
			"Haiti": "🇭🇹","Honduras": "🇭🇳","Hong Kong": "🇭🇰","Hungary": "🇭🇺",
			"Iceland": "🇮🇸","India": "🇮🇳","Indonesia": "🇮🇩","Iran": "🇮🇷","Iraq": "🇮🇶","Ireland": "🇮🇪","Israel": "🇮🇱","Italy": "🇮🇹",
			"Jamaica": "🇯🇲","Japan": "🇯🇵","Jordan": "🇯🇴",
			"Kazakhstan": "🇰🇿","Kenya": "🇰🇪","Kiribati": "🇰🇮","North Korea": "🇰🇵","South Korea": "🇰🇷","Kosovo": "🇽🇰","Kuwait": "🇰🇼","Kyrgyzstan": "🇰🇬",
			"Laos": "🇱🇦","Latvia": "🇱🇻","Lebanon": "🇱🇧","Lesotho": "🇱🇸","Liberia": "🇱🇷","Libya": "🇱🇾","Liechtenstein": "🇱🇮","Lithuania": "🇱🇹","Luxembourg": "🇱🇺",
			"Macau": "🇲🇴","Madagascar": "🇲🇬","Malawi": "🇲🇼","Malaysia": "🇲🇾","Maldives": "🇲🇻","Mali": "🇲🇱","Malta": "🇲🇹","Marshall Islands": "🇲🇭","Mauritania": "🇲🇷","Mauritius": "🇲🇺","Mexico": "🇲🇽","Micronesia": "🇫🇲","Moldova": "🇲🇩","Monaco": "🇲🇨","Mongolia": "🇲🇳","Montenegro": "🇲🇪","Morocco": "🇲🇦","Mozambique": "🇲🇿","Myanmar": "🇲🇲",
			"Namibia": "🇳🇦","Nauru": "🇳🇷","Nepal": "🇳🇵","Netherlands": "🇳🇱","New Zealand": "🇳🇿","Nicaragua": "🇳🇮","Niger": "🇳🇪","Nigeria": "🇳🇬","North Macedonia": "🇲🇰","Norway": "🇳🇴",
			"Oman": "🇴🇲",
			"Pakistan": "🇵🇰","Palau": "🇵🇼","Palestine": "🇵🇸","Panama": "🇵🇦","Papua New Guinea": "🇵🇬","Paraguay": "🇵🇾","Peru": "🇵🇪","Philippines": "🇵🇭","Poland": "🇵🇱","Portugal": "🇵🇹",
			"Qatar": "🇶🇦",
			"Romania": "🇷🇴","Russia": "🇷🇺","Rwanda": "🇷🇼",
			"Saint Kitts and Nevis": "🇰🇳","Saint Lucia": "🇱🇨","Saint Vincent and the Grenadines": "🇻🇨","Samoa": "🇼🇸","San Marino": "🇸🇲","Sao Tome and Principe": "🇸🇹","Saudi Arabia": "🇸🇦","Senegal": "🇸🇳","Serbia": "🇷🇸","Seychelles": "🇸🇨","Sierra Leone": "🇸🇱","Singapore": "🇸🇬","Slovakia": "🇸🇰","Slovenia": "🇸🇮","Solomon Islands": "🇸🇧","Somalia": "🇸🇴","South Africa": "🇿🇦","South Sudan": "🇸🇸","Spain": "🇪🇸","Sri Lanka": "🇱🇰","Sudan": "🇸🇩","Suriname": "🇸🇷","Sweden": "🇸🇪","Switzerland": "🇨🇭","Syria": "🇸🇾",
			"Taiwan": "🇹🇼","Tajikistan": "🇹🇯","Tanzania": "🇹🇿","Thailand": "🇹🇭","Timor-Leste": "🇹🇱","Togo": "🇹🇬","Tonga": "🇹🇴","Trinidad and Tobago": "🇹🇹","Tunisia": "🇹🇳","Türkiye": "🇹🇷","Turkmenistan": "🇹🇲","Tuvalu": "🇹🇻",
			"Uganda": "🇺🇬","Ukraine": "🇺🇦","United Arab Emirates": "🇦🇪","United Kingdom": "🇬🇧","United States": "🇺🇸","Uruguay": "🇺🇾","Uzbekistan": "🇺🇿",
			"Vanuatu": "🇻🇺","Vatican City": "🇻🇦","Venezuela": "🇻🇪","Vietnam": "🇻🇳",
			"Yemen": "🇾🇪",
			"Zambia": "🇿🇲","Zimbabwe": "🇿🇼"
		}

		// Loop through the lines in the copy paste
		var lastLine = "";
		for (line in hltvTableLines) {
			// Found the duplicate lines of the team names
			if (!foundTeam1 && hltvTableLines[line].trim() == lastLine && !(lastLine == "")) {
				foundTeam1 = true;
				team1Name = lastLine;
			} else if (!foundTeam2 && hltvTableLines[line].trim() == lastLine && !(lastLine == "")) {
				foundTeam2 = true;
				team2Name = lastLine;
			} else if (foundTeam1 && foundTeam2) {
				break;
			}

			lastLine = hltvTableLines[line].trim();
		}

		// Reset the found variables for checking TEAMS database
		foundTeam1 = false;
		foundTeam2 = false;

		// Loop through known teams
		for (team in TEAMS) {

			// Check if team 1's name matches the name found on HLTV
			if (TEAMS[team]["HLTV Name"] == team1Name) {
				$(this).closest('div.veto-tab').find('input.maint1').val(TEAMS[team]["Name"]);
				$(this).closest('div.veto-tab').find('input.maint1').blur();
				team1Name = TEAMS[team]["Name"];
				foundTeam1 = true;

			// Check if team 2's name matches the name found on HLTV
			} else if (TEAMS[team]["HLTV Name"] == team2Name) {
				$(this).closest('div.veto-tab').find('input.maint2').val(TEAMS[team]["Name"]);
				$(this).closest('div.veto-tab').find('input.maint2').blur();
				team2Name = TEAMS[team]["Name"];
				foundTeam2 = true;
			}
		}

		// Team 1 on HLTV is not in database, create new team entry
		if (!foundTeam1) {
			TEAMS[team1Name] = {"LOGO":"lang-un", "LOGOW":"FALSE", "Initials":team1Name, "HLTV Name":team1Name, "Name":team1Name, "PLAYER 1":"", "PLAYER 2":"", "PLAYER 3":"", "PLAYER 4":"", "PLAYER 5":"", "PLAYER 6":"", "Wiki":"", "HLTV":"", "Official Site":"", "Twitter":"", "Facebook":"", "Instagram":"", "YouTube":"", "Twitch":"", "Subreddit":"", "TikTok":"", "Weibo":""}
			$(this).closest('div.veto-tab').find('input.maint1').val(TEAMS[team1Name]["Name"]);
			$(this).closest('div.veto-tab').find('input.maint1').blur();
			team1Name = TEAMS[team1Name]["Name"];
		}

		// Team 2 on HLTV is not in database, create new team entry
		if (!foundTeam2) {
			TEAMS[team2Name] = {"LOGO":"lang-un", "LOGOW":"FALSE", "Initials":team2Name, "HLTV Name":team2Name, "Name":team2Name, "PLAYER 1":"", "PLAYER 2":"", "PLAYER 3":"", "PLAYER 4":"", "PLAYER 5":"", "PLAYER 6":"", "Wiki":"", "HLTV":"", "Official Site":"", "Twitter":"", "Facebook":"", "Instagram":"", "YouTube":"", "Twitch":"", "Subreddit":"", "TikTok":"", "Weibo":""}
			$(this).closest('div.veto-tab').find('input.maint2').val(TEAMS[team2Name]["Name"]);
			$(this).closest('div.veto-tab').find('input.maint2').blur();
			team2Name = TEAMS[team2Name]["Name"];
		}

		// Find the important inputs? - don't really know what this is doing, but I think it has something to do with player names
		for (k = 1; k <= 12; k++) {
			if (k < 10) {
				$(this).closest('div.veto-tab').find('input.L' + k).val("");		
				$(this).closest('div.veto-tab').find('input.R' + k).val("");
			} else {
				$(this).closest('div.veto-tab').find('input.LX' + (k-10)).val("");
				$(this).closest('div.veto-tab').find('input.RX' + (k-10)).val("");
			}
		}

		var event_name_found = false;
		var match_type_found = false;
		var vetos_finished = false;
		var stats_finished = false;
		var vrs_started = false;
		var vrs_rank_num = 0; 		// Instances of VRS rank lines (with '#')
		var vrs_pt_num = 0;			// Instances of VRS point lines (with 'pt')
		var vrs_finished = false;
		var j = 0;
		var team1NameLength = TEAMS[team1Name]["HLTV Name"].split(" ").length;
		var team2NameLength = TEAMS[team2Name]["HLTV Name"].split(" ").length;

		// Loop through lines in the copy paste
		for (var line = 0; line < hltvTableLines.length; line++) {

			// Split the line by whitespace
			lineVals = hltvTableLines[line].split(" ").join("\t").split("\t");
			lineVals = lineVals.filter(function (el) {
				return el != "";
			});

			// This is the line for the time of the match, the event name should be 2 lines after
			if (!event_name_found && hltvTableLines[line].indexOf(":") != -1) {
				$('#event-name').val(hltvTableLines[line+2].trim());
				event_name_found = true;
			}

			// This is the line for the match type
			if (!match_type_found && hltvTableLines[line].indexOf("*") != -1) {
			 	$('#match-type').val(titleCase(hltvTableLines[line].split('.')[0].split('*')[1].trim()));

				// This is a grand final, check the grand final checkbox
				if ($('#match-type').val() == "Grand Final") {
					$('#final-checkbox').val(":checked");
				} else { // This is not a grand final, uncheck the checkbox
					$('#final-checkbox').val(":unchecked");
				}

				match_type_found = true;
			}

			// Skip vrs and stats info if match is still live
			if (hltvTableLines[line].indexOf("LIVE") != -1) {
				stats_finished = true;
				vrs_finished = true;
			}

			// '1.' is in the line - must be the first veto line
			if (!vetos_finished && hltvTableLines[line].indexOf("1.") != -1) {
				for (var i = 1; i < 10; i++) {
					if (hltvTableLines[line+i-1].indexOf("" + i + ".") != -1) {
						lineVals = hltvTableLines[line+i-1].split(" ").join("\t").split("\t");
						lineVals = lineVals.filter(function (el) {
							return el != "";
						});
						if (lineVals.slice(1,team1NameLength+1).join(" ") == TEAMS[team1Name]["HLTV Name"]) {
							if (lineVals[team1NameLength+1] == "removed") {
								$(this).closest('div.veto-tab').find('input.ML' + i).val("X");
							} else if (lineVals[team1NameLength+1] == "picked") {
								$(this).closest('div.veto-tab').find('input.ML' + i).val("✔");
							}
							$(this).closest('div.veto-tab').find('input.MP' + i).val(lineVals[team1NameLength+2].toLowerCase());
						} else if (lineVals.slice(1,team2NameLength+1).join(" ") == TEAMS[team2Name]["HLTV Name"]){
							if (lineVals[team2NameLength+1] == "removed") {
								$(this).closest('div.veto-tab').find('input.MR' + i).val("X");
							} else if (lineVals[team2NameLength+1] == "picked") {
								$(this).closest('div.veto-tab').find('input.MR' + i).val("✔");
							}
							$(this).closest('div.veto-tab').find('input.MP' + i).val(lineVals[team2NameLength+2].toLowerCase());
						} else if (lineVals[3] == "left") {
							$(this).closest('div.veto-tab').find('input.MP' + i).val(lineVals[1].toLowerCase());
						}
					} else {
						vetos_finished = true;
						break;
					}
				}
			}

			// '%' is in the line - must be one of the lines of statistics
			if (!stats_finished && hltvTableLines[line].indexOf("%") != -1) {
				j += 1;
				if (j == 10) {
					j = "X";
				}

				// Split the table values by whitespace
				lineVals = hltvTableLines[line].split(" ").join("\t").split("\t").join("-").split("-");
				lineVals = lineVals.filter(function (el) {
					return el != "";
				});

				// Get the K, D, ADR, Swing, and Rating
				$(this).closest('div.veto-tab').find('input.K' + j).val(lineVals[0]);
				$(this).closest('div.veto-tab').find('input.D' + j).val(lineVals[1]);
				$(this).closest('div.veto-tab').find('input.ADR' + j).val(lineVals[3]);
				$(this).closest('div.veto-tab').find('input.SW' + j).val(lineVals[2]);
				$(this).closest('div.veto-tab').find('input.RA' + j).val(lineVals[5]);

				// Get the player for these stats
				playerName = $(this).closest('div.veto-tab').find('input.P' + j).val();
				currentName = playerName;
				console.log("initial player name:" + playerName);
				var k = j;
				hltvPlayerName = hltvTableLines[line-1].split("\'")[1];
				console.log("HLTV Player Name: " + hltvPlayerName)
				var addedNewPlayer = false;
				while (!(playerName.trim().endsWith(hltvPlayerName)) && !(playerName.trim().endsWith(hltvPlayerName + " ♛")) && !(playerName.trim().endsWith(hltvPlayerName + " 𖦏")) && !(playerName.trim().endsWith(hltvPlayerName + " ♛𖦏"))) {
					if (k < 9) {
						k += 1;
					} else if (k == 9) {
						k = "X";
					} else if (k == "X") {
						k = "Y";
					} else if (k == "Y") {
						k = "Z";
					} else {
						playerName = countryDict[hltvTableLines[line - 2]] + " " + hltvPlayerName;
						console.log("added new player: " + hltvPlayerName);
						addedNewPlayer = true;
						break;
					}
					playerName = $(this).closest('div.veto-tab').find('input.P' + k).val();
				}
				if (!addedNewPlayer) {
					console.log("found player: " + playerName);
					if (playerName != currentName) {
						$(this).closest('div.veto-tab').find('input.P' + j).val(playerName);
						$(this).closest('div.veto-tab').find('input.P' + k).val(currentName);
						console.log("final player name: " + playerName);
						console.log("switching name: " + currentName);
					} else {
						console.log("final player name: " + playerName);
						console.log("no switch needed");
					}
				} else {
					$(this).closest('div.veto-tab').find('input.P' + j).val(playerName);
				}
			}

			// Past the stats table
			if (hltvTableLines[line].indexOf("Lineups") != -1) stats_finished = true;

			// The VRS Prediction Info started
			if (!vrs_finished && !vrs_started && hltvTableLines[line].indexOf("VRS result") != -1) {
				vrs_started = true;
				line += 4; // Skip the 4 team name lines - necessary in case a team name contains 'pt'
			}

			// Parsing the VRS info
			if (vrs_started && !vrs_finished) {

				// A line with VRS ranks
				if (hltvTableLines[line].indexOf("#") != -1) {

					// Increase the rank count
					vrs_rank_num++;

					// Ranks before
					if (vrs_rank_num == 1) $(this).closest('div.veto-tab').find('input.VRSB1').val(hltvTableLines[line].split('#')[1].trim());
					else if (vrs_rank_num == 2) $(this).closest('div.veto-tab').find('input.VRSB2').val(hltvTableLines[line].split('#')[1].trim());

					// Ranks after
					else if (vrs_rank_num == 3) $(this).closest('div.veto-tab').find('input.VRSA1').val(hltvTableLines[line].split('#')[1].trim());
					else if (vrs_rank_num == 4) {
						$(this).closest('div.veto-tab').find('input.VRSA2').val(hltvTableLines[line].split('#')[1].trim());

						// This is the last portion of the VRS result, can break the overall parsing loop
						break;
					}
				}

				// A line with VRS points
				if (hltvTableLines[line].indexOf('pt') != -1) {

					// Increase the point count
					vrs_pt_num++;

					// Point totals
					if (vrs_pt_num == 1) $(this).closest('div.veto-tab').find('input.VRST1').val(hltvTableLines[line].split('pt')[0]);
					else if (vrs_pt_num == 2) $(this).closest('div.veto-tab').find('input.VRST2').val(hltvTableLines[line].split('pt')[0]);

					// Point differences
					else if (vrs_pt_num == 3) $(this).closest('div.veto-tab').find('input.VRSD1').val(hltvTableLines[line].split('pt')[0]);
					else if (vrs_pt_num == 4) $(this).closest('div.veto-tab').find('input.VRSD2').val(hltvTableLines[line].split('pt')[0]);
				}
			}
		}
	});
	
	// Copy and paste info for individual map stats page
	$(".hltvtable").blur(function () {
		var hltvTable = $(this).val();
		var hltvTableLines = hltvTable.split("\n");
		var team1Name = "";
		var team2Name = "";
		var lineVals = "";
		var foundTeam1 = false;
		var foundTeam2 = false;
		
		/**dictionary for creating css flags from emojis **/
		var countryDict = {	
			"Afghanistan": "🇦🇫","Albania": "🇦🇱","Algeria": "🇩🇿","Andorra": "🇦🇩","Angola": "🇦🇴","Antiga and Barbuda": "🇦🇬","Argentina": "🇦🇷","Armenia": "🇦🇲","Australia": "🇦🇺","Austria": "🇦🇹","Azerbaijan": "🇦🇿",
			"Bahamas": "🇧🇸","Bahrain": "🇧🇭","Bangladesh": "🇧🇩","Barbados": "🇧🇧","Belarus": "🇧🇾","Belgium": "🇧🇪","Belize": "🇧🇿","Benin": "🇧🇯","Bhutan": "🇧🇹","Bolivia": "🇧🇴","Bosnia and Herzegovina": "🇧🇦","Botswana": "🇧🇼","Brazil": "🇧🇷","Brunei": "🇧🇳","Bulgaria": "🇧🇬","Burkina Faso": "🇧🇫","Burundi": "🇧🇮",
			"Cambodia": "🇰🇭","Cameroon": "🇨🇲","Canada": "🇨🇦","Cape Verde": "🇨🇻","Central African Republic": "🇨🇫","Chad": "🇹🇩","Chile": "🇨🇱","China": "🇨🇳","Colombia": "🇨🇴","Comoros": "🇰🇲","Republic of the Congo": "🇨🇬","Democratic Republic of the Congo": "🇨🇩","Costa Rica": "🇨🇷","Cote d'Ivoire": "🇨🇮","Croatia": "🇭🇷","Cuba": "🇨🇺","Cyprus": "🇨🇾","Czechia": "🇨🇿","Czech Republic": "🇨🇿",
			"Denmark": "🇩🇰","Djibouti": "🇩🇯","Dominica": "🇩🇲","Dominican Republic": "🇩🇴",
			"Ecuador": "🇪🇨","Egypt": "🇪🇬","El Salvador": "🇸🇻","Equatorial Guinea": "🇬🇶","Eritrea": "🇪🇷","Estonia": "🇪🇪","Eswatini": "🇸🇿","Ethiopia": "🇪🇹",
			"Faroe Islands": "🇫🇴","Fiji": "🇫🇯","Finland": "🇫🇮","France": "🇫🇷","French Guiana": "🇬🇫",
			"Gabon": "🇬🇦","Gambia": "🇬🇲","Georgia": "🇬🇪","Germany": "🇩🇪","Ghana": "🇬🇭","Greece": "🇬🇷","Grenada": "🇬🇩","Guatemala": "🇬🇹","Guinea-Bissau": "🇬🇼","Guyana": "🇬🇾",
			"Haiti": "🇭🇹","Honduras": "🇭🇳","Hong Kong": "🇭🇰","Hungary": "🇭🇺",
			"Iceland": "🇮🇸","India": "🇮🇳","Indonesia": "🇮🇩","Iran": "🇮🇷","Iraq": "🇮🇶","Ireland": "🇮🇪","Israel": "🇮🇱","Italy": "🇮🇹",
			"Jamaica": "🇯🇲","Japan": "🇯🇵","Jordan": "🇯🇴",
			"Kazakhstan": "🇰🇿","Kenya": "🇰🇪","Kiribati": "🇰🇮","North Korea": "🇰🇵","South Korea": "🇰🇷","Kosovo": "🇽🇰","Kuwait": "🇰🇼","Kyrgyzstan": "🇰🇬",
			"Laos": "🇱🇦","Latvia": "🇱🇻","Lebanon": "🇱🇧","Lesotho": "🇱🇸","Liberia": "🇱🇷","Libya": "🇱🇾","Liechtenstein": "🇱🇮","Lithuania": "🇱🇹","Luxembourg": "🇱🇺",
			"Macau": "🇲🇴","Madagascar": "🇲🇬","Malawi": "🇲🇼","Malaysia": "🇲🇾","Maldives": "🇲🇻","Mali": "🇲🇱","Malta": "🇲🇹","Marshall Islands": "🇲🇭","Mauritania": "🇲🇷","Mauritius": "🇲🇺","Mexico": "🇲🇽","Micronesia": "🇫🇲","Moldova": "🇲🇩","Monaco": "🇲🇨","Mongolia": "🇲🇳","Montenegro": "🇲🇪","Morocco": "🇲🇦","Mozambique": "🇲🇿","Myanmar": "🇲🇲",
			"Namibia": "🇳🇦","Nauru": "🇳🇷","Nepal": "🇳🇵","Netherlands": "🇳🇱","New Zealand": "🇳🇿","Nicaragua": "🇳🇮","Niger": "🇳🇪","Nigeria": "🇳🇬","North Macedonia": "🇲🇰","Norway": "🇳🇴",
			"Oman": "🇴🇲",
			"Pakistan": "🇵🇰","Palau": "🇵🇼","Palestine": "🇵🇸","Panama": "🇵🇦","Papua New Guinea": "🇵🇬","Paraguay": "🇵🇾","Peru": "🇵🇪","Philippines": "🇵🇭","Poland": "🇵🇱","Portugal": "🇵🇹",
			"Qatar": "🇶🇦",
			"Romania": "🇷🇴","Russia": "🇷🇺","Rwanda": "🇷🇼",
			"Saint Kitts and Nevis": "🇰🇳","Saint Lucia": "🇱🇨","Saint Vincent and the Grenadines": "🇻🇨","Samoa": "🇼🇸","San Marino": "🇸🇲","Sao Tome and Principe": "🇸🇹","Saudi Arabia": "🇸🇦","Senegal": "🇸🇳","Serbia": "🇷🇸","Seychelles": "🇸🇨","Sierra Leone": "🇸🇱","Singapore": "🇸🇬","Slovakia": "🇸🇰","Slovenia": "🇸🇮","Solomon Islands": "🇸🇧","Somalia": "🇸🇴","South Africa": "🇿🇦","South Sudan": "🇸🇸","Spain": "🇪🇸","Sri Lanka": "🇱🇰","Sudan": "🇸🇩","Suriname": "🇸🇷","Sweden": "🇸🇪","Switzerland": "🇨🇭","Syria": "🇸🇾",
			"Taiwan": "🇹🇼","Tajikistan": "🇹🇯","Tanzania": "🇹🇿","Thailand": "🇹🇭","Timor-Leste": "🇹🇱","Togo": "🇹🇬","Tonga": "🇹🇴","Trinidad and Tobago": "🇹🇹","Tunisia": "🇹🇳","Türkiye": "🇹🇷","Turkmenistan": "🇹🇲","Tuvalu": "🇹🇻",
			"Uganda": "🇺🇬","Ukraine": "🇺🇦","United Arab Emirates": "🇦🇪","United Kingdom": "🇬🇧","United States": "🇺🇸","Uruguay": "🇺🇾","Uzbekistan": "🇺🇿",
			"Vanuatu": "🇻🇺","Vatican City": "🇻🇦","Venezuela": "🇻🇪","Vietnam": "🇻🇳",
			"Yemen": "🇾🇪",
			"Zambia": "🇿🇲","Zimbabwe": "🇿🇼"
		}
		
		// Loop through lines in the copy paste
		for (var line = 0; line < hltvTableLines.length; line++) {

			// Look for round history
			if (hltvTableLines[line].indexOf("Round history") != -1) {

				// Get the team names
				if (team1Name == "" || team2Name == "") {					
					team1Name = hltvTableLines[line+1].trim();
					var i = 2;
					while (hltvTableLines[line+i].indexOf("-") != -1 || hltvTableLines[line+i].trim() == "") {
						i++;
					}
					team2Name = hltvTableLines[line+i].trim();
				}
			}
		}

		// Loop through known teams
		for (team in TEAMS) {

			// Check if team 1's name matches the name found on HLTV
			if (TEAMS[team]["HLTV Name"] == team1Name) {
				$(this).closest('div.main').find('input.T1').val(TEAMS[team]["Name"]);
				$(this).closest('div.main').find('input.T1').blur();
				team1Name = TEAMS[team]["Name"];
				foundTeam1 = true;

			// Check if team 2's name matches the name found on HLTV
			} else if (TEAMS[team]["HLTV Name"] == team2Name) {
				$(this).closest('div.main').find('input.T2').val(TEAMS[team]["Name"]);
				$(this).closest('div.main').find('input.T2').blur();
				team2Name = TEAMS[team]["Name"];
				foundTeam2 = true;
			}
		}
		
		// Team 1 on HLTV is not in database, create new team entry
		if (!foundTeam1) {
			TEAMS[team1Name] = {"LOGO":"lang-un", "LOGOW":"FALSE", "Initials":team1Name, "HLTV Name":team1Name, "Name":team1Name, "PLAYER 1":"", "PLAYER 2":"", "PLAYER 3":"", "PLAYER 4":"", "PLAYER 5":"", "PLAYER 6":"", "Wiki":"", "HLTV":"", "Official Site":"", "Twitter":"", "Facebook":"", "Instagram":"", "YouTube":"", "Twitch":"", "Subreddit":"", "TikTok":"", "Weibo":""}
			$(this).closest('div.main').find('input.T1').val(TEAMS[team]["Name"]);
			$(this).closest('div.main').find('input.T1').blur();
			team1Name = TEAMS[team]["Name"];
		}

		// Team 2 on HLTV is not in database, create new team entry
		if (!foundTeam2) {
			TEAMS[team2Name] = {"LOGO":"lang-un", "LOGOW":"FALSE", "Initials":team2Name, "HLTV Name":team2Name, "Name":team2Name, "PLAYER 1":"", "PLAYER 2":"", "PLAYER 3":"", "PLAYER 4":"", "PLAYER 5":"", "PLAYER 6":"", "Wiki":"", "HLTV":"", "Official Site":"", "Twitter":"", "Facebook":"", "Instagram":"", "YouTube":"", "Twitch":"", "Subreddit":"", "TikTok":"", "Weibo":""}
			$(this).closest('div.main').find('input.T2').val(TEAMS[team]["Name"]);
			$(this).closest('div.main').find('input.T2').blur();
			team2Name = TEAMS[team]["Name"];
		}

		// Find the important inputs? - don't really know what this is doing, but I think it has something to do with player names
		for (k = 1; k <= 12; k++) {
			if (k < 10) {
				$(this).closest('div.main').find('input.L' + k).val("");		
				$(this).closest('div.main').find('input.R' + k).val("");
			} else {
				$(this).closest('div.main').find('input.LX' + (k-10)).val("");
				$(this).closest('div.main').find('input.RX' + (k-10)).val("");
			}
		}
		
		var i = 0;

		// Loop through lines in the copy paste
		for (var line = 0; line < hltvTableLines.length; line++) {

			// No more useful information - break
			if (hltvTableLines[line].indexOf("RECENT ACTIVITY") != -1) {
				break;
			}

			// '%' is in the line - must be one of the lines of statistics
			if (hltvTableLines[line].indexOf("%") != -1) {
				i += 1;
				if (i == 10) {
					i = "X";
				}

				// Split the table values by whitespace
				lineVals = hltvTableLines[line].split(" ").join("\t").split("\t");
				lineVals = lineVals.filter(function (el) {
					return el != "";
				});

				// Get the K, D, ADR, Swing, and Rating
				$(this).closest('div.main').find('input.K' + i).val(lineVals[6]);
				$(this).closest('div.main').find('input.D' + i).val(lineVals[10]);
				$(this).closest('div.main').find('input.ADR' + i).val(lineVals[12]);
				$(this).closest('div.main').find('input.SW' + i).val(lineVals[13]);
				$(this).closest('div.main').find('input.RA' + i).val(lineVals[14]);

				// Get the player for these stats
				playerName = $(this).closest('div.main').find('input.P' + i).val();
				currentName = playerName;
				if (playerName == null) playerName = "";
				console.log("initial player name: " + playerName);
				var j = i;
				var addedNewPlayer = false;
				hltvPlayerName = hltvTableLines[line-1].trim();
				console.log("HLTV Player Name: " + hltvTableLines[line-1]);
				while (!(playerName.trim().endsWith(hltvPlayerName)) && !(playerName.trim().endsWith(hltvPlayerName + " ♛")) && !(playerName.trim().endsWith(hltvPlayerName + " 𖦏")) && !(playerName.trim().endsWith(hltvPlayerName + " ♛𖦏"))) {
					if (j < 9) {
						j += 1;
					} else if (j == 9) {
						j = "X";
					} else if (j == "X") {
						j = "Y";
					} else if (j == "Y") {
						j = "Z";
					} else {
						playerName = countryDict[hltvTableLines[line - 2]] + " " + hltvPlayerName;
						console.log("added new player: " + playerName);
						addedNewPlayer = true;
						break;
					}
					playerName = $(this).closest('div.main').find('input.P' + j).val();
				}
				if (!addedNewPlayer) {
					console.log("found player: " + playerName);
					if (playerName != currentName) {
						$(this).closest('div.main').find('input.P' + i).val(playerName);
						$(this).closest('div.main').find('input.P' + j).val(currentName);
						console.log("final player name: " + playerName);
						console.log("switching name: " + currentName);
					} else {
						console.log("final player name: " + playerName);
						console.log("no switch needed");
					}
				} else {
					$(this).closest('div.main').find('input.P' + i).val(playerName);
				}

			// Get the round stats pre overtime
			} else if (hltvTableLines[line].indexOf("(") != -1 && hltvTableLines[line].indexOf(":") != -1 && hltvTableLines[line].indexOf("%") == -1 && hltvTableLines[line].indexOf("\"") == -1) {
				console.log("regulation");
				lineVals = hltvTableLines[line].split(" ").join("\t").split("\t");
				$(this).closest('div.main').find('input.L1').val(lineVals[4]);
				$(this).closest('div.main').find('input.R1').val(lineVals[6]);
				$(this).closest('div.main').find('input.L2').val(lineVals[9]);
				$(this).closest('div.main').find('input.R2').val(lineVals[11]);
				if (parseInt(lineVals[0]) > parseInt(lineVals[2])) {
					$(this).closest('div.main').find('select.winner').val(team1Name);
				} else {
					$(this).closest('div.main').find('select.winner').val(team2Name);
				}

			// Get the overtime stats
			} else if (hltvTableLines[line] == "Overtime") {
				console.log("overtime");
				var k = 2;
				var highest = 3;
				while ((hltvTableLines[line + k].indexOf("-") != -1 && hltvTableLines[line + k].indexOf(".") == -1) || hltvTableLines[line + k].trim() == "") {
					lineVals = hltvTableLines[line + k];
					if (lineVals.indexOf("[") != -1) { //firefox
						lineVals = lineVals.split(" ").join("").split("[").join("").split("]");
						lineVals = lineVals.slice(0, -1);
						console.log(lineVals);
					} else { //chromium browsers
						var temp = [];
						for (let start = 0; start < lineVals.length; start += 5) {
							temp.push(lineVals.substring(start, start + 5));
						}
						lineVals = temp;
						console.log(lineVals);
					}
					for (round in lineVals) {
						var roundNum = parseInt(lineVals[round].substring(0,2)) + parseInt(lineVals[round].substring(3,5));
						console.log(roundNum);
						if (roundNum < 28) {
							$(this).closest('div.main').find('input.L3').val(lineVals.length);
						} else if (roundNum < 31) {
							$(this).closest('div.main').find('input.L4').val(lineVals.length);
							highest = 4;
						} else if (roundNum < 34) {
							$(this).closest('div.main').find('input.L5').val(lineVals.length);
							highest = 5;
						} else if (roundNum < 37) {
							$(this).closest('div.main').find('input.L6').val(lineVals.length);
							highest = 6;
						} else if (roundNum < 40) {
							$(this).closest('div.main').find('input.L7').val(lineVals.length);
							highest = 7;
						} else if (roundNum < 43) {
							$(this).closest('div.main').find('input.L8').val(lineVals.length);
							highest = 8;
						} else if (roundNum < 46) {
							$(this).closest('div.main').find('input.L9').val(lineVals.length);
							highest = 9;
						} else if (roundNum < 49) {
							$(this).closest('div.main').find('input.LX0').val(lineVals.length);
							highest = 10;
						} else if (roundNum < 52) {
							$(this).closest('div.main').find('input.LX1').val(lineVals.length);
							highest = 11;
						} else if (roundNum < 55) {
							$(this).closest('div.main').find('input.LX2').val(lineVals.length);
							highest = 12;
						}
					}
					k += 1;
				}
				k += 1;
				while ((hltvTableLines[line + k].indexOf("-") != -1 && hltvTableLines[line + k].indexOf(".") == -1) || hltvTableLines[line + k].trim() == "") {
					lineVals = hltvTableLines[line + k];
					if (lineVals.indexOf("[") != -1) {
						lineVals = lineVals.split(" ").join("").split("[").join("").split("]");
						lineVals = lineVals.slice(0, -1);
						console.log(lineVals);
					} else { //chromium browsers
						var temp = [];
						for (let start = 0; start < lineVals.length; start += 5) {
							temp.push(lineVals.substring(start, start + 5));
						}
						lineVals = temp;
						console.log(lineVals);
					}
					for (round in lineVals) {
						var roundNum = parseInt(lineVals[round].substring(0,2)) + parseInt(lineVals[round].substring(3,5));
						if (roundNum < 28) {
							$(this).closest('div.main').find('input.R3').val(lineVals.length);
						} else if (roundNum < 31) {
							$(this).closest('div.main').find('input.R4').val(lineVals.length);
							if (4 > highest) highest = 4;
						} else if (roundNum < 34) {
							$(this).closest('div.main').find('input.R5').val(lineVals.length);
							if (5 > highest) highest = 5;
						} else if (roundNum < 37) {
							$(this).closest('div.main').find('input.R6').val(lineVals.length);
							if (6 > highest) highest = 6;
						} else if (roundNum < 40) {
							$(this).closest('div.main').find('input.R7').val(lineVals.length);
							if (7 > highest) highest = 7;
						} else if (roundNum < 43) {
							$(this).closest('div.main').find('input.R8').val(lineVals.length);
							if (8 > highest) highest = 8;
						} else if (roundNum < 46) {
							$(this).closest('div.main').find('input.R9').val(lineVals.length);
							if (9 > highest) highest = 9;
						} else if (roundNum < 49) {
							$(this).closest('div.main').find('input.RX0').val(lineVals.length);
							if (10 > highest) highest = 10;
						} else if (roundNum < 52) {
							$(this).closest('div.main').find('input.RX1').val(lineVals.length);
							if (11 > highest) highest = 11;
						} else if (roundNum < 55) {
							$(this).closest('div.main').find('input.RX2').val(lineVals.length);
							if (12 > highest) highest = 12;
						}
					}
					k += 1;
				}
				for (k = 1; k <= highest; k++) {
					if (k < 10) {
						if ($(this).closest('div.main').find('input.L' + k).val() == "") {
							$(this).closest('div.main').find('input.L' + k).val(0);
						}
						if ($(this).closest('div.main').find('input.R' + k).val() == "") {
							$(this).closest('div.main').find('input.R' + k).val(0);
						}
					} else {
						if ($(this).closest('div.main').find('input.LX' + (k-10)).val() == "") {
							$(this).closest('div.main').find('input.LX' + (k-10)).val(0);
						}
						if ($(this).closest('div.main').find('input.RX' + (k-10)).val() == "") {
							$(this).closest('div.main').find('input.RX' + (k-10)).val(0);
						}
					}
				}
			}
		}
	});

	$(".T1").blur(function () {
		var teamID = $(this).val();
		var teamFullName = "";
		if (TEAMS[teamID] != null || TEAMS[teamID] != "") {
			$(this).css('border-color', '#2ecc40');
			teamFullName = TEAMS[teamID]["Name"];
		} else {
			$(this).css('border-color', '#ff4136');
			teamFullName = teamID;
		}
		$(this).closest('div.main').find('input.IconT1').val(Iconify(teamID));

		var selectElem = $(this).closest('div.main').find(".winner");
		var length = $(selectElem).children('option').length;
		if (length >= 3) {
			var option = $(this).closest('div.main').find(".winner option:nth-child(2)");
			option.text(teamFullName);
			option.val(teamFullName);
		} else {
			selectElem.append('<option value="' + teamFullName + '">' + teamFullName + '</option>');
		}

		if (TEAMS[teamID]) {
			var index = 0;
			$(this).closest('div.main').find(".pps > div:nth-child(1) .players input").each(function () {
				playerName = TEAMS[teamID][LB.PMTC.roleId[index]];
				$(this).val(playerName);
				$(this).closest('div.main').find(".game-mvp").append('<option value="' + playerName + '">' + playerName + '</option>');
				index++;
			});
		}
	});

	$(".T2").blur(function () {
		var teamID = $(this).val();
		var teamFullName = "";

		if (TEAMS[teamID] != null || TEAMS[teamID] != "") {
			$(this).css('border-color', '#2ecc40');
			teamFullName = TEAMS[teamID]["Name"];
		} else {
			$(this).css('border-color', '#ff4136');
			teamFullName = teamID;
		}

		$(this).closest('div.main').find('input.IconT2').val(Iconify(teamID));

		var selectElem = $(this).closest('div.main').find(".winner");
		var length = $(selectElem).children('option').length;
		if (length >= 3) {
			var option = $(this).closest('div.main').find(".winner option:nth-child(3)");
			option.text(teamFullName);
			option.val(teamFullName);
		} else {
			selectElem.append('<option value="' + teamFullName + '">' + teamFullName + '</option>');
		}

		if (TEAMS[teamID]) {
			var index = 0;
			$(this).closest('div.main').find(".pps > div:nth-child(2) .players input").each(function () {
				playerName = TEAMS[teamID][LB.PMTC.roleId[index]];
				$(this).val(playerName);
				$(this).closest('div.main').find(".game-mvp").append('<option value="' + playerName + '">' + playerName + '</option>');
				index++;
			});
		}
	});

	$(".maint1").blur(function () {
		var teamID = $(this).val();
		var teamFullName = "";
		if (TEAMS[teamID] != null || TEAMS[teamID] != "") {
			$(this).css('border-color', '#2ecc40');
			teamFullName = TEAMS[teamID]["Name"];
		} else {
			$(this).css('border-color', '#ff4136');
			teamFullName = teamID;
		}

		if (TEAMS[teamID]) {
			var index = 0;
			$(this).closest('div.veto-tab').find(".pps > div:nth-child(1) .players input").each(function () {
				playerName = TEAMS[teamID][LB.PMTC.roleId[index]];
				$(this).val(playerName);
				index++;
			});
		}
	});

	$(".maint2").blur(function () {
		var teamID = $(this).val();
		var teamFullName = "";
		if (TEAMS[teamID] != null || TEAMS[teamID] != "") {
			$(this).css('border-color', '#2ecc40');
			teamFullName = TEAMS[teamID]["Name"];
		} else {
			$(this).css('border-color', '#ff4136');
			teamFullName = teamID;
		}

		if (TEAMS[teamID]) {
			var index = 0;
			$(this).closest('div.veto-tab').find(".pps > div:nth-child(2) .players input").each(function () {
				playerName = TEAMS[teamID][LB.PMTC.roleId[index]];
				$(this).val(playerName);
				index++;
			});
		}
	});


	/** For MVP select when teams have subs **/

	/* Save data on focus */
	$('.players input[type=text]').on("focus", function () {
		$(this).data("previous-value", $(this).val());
	});

	$('.players input[type=text]').on('blur', function () {
		var playerName = $(this).val();
		var toRemove = $(this).data("previous-value");
		var toChange = $(this).closest('div.main').find(".game-mvp option[value='" + toRemove + "']");
		toChange.val(playerName);
		toChange.text(playerName);
	});
}); // END OF $(document).ready(function(){

// Before refreshing the page, save the form data to localStorage
window.onbeforeunload = function () {
	$('#div-thread-info input').each(function (e) {
		var key = $(this).attr('id');
		var val = $(this).val();
		localStorage.setItem(key, val);
	});
	$('#panels > div:nth-child(1) input').each(function (e) {
		var key = $(this).attr('class');
		var val = $(this).val();
		localStorage.setItem(key, val);
	});
	
	localStorage.setItem("live-thread-checkbox", $("#live-thread-checkbox").is(":checked"));
	localStorage.setItem("advantage-checkbox", $("#advantage-checkbox").is(":checked"));
	localStorage.setItem("final-checkbox", $("#final-checkbox").is(":checked"));
	localStorage.setItem("epl-checkbox", $("#epl-checkbox").is(":checked"));
	localStorage.setItem("pmt-checkbox", $("#pmt-checkbox").is(":checked"));
	
	for (i = 2; i <= 6; i++) {
		$('#panels > .main:nth-child(' + i + ') input').each(function (e) {
			var key = i + "_" + $(this).attr('class');
			var val = $(this).val();
			localStorage.setItem(key, val);
		});
		
		$('#panels > .main:nth-child(' + i + ') textarea').each(function (e) {
			var key = i + "_" + $(this).attr('class');
			var val = $(this).val();
			localStorage.setItem(key, val);
		});

		$('#panels > .main:nth-child(' + i + ') .team-pps:nth-child(1) .picks').each(function (e) {
			var key = i + "_blue_picks";
			var val = $(this).html();
			localStorage.setItem(key, val);
		});

		$('#panels > .main:nth-child(' + i + ') .team-pps:nth-child(2) .picks').each(function (e) {
			var key = i + "_red_picks";
			var val = $(this).html();
			localStorage.setItem(key, val);
		});

		$('#panels > .main:nth-child(' + i + ') .drag-counter').each(function (e) {
			var key = i + "drag_counter";
			var val = $(this).data('drag-counter');
			localStorage.setItem(key, val);
		});
		
		localStorage.setItem(i + "left-side-checkbox", $("#panels > div:nth-child(" + i + ") #left-side-checkbox").is(":checked"));
		localStorage.setItem(i + "simple-scores-checkbox", $("#panels > div:nth-child(" + i + ") #simple-scores-checkbox").is(":checked"));
		localStorage.setItem(i + "simple-stats-checkbox", $("#panels > div:nth-child(" + i + ") #simple-stats-checkbox").is(":checked"));

		$('#panels > .main:nth-child(' + i + ') select').each(function (e) {
			console.log("Storing some select value: " + $(this).val());
			if ($(this).val() !== '') {
				var key = i + "_" + $(this).attr('class');
				var val = $(this).val();
				localStorage.setItem(key, val);
			}
		});

		$('#panels > .main:nth-child(' + i + ') .game-infos-poll input').each(function (e) {
			console.log("Storing some select value: " + $(this).val());
			if ($(this).val() !== '') {
				var key = i + "_" + $(this).attr('class');
				var val = $(this).val();
				localStorage.setItem(key, val);
			}
		});
	}
	
	$('#panels > div:nth-child(7) input').each(function (e) {
		var key = $(this).attr('class');
		var val = $(this).val();
		localStorage.setItem(key, val);
	});
}

var TEAMS = {};

$.post("../php/getJSON.php", {
	feed: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRFFzItpu4lT2eE6ivgvZdA-rMkB_sYT5LSWicXXEnkt-2mdMwThMbmAj0z8e9JTzWawtZBsDCehNeJ/pub?output=csv"
	//feed: "../csgo/csv/Full_Teams.csv"
}).done(function (d) {
	
	console.log(JSON.stringify(d));

	for (i in d) {
		TEAMS[d[i]["Name"]] = d[i];
	}

	LB = {};

	LB.PMTC = {};

	LB.PMTC.roleId = {
		0: "PLAYER 1",
		1: "PLAYER 2",
		2: "PLAYER 3",
		3: "PLAYER 4",
		4: "PLAYER 5",
		5: "PLAYER 6"
	};

	LB.PMTC.loadAndParse = function (id, type) {
		var dataString = localStorage.getItem(id) || false;
		switch (type) {
			case "object":
				return JSON.parse(dataString) || {};
				break;
			case "array":
				return JSON.parse(dataString) || [];
				break;
		}
	}

	console.log("Loading Teams - First time: Successful")

	// Part 2
	var teamListArray = d;

	LB.PMTC.teamListObject = {};

	for (i = 0; i < teamListArray.length; i++) {
		LB.PMTC.teamListObject[teamListArray[i].INITIALS] = teamListArray[i];
	}

	datalist = document.createElement("datalist");

	console.log(datalist);

	datalist.id = "TeamDataList";

	teamnames = [];

	for (i in TEAMS) {
		var o = document.createElement("option");

		o.value = i;

		datalist.appendChild(o);
		teamnames.push(i);
	}
	document.body.appendChild(datalist);

	$("#fade").addClass('hidden');
	$("#loading-teams-popup").addClass('hidden');

	console.log("Loading Teams - Second time: Successful");
});

var EVENTS = {}

$.post("../php/getJSON.php", {
	feed: "https://docs.google.com/spreadsheets/d/1op6sU2qE8Gugtn6SLhiTJDaFqQFPN_GlmEs8cHNeO9M/pub?output=csv"
	//feed: "../csgo/csv/Events.csv"
}).done(function (d) {
	
	console.log(JSON.stringify(d));

	for (i in d) {
		EVENTS[d[i]["Name"]] = d[i];
	}

	$("#fade").addClass('hidden');
	$("#loading-teams-popup").addClass('hidden');

	console.log("Loading Events: Successful");
});

function IconifyVeto(teamID) {
	if (TEAMS[teamID]["LOGO"].indexOf("lang") != -1) //team only has country flag, so just use initials
		return Initialsa(teamID);
	else if (TEAMS[teamID]["LOGO"].indexOf("🌎") == -1 && TEAMS[teamID]["LOGO"].indexOf("🌍") == -1 && TEAMS[teamID]["LOGO"].indexOf("🌏") == -1) 									//regular logo
		return "[" + Initialsa(teamID) + TEAMS[teamID]["LOGO"].substring(5) + "-logo)";
	else
		return "[" + Initialsa(teamID) + TEAMS[teamID]["LOGO"].substring(3) + "-logo)";
	
}

function IconifyVetoW(teamID) {
	if (TEAMS[teamID]["LOGOW"] == "FALSE") //team without a white logo
		return IconifyVeto(teamID);
	else if (TEAMS[teamID]["LOGO"].indexOf("🌎") == -1 && TEAMS[teamID]["LOGO"].indexOf("🌍") == -1 && TEAMS[teamID]["LOGO"].indexOf("🌏") == -1) 						//team with a white logo
		return "[" + Initialsa(teamID) + TEAMS[teamID]["LOGO"].substring(5) + "w-logo)"; 
	else
		return "[" + Initialsa(teamID) + TEAMS[teamID]["LOGO"].substring(3) + "w-logo)"; 
}

function IconifyStats(teamID) {
	if (TEAMS[teamID]["LOGO"] == "lang-un") //no image as logo
		return "**";
	else if (TEAMS[teamID]["LOGO"].indexOf("lang") != -1) //country flag as logo
		return "**" + TEAMS[teamID]["LOGO"] + ") ";
	else										//regular logo
		return "" + TEAMS[teamID]["LOGO"] + "-logo) **";
}

//function Iconify(teamID) {
//	if (TEAMS[teamID]["LOGO"] === "lang-un") //no image as logo
//		return "";
//	else if (TEAMS[teamID]["LOGO"].indexOf("lang") == -1) //regular logo
//		return "[](#" + TEAMS[teamID]["LOGO"] + "-logo)";
//	else										//country flag as logo
//		return "[](#" + TEAMS[teamID]["LOGO"] + ")";
//}

function Iconify(teamID) {
	if (TEAMS[teamID]["LOGO"] == "lang-un") //no image as logo
		return "";
	else if (TEAMS[teamID]["LOGO"].indexOf("lang") != -1) //country flag as logo
		return "" + TEAMS[teamID]["LOGO"] + ")";
	else										//regular logo
		return "" + TEAMS[teamID]["LOGO"] + "-logo)";
}

function IconifyW(teamID) {
	if (TEAMS[teamID]["LOGOW"] == "FALSE")
		return Iconify(teamID);
	else
		return "" + TEAMS[teamID]["LOGO"] + "w-logo)";
}

/**dictionary for creating css flags from emojis **/
var flagDict = {	
	"🇦": "a",
	"🇧": "b",
	"🇨": "c",
	"🇩": "d",
	"🇪": "e",
	"🇫": "f",
	"🇬": "g",
	"🇭": "h",
	"🇮": "i",
	"🇯": "j",
	"🇰": "k",
	"🇱": "l",
	"🇲": "m",
	"🇳": "n",
	"🇴": "o",
	"🇵": "p",
	"🇶": "q",
	"🇷": "r",
	"🇸": "s",
	"🇹": "t",
	"🇺": "u",
	"🇻": "v",
	"🇼": "w",
	"🇽": "x",
	"🇾": "y",
	"🇿": "z"	
}

function Flagify(playerName) {
	var flag = playerName.slice(0,4);
	if (flag.indexOf("🌍") != -1 || flag.indexOf("🌏") != -1 || flag.indexOf("🌎") != -1)
		return playerName
		//return "[" + playerName.slice(0, 2) + "](#lang-earth)" + playerName.slice(2);
	else 
		return "[" + flag + "](#lang-" + flagDict[playerName.slice(0,2)] + flagDict[playerName.slice(2,4)] + ")" + playerName.slice(4);
}

function Initialsa(teamID) {
	if (TEAMS[teamID]["Initials"] == "")
		return teamID;
	return TEAMS[teamID]["Initials"];
}

function InsertMaps() {
	var mapIndex = 1;
	var inputIndex = 1;

	$("#panels > div:nth-child(1) .select-maps input").each(function () {
		if ($(this).attr("class")) {
			if (!$(this).attr("o")) {
				var inputClassLVal = $("#panels > div:nth-child(1) .ML" + inputIndex).val();
				var inputClassRVal = $("#panels > div:nth-child(1) .MR" + inputIndex).val();
				var inputClassMVal = Proper($("#panels > div:nth-child(1) .MP" + inputIndex).val());
				if (inputClassMVal != '' && inputClassMVal != null) {
					if (((inputClassLVal == "") && (inputClassRVal == "")) || (inputClassLVal == "✔" || inputClassRVal == "✔")) {
						$("#panels > div:nth-child(" + (mapIndex + 1) + ") .game-map").val(inputClassMVal);
						mapIndex++;
					}
				}
			}
		}
		inputIndex++;
	});
}

function CountMaps() {
	var count = 0;
	var inputIndex = 1;

	$("#panels > div:nth-child(1) .select-maps input").each(function () {
		if ($(this).attr("class")) {
			if (!$(this).attr("o")) {
				var inputClassLVal = $("#panels > div:nth-child(1) .ML" + inputIndex).val();
				var inputClassRVal = $("#panels > div:nth-child(1) .MR" + inputIndex).val();
				var inputClassMVal = Proper($("#panels > div:nth-child(1) .MP" + inputIndex).val());
				if (inputClassMVal != '' && inputClassMVal != null) {
					count++;
				}
			}
		}
		inputIndex++;
	});
	return count;
}

function CountMapsPlayed() {
	var count = 0;
	var inputIndex = 1;

	$("#panels > div:nth-child(1) .select-maps input").each(function () {
		if ($(this).attr("class")) {
			if (!$(this).attr("o")) {
				var inputClassLVal = $("#panels > div:nth-child(1) .ML" + inputIndex).val();
				var inputClassRVal = $("#panels > div:nth-child(1) .MR" + inputIndex).val();
				var inputClassMVal = Proper($("#panels > div:nth-child(1) .MP" + inputIndex).val());
				if (inputClassMVal != '' && inputClassMVal != null) {
					if (((inputClassLVal == "") && (inputClassRVal == "")) || (inputClassLVal == "✔" || inputClassRVal == "✔")) {
						count++;
					}
				}
			}
		}
		inputIndex++;
	});
	console.log("MAP COUNT: " + count);
	return count;
}

function Proper(string) {
	var map = string.charAt(0).toUpperCase() + string.slice(1);
	if (map == "Cbble") {
		map = "Cobblestone";
	} else if (map == "Dust2") {
		map = "Dust 2";
	}
	return map;
}

function SearchReplace(match, replacer, string) {

	var length = match.length;

	var position = string.search(match);

	var id = match.split("%")[1];

	var newstr = string;

	if (string.charAt(position + length) === "o") {
		newstr = string.replace(match + "o", replacer.value);
		position = newstr.search(match);
		if (newstr.charAt(position + length) === "f") {
			newstr = newstr.replace(match + "f", replacer.value.Flarify());
		}
	}

	return newstr.replace(new RegExp(match, "g"), replacer.value, "g");

}

function updateEventInfos(eventId) {
	if (eventId == "") {
		return;
	}
	$('#event-name').val(eventInfos[eventId]["name"]);
	$('#liquipedia-link').val(eventInfos[eventId]["liquipedia"]);
	$('#lolesports-link').val(eventInfos[eventId]["lolesports"]);
};

function titleCase(str) {
	var splitStr = str.toLowerCase().split(' ');
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		dashSplit = splitStr[i].split('-');
		if (dashSplit.length == 2) {
			dashSplit[1] = dashSplit[1].charAt(0).toUpperCase() + dashSplit[1].substring(1);
			splitStr[i] = dashSplit.join('-');
		}
	}
	return splitStr.join(' ');
}