<script type="text/javascript" src="js/pmtc.js"></script>
<script type="text/javascript" src="js/jquery.inputmask.bundle.min.js"></script>
<script type="text/javascript" src="js/clipboard.min.js"></script>

<!-- Loading teams Pop up -->
<div id="loading-teams-popup" class="white_content hidden">
	<p class="bold font-size-large">Loading teams &amp; players from the spreadsheet...</p>
	<p></p>
	<p>You will need javascript enabled to use this site.</p>
	<p></p>
	<p>Press esc to close this popup if it does not disappear.</p>
</div>

<?php include_once('menu.php'); ?>

<hr>

<form id="create">
	<div id="div-thread-info" class="inline-block">
		<table class="inline-block">
			<tr>
				<td>
					<div class="inline-block" data-tooltip="Name of event (ELeague S2, EPL S4 Finals etc.)" data-tooltip-position="top">
						<input type="text" id="event-name" placeholder="Event Name" value="">
						<!-- *** -->
					</div>
				</td>
				<td>
					<div class="inline-block" data-tooltip="Event Schedule/Discussion thread (link found at top of schedule)" data-tooltip-position="top">
						<input type="url" id="live-thread-link" placeholder="Schedule/Discussion" value="" style="width: 165px;">
						<!-- *** -->
					</div>
				</td>
				<td>
					<div class="inline-block label-div" data-tooltip="Is there a schedule/discussion thread?" data-tooltip-position="bottom">
						<label for="live-thread-checkbox"></label>
						<input type="checkbox" id="live-thread-checkbox" checked="checked" style="width: 22px;">
					</div>
				</td>
				<td>
					<div class="inline-block label-div" data-tooltip="Map advantage to left team" data-tooltip-position="bottom">
						<label for="advantage-checkbox"></label>
						<input type="checkbox" id="advantage-checkbox" style="width: 22px;">
					</div>
				</td>
				<td>
					<div class="inline-block label-div" data-tooltip="Grand-Final" data-tooltip-position="bottom">
						<label for="final-checkbox"></label>
						<input type="checkbox" id="final-checkbox" style="width: 22px;">
					</div>
				</td>
				<td>
					<div class="inline-block label-div" data-tooltip="2 Bo1s" data-tooltip-position="bottom">
						<label for="epl-checkbox"></label>
						<input type="checkbox" id="epl-checkbox" style="width: 22px;">
					</div>
				</td>
				<td>
					<div class="inline-block label-div" data-tooltip='Made by Post-Match Team' data-tooltip-position="bottom">
						<label for="pmt-checkbox"></label>
						<input type="checkbox" id="pmt-checkbox" checked="checked" style="width: 22px;">
					</div>
				</td>
				<td>
					<div class="inline-block" data-tooltip="Series Result in format 0-0" data-tooltip-position="top">
						<input type="text" id="series-result" placeholder="Result" data-inputmask="'mask': '9-9'" value="" hidden/>
						<!-- *** -->
						<input type="hidden" id="Team1name" value="" />
						<input type="hidden" id="Team2name" value="" />
					</div>
				</td>
			</tr>
		</table>
		<table class="inline-block">
			<tr>
				<td>
					<div class="inline-block" data-tooltip="Context for what happens to the winner (optional)" data-tooltip-position="left">
						<input type="text" id="winners-context" o=1 value="" placeholder="Winner Context" Style="width:450px"/>
					</div>
					<div class="inline-block"><input type="text" class="winNextOpp" id="winner-next-opponent" list="TeamDataList" tabindex="1" placeholder="Next Opponent" /></div>
					or
					<div class="inline-block"><input type="text" class="winNextOpp2" id="winner-next-opponent2" list="TeamDataList" tabindex="1" placeholder="Next Opponent" /></div>
				</td>
			</tr>
			<tr>
				<td>
					<div class="inline-block" data-tooltip="Context for what happens to the loser (optional)" data-tooltip-position="left">
						<input type="text" id="losers-context" value="" placeholder="Loser Context" Style="width:450px"/>
					</div>
					<div class="inline-block"><input type="text" class="losNextOpp" id="loser-next-opponent" list="TeamDataList" tabindex="1" placeholder="Next Opponent" /></div>
					or
					<div class="inline-block"><input type="text" class="losNextOpp2" id="loser-next-opponent2" list="TeamDataList" tabindex="1" placeholder="Next Opponent" /></div>
				</td>
			</tr>
		</table>
	</div>
	<div id="div-tablist">
		<div id="tablist-container" class="inline-block" Style="left: -50px">
			<ul id="tabList">
				<li class="btn-game">Overall</li>
				<li class="btn-game">Map 1</li>
				<li class="btn-game">Map 2</li>
				<li class="btn-game">Map 3</li>
				<li class="btn-game">Map 4</li>
				<li class="btn-game">Map 5</li>
				<li class="btn-game">Highlights</li>
				<li id="btn-output">Output</li>
			</ul>
			<div id="div-reset-button" class="inline-block" data-tooltip="Reset all inputs" data-tooltip-position="right">
				<button id="btn-reset" class="btn" value="Reset">Reset</button>
			</div>
		</div>
	</div>

	<div id="panels">
		<div class="veto-tab">

			<div class="hltv-main-page">
					<textarea class="hltvmaintable" placeholder="HLTV Page Copy and Paste (not link, ctrl-a)" style="width: 890px; margin-bottom: 10px;"></textarea>
			</div>

			<div class="main-teams">
				<div class="inline-block"><input type="text" class="maint1" id="team-1-name" list="TeamDataList" tabindex="1" placeholder="Title - Team 1" /></div>
				<div class="inline-block"><input type="text" class="maint2" id="team-2-name" list="TeamDataList" tabindex="2" placeholder="Title - Team 2" /></div>
			</div>
			<div class="veto-infos">
				<div class="maps-left">
					<div><input type="text" list="mapo" class="ML1" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="ML2" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="ML3" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="ML4" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="ML5" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="ML6" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="ML7" placeholder="Is what"></div>
					<!-- *** -->
				</div>
				<div class="select-maps">
					<!-- *** -->
					<div><input type="text" list="mapz" class="MP1" placeholder="Map 1"></div>
					<!-- *** -->
					<div><input type="text" list="mapz" class="MP2" placeholder="Map 2"></div>
					<!-- *** -->
					<div><input type="text" list="mapz" class="MP3" placeholder="Map 3"></div>
					<!-- *** -->
					<div><input type="text" list="mapz" class="MP4" placeholder="Map 4"></div>
					<!-- *** -->
					<div><input type="text" list="mapz" class="MP5" placeholder="Map 5"></div>
					<!-- *** -->
					<div><input type="text" list="mapz" class="MP6" placeholder="Map 6"></div>
					<!-- *** -->
					<div><input type="text" list="mapz" class="MP7" placeholder="Map 7"></div>
					<!-- *** -->
				</div>
				<div class="maps-right">
					<div><input type="text" list="mapo" class="MR1" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="MR2" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="MR3" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="MR4" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="MR5" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="MR6" placeholder="Is what"></div>
					<!-- *** -->
					<div><input type="text" list="mapo" class="MR7" placeholder="Is what"></div>
					<!-- *** -->
				</div>
			</div>
			<div class="pps">
				<!-- *** -->
				<div class="team-pps">
					<div class="team-combined-score">
						<input type="hidden" class="team1-combined-score">
					</div>
					<div class="players">
						<!-- *** -->
						<div><span><input type="text" class="P1" o=1 placeholder="Player 1"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P2" o=1 placeholder="Player 2"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P3" o=1 placeholder="Player 3"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P4" o=1 placeholder="Player 4"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P5" o=1 placeholder="Player 5"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="PY" o=1 placeholder="Player 11"></span></div>
						<!-- *** -->
					</div>

					<div class="scores">
						<div><input type="text" tabindex="25" class="K1" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="30" class="K2" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="35" class="K3" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="40" class="K4" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="45" class="K5" placeholder="K"></div>
						<!-- *** -->
					</div>
					<div class="scores">
						<div><input type="text" tabindex="26" class="D1" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="31" class="D2" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="36" class="D3" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="41" class="D4" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="46" class="D5" placeholder="D"></div>
						<!-- *** -->
					</div>
					<div class="scores-adr">
						<div><input type="text" tabindex="27" class="ADR1" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="32" class="ADR2" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="37" class="ADR3" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="42" class="ADR4" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="47" class="ADR5" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
					</div>
					<div class="scores-adr">
						<div><input type="text" tabindex="28" class="SW1" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="33" class="SW2" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="38" class="SW3" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="43" class="SW4" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="48" class="SW5" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
					</div>
					<div class="scores-rating">
						<div><input type="text" tabindex="29" class="RA1" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="34" class="RA2" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="39" class="RA3" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="44" class="RA4" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="49" class="RA5" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
					</div>
					<div class="vrs-info">
						<table>
							<tr>
								<td><input type="text" tabindex="75" class="VRSB1" data-inputmask="'mask': '9[9][9][9]'" placeholder="VRS # Before"></td>
								<td><input type="text" tabindex="77" class="VRSA1" data-inputmask="'mask': '9[9][9][9]'" placeholder="VRS # After"></td>
							</tr>
							<tr>
								<td><input type="text" tabindex="79" class="VRSD1" data-inputmask="'regex': '([+-][1-9][0-9]{1-3})|0'" placeholder="VRS Pts Diff"></td>
								<td><input type="text" tabindex="81" class="VRST1" data-inputmask="'mask': '9[9][9][9]'" placeholder="VRS Total Pts"></td>
							</tr>
						</table>
					</div>
				</div>

				<div class="team-pps">
					<div class="team-combined-score">
						<input type="hidden" class="team2-combined-score">
					</div>
					<div class="players">
						<!-- *** -->
						<div><span><input type="text" class="P6" o=1 placeholder="Player 6"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P7" o=1 placeholder="Player 7"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P8" o=1 placeholder="Player 8"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P9" o=1 placeholder="Player 9"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="PX" o=1 placeholder="Player 10"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="PZ" o=1 placeholder="Player 12"></span></div>
						<!-- *** -->
					</div>
					<div class="scores">
						<div><input type="text" tabindex="50" class="K6" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="55" class="K7" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="60" class="K8" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="65" class="K9" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="70" class="KX" placeholder="K"></div>
						<!-- *** -->
					</div>
					<div class="scores">
						<div><input type="text" tabindex="51" class="D6" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="56" class="D7" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="61" class="D8" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="66" class="D9" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="72" class="DX" placeholder="D"></div>
						<!-- *** -->
					</div>
					<div class="scores-adr">
						<div><input type="text" tabindex="52" class="ADR6" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="57" class="ADR7" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="62" class="ADR8" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="67" class="ADR9" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="72" class="ADRX" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
					</div>
					<div class="scores-adr">
						<div><input type="text" tabindex="53" class="SW6" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="58" class="SW7" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="63" class="SW8" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="68" class="SW9" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="73" class="SWX" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
					</div>
					<div class="scores-rating">
						<div><input type="text" tabindex="54" class="RA6" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="59" class="RA7" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="64" class="RA8" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="69" class="RA9" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="74" class="RAX" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
					</div>
					<div class="vrs-info">
						<table>
							<tr>
								<td><input type="text" tabindex="75" class="VRSB2" data-inputmask="'mask': '9[9][9][9]'" placeholder="VRS # Before"></td>
								<td><input type="text" tabindex="77" class="VRSA2" data-inputmask="'mask': '9[9][9][9]'" placeholder="VRS # After"></td>
							</tr>
							<tr>
								<td><input type="text" tabindex="79" class="VRSD2" data-inputmask="'regex': '([+-][1-9][0-9]{1-3})|0'" placeholder="VRS Pts Diff"></td>
								<td><input type="text" tabindex="81" class="VRST2" data-inputmask="'mask': '9[9][9][9]'" placeholder="VRS Total Pts"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="main">
			<div class="game-infos">
				<div class="inline-block label-div" data-tooltip="simple stats (only K/A/D)" data-tooltip-position="bottom">
					<label for="simple-stats-checkbox"></label>
					<input type="checkbox" id="simple-stats-checkbox" style="width: 22px;">
				</div>
				<div class="inline-block label-div" data-tooltip="simple scores (no side-specific scores)" data-tooltip-position="bottom">
					<label for="simple-scores-checkbox"></label>
					<input type="checkbox" id="simple-scores-checkbox" style="width: 22px;">
				</div>
				<div class="inline-block" data-tooltip="Number of players playing on each team (1-5)" data-tooltip-position="bottom">
					<input type="text" class="PNum" data-inputmask="'mask': '9'" placeholder="5" style="width: 20px">
				</div>
				<div class="inline-block">
					<select class="winner">
						<option selected disabled="disabled">Game Winner</option>
					</select>
				</div>
				<div class="inline-block">
					<input type="text" class="game-map" placeholder="Map" readonly="readonly" />
				</div>
				<div class="inline-block" data-tooltip="Link of HLTV in depth stats" data-tooltip-position="bottom">
					<input type="url" class="match-history" value="" placeholder="Match History" />
					<!-- *** -->
				</div>
				<div class="inline-block label-div" data-tooltip="Checked = Left Team starts T Unchecked = Left Team starts CT" data-tooltip-position="bottom">
					<label for="left-side-checkbox"></label>
					<input type="checkbox" id="left-side-checkbox" style="width: 22px;">
				</div>
			</div>
			
			<div class="hltv-page">
					<textarea class="hltvtable" placeholder="HLTV Map Stats Page Copy and Paste (not link, ctrl-a)" style="width: 890px; margin-bottom: 10px;"></textarea>
			</div>

			<div class="teams">
				<!-- *** -->
				<div>
					<div class="teams-input">
						<input type="text" class="T1" list="TeamDataList" tabindex="1" placeholder="Team 1" />
						<!-- *** -->
						<input type="text" class="IconT1" placeholder="Icon code" />
					</div>
				</div>
				<div>
					<div class="teams-input">
						<input type="text" class="T2" list="TeamDataList" tabindex="2" placeholder="Team 2">
						<!-- *** -->
						<input type="text" class="IconT2" placeholder="Icon code" />
					</div>
				</div>
			</div>

			<div class="pps">
				<!-- *** -->
				<div class="team-pps">
					<div class="team-combined-score">
						<input type="hidden" class="team1-combined-score">
					</div>
					<div class="players">
						<!-- *** -->
						<div><span><input type="text" class="P1" o=1 placeholder="Player 1"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P2" o=1 placeholder="Player 2"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P3" o=1 placeholder="Player 3"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P4" o=1 placeholder="Player 4"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P5" o=1 placeholder="Player 5"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="PY" o=1 placeholder="Player 11"></span></div>
						<!-- *** -->
					</div>

					<div class="scores">
						<div><input type="text" tabindex="25" class="K1" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="30" class="K2" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="35" class="K3" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="40" class="K4" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="45" class="K5" placeholder="K"></div>
						<!-- *** -->
					</div>
					<div class="scores">
						<div><input type="text" tabindex="26" class="D1" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="31" class="D2" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="36" class="D3" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="41" class="D4" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="46" class="D5" placeholder="D"></div>
						<!-- *** -->
					</div>
					<div class="scores">
						<div><input type="text" tabindex="27" class="ADR1" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="32" class="ADR2" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="37" class="ADR3" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="42" class="ADR4" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="47" class="ADR5" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
					</div>
					<div class="scores-adr">
						<div><input type="text" tabindex="28" class="SW1" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="33" class="SW2" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="38" class="SW3" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="43" class="SW4" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="48" class="SW5" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
					</div>
					<div class="scores-rating">
						<div><input type="text" tabindex="29" class="RA1" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="34" class="RA2" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="39" class="RA3" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="44" class="RA4" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="49" class="RA5" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
					</div>
					<div class="side-scores">
						<table>
							<tr>
								<td><input type="text" tabindex="75" class="L1" placeholder="S1"></td>
								<td><input type="text" tabindex="77" class="L3" data-inputmask="'mask': '9'" placeholder="OT11"></td>
								<td><input type="text" tabindex="79" class="L5" data-inputmask="'mask': '9'" placeholder="OT21"></td>
								<td><input type="text" tabindex="81" class="L7" data-inputmask="'mask': '9'" placeholder="OT31"></td>
								<td><input type="text" tabindex="83" class="L9" data-inputmask="'mask': '9'" placeholder="OT41"></td>
								<td><input type="text" tabindex="85" class="LX1" data-inputmask="'mask': '9'" placeholder="OT51"></td>
							</tr>
							<tr>
								<td><input type="text" tabindex="76" class="L2" placeholder="S2"></td>
								<td><input type="text" tabindex="78" class="L4" data-inputmask="'mask': '9'" placeholder="OT12"></td>
								<td><input type="text" tabindex="80" class="L6" data-inputmask="'mask': '9'" placeholder="OT22"></td>
								<td><input type="text" tabindex="82" class="L8" data-inputmask="'mask': '9'" placeholder="OT32"></td>
								<td><input type="text" tabindex="84" class="LX0" data-inputmask="'mask': '9'" placeholder="OT42"></td>
								<td><input type="text" tabindex="86" class="LX2" data-inputmask="'mask': '9'" placeholder="OT52"></td>
						</table>
					</div>
				</div>

				<div class="team-pps">
					<div class="team-combined-score">
						<input type="hidden" class="team2-combined-score">
					</div>
					<div class="players">
						<!-- *** -->
						<div><span><input type="text" class="P6" o=1 placeholder="Player 6"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P7" o=1 placeholder="Player 7"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P8" o=1 placeholder="Player 8"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="P9" o=1 placeholder="Player 9"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="PX" o=1 placeholder="Player 10"></span></div>
						<!-- *** -->
						<div><span><input type="text" class="PZ" o=1 placeholder="Player 12"></span></div>
						<!-- *** -->
					</div>
					<div class="scores">
						<div><input type="text" tabindex="50" class="K6" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="55" class="K7" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="60" class="K8" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="65" class="K9" placeholder="K"></div>
						<!-- *** -->
						<div><input type="text" tabindex="70" class="KX" placeholder="K"></div>
						<!-- *** -->
					</div>
					<div class="scores">
						<div><input type="text" tabindex="51" class="D6" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="56" class="D7" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="61" class="D8" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="66" class="D9" placeholder="D"></div>
						<!-- *** -->
						<div><input type="text" tabindex="72" class="DX" placeholder="D"></div>
						<!-- *** -->
					</div>
					<div class="scores">
						<div><input type="text" tabindex="52" class="ADR6" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="57" class="ADR7" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="62" class="ADR8" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="67" class="ADR9" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
						<div><input type="text" tabindex="72" class="ADRX" data-inputmask="'mask': '(99[9].9)|(9[9].9)'" placeholder="ADR"></div>
						<!-- *** -->
					</div>
					<div class="scores-adr">
						<div><input type="text" tabindex="53" class="SW6" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="58" class="SW7" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="63" class="SW8" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="68" class="SW9" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
						<div><input type="text" tabindex="73" class="SWX" data-inputmask="'regex': '[+-][0-9]+\\.[0-9]{2}%'" placeholder="SW%"></div>
						<!-- *** -->
					</div>
					<div class="scores-rating">
						<div><input type="text" tabindex="54" class="RA6" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="59" class="RA7" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="64" class="RA8" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="69" class="RA9" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
						<div><input type="text" tabindex="74" class="RAX" data-inputmask="'mask': '[9].99'" placeholder="R"></div>
						<!-- *** -->
					</div>
					<div class="side-scores">
						<table>
							<tr>
								<td><input type="text" tabindex="75" class="R1" placeholder="S1"></td>
								<td><input type="text" tabindex="77" class="R3" data-inputmask="'mask': '9'" placeholder="OT11"></td>
								<td><input type="text" tabindex="79" class="R5" data-inputmask="'mask': '9'" placeholder="OT21"></td>
								<td><input type="text" tabindex="81" class="R7" data-inputmask="'mask': '9'" placeholder="OT31"></td>
								<td><input type="text" tabindex="83" class="R9" data-inputmask="'mask': '9'" placeholder="OT41"></td>
								<td><input type="text" tabindex="85" class="RX1" data-inputmask="'mask': '9'" placeholder="OT51"></td>
							</tr>
							<tr>
								<td><input type="text" tabindex="76" class="R2" placeholder="S2"></td>
								<td><input type="text" tabindex="78" class="R4" data-inputmask="'mask': '9'" placeholder="OT12"></td>
								<td><input type="text" tabindex="80" class="R6" data-inputmask="'mask': '9'" placeholder="OT22"></td>
								<td><input type="text" tabindex="82" class="R8" data-inputmask="'mask': '9'" placeholder="OT32"></td>
								<td><input type="text" tabindex="84" class="RX0" data-inputmask="'mask': '9'" placeholder="OT42"></td>
								<td><input type="text" tabindex="86" class="RX2" data-inputmask="'mask': '9'" placeholder="OT52"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="highlights-tab">
			<div class="highlight-infos">
				<div class="inline-block">
					<div><input type="text" list="htitle" class="HT1" placeholder="Title" tabindex="25" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HT2" placeholder="Title" tabindex="30" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HT3" placeholder="Title" tabindex="35" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HT4" placeholder="Title" tabindex="40" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HT5" placeholder="Title" tabindex="45" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HT6" placeholder="Title" tabindex="50" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HT7" placeholder="Title" tabindex="55" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HT8" placeholder="Title" tabindex="60" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HT9" placeholder="Title" tabindex="65" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HTX0" placeholder="Title" tabindex="70" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HTX1" placeholder="Title" tabindex="75" style="width: 300px;"></div>
					<!-- *** -->
					<div><input type="text" list="htitle" class="HTX2" placeholder="Title" tabindex="80" style="width: 300px;"></div>
				</div>
				<div class="inline-block">
					<!-- *** -->
					<div><input type="text" list="hlink" class="HL1" tabindex="27" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HL2" tabindex="32" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HL3" tabindex="37" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HL4" tabindex="42" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HL5" tabindex="47" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HL6" tabindex="52" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HL7" tabindex="57" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HL8" tabindex="62" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HL9" tabindex="67" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HLX0" tabindex="72" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HLX1" tabindex="77" placeholder="Link"></div>
					<!-- *** -->
					<div><input type="text" list="hlink" class="HLX2" tabindex="82" placeholder="Link"></div>
				</div>
			</div>
		</div>
		<div id="output-tab">
			<div>
				<button class="btn" type="button" data-clipboard-target="#output-textarea">Copy!</button>
			</div>
			<div>
				<textarea id="output-textarea"></textarea>
			</div>
		</div>
	</div>
