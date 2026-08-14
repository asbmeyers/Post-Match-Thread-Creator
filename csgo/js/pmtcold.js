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
	for (i = 2; i <= 6; i++) {
		$('#panels > .main:nth-child(' + i + ') select').each(function (e) {
			var key = i + "_" + $(this).attr('class');
			var value = localStorage.getItem(key);
			if (value !== null && value !== '' && value !== 'null') {
				$(this).append('<option selected="selected" value="' + value + '">' + value + '</option>');
			}
		});
		$('#panels > .main:nth-child(' + i + ') .team-pps:nth-child(1) .players').each(function (e) {
			$(this).sortable();
		});

		$('#panels > .main:nth-child(' + i + ') .team-pps:nth-child(2) .players').each(function (e) {
			$(this).sortable();
		});

		$('#panels > .main:nth-child(' + i + ') .drag-counter').each(function (e) {
			var key = i + "drag_counter";
			var val = localStorage.getItem(key);
			if (val !== null && val !== undefined && val !== '') {
				$(this).data('drag-counter', Number(val));
			}
		});	
		
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
		$('.pps').html('');
		$('.pps').html(initialPPS);

		// re set picks as sortable
		$(".players").sortable();

		// re-set the trigger to blur and add the span.
		$(".scores-adr input").inputmask();
		$(".scores-rating input").inputmask();
		
		var eName = $('#event-name').val();
		var eLink = $('#live-thread-link').val();
		document.getElementById("create").reset();
		$('#event-name').val(eName);
		$('#live-thread-link').val(eLink);
		
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
		$('.pps').html('');
		$('.pps').html(initialPPS);

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
						} else if (["dust2", "mirage", "cache", "vertigo", "ancient", "inferno", "nuke", "train", "overpass", "cbble"].indexOf(mapPick) >= 0) {
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

		for (i = 1; i < 6; i++) {
			// check if this tab has teams filled
			var team1ID = $("#panels > div:nth-child(" + (i + 1) + ") .T1").val();
			var team2ID = $("#panels > div:nth-child(" + (i + 1) + ") .T2").val();
			var team1GID = $("#panels > div:nth-child(1) .maint1").val();
			var team2GID = $("#panels > div:nth-child(1) .maint2").val();
			if (team1ID != "" && team2ID != "") {
				data[i] = {};
				$("#panels > div:nth-child(" + (i + 1) + ") input").each(function (e) {
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

				// event name
				data[i]["event-name"] = {};
				data[i]["event-name"].value = $("#event-name").val();

				// live thread link
				data[i]["live-thread-link"] = {};
				data[i]["live-thread-link"].value = $("#live-thread-link").val();
				
				// Team1 Initials
				data[i]["Team1Initials"] = {};
				data[i]["Team1Initials"].value = Initialsa(team1ID);

				// Team2 Initials
				data[i]["Team2Initials"] = {};
				data[i]["Team2Initials"].value = Initialsa(team2ID);

				// Team White
				data[i]["IconWTA1"] = {};
				data[i]["IconWTA1"].value = IconifyW(team1GID);
				data[i]["IconWTA2"] = {};
				data[i]["IconWTA2"].value = IconifyW(team2GID);
				data[i]["IconWT1"] = {};
				data[i]["IconWT1"].value = IconifyW(team1ID);
				data[i]["IconWT2"] = {};
				data[i]["IconWT2"].value = IconifyW(team2ID);

				data[i]["IconVWTA1"] = {};
				data[i]["IconVWTA1"].value = IconifyVetoW(team1GID);
				data[i]["IconVWTA2"] = {};
				data[i]["IconVWTA2"].value = IconifyVetoW(team2GID);
				
				data[i]["IconStatsT1"] = {};
				data[i]["IconStatsT1"].value = IconifyStats(team1ID);
				data[i]["IconStatsT2"] = {};
				data[i]["IconStatsT2"].value = IconifyStats(team2ID);

				// series result
				inputVal = $("#series-result").val();
				if (inputVal == null || inputVal == '') {
					inputVal = '0-0';
				}
				data[i]["series-result"] = {};
				data[i]["series-result"].value = inputVal;
				
				//winner and loser name/icon
				inputVal = inputVal.split("-");
				if (Number(inputVal[1]) > Number(inputVal[0])) {
					data[i]["IconWinner"] = {};
					data[i]["IconWinner"].value = Iconify(team2GID);
					data[i]["WinnerName"] = {};
					data[i]["WinnerName"].value = team2GID
					data[i]["IconLoser"] = {};
					data[i]["IconLoser"].value = Iconify(team1GID);
					data[i]["LoserName"] = {};
					data[i]["LoserName"].value = team1GID
				} else {
					data[i]["IconWinner"] = {};
					data[i]["IconWinner"].value = Iconify(team1GID);
					data[i]["WinnerName"] = {};
					data[i]["WinnerName"].value = team1GID
					data[i]["IconLoser"] = {};
					data[i]["IconLoser"].value = Iconify(team2GID);
					data[i]["LoserName"] = {};
					data[i]["LoserName"].value = team2GID
				}
					

				// series context
				inputVal = $("#winners-context").val().trim();
				if ($("#winner-next-opponent").val() != "") {
					if (inputVal != '') {
						inputVal += ' and ';
					}
					inputVal += "will face " + Iconify($("#winner-next-opponent").val()) + " " + $("#winner-next-opponent").val();
					if ($("#winner-next-opponent2").val() != "") {
						inputVal += " or " + Iconify($("#winner-next-opponent2").val()) + " " + $("#winner-next-opponent2").val();
					}
				} else if ($("#winner-next-opponent2").val() != "") {
					if (inputVal != '') {
						inputVal += ' and ';
					}
					inputVal += "will face " + Iconify($("#winner-next-opponent2").val()) + " " + $("#winner-next-opponent2").val();
				}
				data[i]["series-context1"] = {};
				data[i]["series-context1"].value = inputVal;
				
				inputVal = $("#losers-context").val().trim();
				if ($("#loser-next-opponent").val() != "") {
					if (inputVal != '') {
						inputVal += ' and ';
					}
					inputVal += "will face " + Iconify($("#loser-next-opponent").val()) + " " + $("#loser-next-opponent").val();
					if ($("#loser-next-opponent2").val() != "") {
						inputVal += " or " + Iconify($("#loser-next-opponent2").val()) + " " + $("#loser-next-opponent2").val();
					}
				} else if ($("#loser-next-opponent2").val() != "") {
					if (inputVal != '') {
						inputVal += ' and ';
					}
					inputVal += "will face " + Iconify($("#loser-next-opponent2").val()) + " " + $("#loser-next-opponent2").val();
				}
				data[i]["series-context2"] = {};
				data[i]["series-context2"].value = inputVal;

				// T1 for the series result
				inputVal = team1GID;
				if (inputVal == null || inputVal == '') {
					inputVal = 'tbd';
				}
				data[i]["Team1name"] = {};
				data[i]["Team1name"].value = inputVal;
				
				data[i]["Team1Default"] = {};
				data[i]["Team1Default"].value = inputVal.replace(" ", " ^");

				// T2 for the series result
				inputVal = team2GID;
				if (inputVal == null || inputVal == '') {
					inputVal = 'tbd';
				}
				data[i]["Team2name"] = {};
				data[i]["Team2name"].value = inputVal;

				// winner of each game
				inputVal = $("#panels > div:nth-child(" + i + ") .winner").val();
				if (inputVal == null || inputVal == '') {
					inputVal = 'tbd';
				}
				data[i]["winner"] = {};
				data[i]["winner"].value = inputVal;

				// map of each game
				inputVal = $("#panels > div:nth-child(" + (i + 1) + ") .game-map").val();
				if (inputVal == null || inputVal == '') {
					inputVal = 'tbd';
				}
				data[i]["pergame-map" + i] = {};
				data[i]["pergame-map" + i].value = inputVal;

				// match-history link of each game
				inputVal = $("#panels > div:nth-child(" + (i + 1) + ") .match-history").val();
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
				data[i]["LRounds" + i] = {};
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
				data[i]["LRounds" + i].value = roundCounterTemp;
				data[i]["LRoundst"].value = roundCounterTemp;

				roundCounterTemp = 0;
				data[i]["RRounds" + i] = {};
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
				data[i]["RRounds" + i].value = roundCounterTemp;
				data[i]["RRoundst"].value = roundCounterTemp;

				var index = 0;
				var playerNumber = 0;
				$("#panels > div:nth-child(" + (i + 1) + ") [o]").each(function () {
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
					}
				});
				
				var team1Rating = 0;
				var team2Rating = 0;
				for (var c = 1; c <= 10; c++) {
					if (c < 6) {
						team1Rating += parseFloat($("#panels > div:nth-child(" + (i + 1) + ") .RA" + c).val());
					} else if (c < 10) {
						team2Rating += parseFloat($("#panels > div:nth-child(" + (i + 1) + ") .RA" + c).val());
					} else {
						team2Rating += parseFloat($("#panels > div:nth-child(" + (i + 1) + ") .RAX").val());
					}
				}
				
				data[i]["RAT1"] = {};
				data[i]["RAT1"].value = (team1Rating / 5.0).toFixed(2);
				data[i]["RAT2"] = {};
				data[i]["RAT2"].value = (team2Rating / 5.0).toFixed(2);
				
				$("#panels > div:nth-child(" + (i + 1) + ") [o]").each(function () {
					index++
					if (index < 6) { //team 1
						team1Rating += index;
					} else {
						team2Rating += index;
					}
				});

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
					T1ut.vk = "";
					T1ut.wb = "";
					T1ut.yt = "";
					T1ut.tv = "";
					T1ut.sb = "";

					if (TEAMS[T1ut.string]["Wiki"] != "") {
						T1ut.wk = " | [Liquipedia](" + TEAMS[T1ut.string]["Wiki"] + ")" || "";
					}
					if (TEAMS[T1ut.string]["HLTV"] != "") {
						T1ut.hl = " | [HLTV](" + TEAMS[T1ut.string]["HLTV"] + ")" || "";
					}
					if (TEAMS[T1ut.string]["Official Site"] != "") {
						T1ut.os = " | [Official Site](" + TEAMS[T1ut.string]["Official Site"] + ")" || "";
					}
					if (TEAMS[T1ut.string]["Twitter"] != "") {
						T1ut.tw = " | [Twitter](" + TEAMS[T1ut.string]["Twitter"] + ")" || "";
					}
					if (TEAMS[T1ut.string]["Facebook"] != "") {
						T1ut.fb = " | [Facebook](" + TEAMS[T1ut.string]["Facebook"] + ")" || "";
					}
					if (TEAMS[T1ut.string]["Instagram"] != "") {
						T1ut.ig = " | [Instagram](" + TEAMS[T1ut.string]["Instagram"] + ")" || "";
					}
					if (TEAMS[T1ut.string]["VK"] != "") {
						T1ut.vk = " | [VK](" + TEAMS[T1ut.string]["VK"] + ")" || "";
					}
					if (TEAMS[T1ut.string]["Weibo"] != "") {
						T1ut.wb = " | [Weibo](" + TEAMS[T1ut.string]["Weibo"] + ")" || "";
					}
					if (TEAMS[T1ut.string]["YouTube"] != "") {
						T1ut.yt = " | [YouTube](" + TEAMS[T1ut.string]["YouTube"] + ")" || "";
					}
					if (TEAMS[T1ut.string]["Twitch"] != "") {
						T1ut.tv = " | [Twitch](" + TEAMS[T1ut.string]["Twitch"] + ")" || "";
					}
					if (TEAMS[T1ut.string]["Subreddit"] != "") {
						T1ut.sb = " | [Subreddit](" + TEAMS[T1ut.string]["Subreddit"] + ")" || "";
					}

					data[i]["team1info"] = {
						value: Iconify(team1GID) + " **" + team1GID + "**" + T1ut.wk + T1ut.hl + T1ut.os + T1ut.tw + T1ut.fb + T1ut.ig + T1ut.vk + T1ut.wb + T1ut.yt + T1ut.tv + T1ut.sb
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
					T2ut.vk = "";
					T2ut.wb = "";
					T2ut.yt = "";
					T2ut.tv = "";
					T2ut.sb = "";

					if (TEAMS[T2ut.string]["Wiki"] != "") {
						T2ut.wk = " | [Liquipedia](" + TEAMS[T2ut.string]["Wiki"] + ")" || "";
					}
					if (TEAMS[T2ut.string]["HLTV"] != "") {
						T2ut.hl = " | [HLTV](" + TEAMS[T2ut.string]["HLTV"] + ")" || "";
					}
					if (TEAMS[T2ut.string]["Official Site"] != "") {
						T2ut.os = " | [Official Site](" + TEAMS[T2ut.string]["Official Site"] + ")" || "";
					}
					if (TEAMS[T2ut.string]["Twitter"] != "") {
						T2ut.tw = " | [Twitter](" + TEAMS[T2ut.string]["Twitter"] + ")" || "";
					}
					if (TEAMS[T2ut.string]["Facebook"] != "") {
						T2ut.fb = " | [Facebook](" + TEAMS[T2ut.string]["Facebook"] + ")" || "";
					}
					if (TEAMS[T2ut.string]["Instagram"] != "") {
						T2ut.ig = " | [Instagram](" + TEAMS[T2ut.string]["Instagram"] + ")" || "";
					}
					if (TEAMS[T2ut.string]["VK"] != "") {
						T2ut.vk = " | [VK](" + TEAMS[T2ut.string]["VK"] + ")" || "";
					}
					if (TEAMS[T2ut.string]["Weibo"] != "") {
						T2ut.wb = " | [Weibo](" + TEAMS[T2ut.string]["Weibo"] + ")" || "";
					}
					if (TEAMS[T2ut.string]["YouTube"] != "") {
						T2ut.yt = " | [YouTube](" + TEAMS[T2ut.string]["YouTube"] + ")" || "";
					}
					if (TEAMS[T2ut.string]["Twitch"] != "") {
						T2ut.tv = " | [Twitch](" + TEAMS[T2ut.string]["Twitch"] + ")" || "";
					}
					if (TEAMS[T2ut.string]["Subreddit"] != "") {
						T2ut.sb = " | [Subreddit](" + TEAMS[T2ut.string]["Subreddit"] + ")" || "";
					}
					data[i]["team2info"] = {
						value: Iconify(team2GID) + " **" + team2GID + "**" + T2ut.wk + T2ut.hl + T2ut.os + T2ut.tw + T2ut.fb + T2ut.ig + T2ut.vk + T2ut.wb + T2ut.yt + T2ut.tv + T2ut.sb
					};
				}
			} else {
				var inputVal = $("#panels > div:nth-child(" + (i + 1) + ") .game-map").val();
				if (inputVal != null && inputVal != '') {
					data[i] = {};
					data[i]["pergame-map" + i] = {};
					console.log("per-gamemap" + i + " = " + inputVal);
					data[i]["pergame-map" + i].value = inputVal;
				}
			}
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
		
		
		var headerSuffix = "";

		if ($("#live-thread-checkbox").is(":checked")) {
			// NOP
		} else {
			headerSuffix += "-no-live-thread";
		}

		var iconsSuffix = "";

		var header = $("#header-event-name").val();
		
		if ($("#advantage-checkbox").is(":checked")) {
			header += $("#header-default").val();
		}

		for (i = 2; i < 7; i++) {
			if ($('#panels > div:nth-child(' + i + ') .game-map').val() != "" && $('#panels > div:nth-child(' + i + ') .game-map').val() != null) {
				if ($('#panels > div:nth-child(' + i + ') .T1').val() != null && $('#panels > div:nth-child(' + i + ') .T1').val() != "") {
					console.log(i + $('#panels > div:nth-child(1) .maint1').val() + $('#panels > div:nth-child(' + i + ') .T1').val());
					if ($('#panels > div:nth-child(1) .maint1').val() == $('#panels > div:nth-child(' + i + ') .T1').val()) {
						header += $("#header-map-scores" + (i - 1) + "-b").val();
					} else {
						header += $("#header-map-scores" + (i - 1)).val();
					}
				} else {
					header += $("#header-map-scores" + (i - 1) + "-np").val();
				}
			}
		}
		
		if ($("#advantage-checkbox").is(":checked")) {
			header += $("#header-default-note").val();
		}
		
		
		if ($("#final-checkbox").is(":checked")) {
			if ((data.length > 0) && (data[1]["series-context2"].value != '')) {
				header += $("#header-series-context-final2").val();
			} else {
				header += $("#header-series-context-final").val();
			}
		} else if ( (data.length > 0) && (data[1]["series-context1"].value != '') && (data[1]["series-context2"].value != '')) {
			header += $("#header-series-context-both").val();
		} else if ( (data.length > 0) && (data[1]["series-context1"].value != '') ) {
			header += $("#header-series-context1").val();
		} else if ( (data.length > 0) && (data[1]["series-context2"].value != '') ) {
			header += $("#header-series-context2").val();
		}
		if ($("#epl-checkbox").is(":checked")) {
			header += $("#header-end-fake-bo2").val();
		} else {
			header += $("#header-end").val();
		}
		//header += $("#header-end").val();

		var team1ID = $("#panels > div:nth-child(1) .maint1").val();
		var team2ID = $("#panels > div:nth-child(1) .maint2").val();

		if (TEAMS[team1ID] && TEAMS[team2ID]) {
			header += $("#header-teams-infos").val();
		}

		header += $("#header-infos" + headerSuffix).val();
		header += $("#header-highlights").val();

		if ($("#epl-checkbox").is(":checked")) {
			header += "";
			//header += ($("#vetoes-not-available").val());
		} else {
			header += $("#vetoes" + CountMaps()).val();
		}

		var main = "";

		var transition = $("#transition").val();

		var string = "";

		main += header;
		data[0]["T1"] = {};
		data[0]["T1"].value = team1GID;
		data[0]["IconT1"] = {};
		data[0]["IconT1"].value = Iconify(team1GID);

		data[0]["T2"] = {};
		data[0]["T2"].value = team2GID;
		data[0]["IconT2"] = {};
		data[0]["IconT2"].value = Iconify(team2GID);

		for (j in data[0]) {
			main = SearchReplace("%" + j, data[0][j], main);
		}

		for (i = 1; i < data.length; i++) {
			if (!data[i])
				continue;
			if (!($("#panels > div:nth-child(" + (i + 1) + ") .T1").val() == null || $("#panels > div:nth-child(" + (i + 1) + ") .T1").val() == '')) {
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
				if ($("#panels > div:nth-child(" + (i+1) + ") #left-side-checkbox").is(":checked")) {
					sBInfos += '-swap';
				}
				
				if ($("#panels > div:nth-child(" + (i+1) + ") #simple-scores-checkbox").is(":checked")) 
					main += $('textarea#main-scoreboard-infos-simple').val();
				else if ($("#panels > div:nth-child(" + (i + 1) + ") .LX1").val() != '' && $("#panels > div:nth-child(" + (i + 1) + ") .LX1").val() != null)
					main += $(sBInfos + '-ot5').val();
				else if ($("#panels > div:nth-child(" + (i + 1) + ") .L9").val() != '' && $("#panels > div:nth-child(" + (i + 1) + ") .L9").val() != null)
					main += $(sBInfos + '-ot4').val();
				else if ($("#panels > div:nth-child(" + (i + 1) + ") .L7").val() != '' && $("#panels > div:nth-child(" + (i + 1) + ") .L7").val() != null)
					main += $(sBInfos + '-ot3').val();
				else if ($("#panels > div:nth-child(" + (i + 1) + ") .L5").val() != '' && $("#panels > div:nth-child(" + (i + 1) + ") .L5").val() != null)
					main += $(sBInfos + '-ot2').val();
				else if ($("#panels > div:nth-child(" + (i + 1) + ") .L3").val() != '' && $("#panels > div:nth-child(" + (i + 1) + ") .L3").val() != null)
					main += $(sBInfos + '-ot1').val();
				else
					main += $(sBInfos).val();
				
				if (['1', '2', '3', '4'].indexOf($("#panels > div:nth-child(" + (i + 1) + ") .PNum").val()) > -1) {
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
		
		var lastTransition = $("#last-transition").val();
		main += lastTransition;
		
		if (highlights != "") {
			main += "#Highlights\r\r" + highlights + "\r---\r\r" 
			
		}

		if ($("#pmt-checkbox").is(":checked"))
			main += $("#end").val();

		/* set the value of the output textarea so users can copy */
		$("div#output-tab textarea").val(string + main);
	});

	$('#panels > div:nth-child(1) .maint1').blur(function () {
		var teamID = $(this).val();
		console.log("team1: " + teamID);
		var teamFullName = "";
		if (TEAMS[teamID] != null || TEAMS[teamID] != "") {
			$(this).css('border-color', '#2ecc40');
			teamFullName = TEAMS[teamID]["Name"];
		} else {
			$(this).css('border-color', '#ff4136');
			teamFullName = teamID;
		}
		$('#Team1name').val(teamFullName);
		$('#series-result').data('blue-team', teamFullName);
	});

	$('#panels > div:nth-child(1) .maint2').blur(function () {
		var teamID = $(this).val();
		console.log("team2: " + teamID);
		var teamFullName = "";
		if (TEAMS[teamID] != null || TEAMS[teamID] != "") {
			$(this).css('border-color', '#2ecc40');
			teamFullName = TEAMS[teamID]["Name"];
		} else {
			$(this).css('border-color', '#ff4136');
			teamFullName = teamID;
		}
		$('#Team2name').val(teamFullName);
		$('#series-result').data('red-team', teamFullName);
	});
	
	$(".hltvtable").blur(function () {
		var hltvTable = $(this).val();
		var hltvTableLines = hltvTable.split("\n");
		var team1Name = "";
		var team2Name = "";
		var lineVals = "";
		
		for (line in hltvTableLines) {
			if (hltvTableLines[line].indexOf("K (hs)") != -1) {
				if (team1Name == "") {					
					lineVals = hltvTableLines[line].split("\t");
					team1Name = lineVals[0];
					team1Name = team1Name.slice(0, team1Name.length / 2);
				} else {
					lineVals = hltvTableLines[line].split("\t");
					team2Name = lineVals[0];
					team2Name = team2Name.slice(0, team2Name.length / 2);
				}
			}
		}
		for (team in TEAMS) {
			if (TEAMS[team]["HLTV Name"] == team1Name) {
				$(this).closest('div.main').find('input.T1').val(TEAMS[team]["Name"]);
				$(this).closest('div.main').find('input.T1').blur();
				team1Name = TEAMS[team]["Name"];
			} else if (TEAMS[team]["HLTV Name"] == team2Name) {
				$(this).closest('div.main').find('input.T2').val(TEAMS[team]["Name"]);
				$(this).closest('div.main').find('input.T2').blur();
				team2Name = TEAMS[team]["Name"];
			}
		}
		
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
		for (line in hltvTableLines) {
			if (hltvTableLines[line].indexOf("(") != -1 && hltvTableLines[line].indexOf("K (hs)") == -1 && hltvTableLines[line].indexOf(":") == -1) {
				i += 1;
				if (i == 10) {
					i = "X";
				}
				lineVals = hltvTableLines[line].split(" ").join("\t").split("\t");
				lineVals = lineVals.filter(function (el) {
					return el != "";
				});
				$(this).closest('div.main').find('input.K' + i).val(lineVals[0]);
				$(this).closest('div.main').find('input.A' + i).val(lineVals[2]);
				$(this).closest('div.main').find('input.D' + i).val(lineVals[4]);
				$(this).closest('div.main').find('input.ADR' + i).val(lineVals[7]);
				$(this).closest('div.main').find('input.RA' + i).val(lineVals[9]);
				playerName = $(this).closest('div.main').find('input.P' + i).val();
				currentName = playerName;
				console.log("initial player name:" + playerName);
				var j = i;
				while (!(playerName.trim().endsWith(hltvTableLines[line - 1])) && !(playerName.trim().endsWith(hltvTableLines[line - 1] + " ♛"))) {
					if (j < 9) {
						j += 1;
					} else if (j == 9) {
						j = "X";
					} else if (j == "X") {
						j = "Y";
					} else if (j == "Y") {
						j = "Z";
					} else {
						break;
					}
					playerName = $(this).closest('div.main').find('input.P' + j).val();
					console.log(playerName.indexOf(hltvTableLines[line - 1]) == -1);
				}
				$(this).closest('div.main').find('input.P' + i).val(playerName);
				$(this).closest('div.main').find('input.P' + j).val(currentName);
				console.log("final player name:" + playerName);
				console.log("switching name:" + currentName);
			} else if (hltvTableLines[line].indexOf("(") != -1 && hltvTableLines[line].indexOf(":") != -1) {
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
			} else if (hltvTableLines[line] == "Overtime") {
				var k = 2;
				var highest = 3;
				while ((hltvTableLines[parseInt(line) + k].indexOf("-") != -1 && hltvTableLines[parseInt(line) + k].indexOf(".") == -1) || hltvTableLines[parseInt(line) + k] == "") {
					lineVals = hltvTableLines[parseInt(line) + k];
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
						if (roundNum < 34) {
							$(this).closest('div.main').find('input.L3').val(lineVals.length);
						} else if (roundNum < 37) {
							$(this).closest('div.main').find('input.L4').val(lineVals.length);
							highest = 4;
						} else if (roundNum < 40) {
							$(this).closest('div.main').find('input.L5').val(lineVals.length);
							highest = 5;
						} else if (roundNum < 43) {
							$(this).closest('div.main').find('input.L6').val(lineVals.length);
							highest = 6;
						} else if (roundNum < 46) {
							$(this).closest('div.main').find('input.L7').val(lineVals.length);
							highest = 7;
						} else if (roundNum < 49) {
							$(this).closest('div.main').find('input.L8').val(lineVals.length);
							highest = 8;
						} else if (roundNum < 52) {
							$(this).closest('div.main').find('input.L9').val(lineVals.length);
							highest = 9;
						} else if (roundNum < 55) {
							$(this).closest('div.main').find('input.LX0').val(lineVals.length);
							highest = 10;
						} else if (roundNum < 58) {
							$(this).closest('div.main').find('input.LX1').val(lineVals.length);
							highest = 11;
						} else if (roundNum < 61) {
							$(this).closest('div.main').find('input.LX2').val(lineVals.length);
							highest = 12;
						}
					}
					k += 1;
				}
				k += 1;
				while ((hltvTableLines[parseInt(line) + k].indexOf("-") != -1 && hltvTableLines[parseInt(line) + k].indexOf(".") == -1) || hltvTableLines[parseInt(line) + k] == "") {
					lineVals = hltvTableLines[parseInt(line) + k];
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
						if (roundNum < 34) {
							$(this).closest('div.main').find('input.R3').val(lineVals.length);
						} else if (roundNum < 37) {
							$(this).closest('div.main').find('input.R4').val(lineVals.length);
							if (4 > highest) highest = 4;
						} else if (roundNum < 40) {
							$(this).closest('div.main').find('input.R5').val(lineVals.length);
							if (5 > highest) highest = 5;
						} else if (roundNum < 43) {
							$(this).closest('div.main').find('input.R6').val(lineVals.length);
							if (6 > highest) highest = 6;
						} else if (roundNum < 46) {
							$(this).closest('div.main').find('input.R7').val(lineVals.length);
							if (7 > highest) highest = 7;
						} else if (roundNum < 49) {
							$(this).closest('div.main').find('input.R8').val(lineVals.length);
							if (8 > highest) highest = 8;
						} else if (roundNum < 52) {
							$(this).closest('div.main').find('input.R9').val(lineVals.length);
							if (9 > highest) highest = 9;
						} else if (roundNum < 55) {
							$(this).closest('div.main').find('input.RX0').val(lineVals.length);
							if (10 > highest) highest = 10;
						} else if (roundNum < 58) {
							$(this).closest('div.main').find('input.RX1').val(lineVals.length);
							if (11 > highest) highest = 11;
						} else if (roundNum < 61) {
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
	feed: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRR5IYr0mCc-2Qut05BVRqfV_cwinWaD3GOLR-4R9JohvED5gJJPv0VeTxIkfm10LzSTX9zUYHQWvHa/pub?gid=0&single=true&output=csv"
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

	console.log("First time: Successful")

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

	console.log("Second time: Successful");
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
		return "";
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
	return "[" + playerName.slice(0, 4) + "](#lang-" + flagDict[playerName.slice(0,2)] + flagDict[playerName.slice(2,4)] + ")" + playerName.slice(4);
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