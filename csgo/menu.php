<?php if ($validUser) { ?>
<div id="rules-popup" class="white_content hidden">
	<h2>Rules</h2>
	<a class="close" href="javascript:void(0)" onclick="closePopup('rules-popup')">×</a>
	<div>
		<p class="bold">Golden rules</p>
		<ul>
			<li>Hit Control+Shift+R (or equivalent hard refresh shortcut on your computer) to ensure you're on the latest PMTC</li>
			<li>Hit Reset and reset all values before starting a new thread.</li>
			<li>Submit threads as soon as the match/series ends.</li>
			<li>put your name in the "Coverage" column on the schedule if you want to post a thread, to ensure we don't have multiple people trying to make a post at the same time</li>
			<li>Use old.reddit or new Reddit with markdown mode enabled.</li>
			<li>Set the flair to "Discussion | Esports".</li>
		</ul>
		<p class="bold">Silver rules</p>
		<ul>
			<li>Edit changes later (last map of series, overall match stats, and highlights)</li>
			<li>Have the HLTV match page URL on the thread before last game ends (if possible).</li>
		</ul>
		<p class="bold">Questions:</p>
		<p>If you have any questions just ask in the Discord, ask /u/Undercover-Cactus on Reddit, or ask any other PMT member.</p>
	</div>
</div>
<div id="instructions-popup" class="white_content hidden">
	<h2>Instructions</h2>
	<a class="close" href="javascript:void(0)" onclick="closePopup('instructions-popup')">x</a>
	<div>
		<p class="bold">Normal procedure:</p>
		<ol>
			<li>Put HLTV match page URL in "HLTV URL."</li>
			<li>Select entire HLTV match page (ctrl+a), then copy and paste into "HLTV Page Copy and Paste."</li>
			<li>Enter "Winner Context", "Loser Context", and optionally "Next Opponent" boxes.</li>
			<li>Go to the individual map stats page for the first map on HLTV.</li>
			<li>Select "Map 1" on the PMTC and put the HLTV map stats URL in "HLTV Map URL."</li>
			<li>Select entire HLTV map stats page (ctrl+a), then copy and paste into "HLTV Map Stats Copy and Paste."</li>
			<li>Check the box to the right of "HLTV Map URL" if the left team started on the T side.</li>
			<li>Repeat steps 4-7 for the following maps, except for the final map of the series.</li>
			<li>Select "Output", then copy and paste the title and text output into a new Reddit draft, on old.reddit, or new Reddit with markdown mode enabled.</li>
			<li>Set the flair as "Discussion | Esports" and wait for the match to end.</li>
			<li>When the match ends, edit the top of the post to have the correct score (i.e. 2-0, 2-1).
			<li>Double check the title is correct, then submit the post.</li>
			<li>Wait for HLTV to update the stats for the final map.</li>
			<li>Repeat step 2 for the overall stats/VRS result and steps 4-7 for the final map stats</li>
			<li>Optionally add highlights to the highlight tab</li>
			<li>Copy the output, and update your original Reddit post, again using old.reddit or new Reddit with markdown mode enabled.</li>
		</ol>
		<p>A more in depth tutorial, including how to use the PMTC if the copy and paste feature is broken, can be found <a href="https://docs.google.com/document/d/1WGTrr7xfwEvpU4Si6qH-tqM9pfo1_GXqCdEwc9vSlso">here</a></p>
	</div>
</div>
<?php } ?>

<?php if ($validUser) { ?>
<div id="schedule-popup" class="white_content hidden">
	<h2>Schedule</h2>
	<a class="close" href="javascript:void(0)" onclick="closePopup('schedule-popup')">×</a>
	<div>
		<p class="bold">Schedule is usually found <a href="https://docs.google.com/spreadsheets/d/1uFXTFX3cFuF9vrloUTxzwdNzjWHP7b0P2PHxXa15hxs/edit">HERE</a></p>
		<p class="bold">If it's not there, ask in the Discord</p>
	</div>
</div>
<?php } ?>

<div id="top-div">
	<ul class="top-list inline">
		<?php if ($validUser) { ?>
		<li>
			<strong id="rules-btn" onclick="showPopup('rules-popup')">
			Rules
			</strong>
		</li>
		<?php } ?>
		<?php if ($validUser) { ?>
		<li>
			<strong id="instructions-btn" onclick="showPopup('instructions-popup')">
			Instructions
			</strong>
		</li>
		<?php } ?>
		<?php if ($guest || $validUser) { ?>
		<li>
		<strong class="about-btn">
			<a href="http://hltv.org">HLTV</a>
		</strong>
		</li>
		<?php } ?>
		<li>
			<strong class="about-btn" onclick="showPopup('about-popup');">
			About
			</strong>
		</li>
		<li>
			<strong id="themeButton" onclick="changeTheme();">
			Switch Theme
			</strong>
		</li>
		<?php if ($guest || $validUser) { ?>
		<li>
			<strong class="schedule-btn" onclick="showPopup('schedule-popup');">
					Schedule
			</strong>
		</li>
		<?php } ?>
	</ul>
</div>