</form>

<section style="display: none" id="edit">

	<textarea id="header-event-name">
#%T1 %IconT1 %series-result %IconT2 %T2  

</textarea>

	<textarea id="header-default">
**Default:** 1-0*  
</textarea>

	<textarea id="header-map-scores1">
**%pergame-map1:** %RRounds1-%LRounds1  
</textarea>

	<textarea id="header-map-scores1-b">
**%pergame-map1:** %LRounds1-%RRounds1  
</textarea>

	<textarea id="header-map-scores2">
**%pergame-map2:** %RRounds2-%LRounds2  
</textarea>

	<textarea id="header-map-scores2-b">
**%pergame-map2:** %LRounds2-%RRounds2  
</textarea>

	<textarea id="header-map-scores3-b">
**%pergame-map3:** %LRounds3-%RRounds3  
</textarea>

	<textarea id="header-map-scores3">
**%pergame-map3:** %RRounds3-%LRounds3  
</textarea>

	<textarea id="header-map-scores3-np">
~~**%pergame-map3:**~~  
</textarea>

	<textarea id="header-map-scores4">
**%pergame-map4:** %RRounds4-%LRounds4 
</textarea>

	<textarea id="header-map-scores4-b">
**%pergame-map4:** %LRounds4-%RRounds4  
</textarea>

	<textarea id="header-map-scores4-np">
