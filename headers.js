// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var tabId = parseInt(window.location.search.substring(1));

window.addEventListener("load", function() {
  
  chrome.debugger.sendCommand({tabId:tabId}, "Network.enable");
  chrome.debugger.onEvent.addListener(onEvent);
  document.getElementById("clearbutton").addEventListener("click",cleartext);
  document.getElementById("downloadbutton").addEventListener("click",downloadtext);
  document.getElementById('go_to_lmp_login').addEventListener('click', go_to_lmp_login);
  document.getElementById('login_to_lmp').addEventListener('click', login_to_lmp);
  document.getElementById('click_lead_tab').addEventListener('click', click_lead_tab);
  document.getElementById('logout').addEventListener('click', logout);
});

window.addEventListener("unload", function() {
  chrome.debugger.detach({tabId:tabId});
});


var requests = {};

function grab_tab_zero(){

  return new Promise(function (fulfill, reject){
    cleartext();

    //console.log(chrome.windows);

    chrome.windows.getAll( function(win) {
      //console.log(win);
      //console.log(win.length);

      if (win.length == 1){

        var msg = "The extension page has not opened.";
        reject(msg);
      }

      for (var i = 0; i < win.length; i++){
        //console.log(win[i]['id']);

        if (win[i]['id'] == 1){

          //console.log("Found Main Window! Switching window...");
          //console.log(chrome.windows.WINDOW_ID_CURRENT);
          chrome.windows.WINDOW_ID_CURRENT = win[i]['id'];
          //console.log(chrome.windows.WINDOW_ID_CURRENT);

          //console.log(chrome.tabs);
          //console.log(chrome.tabs.query);

          chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
            
            //console.log(tabs);

            // place fulfill outside of loop
            var response = tabs[0]['id'];
            fulfill(response);

          });
          }
        }
    });


  });

}

function inject_code_executescript(passedtabid, codetext){

  return new Promise(function (fulfill, reject){
    var getText = Array();
    try {
      chrome.tabs.executeScript(passedtabid, {code: codetext}, function (result) {
        console.log(result);

        
        var successfulfile = 'Success';
        fulfill(successfulfile);
        
      });

    }
    catch(err) {
      reject(err.message);
    }
    
  });

}

function inject_file_executescript(passedtabid, codefile){

  return new Promise(function (fulfill, reject){
    var getText = Array();
    try {
      chrome.tabs.executeScript(passedtabid, {file: codefile}, function (result) {
        console.log(result);

        
        var successfulfile = 'Success';
        fulfill(successfulfile);
        
      });

    }
    catch(err) {
      reject(err.message);
    }
    
  });

}


function go_to_lmp_login() {
  var response;
  grab_tab_zero().then(function(resp){
    response = resp;
    return inject_file_executescript(response, 'content_script.js');
  }).then(function(){
    return inject_code_executescript(response, 'var x = go_to_lmp_login(); x');
  }).then(function(successfulfile){
      console.log("yay");
  }, function(msg) {
    console.log("NOOOOO!", msg);
  });
}

function login_to_lmp() {
  var response;
  grab_tab_zero().then(function(resp){
    response = resp;
    return inject_file_executescript(response, 'content_script.js');
  }).then(function(){
    return inject_code_executescript(response, 'var x = login_to_lmp(); x');

  }).then(function(successfulfile){
      console.log("yay");
  }, function(msg) {
    console.log("NOOOOO!", msg);
  });
}

function click_lead_tab() {
  var response;
  grab_tab_zero().then(function(resp){
    response = resp;
    return inject_file_executescript(response, 'content_script.js');
  }).then(function(){
    return inject_code_executescript(response, 'var x = click_lead_tab(); x');
  }).then(function(successfulfile){
      console.log("yay");
  }, function(msg) {
    console.log("NOOOOO!", msg);
  });
}


function logout() {
  var response;
  grab_tab_zero().then(function(resp){
    response = resp;
    return inject_file_executescript(response, 'content_script.js');
  }).then(function(){
    return inject_code_executescript(response, 'var x = logout(); x');
  }).then(function(successfulfile){
      console.log("yay");
  }, function(msg) {
    console.log("NOOOOO!", msg);
  });
}

function cleartext(){

  var page = document.getElementById("container");
  while (page.hasChildNodes()){
    page.removeChild(page.firstChild);
  }
}

function downloadtext(){
  var results = document.getElementById("container").innerHTML;
  var parsedtags = results.replace(/<[^>]*>/g, "");
  console.log(parsedtags);

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(parsedtags));
  element.setAttribute('download', "example.txt");

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);

  cleartext();
}

