<?php if ($validUser) { ?>
<div id="instructions-popup" class="white_content hidden">
	<h2>Instructions</h2>
	<a class="close" href="javascript:void(0)" onclick="closePopup('instructions-popup')">×</a>
	<div>
	<p class="bold">Golden rules</p>
	<ul>
	<li>Hit Control+R (if on Windows) to ensure you're on the latest PMTC</li>
	<li>HIT RESET AND RESET ALL VALUES</li>
	<li>Submit threads as soon as the match/series ends.</li>
	<li>Copy title from the <a href="https://docs.google.com/spreadsheets/d/1JPfBxO1U5wLpx6k2vxOp7mvVmJSeuexmJfwlARm2HB8/edit">schedule</a></li>
	<li>put your name in the "Coverage" column on the schedule if you want to post a thread, to ensure we don't have multiple people trying to make a post at the same time
	<li>Set the flair to "Discussion | Esports".</li>
	</ul>
	<p class="bold">Silver rules</p>
	<ul>
	<li>Edit changes later (ideally you would just need to fill last map of the series)</li>
	<li>Have links (Discussion Thread, Liquipedia page etc.) on the thread before last game ends (if possible)</li>
	</ul>
	<p class="bold">Normal procedure:</p>
	<p>If you have any questions just ask #csgo on Slack, /u/Undercover-Cactus on Reddit, or any other PMT member.</p>
	<p>A more in depth tutorial can be found <a href="https://docs.google.com/document/d/1WGTrr7xfwEvpU4Si6qH-tqM9pfo1_GXqCdEwc9vSlso">here</a></p>
	</div>
</div>
<?php } ?>

<?php if ($validUser) { ?>
<div id="schedule-popup" class="white_content hidden">
	<h2>Schedule</h2>
	<a class="close" href="javascript:void(0)" onclick="closePopup('schedule-popup')">×</a>
	<div>
		<p class="bold">Schedule is usually found <a href="https://docs.google.com/spreadsheets/d/1JPfBxO1U5wLpx6k2vxOp7mvVmJSeuexmJfwlARm2HB8/edit">HERE</a></p>
		<p class="bold">If it's not there, ask in #csgo on Slack</p>
	</div>
</div>
<?php } ?>

<div id="top-div">
	<ul class="top-list inline">
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
