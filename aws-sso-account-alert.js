// ==UserScript==
// @name         AWS SSO Account Alert
// @namespace    https://github.com/rayos006/aws-console-tampermonkey
// @version      0.1
// @description  Display AWS account and assumed role in a color coded fashion!
// @author       rayos006
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// ==/UserScript==

// FORKED FROM https://github.com/mhlabs/aws-console-tampermonkey/blob/master/scripts/aws-sso-account-alert.js

// Set up the mutation observer
var observer = new MutationObserver(function(mutations, me) {
  var canvas = document.getElementById('nav-usernameMenu');
  if (canvas) {
      addInfo();
      me.disconnect();
      return;
  }
});

// Start observing
observer.observe(document, {
  childList: true,
  subtree: true
});

function addInfo() {
  "use strict";
  // Get elements
  var role = document
      .getElementById("nav-usernameMenu")
      .innerHTML.split("_")[6];
  var account = document.querySelector("div[data-testid='account-detail-menu']")
      .children[0]
      .children[0]
      .children[1]
      .innerText
      .replaceAll("-", "");
  var account_name = document.querySelectorAll("span[data-testid='awsc-nav-account-menu-button'")[0]
      .children[0]
      .title
      .split("@")[2]
  var container = document.querySelector("div[data-testid='awsc-nav-scallop-icon-container']");

  // Create HTML object
  var elem = document.createElement("span");
  elem.className = "nav-elt mh-account";
  elem.innerHTML = `<strong>Account Name:</strong> ${account_name} | <strong>ID:</strong> ${account} | <strong>Role:</strong> ${role}`;

  container.prepend(elem);

  // Add Style
  var style = document.createElement("style");
  var bgColor = intToRGB(hashCode(account));
  if (account_name.includes("prd") || account_name.includes("prd") || account_name.split("-") < 2) {
      style.innerHTML = `.mh-account {
      padding: 4px !important;
     color: ${getContrastYIQ(bgColor)} !important;
      background-color: #${bgColor} !important;
      text-shadow: 0 0 0 #000;
      outline: dashed;
      outline-color: red;
      }`;
  } else {
      style.innerHTML = `.mh-account {
      padding: 4px !important;
     color: ${getContrastYIQ(bgColor)} !important;
      background-color: #${bgColor} !important;
      text-shadow: 0 0 0 #000;
      }`;
  }
  var scriptTag = document.querySelector("script");
  scriptTag.parentNode.insertBefore(style, scriptTag);

};

// Get Color
function getContrastYIQ(hexcolor) {
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}