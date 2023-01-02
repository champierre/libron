chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.contentScriptQuery === 'setValue') {
    chrome.storage.local.set({[request.key]: request.value})
      .then(() => {
        sendResponse(true);
      }).catch(error => {
        console.error(error);
      })
    return true;
  } else if (request.contentScriptQuery === 'getValue') {
    chrome.storage.local.get([request.key])
      .then(response => {
        sendResponse(response[request.key]);
      }).catch(error => {
        console.error(error);
      })
    return true;
  } else if (request.contentScriptQuery == "queryLibraries") {
    var url = "https://api.calil.jp/library?appkey=" + encodeURIComponent(request.appkey) + "&pref=" + encodeURIComponent(request.prefecture) + "&format=json";
    fetch(url)
      .then(response => response.text())
      .then(text => {
        var match = text.match(/^callback\((.*)\);(\n)*$/);
        return match[1];
      })
      .then(libraries => sendResponse(libraries))
      .catch(error => {
        console.error(error);
      })
    return true;  // Will respond asynchronously.
  } else if (request.contentScriptQuery == "queryCities") {
    var url = "https://calil.jp/city_list";
    fetch(url)
      .then(response => response.text())
      .then(text => {
        var match = text.match(/^loadcity\((.*)\);(\n)*$/);
        return match[1];
      })
      .then(cities => sendResponse(cities))
      .catch(error => {
        console.error(error);
      })
    return true;  // Will respond asynchronously.
  } else if (request.contentScriptQuery == "queryAvailabilityInLibrary") {
    var url = "https://api.calil.jp/check?appkey=" + encodeURIComponent(request.appkey) + "&isbn=" + request.isbns + "&systemid=" + encodeURIComponent(request.selectedSystemId) + "&format=json";
    if (request.session) {
      url = "https://api.calil.jp/check?appkey=" + encodeURIComponent(request.appkey) + "&session=" + encodeURIComponent(request.session) + "&format=json";
    }
    fetch(url)
      .then(response => response.text())
      .then(text => {
        var match = text.match(/^callback\((.*)\);$/);
        return match[1];
      })
      .then(json => sendResponse(json))
      .catch(error => {
        console.error(error);
      })
    return true;  // Will respond asynchronously.
  } else if (request.contentScriptQuery == "queryNews") {
    var url = "https://libron.net/news.txt";
    fetch(url)
      .then(response => response.text())
      .then(text => sendResponse(text))
      .catch(error => {
        console.error(error);
      })
    return true;
  }
});