function onEvent(debuggeeId, message, params) {

  if (tabId != debuggeeId.tabId)
    return;

  var requestDiv = document.createElement("div");
  var urlLine = document.createElement("div");
  urlLine.textContent = message;
  requestDiv.appendChild(urlLine);
  document.getElementById("container").appendChild(requestDiv);

  //basicrequest(params);
  if (message == "Network.requestWillBeSent") {
    request_request_details(params);
  } else if (message == "Network.responseReceived"){
    response_details(params);
    response_details_timing(params);
  }
}


function basicrequest(paramspassed){

  var requestDiv = document.createElement("div");
  var urlLine = document.createElement("div");
  var test = [];

    
  for (var key in paramspassed) {
    if (paramspassed.hasOwnProperty(key)) {

      test.push(key + " -> " + paramspassed[key]);
    }
  
  }
  urlLine.textContent = test;
  requestDiv.appendChild(urlLine);
  document.getElementById("container").appendChild(requestDiv);
}



function request_request_details(paramspassed){

  var requestDiv = document.createElement("div");

  var titleline = document.createElement("div");
  var urlLine = document.createElement("div");
  var finishline = document.createElement("div");
  var test = [];

    
  for (var key in paramspassed.request) {
    if (paramspassed.request.hasOwnProperty(key)) {

      test.push(key + " -> " + paramspassed.request[key]);
    }
  
  }
  titleline.textContent = "******************Request Details******************";
  urlLine.textContent = test;
  finishline.textContent = "\n \n";
  requestDiv.appendChild(titleline);
  requestDiv.appendChild(urlLine);
  requestDiv.appendChild(finishline);
  document.getElementById("container").appendChild(requestDiv);
}


function response_details(paramspassed){

  var requestDiv = document.createElement("div");

  var titleline = document.createElement("div");
  var urlLine = document.createElement("div");
  var finishline = document.createElement("div");
  var test = [];

    
  for (var key in paramspassed.response) {
    if (paramspassed.response.hasOwnProperty(key)) {

      test.push(key + " -> " + paramspassed.response[key]);
    }
  
  }
  titleline.textContent = "******************Response Details******************";
  urlLine.textContent = test;
  finishline.textContent = "\n \n";
  requestDiv.appendChild(titleline);
  requestDiv.appendChild(urlLine);
  requestDiv.appendChild(finishline);
  document.getElementById("container").appendChild(requestDiv);
}


function response_details(paramspassed){

  var requestDiv = document.createElement("div");

  var titleline = document.createElement("div");
  var urlLine = document.createElement("div");
  var finishline = document.createElement("div");
  var test = [];

    
  for (var key in paramspassed.response) {
    if (paramspassed.response.hasOwnProperty(key)) {

      test.push(key + " -> " + paramspassed.response[key]);
    }
  
  }
  titleline.textContent = "******************Response Details******************";
  urlLine.textContent = test;
  finishline.textContent = "\n \n";
  requestDiv.appendChild(titleline);
  requestDiv.appendChild(urlLine);
  requestDiv.appendChild(finishline);
  document.getElementById("container").appendChild(requestDiv);
}


function response_details_timing(paramspassed){

  var requestDiv = document.createElement("div");

  var titleline = document.createElement("div");
  var urlLine = document.createElement("div");
  var finishline = document.createElement("div");
  var test = [];

    
  for (var key in paramspassed.response.timing) {
    if (paramspassed.response.timing.hasOwnProperty(key)) {

      test.push(key + " -> " + paramspassed.response.timing[key]);
    }
  
  }
  titleline.textContent = "******************Timing Details******************";
  urlLine.textContent = test;
  finishline.textContent = "\n \n";
  requestDiv.appendChild(titleline);
  requestDiv.appendChild(urlLine);
  requestDiv.appendChild(finishline);
  document.getElementById("container").appendChild(requestDiv);
}



function testtimeing(requestId, request){

  var requestDiv = requests[requestId];
  // requestDiv.appendChild(formatHeaders(request.timeline.stalled));
  requestDiv.appendChild("***************************");

}

function appendResponse(requestId, response) {
  var requestDiv = requests[requestId];
  requestDiv.appendChild(formatHeaders(response.requestHeaders));

  var statusLine = document.createElement("div");
  statusLine.textContent = "\nHTTP/1.1 " + response.status + " " +
      response.statusText;
  requestDiv.appendChild(statusLine);
  requestDiv.appendChild(formatHeaders(response.headers));
}

function formatHeaders(headers) {
  var text = "";
  for (name in headers)
    text += name + ": " + headers[name] + "\n";
  var div = document.createElement("div");
  div.textContent = text;
  return div;
}

function parseURL(url) {
  var result = {};
  var match = url.match(
      /^([^:]+):\/\/([^\/:]*)(?::([\d]+))?(?:(\/[^#]*)(?:#(.*))?)?$/i);
  if (!match)
    return result;
  result.scheme = match[1].toLowerCase();
  result.host = match[2];
  result.port = match[3];
  result.path = match[4] || "/";
  result.fragment = match[5];
  return result;
}