~~**%pergame-map4:**~~  
</textarea>

	<textarea id="header-map-scores5-b">
**%pergame-map5:** %LRounds5-%RRounds5  
</textarea>

	<textarea id="header-map-scores5">
**%pergame-map5:** %RRounds5-%LRounds5  
</textarea>

	<textarea id="header-map-scores5-np">
~~**%pergame-map5:**~~  
</textarea>

	<textarea id="header-default-note">
^*%Team1Default ^have ^an ^automatic ^1-0 ^map ^advantage ^due ^to ^advancing ^from ^the ^upper ^bracket.  
</textarea>

<!--
	<textarea id="header-series-context1">
&amp;nbsp;

**%series-context1**  
</textarea>

	<textarea id="header-series-context2">
&amp;nbsp;

**%series-context2**  
</textarea>

	<textarea id="header-series-context-both">
&amp;nbsp;

**%series-context1**   

**%series-context2**    
</textarea>
-->


<!-- possible future implementation to automatically pick winner -->
	<textarea id="header-series-context1">
&amp;nbsp;

**%IconWinner %WinnerName %series-context1**  
</textarea>

	<textarea id="header-series-context2">
&amp;nbsp;

**%IconLoser %LoserName %series-context2**  
</textarea>

	<textarea id="header-series-context-both">
