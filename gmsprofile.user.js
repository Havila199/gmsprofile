	// ==UserScript==
	// @name         gmodstore Checker
	// @namespace    gmodstore.com
	// @version      1.0.0
	// @description  View a gmodstore user's information on their steam profile page.
	// @author       nobody & meharryp
	// @downloadURL  https://raw.githubusercontent.com/Havila199/gmsprofile/master/gmsprofile.user.js
	// @match        *://steamcommunity.com/id/*
	// @match        *://steamcommunity.com/profiles/*
	// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
	// @require      http://timeago.yarp.com/jquery.timeago.js
	// @connect      gmodstore.com
	// @grant        GM_xmlhttpRequest
	// ==/UserScript==

	(function() {
		'use strict';
	
		var apikey = ""; // ENTER YOUR GMODSTORE API KEY HERE OR THE SCRIPT WONT WORK!!! ONLY READ USER PERMISSIONS REQUIRED!!!
		var bans = {};
		var data = {};
		
		if (!apikey || apikey == ""){
			alert("GMSProfile: You haven't set a Gmodstore API key! Edit the script file and add one to keep using this.");
		}
		$(".profile_leftcol").prepend(`
			<div class="profile_customization" style="background-image: none;background: #d9534f;">
				<div class="profile_customization_header ellipsis" style="background: #d9534f;color: #f5f8fa;font-size: 1.1rem;font-weight: 500;">Gmodstore Bans</div>
				<div class="profile_customization_block" style="height: auto;width: 100%;z-index: -1;">
					<div class="customtext_showcase" style="background-color:rgba(255,255,255,0.2);">
						<div class="showcase_content_bg showcase_notes" id="gmsholder2"></div>
					</div>
				</div>
			</div>
		`);
		$(".profile_leftcol").prepend(`
			<div class="profile_customization" style="background-image: none;background: #3097d1;">
				<div class="profile_customization_header ellipsis" style="background: #3097d1;color: #f5f8fa;font-size: 1.1rem;font-weight: 500;">Gmodstore Details</div>
				<div class="profile_customization_block" style="height: auto;width: 100%;z-index: -1;">
					<div class="customtext_showcase" style="background-color:rgba(255,255,255,0.2);">
						<div class="showcase_content_bg showcase_notes" id="gmsholder"></div>
					</div>
				</div>
			</div>
		`);
		var steamid = g_rgProfileData.steamid;

				// Get user data
				GM_xmlhttpRequest({
					url: "https://api.gmodstore.com/v2/users/" + steamid +"?with=bans,group",
					method: "GET",
                    headers: {
                        "authorization": "Bearer " + apikey,
                        "cache-control": "no-cache",
                    },
					onload: function(res){
					data = JSON.parse(res.responseText);

	                        	var html = `
                        <div class="" style="color:white;">
						<b>Username: </b>${data.data.name}<br>
						<b>Country: </b>${data.data.country_code}<br>
						<b>Rank: </b>${data.data.group.title}<br>
						<b>Reputation: </b>SOON™<br>
						<b>Registered: </b>SOON™<br>
						<b>Online: </b>SOON™<br>
                        </div>
                           `;


	                       html += `<br>
<div class="header_installsteam_btn header_installsteam_btn_gray" style="color:white;">
<a class="header_installsteam_btn_content" href="https://gmodstore.com/users/view/${steamid}">Gmodstore Profile</a>
</div>`;
							$("#gmsholder").html(html);
                        if (data.data.bans[0] !== undefined) {

                        var bans = data.data.bans[0];
                        console.log(bans);
                        if(bans.end == null){ var banend = "Permanent"} else{ var banend = bans.end};
                        if(bans.properties == "addon.create"){ var bantype = "Script Creation"};
                        if(bans.properties == "everything"){ var bantype = "Everything"};
                        if(bans.properties == "forum.post"){ var bantype = "Forum Posts"};

                        var html2 = `
                         <div style="color:white;">
						<b>Ban Date: </b>${bans.start}<br>
						<b>Unban Date: </b>${banend}<br>
						<b>Banned From: </b>${bantype}<br>
						<b>Reason: </b>${bans.reason}<br>
                        </div>
                           `;
							$("#gmsholder2").html(html2);
						}else{
                        var html2 = `
                         <div style="color:white;">
						<center><b><h1>NO BANS</h1></b></center>
                        </div>
                           `;
							$("#gmsholder2").html(html2);
                        }}
					});
	})();
