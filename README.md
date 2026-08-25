# CS Post-Match Thread Creator (PMTC)

The PMTC is a website designed to facilitate the creation of formatted Post-Match Discussions for Counter-Strike matches on r/GlobalOffensive.

## Template

More detail can be found in pmtc.php and pmtc.js. The below template is an example of the most commonly used portions, but it is not an exact reflection of how the formatting is built under the hood, and does not represent some of the more niche match-specific aspects of the formatting.

### Title

```
%T1 vs %T2 / %event-name - %match-type / Post-Match Discussion
```

### Body

```
#%T1 %IconT1 [%series-result](%hltv-url) %IconT2 %T2  

**%pergame-mapi:** %mapi-result  

&amp;nbsp;

**%IconWinner %WinnerName %series-context1**  

**%IconLoser %LoserName %series-context2**    

&amp;nbsp;

-----
### Predicted VRS Impact  
  
Team | Rank | Diff | Total  
:--|:--:|:--:|:--:  
%IconStatsT1%Team1Initials** | #%VRSB1 → #%VRSA1 | %VRSD1 pts | %VRSTA1 pts |  
%IconStatsT2%Team2Initials** | #%VRSB2 → #%VRSA2 | %VRSD2 pts | %VRSTA2 pts | 
  
^Note: ^VRS ^officially ^updates ^once ^per ^month. ^This ^is ^simply ^a ^prediction ^that ^might ^not ^take ^into ^account ^all ^factors ^that ^go ^into ^VRS ^calculations.

&amp;nbsp;

---

### Event Information

**%event-name** | %event-flag %event-city (%event-prize %event-type) | [Liquipedia](%wiki-link) | [HLTV](%hltv-link) | [Reddit](%reddit-link)

**Streams** | [YouTube](%youtube-link) | [Twitch A](%twitcha-link) | [Twitch B](%twitchb-link) | [Twitch C](%twitchc-link) | [Twitch D](%twitchd-link) | [Kick A](%kicka-link) | [Kick B](%kickb-link) | [Kick C](%kickc-link) | [Kick D](%kickd-link)

&amp;nbsp;

---  

### Team Information

%IconT1 **%T1** | [Liquipedia](%t1-liquipedia) | [HLTV](%t1-hltv) | [Official Site](%t1-site) | [Steam](%tl-steam) | [Faceit](%t1-faceit) | [Discord](%t1-discord) | [Twitter](%t1-twitter) | [Facebook](%t1-facebook) | [Instagram](%t1-instagram) | [TikTok](%t1-tiktok) | [Weibo](%t1-weibo) | [YouTube](%t1-youtube) | [Twitch](%t1-twitch) | [Bilibili](%t1-bilibili) | [Subreddit](%t1-subreddit)
**Roster**: %t1-roster 
**Coach**: %t1-coach  
**Subs/Benched**: %t1-subs

%IconT2 **%T2** | [Liquipedia](%t2-liquipedia) | [HLTV](%t2-hltv) | [Official Site](%t2-site) | [Steam](%t2-steam) | [Faceit](%t2-faceit) | [Discord](%t2-discord) | [Twitter](%t2-twitter) | [Facebook](%t2-facebook) | [Instagram](%t2-instagram) | [TikTok](%t2-tiktok) | [Weibo](%t2-weibo) | [YouTube](%t2-youtube) | [Twitch](%t2-twitch) | [Bilibili](%t2-bilibili) | [Subreddit](%t2-subreddit)
**Roster**: %t2-roster 
**Coach**: %t2-coach  
**Subs/Benched**: %t2-subs
  

^Note: ^Above ^rosters ^do ^not ^reflect ^temporary ^subs ^and ^may ^be ^out ^of ^date ^if ^recent ^changes ^were ^made

&amp;nbsp;

-----

###Map Vetoes

|%IconVWTA1|**MAP**|%IconVWTA2|
|:--:|:--:|:--:|
|%ML1|%MP1|%MR1|
|%ML2|%MP2|%MR2|
|%ML3|%MP3|%MR3|
|%ML4|%MP4|%MR4|
|%ML5|%MP5|%MR5|
|%ML6|%MP6|%MR6|
|%ML7|%MP7|%MR7|

&amp;nbsp;

---

###Full Match Stats

|**Team**|**K-D**|**ADR**|**Swing**|**Rating**|
|:--|--:|--:|--:|--:|--:|
|&amp;nbsp;&amp;nbsp;%IconStatsT1%Team1Initials**||||%RAT1|
|%P1|%K1-%D1|%ADR1|%SW1|%RA1|
|%P2|%K2-%D2|%ADR2|%SW2|%RA2|
|%P3|%K3-%D3|%ADR3|%SW3|%RA3|
|%P4|%K4-%D4|%ADR4|%SW4|%RA4|
|%P5|%K5-%D5|%ADR5|%SW5|%RA5|
|&amp;nbsp;&amp;nbsp;%IconStatsT2%Team2Initials**||||%RAT2|
|%P6|%K6-%D6|%ADR6|%SW6|%RA6|
|%P7|%K7-%D7|%ADR7|%SW7|%RA7|
|%P8|%K8-%D8|%ADR8|%SW8|%RA8|
|%P9|%K9-%D9|%ADR9|%SW9|%RA9|
|%PX|%KX-%DX|%ADRX|%SWX|%RAX|

###[HLTV Match Page](%hltv-url)

&amp;nbsp;

---

&amp;nbsp;

###MAP i: %game-map

&amp;nbsp;

|Team|CT|T|OT1^T:CT|OT2^CT:T|OT3^T:CT|OT4^CT:T|OT5^T:CT|Total|
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|%IconStatsT1%Team1Initials**|%L1|%L2|%L3:%L4|%L5:%L6|%L7:%L8|%L9:%LX0|%LX1:%LX2|**%LRoundst**|
||**T**|**CT**|**OT1^CT:T**|**OT2^T:CT**|**OT3^CT:T**|**OT4^T:CT**|**OT5^CT:T**|
|%IconStatsT2%Team2Initials**|%R1|%R2|%R3:%R4|%R5:%R6|%R7:%R8|%R9:%RX0|%RX1:%RX2|**%RRoundst**|

&amp;nbsp;

|**Team**|**K-D**|**ADR**|**Swing**|**Rating**|
|:--|--:|--:|--:|--:|--:|
|&amp;nbsp;&amp;nbsp;%IconStatsT1%Team1Initials**||||%RAT1|
|%P1o|%K1-%D1|%ADR1|%SW1|%RA1|
|%P2o|%K2-%D2|%ADR2|%SW2|%RA2|
|%P3o|%K3-%D3|%ADR3|%SW3|%RA3|
|%P4o|%K4-%D4|%ADR4|%SW4|%RA4|
|%P5o|%K5-%D5|%ADR5|%SW5|%RA5|
|&amp;nbsp;&amp;nbsp;%IconStatsT2%Team2Initials**||||%RAT2|
|%P6o|%K6-%D6|%ADR6|%SW6|%RA6|
|%P7o|%K7-%D7|%ADR7|%SW7|%RA7|
|%P8o|%K8-%D8|%ADR8|%SW8|%RA8|
|%P9o|%K9-%D9|%ADR9|%SW9|%RA9|
|%PXo|%KX-%DX|%ADRX|%SWX|%RAX|

###[%game-map Detailed Stats](%match-history)

&amp;nbsp;

---

#Highlights

[%highlight-title](%highlight-link)  

&amp;nbsp;

---

[**This thread was created by the Post-Match Team.**](https://docs.google.com/spreadsheets/d/1k5TiV7VuDKLa41MfcDgP1XiBkPvAo_HInRmNlKKEIBM/edit?usp=sharing)  
Want to help post these threads? Message /u/Undercover-Cactus to join the Post-Match Team.
```