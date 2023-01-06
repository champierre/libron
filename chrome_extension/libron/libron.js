var libron = libron ? libron : new Object();
libron.version = "3.0.16";

// カーリルAPIキー
//
// このキーは動作確認用にお使いください。
// もしこのプロジェクトをForkして動作させる場合には、
// カーリルAPIの利用規約(https://calil.jp/doc/api_license.html)を確認した上で、
// http://calil.jp/api/dashboard/ より自分のAPIキーを申請し、それを使うようにしてください。
libron.appkey = "7b38a6543c2d4423c00114f53f114655";

libron.createElement = function(tagName, attributes, content) {
  var dom = document.createElement(tagName);
  for (var key in attributes) {
    dom.setAttribute(key, attributes[key]);
  }
  if (content) {
    dom.textContent = content;
  }
  return dom;
}

main();

/*
 * メイン
 */

function main() {
  console.log("*** Libron ver." + libron.version + " ***");

  getValue("settingsChanged", (value) => {
    libron.settingsChanged = value || false;
    getValue("selectedSystemName", (value) => {
      libron.selectedSystemName = value || '東京都立図書館';
      getValue("selectedSystemId", (value) => {
        libron.selectedSystemId = value || 'Tokyo_Pref';
        getValue("selectedPrefecture", (value) => {
          libron.selectedPrefecture = value || '東京都';
        });
      });
    });
  });

  var href = document.location.href;

  if (parent != self) {
    return;
  }

  if (isbnOfBookPage(href)) {
    addLibraryLinksToBookPage(isbnOfBookPage(href));
  } else if (isWishList(href)) {
    addLibraryLinksToWishList();
  } else if (isbnOfMobileBookPage(href)) {
    addLibraryLinksToMobileBookPage(isbnOfMobileBookPage(href));
  }
  return;
}

/*
 * 書籍リストページ or 書籍単体ページ or ほしい物リスト 判定用
 */

function isBookList(href) {
  if ((href.indexOf('/s?') != -1) || (href.indexOf('/s/') != -1) || (href.indexOf('/gp/search') != -1)) {
    return true;
  }
  // 新着ニューリリース http://www.amazon.co.jp/gp/new-releases/books/ref=sv_b_2
  if (href.indexOf('/gp/new-releases/') != -1) {
    return true;
  }
  return false;
}

function isbnOfBookPage(href) {
  var matched = href.match(/\/(dp|ASIN|product)\/([\dX]{10})/);
  if (matched && matched[2]) {
    return matched[2];
  }
  return false;
}

function isWishList(href) {
  if (href.indexOf("/wishlist") != -1) {
    return true;
  }
  return false;
}

function isbnOfMobileBookPage(href) {
  var matched = href.match(/\/gp\/aw\/d\/([\dX]{10})/);
  if (matched && matched[1]) {
    return matched[1];
  }
  return false;
}

/*
 * Amazonの各ページに応じて、図書館リンクを表示
 */

function addLibraryLinksToBookList(){
  var objects = document.getElementsByTagName('h3');
  var isbns = [];
  var target_objects = [];

  outerloop:
  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    for (var j = 0; j < object.parentNode.childNodes.length; j++) {
      if ((object.parentNode.childNodes[j].className == 'libron_link_div') || (object.parentNode.childNodes[j].className == 'libron_loading_icon_div')){
        continue outerloop;
      }
    }

    if ((object.className.indexOf("productTitle") != -1) || (object.className.indexOf("title") != -1) || (object.className.indexOf("fixed-line") != -1)){
      var link = object.getElementsByTagName('a')[0];
      if (link) {
        var matched = link.href.match(/\/dp\/([\dX]{10})\/ref/);
        if (matched && matched[1]) {
          var isbn = matched[1];
          isbns.push(encodeURIComponent(isbn));
          target_objects.push(object);
        }
      }
    }
  }

  if (isbns.length > 0) {
    addLoadingIcon(target_objects, isbns);
  }
}

function addLibraryLinksToBookPage(isbn){
  var btAsinTitleDiv = parent.document.getElementById('btAsinTitle');
  if (btAsinTitleDiv) {
    var div = btAsinTitleDiv.parentNode;
    addLoadingIcon([div], [isbn]);
  } else {
    var booksTitleDiv = document.getElementById('productTitle');
    if (booksTitleDiv) {
      var div = booksTitleDiv.parentNode;
      addLoadingIcon([div], [isbn]);
    }
  }
}

function addLibraryLinksToWishList(){
  var isbns = [];
  var target_objects = [];
  var objects = parent.document.evaluate("//a[contains(@id, 'itemName')]", parent.document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < objects.snapshotLength; i++) {
    var object = objects.snapshotItem(i);
    if (object) {
      var matched = object.href.match(/\/dp\/([\dX]{10})\/ref/);
      if (matched && matched[1]) {
        var isbn = matched[1];
        isbns.push(encodeURIComponent(isbn));
        target_objects.push(object.parentNode);
      }
    }
  }

  if (isbns.length > 0) {
    addLoadingIcon(target_objects, isbns);
  }
}

function addLibraryLinksToMobileBookPage(isbn){
  var hrs = parent.document.getElementsByTagName('hr');
  if (hrs.length > 0) {
    var hr = hrs[0];
    addLoadingIcon([hr], [isbn]);
  }
}