&amp;nbsp;

**%IconWinner %WinnerName %series-context1**   

**%IconLoser %LoserName %series-context2**    
</textarea>

	<textarea id="header-series-context-final">
&amp;nbsp;

**Congratulations to %IconWinner %WinnerName for winning %event-name!**
</textarea>

	<textarea id="header-series-context-final2">
&amp;nbsp;

**Congratulations to %IconWinner %WinnerName for winning %event-name!**

**%IconLoser %LoserName %series-context2**
</textarea>

	<textarea id="header-end">

&amp;nbsp;

-----
</textarea>

	<textarea id="header-end-fake-bo2">

&amp;nbsp;

**Note: This match is two best of ones, not a best of two.**

-----

</textarea>

	<textarea id="event-setting">
**Setting**: %event-setting  
  
</textarea>

	<textarea id="vrs-prediction">
### Predicted VRS Impact  
  
Team | Rank | Diff | Total  
:--|:--:|:--:|:--:  
%IconStatsT1%Team1Initials | #%VRSB1 → #%VRSA1 | %VRSD1 pts | %VRST1 pts |  
%IconStatsT2%Team2Initials | #%VRSB2 → #%VRSA2 | %VRSD2 pts | %VRST2 pts |  
  
^Note: ^VRS ^officially ^updates ^once ^per ^month. ^This ^is ^simply ^a ^prediction ^that ^might ^not ^take ^into ^account ^all ^factors ^that ^go ^into ^VRS ^calculations.

&amp;nbsp;

-----
</textarea>

	<textarea id="header-infos">
[%event-name - Information, Schedule, &amp; Discussion](%live-thread-link)  
</textarea>


	<textarea id="header-infos-no-live-thread">  
</textarea>

	<!--
<textarea id ="header-highlights">
[Subreddit Discord for /r/globaloffensive](http://discord.gg/globaloffensive)                            

</textarea>
-->
	<!--
	<textarea id="header-highlights">
**Join the subreddit Discord server by clicking the link in the sidebar!**

</textarea>
-->

	<textarea id="header-teams-infos">

%team1info  
%team2info

-----       
    
</textarea>

	<textarea id="vetoes1">
-----

&amp;nbsp;

|%IconVWTA1|**MAP**|%IconVWTA2|
|:--:|:--:|:--:|
|%ML1|%MP1|%MR1|

</textarea>

	<textarea id="vetoes2">
-----

&amp;nbsp;

|%IconVWTA1|**MAP**|%IconVWTA2|
|:--:|:--:|:--:|
|%ML1|%MP1|%MR1|
|%ML2|%MP2|%MR2|

</textarea>

	<textarea id="vetoes3">
-----

&amp;nbsp;

|%IconVWTA1|**MAP**|%IconVWTA2|
|:--:|:--:|:--:|
|%ML1|%MP1|%MR1|
|%ML2|%MP2|%MR2|
|%ML3|%MP3|%MR3|

</textarea>

	<textarea id="vetoes4">
-----

&amp;nbsp;

|%IconVWTA1|**MAP**|%IconVWTA2|
|:--:|:--:|:--:|
|%ML1|%MP1|%MR1|
|%ML2|%MP2|%MR2|
|%ML3|%MP3|%MR3|
|%ML4|%MP4|%MR4|

</textarea>

	<textarea id="vetoes5">
-----

&amp;nbsp;

|%IconVWTA1|**MAP**|%IconVWTA2|
|:--:|:--:|:--:|
|%ML1|%MP1|%MR1|
|%ML2|%MP2|%MR2|
|%ML3|%MP3|%MR3|
|%ML4|%MP4|%MR4|
|%ML5|%MP5|%MR5|

</textarea>

	<textarea id="vetoes6">
-----

&amp;nbsp;

|%IconVWTA1|**MAP**|%IconVWTA2|
|:--:|:--:|:--:|
|%ML1|%MP1|%MR1|
|%ML2|%MP2|%MR2|
|%ML3|%MP3|%MR3|
|%ML4|%MP4|%MR4|
|%ML5|%MP5|%MR5|
|%ML6|%MP6|%MR6|

</textarea>

	<textarea id="vetoes7">
-----

&amp;nbsp;

|%IconVWTA1|**MAP**|%IconVWTA2|
|:--:|:--:|:--:|
|%ML1|%MP1|%MR1|
|%ML2|%MP2|%MR2|
|%ML3|%MP3|%MR3|
|%ML4|%MP4|%MR4|
|%ML5|%MP5|%MR5|
|%ML6|%MP6|%MR6|
|%ML7|%MP7|%MR7|

</textarea>

	<textarea id="vetoes-not-available">
-----

&amp;nbsp;

#The vetoes for this match are not available


</textarea>

	<textarea id="main-match-details">
&amp;nbsp;

###MAP %gameX: %game-map

&amp;nbsp;

</textarea>

	<textarea id="main-match-details-one">
&amp;nbsp;

###MAP: %game-map

&amp;nbsp;

</textarea>

	<textarea id="main-scoreboard-infos-simple">
|Team|Score|
|:--|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|**%LRoundst**|
|%IconStatsT2%Team2Initials**|**%RRoundst**|

&amp;nbsp;
</textarea>

	<textarea id="main-scoreboard-infos">
|Team|CT|T|Total|
|:--|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|**%LRoundst**|
||**T**|**CT**|
|%IconStatsT2%Team2Initials**|%R1|%R2|**%RRoundst**|

&amp;nbsp;
</textarea>

	<textarea id="main-scoreboard-infos-swap">
|Team|T|CT|Total|
|:--|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|**%LRoundst**|
||**CT**|**T**|
|%IconStatsT2%Team2Initials**|%R1|%R2|**%RRoundst**|

&amp;nbsp;
</textarea>

	<textarea id="main-scoreboard-infos-ot1">
|Team|CT|T|OT1^T:CT|Total|
|:--|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|**%LRoundst**|
||**T**|**CT**|**OT1^CT:T**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|**%RRoundst**|
	 
&amp;nbsp;
</textarea>

	<textarea id="main-scoreboard-infos-swap-ot1">
|Team|T|CT|OT1^CT:T|Total|
|:--|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|**%LRoundst**|
||**CT**|**T**|**OT1^T:CT**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|**%RRoundst**|
	 
&amp;nbsp;
</textarea>

	<textarea id="main-scoreboard-infos-ot2">
|Team|CT|T|OT1^T:CT|OT2^CT:T|Total|
|:--|:--:|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|%L5:%L6|**%LRoundst**|
||**T**|**CT**|**OT1^CT:T**|**OT2^T:CT**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|%R5:%R6|**%RRoundst**|

&amp;nbsp;
</textarea>

	<textarea id="main-scoreboard-infos-swap-ot2">
|Team|TT|CT|OT1^CT:T|OT2^T:CT|Total|
|:--|:--:|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|%L5:%L6|**%LRoundst**|
||**CT**|**T**|**OT1^T:CT**|**OT2^CT:T**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|%R5:%R6|**%RRoundst**|

&amp;nbsp;
</textarea>

<textarea id="main-scoreboard-infos-ot3">
|Team|CT|T|OT1^T:CT|OT2^CT:T|OT3^T:CT|Total|
|:--|:--:|:--:|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|%L5:%L6|%L7:%L8|**%LRoundst**|
||**T**|**CT**|**OT1^CT:T**|**OT2^T:CT**|**OT3^CT:T**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|%R5:%R6|%R7:%R8|**%RRoundst**|

&amp;nbsp;
</textarea>

	<textarea id="main-scoreboard-infos-swap-ot3">
|Team|T|CT|OT1^CT:T|OT2^T:CT|OT3^CT:T|Total|
|:--|:--:|:--:|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|%L5:%L6|%L7:%L8|**%LRoundst**|
||**CT**|**T**|**OT1^T:CT**|**OT2^CT:T**|**OT3^T:CT**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|%R5:%R6|%R7:%R8|**%RRoundst**|

&amp;nbsp;
</textarea>

<textarea id="main-scoreboard-infos-ot4">
|Team|CT|T|OT1^T:CT|OT2^CT:T|OT3^T:CT|OT4^CT:T|Total|
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|%L5:%L6|%L7:%L8|%L9:%LX0|**%LRoundst**|
||**T**|**CT**|**OT1^CT:T**|**OT2^T:CT**|**OT3^CT:T**|**OT4^T:CT**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|%R5:%R6|%R7:%R8|%R9:%RX0|**%RRoundst**|

&amp;nbsp;
</textarea>

	<textarea id="main-scoreboard-infos-swap-ot4">
|Team|T|CT|OT1^CT:T|OT2^T:CT|OT3^CT:T|OT4^T:CT|Total|
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|%L5:%L6|%L7:%L8|%L9:%LX0|**%LRoundst**|
||**CT**|**T**|**OT1^T:CT**|**OT2^CT:T**|**OT3^T:CT**|**OT4^CT:T**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|%R5:%R6|%R7:%R8|%R9:%RX0|**%RRoundst**|

&amp;nbsp;
</textarea>

<textarea id="main-scoreboard-infos-ot5">
|Team|CT|T|OT1^T:CT|OT2^CT:T|OT3^T:CT|OT4^CT:T|OT5^T:CT|Total|
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|%L5:%L6|%L7:%L8|%L9:%LX0|%LX1:%LX2|**%LRoundst**|
||**T**|**CT**|**OT1^CT:T**|**OT2^T:CT**|**OT3^CT:T**|**OT4^T:CT**|**OT5^CT:T**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|%R5:%R6|%R7:%R8|%R9:%RX0|%RX1:%RX2|**%RRoundst**|

&amp;nbsp;
</textarea>

	<textarea id="main-scoreboard-infos-swap-ot5">
|Team|T|CT|OT1^CT:T|OT2^T:CT|OT3^CT:T|OT4^T:CT|OT5^CT:T|Total|
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|%L5:%L6|%L7:%L8|%L9:%LX0|%LX1:%LX2|**%LRoundst**|
||**CT**|**T**|**OT1^T:CT**|**OT2^CT:T**|**OT3^T:CT**|**OT4^CT:T**|**OT5^T:CT**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|%R5:%R6|%R7:%R8|%R9:%RX0|%RX1:%RX2|**%RRoundst**|

&amp;nbsp;
</textarea>

<textarea id="overall-scoreboard-stats">

---

###Full Match Stats

|**Team**|**K-D**|**ADR**|**Swing**|**Rating**|
|:--|--:|--:|--:|--:|--:|
|&amp;nbsp;&amp;nbsp;%IconStatsT1%Team1Initials**|||||%RAT1|
|%P1o|%K1-%D1|%ADR1|%SW1|%RA1|
|%P2o|%K2-%D2|%ADR2|%SW2|%RA2|
|%P3o|%K3-%D3|%ADR3|%SW3|%RA3|
|%P4o|%K4-%D4|%ADR4|%SW4|%RA4|
|%P5o|%K5-%D5|%ADR5|%SW5|%RA5|
|&amp;nbsp;&amp;nbsp;%IconStatsT2%Team2Initials**|||||%RAT2|
|%P6o|%K6-%D6|%ADR6|%SW6|%RA6|
|%P7o|%K7-%D7|%ADR7|%SW7|%RA7|
|%P8o|%K8-%D8|%ADR8|%SW8|%RA8|
|%P9o|%K9-%D9|%ADR9|%SW9|%RA9|
|%PXo|%KX-%DX|%ADRX|%SWX|%RAX|

</textarea>

	<textarea id="main-scoreboard-stats">

|**Team**|**K-D**|**ADR**|**Swing**|**Rating**|
|:--|--:|--:|--:|--:|--:|
|&amp;nbsp;&amp;nbsp;%IconStatsT1%Team1Initials**|||||%RAT1|
|%P1o|%K1-%D1|%ADR1|%SW1|%RA1|
|%P2o|%K2-%D2|%ADR2|%SW2|%RA2|
|%P3o|%K3-%D3|%ADR3|%SW3|%RA3|
|%P4o|%K4-%D4|%ADR4|%SW4|%RA4|
|%P5o|%K5-%D5|%ADR5|%SW5|%RA5|
|&amp;nbsp;&amp;nbsp;%IconStatsT2%Team2Initials**|||||%RAT2|
|%P6o|%K6-%D6|%ADR6|%SW6|%RA6|
|%P7o|%K7-%D7|%ADR7|%SW7|%RA7|
|%P8o|%K8-%D8|%ADR8|%SW8|%RA8|
|%P9o|%K9-%D9|%ADR9|%SW9|%RA9|
|%PXo|%KX-%DX|%ADRX|%SWX|%RAX|

#[%game-map Detailed Stats](%match-history)

</textarea>

	<textarea id="main-scoreboard-stats-simple">

|**Team**|**K**-**D**|
|:--|--:|--:|--:|--:|--:|
|&amp;nbsp;&amp;nbsp;%IconStatsT1%Team1Initials**|
|%P1o|%K1-%D1|
|%P2o|%K2-%D2|
|%P3o|%K3-%D3|
|%P4o|%K4-%D4|
|%P5o|%K5-%D5|
|&amp;nbsp;&amp;nbsp;%IconStatsT2%Team2Initials**|
|%P6o|%K6-%D6|
|%P7o|%K7-%D7|
|%P8o|%K8-%D8|
|%P9o|%K9-%D9|
|%PXo|%KX-%DX|

#[%game-map Detailed Stats](%match-history)

</textarea>

	<textarea id="main-scoreboard-stats-1v1">

|**Team**|**K**|**A**|**D**|
|:--|--:|--:|--:|--:|--:|
|&amp;nbsp;&amp;nbsp;%IconStatsT1%Team1Initials**|
|%P1o|%K1-%D1|
|&amp;nbsp;&amp;nbsp;%IconStatsT2%Team2Initials**|
|%P6o|%K6-%D6|

#[%game-map Detailed Stats](%match-history)

</textarea>

	<textarea id="main-scoreboard-stats-2v2">

|**Team**|**K**|**A**|**D**|
|:--|--:|--:|--:|--:|--:|
|&amp;nbsp;&amp;nbsp;%IconStatsT1%Team1Initials**|
|%P1o|%K1-%D1|
|%P2o|%K2-%D2|
|&amp;nbsp;&amp;nbsp;%IconStatsT2%Team2Initials**|
|%P6o|%K6-%D6|
|%P7o|%K7-%D7|

#[%game-map Detailed Stats](%match-history)

</textarea>

	<textarea id="main-scoreboard-stats-3v3">

|**Team**|**K**|**A**|**D**|
|:--|--:|--:|--:|--:|--:|
|&amp;nbsp;&amp;nbsp;%IconStatsT1%Team1Initials**|
|%P1o|%K1-%D1|
|%P2o|%K2-%D2|
|%P3o|%K3-%D3|
|&amp;nbsp;&amp;nbsp;%IconStatsT2%Team2Initials**|
|%P6o|%K6-%D6|
|%P7o|%K7-%D7|
|%P8o|%K8-%D8|

#[%game-map Detailed Stats](%match-history)

</textarea>

	<textarea id="main-scoreboard-stats-4v4">

|**Team**|**K**|**A**|**D**|
|:--|--:|--:|--:|--:|--:|
|&amp;nbsp;&amp;nbsp;%IconStatsT1%Team1Initials**|
|%P1o|%K1-%D1|
|%P2o|%K2-%D2|
|%P3o|%K3-%D3|
|%P4o|%K4-%D4|
|&amp;nbsp;&amp;nbsp;%IconStatsT2%Team2Initials**|
|%P6o|%K6-%D6|
|%P7o|%K7-%D7|
|%P8o|%K8-%D8|
|%P9o|%K9-%D9|

#[%game-map Detailed Stats](%match-history)

</textarea>

	<textarea id="transition">

&amp;nbsp;

---

</textarea>

	<textarea id="last-transition">

---

</textarea>

	<textarea id="highlights">
#Highlights

%highlights

---

</textarea>

	<textarea id="end">
[**This thread was created by the Post-Match Team.**](https://docs.google.com/spreadsheets/d/1k5TiV7VuDKLa41MfcDgP1XiBkPvAo_HInRmNlKKEIBM/edit?usp=sharing)  
Want to help post these threads? Message /u/Undercover-Cactus to join the Post-Match Team.   
</textarea>

	<datalist id="mapz">
		<option value='ancient'/>
		<option value='anubis'/>
		<option value='dust2'/>
		<option value='inferno'/>
		<option value='mirage'/>
		<option value='nuke'/>
		<option value='overpass'/>
		<option value='vertigo'/>
		<option value='cache'/>
		<option value='cbble'/>
		<option value='train'/>
	</datalist>
	<datalist id="mapo">
		<option value=''/>
		<option value='✔'/>
		<option value='X'/>
	</datalist>
</section>
<?php
/*} else {
echo '<p>How did you get here?</p>';
}*/
?>