function addLoadingIcon(objects, isbns) {
  var session = null;

  // callback function
  var checkLibrary = function(session) {
    getValue("selectedSystemId", (value) => {
      libron.selectedSystemId = value ? decodeURIComponent(value) : 'Tokyo_Pref';
      chrome.runtime.sendMessage({
        contentScriptQuery: "queryAvailabilityInLibrary",
        appkey: libron.appkey,
        isbns: isbns.join(','),
        selectedSystemId: libron.selectedSystemId,
        session: session
      }, function(json) {
        var parsedJson = JSON.parse(json);
        var cont = parsedJson["continue"];
        if (cont === 0) {
          replaceWithLibraryLink(parsedJson);
        } else {
          //途中なので再度検索をおこなう
          var session = parsedJson["session"];
          if (session.length > 0) {
            setTimeout(function(){
              checkLibrary(session);
            }, 2000);
          }
        }
      });
    });
  };

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    var div = libron.createElement("div", {class: "libron_link_div", "data-isbn": isbns[i]}, null);
    var searchingSpan = libron.createElement("span", {class: "libron_gray"}, '図書館を検索中 ');
    var loadingIconImg = libron.createElement("img", {src: chrome.runtime.getURL("images/loading.gif")}, null);
    div.appendChild(searchingSpan);
    div.appendChild(loadingIconImg);
    object.parentNode.insertBefore(div, object.nextSibling);
  }
  checkLibrary(session);
}

function replaceWithLibraryLink(json){
  var divs = document.getElementsByClassName('libron_link_div');
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    var isbn = div.getAttribute("data-isbn");
    var status = json["books"][isbn][libron.selectedSystemId]["status"];
    var libkey;
    var calil_library_links = [];
    var libLink;

    var calilLink = libron.createElement("div", {class: "calil_link"}, null);
    var raquo = document.createTextNode("» ");
    var calilLinkAnchor = libron.createElement("a", {href: "https://calil.jp/book/" + isbn, target:"_blank"}, "他の図書館で検索する(カーリル)");
    var space = document.createTextNode(" ");
    var calilIconImg = libron.createElement("img", {src: chrome.runtime.getURL("images/calil.png")}, null);  
    calilLink.appendChild(raquo);
    calilLink.appendChild(calilLinkAnchor);
    calilLink.appendChild(space);
    calilLink.appendChild(calilIconImg);

    const okEmoji = document.createTextNode("✅");
    const ngEmoji = document.createTextNode("❌");

    const readme = document.createElement('div');
    readme.className = 'libron_gray';
    readme.innerHTML = '※ 図書館を設定するには、Libronを拡張機能のバーに表示して、アイコンをクリックして下さい。[<a href="https://libron.net/top/usage" target="_blank">詳細はこちら</a>]';

    if (div.hasChildNodes()) {
      while(div.childNodes.length >= 1) {
        div.removeChild(div.firstChild);
      }
    }

    if (status && status == "Error") {
      libLink = libron.createElement("div", {class: "libron_gray"}, null);
      const errorMsg = document.createTextNode(`${libron.selectedSystemName}で検索して、エラーが発生しました。`);
      libLink.appendChild(errorMsg);
      libLink.appendChild(ngEmoji);
      div.appendChild(libLink);
      div.appendChild(calilLink);

      if (!libron.settingsChanged) {
        div.appendChild(readme);
      }
    } else {
      libkey = json["books"][isbn][libron.selectedSystemId]["libkey"];
      for (var key in libkey) {
        var calil_library_link = libron.createElement("a", {href: "https://calil.jp/library/search?s=" + encodeURIComponent(libron.selectedSystemId) + "&k=" + encodeURIComponent(key), target: "_blank"}, key + "(" + libkey[key] + ")");
        calil_library_links.push(calil_library_link);
      }
      if (calil_library_links.length > 0) {
        var reserveurl = json["books"][isbn][libron.selectedSystemId]["reserveurl"] + "&asin=" + encodeURIComponent(isbn);
        if (reserveurl) {
          libLink = libron.createElement("div", {class: "libron_gray"}, null);
          var raquo = document.createTextNode("» ");
          var reserveUrlAnchor = libron.createElement("a", {"href":reserveurl, "target":"_blank"}, libron.selectedSystemName + "で予約する。");
          var space = document.createTextNode(" ");
          libLink.appendChild(raquo);
          libLink.appendChild(reserveUrlAnchor);
          libLink.appendChild(space);
          libLink.appendChild(okEmoji);
          div.appendChild(libLink);
          if (!libron.settingsChanged) {
            div.appendChild(readme);
          }    
        } else {
          libLink = libron.createElement("div", {class: "libron_gray"}, null);
          var okMsg = document.createTextNode(libron.selectedSystemName + "に蔵書あり。");
          var space = document.createTextNode(" ");
          libLink.appendChild(okMsg);
          libLink.appendChild(okEmoji);
          libLink.appendChild(space);
          for (var i = 0; i < calil_library_links.length; i++) {
            libLink.appendChild(calil_library_links[i]);
            if (i !== calil_library_links.length - 1) {
              var hyphen = document.createTextNode(" - ");
              libLink.appendChild(hyphen);
            }
          }
          div.appendChild(libLink);
          if (!libron.settingsChanged) {
            div.appendChild(readme);
          }    
        }
      } else {
        libLink = libron.createElement("div", {class: "libron_gray"}, null);
        var notFoundMsg = document.createTextNode(libron.selectedSystemName + "には見つかりません。");
        libLink.appendChild(notFoundMsg);
        libLink.appendChild(ngEmoji);
        div.appendChild(libLink);
        div.appendChild(calilLink);
        if (!libron.settingsChanged) {
          div.appendChild(readme);
        }
      }
    }
  }
}

function getValue(key, callback) {
  chrome.runtime.sendMessage({
    contentScriptQuery: "getValue",
    key: key
  }, (value) => {
    callback(value);
  });
}
