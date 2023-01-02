var libron = libron ? libron : new Object();
libron.version = "3.0.15";

// http://ja.wikipedia.org/wiki/都道府県 の並び順
libron.prefectures = ["北海道",
  "青森県","岩手県","宮城県","秋田県","山形県","福島県",
  "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
  "新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県",
  "三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
  "鳥取県","島根県","岡山県","広島県","山口県",
  "徳島県","香川県","愛媛県","高知県",
  "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県",
  "沖縄県"];

libron.logo = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAC0AAAAUCAMAAAAusUTNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAYBQTFRFdHJu49/WjouGFBMTzcnB2tfObmxoWllWtbKraGZiwb637erj'+
    'hIJ+ZWRgp6SeXl1ZDAwLl5SPHBwbj42JxcO9ubaxYF5bAgICcG5rraulYmFd1dHJRkVDQkA+ZGJf'+
    'gX97pKKcJiYkkY6JLi4sXFtYNDMxLCsp6eXc6+jg6ebd6OTb7Onh7OjhKSgn7Oni6+ffRENAUlBN'+
    '7uvk7eni6uffsa6n6OTc6ubdnpyVPDs5IyMh4NzT6+fgnJmTqaagVVNQ2NTMxcG6ysa/V1ZSmZaQ'+
    'U1JPz8zET05L5ODY5eHY6OXcamhlbWtnSEdFx8S83dnR19TNfnx539zUfnt36ufh5+Td5uPciYeD'+
    'dnVweHZxNzY1y8jBSkhGm5iTIB8enpuW0s/G7uvlpKGb3tvUk5GLlJKM5uLbOTg24N3W4d7XrKmi'+
    'uLWu3drTMTAug4F8vLmzhYN/i4mDop+ZeXhze3l0JCQi5OHZ4t/Yw7+47urkOjo4Pz47hIJ96eXd'+
    '6ube6OTb4C1nnAAAAIB0Uk5T////////////////////////////////////////////////////'+
    '////////////////////////////////////////////////////////////////////////////'+
    '/////////////////////////////////////////wA4BUtnAAAB30lEQVR42rST13PaQBDGBULG'+
    'mEAE2DqIDQ6mnLqsQu8lbuCS3p3E6Z1Up93tv26JJC+Z8dh+yD7tffObvW/39hg4SzD/md45A/3Q'+
    '1ACflq7WUcGQTl27wf9Q6O9DL32y79zSH3oYL55M1y6prpPFSAhW4okB+wq4q53bWmcXfP48y6ZL'+
    'ANWCN4yh5tGrHt2PoHOkut+EwUyvhm5V+uhgbSmgKAsFNIzWEJqDgPlF9OjzoiQDpGO0fQ+6xVkK'+
    '6zHo17lsSlFFh8uxXxt8McsB5HWPFpoefeEBLqV/1flQAwS/v7A2ixYdXAZoobuQfbFd8wEzrW1u'+
    'eR0IMShp8+prPgIdc8B32yg17ayNXsJ++FBb3/xMPfq5z1ODEyi9xRgyY9lc4dgZjtcanp4cKcC+'+
    'MXq8OXbpzTqKhz6Muz8jlRYfbEWXD8lqUn+Kvn1E2Wog8C54zdlFF0X5CRq5TnbuJ/zCzcd7k8SN'+
    'xERYntfFjU+Xr1Mhe+V9JncnkworJDpJqQTnkzYjEzFsWWHFEHVVtK3vikNIU1fpxqiwp1iPLFus'+
    'YKrqBibPFhRGxqRCKSWYSIRME3nLTbFkHGwzc6pBsewiroolhx6731gSbXv6EH9DLpeP/w1l9ybp'+
    'n1U+EmAAVC9EkhaYTkMAAAAASUVORK5CYII=';

libron.loadingIcon = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh'+
    '/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklr'+
    'E2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAA'+
    'EAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUk'+
    'KhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9'+
    'HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYum'+
    'CYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzII'+
    'unInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAA'+
    'ACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJ'+
    'ibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFG'+
    'xTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdce'+
    'CAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';

libron.calilIcon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
    '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEBg4oF3uKapIAAACRSURBVDjL'+
    'nVPbDcAgCDyJMziEC9URXaju0C5hPxoMUXzy40UOOFBMzhkAENL7g0WL3hkAoJNgGUMMonc71UsS'+
    '0hwrwWxWI4T0NkTtrsxgVmWkjmQFPhnXCiSnSSArcBs9+RKb6362X0GqoBlJa2c4gxrP/KUF5ZN0'+
    'sbQmwWgemjK7SuzOgLfqxKJ3huRqnqzzBwE6Xrqxh9tpAAAAAElFTkSuQmCC';

// カーリルAPIキー
//
// このキーは動作確認用にお使いください。
// もしこのプロジェクトをForkして動作させる場合には、
// カーリルAPIの利用規約(https://calil.jp/doc/api_license.html)を確認した上で、
// http://calil.jp/api/dashboard/ より自分のAPIキーを申請し、それを使うようにしてください。
libron.appkey = "7b38a6543c2d4423c00114f53f114655";

libron.libraries = {};
libron.libraryNames = {};

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
  libron.selectedSystemId = GM_getValue("selectedSystemId") ? decodeURIComponent(GM_getValue("selectedSystemId")) : 'Tokyo_Pref';
  libron.selectedSystemName = GM_getValue("selectedSystemName") ? decodeURIComponent(GM_getValue("selectedSystemName")) : '東京都立図書館';
  libron.selectedPrefecture = GM_getValue("selectedPrefecture") ? decodeURIComponent(GM_getValue("selectedPrefecture")) : '東京都';
  libron.univChecked = (GM_getValue("univChecked") === "true") ? true : false;
  libron.systemNames = {};

  var href = document.location.href;

  if (parent != self) {
    return;
  }

  addStyle();
  addSelectBox();

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
 * CSS定義
 */

function addStyle() {
  var style = "\
div#libron_select{\
  border:1px solid #cbc6bd;\
  background:#e8e4db;\
  -moz-border-radius:5px;\
  -webkit-border-radius:5px;\
  font-size:14px;\
  padding:7px;\
}\
div#libron_select img{\
  vertical-align:-5px;\
}\
div#libron_select span#title{\
  font-weight:bold;\
  color:#e47911;\
}\
div#libron_select_box{\
  display:none;\
}\
div#libron_select_box select,button{\
  margin-left:10px;\
}\
div#libron_select_box a{\
  margin-left:3px;\
}\
div#libron_select_box label{\
  display:inline;\
}\
div#libron_select_box #loading-message{\
  margin-left:10px;\
  color:#e47911;\
  padding-right:70px;\
}\
.libron_left{\
  float:left;\
}\
.libron_right{\
  float:right;\
}\
.libron_gray{\
  color:#666666;\
}\
.libron_clear{\
  clear:both;\
}\
div.libron_link_div{\
  display:table;\
  width:300px;\
  padding:7px;\
  border:1px solid #cbc6bd;\
  background:#e8e4db;\
  -moz-border-radius:5px;\
  -webkit-border-radius:5px;\
  font-size:12px;\
  margin-bottom:10px;\
}\
div.libron_link_div div{\
  padding:0 !important;\
  margin:0 !important;\
}\
div.libron_link_div div.calil_link{\
  margin-top:5px !important;\
}\
div.libron_link_div img{\
  vertical-align:middle;\
}\
span#libron_news{\
  margin-left:10px;\
}\
";
  var head = document.getElementsByTagName('head')[0];
  var element = head.appendChild(window.document.createElement('style'));
  element.type = "text/css";
  element.textContent = style;
}

/*
 * ページ上部に図書館選択ボックスを表示
 */

function addSelectBox() {
  var div = libron.createElement("div", {id: "libron_select"}, null);
  var titleDiv = libron.createElement("div", {class: "libron_left"});
  var titleSpan = libron.createElement("span", {id: "title"}, " ver." + libron.version);
  var logoImg = libron.createElement("img", {src: libron.logo}, null);
  var infoDiv = libron.createElement("div", {id: "libron_info", class: "libron_right"});
  var currentLibrary = libron.createElement("span", {class: "libron_gray"}, "[" + libron.selectedPrefecture + "]" + libron.selectedSystemName + "で検索 ");
  var showLink = libron.createElement("a", {href: "javascript:void(0);"}, "変更");
  var newsSpan = libron.createElement("span", {id: "libron_news", class: "libron_gray"}, "");
  showLink.addEventListener("click", showSelectBox, false);

  titleDiv.appendChild(logoImg);
  titleDiv.appendChild(titleSpan);
  titleDiv.appendChild(newsSpan);

  infoDiv.appendChild(currentLibrary);
  infoDiv.appendChild(showLink);

  var univCheckBox = document.createElement("input");
  univCheckBox.type = "checkbox";
  univCheckBox.id = "univ";
  univCheckBox.checked = libron.univChecked;

  var univCheckBoxLabel = libron.createElement("label", {for: "univ", class: "libron_gray"}, "大学図書館も表示");

  chrome.runtime.sendMessage({
    contentScriptQuery: "queryNews",
  }, function(news) {
    newsSpan.innerHTML = news;
  });

  univCheckBox.addEventListener("change", function(){
    selectBoxDiv.replaceChild(loadingMessage, selectBoxDiv.childNodes[3]);
    libron.univChecked = univCheckBox.checked;
    updateLibrarySelectBox(selectBoxDiv, prefectureSelect.value, libron.univChecked);
  }, false);

  var prefectureSelect = libron.createElement("select", {id: "prefecture_select"}, null);

  for (var i in libron.prefectures) {
    var option = document.createElement('option');
    option.value = libron.prefectures[i];
    option.textContent = libron.prefectures[i];
    if (libron.prefectures[i] == libron.selectedPrefecture) {
      option.selected = true;
    }
    prefectureSelect.appendChild(option);
  }

  var loadingMessage = libron.createElement("span", {id: "loading-message"}, "データ取得中...");
  var btn = libron.createElement("button", null, "保存");
  var hideLink = libron.createElement("a", {href: "javascript:void(0);"}, "キャンセル");
  hideLink.addEventListener("click", hideSelectBox, false);
  var selectBoxDiv = libron.createElement("div", {id: "libron_select_box", class: "libron_right"}, null);

  selectBoxDiv.appendChild(univCheckBox);
  selectBoxDiv.appendChild(univCheckBoxLabel);
  selectBoxDiv.appendChild(prefectureSelect);
  selectBoxDiv.appendChild(loadingMessage);
  selectBoxDiv.appendChild(btn);
  selectBoxDiv.appendChild(hideLink);

  updateLibrarySelectBox(selectBoxDiv, libron.selectedPrefecture, libron.univChecked);

  prefectureSelect.addEventListener("change", function(){
    selectBoxDiv.replaceChild(loadingMessage, selectBoxDiv.childNodes[3]);
    libron.selectedPrefecture = prefectureSelect.value;
    updateLibrarySelectBox(selectBoxDiv, prefectureSelect.value, libron.univChecked);
  }, false);

  var clearDiv = libron.createElement("div", {class: "libron_clear"}, null);

  div.appendChild(titleDiv);
  div.appendChild(infoDiv);
  div.appendChild(selectBoxDiv);
  div.appendChild(clearDiv);

  document.body.insertBefore(div, document.body.childNodes[0]);

  btn.addEventListener("click", function(){
    var options = {
      'prefecture': prefectureSelect.value,
      'systemid': selectBoxDiv.childNodes[3].value,
      'systemname': libron.systemNames[selectBoxDiv.childNodes[3].value],
      'univChecked': univCheckBox.checked
    };
    saveSelection(options);
    window.location.reload();
  }, false);
}

/*
 * 図書館選択ボックス関連
 */

function showSelectBox() {
  document.getElementById('libron_info').style.display = 'none';
  document.getElementById('libron_select_box').style.display = 'block';
  document.getElementById('libron_news').style.display = 'none';
  return false;
}

function hideSelectBox() {
  document.getElementById('libron_info').style.display = 'block';
  document.getElementById('libron_select_box').style.display = 'none';
  document.getElementById('libron_news').style.display = 'span';
  return false;
}

function createLibraryNames(prefecture, libraries, cities) {
  var smallMediumLibrariesObject = {};
  var smallMediumLibraries = [];
  var largeLibraries = [];
  var univLibraries = [];
  var otherLibraries = [];

  for (var i in libraries[prefecture]) {
    var library = libraries[prefecture][i];
    var data = {'systemid':library.systemid, 'systemname':library.systemname};

    if ((library.category == "SMALL") || (library.category == "MEDIUM")) {
      if (smallMediumLibrariesObject[library.systemname]) {
        smallMediumLibrariesObject[library.systemname].push(data);
      } else {
        smallMediumLibrariesObject[library.systemname] = [data];
      }
    } else if (library.category == "LARGE") {
      largeLibraries.push(data);
    } else if (library.category == "UNIV") {
      univLibraries.push(data);
    } else {
      otherLibraries.push(data);
    }
  }

  var kanas = ['あ','か','さ','た','な','は','ま','や','ら','わ'];
  for (var i in kanas) {
    var kana = kanas[i];
    if (cities[kana]) {
      for (var j in cities[kana]){
        city_name = cities[kana][j];
        if (smallMediumLibrariesObject[prefecture + city_name]) {
          smallMediumLibrariesObject[prefecture + city_name][0]["kana"] = kana;
          smallMediumLibraries = smallMediumLibraries.concat(smallMediumLibrariesObject[prefecture + city_name]);
        }
      }
    }
  }

  var libraryNamesArray = [];

  for (var i in smallMediumLibraries) {
    var smallMediumLibrary = smallMediumLibraries[i];
    if (libron.systemNames[smallMediumLibrary.systemid]) {
      continue;
    }
    smallMediumLibrary['group'] = '図書館(地域)';
    libraryNamesArray.push(smallMediumLibrary);
    libron.systemNames[smallMediumLibrary.systemid] = smallMediumLibrary.systemname;
  }

  for (var i in largeLibraries) {
    var largeLibrary = largeLibraries[i];
    if (libron.systemNames[largeLibrary.systemid]) {
      continue;
    }
    largeLibrary['group'] = '図書館(広域)';
    libraryNamesArray.push(largeLibrary);
    libron.systemNames[largeLibrary.systemid] = largeLibrary.systemname;
  }

  for (var i in univLibraries) {
    var univLibrary = univLibraries[i];
    if (libron.systemNames[univLibrary.systemid]) {
      continue;
    }
    univLibrary['group'] = '図書館(大学)';
    libraryNamesArray.push(univLibrary);
    libron.systemNames[univLibrary.systemid] = univLibrary.systemname;
  }

  for (var i in otherLibraries) {
    var otherLibrary = otherLibraries[i];
    if (libron.systemNames[otherLibrary.systemid]) {
      continue;
    }
    otherLibrary['group'] = '移動・その他';
    libraryNamesArray.push(otherLibrary);
    libron.systemNames[otherLibrary.systemid] = otherLibrary.systemname;
  }
  return libraryNamesArray;
}

function updateLibrarySelectBox(selectBoxDiv, prefecture, univ) {
  if (!univ) univ = false;
  if (libron.libraryNames[prefecture]) {
    selectBoxDiv.replaceChild(createLibrarySelectBox(prefecture, libron.libraryNames[prefecture], univ), selectBoxDiv.childNodes[3]);
  } else {
    chrome.runtime.sendMessage({
      contentScriptQuery: "queryLibraries",
      appkey: libron.appkey,
      prefecture: prefecture
    }, function(libraries) {
      chrome.runtime.sendMessage({
        contentScriptQuery: "queryCities"
      }, function(cities) {
        var parsedCities = JSON.parse(cities);
        libron.libraries[prefecture] = JSON.parse(libraries);
        libron.libraryNames[prefecture] = createLibraryNames(prefecture, libron.libraries, parsedCities[prefecture]);
        selectBoxDiv.replaceChild(createLibrarySelectBox(prefecture, libron.libraryNames[prefecture], univ), selectBoxDiv.childNodes[3]);
      });
    });
  }
}

function createLibrarySelectBox(prefecture, libraryNames, univ) {
  var select = document.createElement("select");
  var groups;
  if (univ) {
    groups = ['図書館(地域)', 'あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', '図書館(広域)', '図書館(大学)', '移動・その他'];
  } else {
    groups = ['図書館(地域)', 'あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', '図書館(広域)', '移動・その他'];
  }

  var optGroups = {};
  for (var i in groups) {
    optGroups[groups[i]] = document.createElement('optgroup');
    optGroups[groups[i]].label = groups[i];
  }

  for (var i in libraryNames) {
    var option = document.createElement('option');
    option.value = libraryNames[i]['systemid'];
    var regExp = new RegExp("^" + prefecture);
    option.textContent = libraryNames[i]['systemname'].replace(regExp, '');

    if (libraryNames[i]['systemid'] == libron.selectedSystemId) {
      option.selected = true;
    }

    if (optGroups[libraryNames[i]['group']]) {
      if (libraryNames[i]['group'] === '図書館(地域)') {
        optGroups[libraryNames[i]['kana']].appendChild(option);
      } else {
        optGroups[libraryNames[i]['group']].appendChild(option);
      }
    }
  }
  for (var i in groups) {
    if (optGroups[groups[i]].childNodes.length > 0 || groups[i] == '図書館(地域)') {
      select.appendChild(optGroups[groups[i]]);
    }
  }
  return select;
}

function saveSelection(options){
  GM_setValue("selectedPrefecture", encodeURIComponent(options.prefecture));
  GM_setValue("selectedSystemId", encodeURIComponent(options.systemid));
  GM_setValue("selectedSystemName", encodeURIComponent(options.systemname));
  GM_setValue("univChecked", options.univChecked === true ? "true" : "false");
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
  };

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    var div = libron.createElement("div", {class: "libron_link_div", "data-isbn": isbns[i]}, null);
    var searchingSpan = libron.createElement("span", {class: "libron_gray"}, "図書館を検索中 ");
    var loadingIconImg = libron.createElement("img", {src: libron.loadingIcon}, null);
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
    var calilIconImg = libron.createElement("img", {src: libron.calilIcon}, null);
    calilLink.appendChild(raquo);
    calilLink.appendChild(calilLinkAnchor);
    calilLink.appendChild(space);
    calilLink.appendChild(calilIconImg);

    const okEmoji = document.createTextNode("✅");
    const ngEmoji = document.createTextNode("❌");

    if (div.hasChildNodes()) {
      while(div.childNodes.length >= 1) {
        div.removeChild(div.firstChild);
      }
    }

    if (status && status == "Error") {
      libLink = document.createElement("div");
      var errorMsg = document.createTextNode("エラーが発生しました ");
      libLink.appendChild(errorMsg);
      libLink.appendChild(ngEmoji);
      div.appendChild(libLink);
      div.appendChild(calilLink);
    } else {
      libkey = json["books"][isbn][libron.selectedSystemId]["libkey"];
      for (var key in libkey) {
        var calil_library_link = libron.createElement("a", {href: "https://calil.jp/library/search?s=" + encodeURIComponent(libron.selectedSystemId) + "&k=" + encodeURIComponent(key), target: "_blank"}, key + "(" + libkey[key] + ")");
        calil_library_links.push(calil_library_link);
      }
      if (calil_library_links.length > 0) {
        var reserveurl = json["books"][isbn][libron.selectedSystemId]["reserveurl"] + "&asin=" + encodeURIComponent(isbn);
        if (reserveurl) {
          libLink = document.createElement("div");
          var raquo = document.createTextNode("» ");
          var reserveUrlAnchor = libron.createElement("a", {"href":reserveurl, "target":"_blank"}, libron.selectedSystemName + "で予約する");
          var space = document.createTextNode(" ");
          libLink.appendChild(raquo);
          libLink.appendChild(reserveUrlAnchor);
          libLink.appendChild(space);
          libLink.appendChild(okEmoji);
          div.appendChild(libLink);
        } else {
          libLink = libron.createElement("div", {class: "libron_gray"}, null);
          var okMsg = document.createTextNode(libron.selectedSystemName + "に蔵書あり ");
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
        }
      } else {
        libLink = libron.createElement("div", {class: "libron_gray"}, null);
        var notFoundMsg = document.createTextNode(libron.selectedSystemName + "には見つかりません ");
        libLink.appendChild(notFoundMsg);
        libLink.appendChild(ngEmoji);
        div.appendChild(libLink);
        div.appendChild(calilLink);
      }
    }
  }
}

function GM_setValue(key, value) {
  localStorage.setItem(key, value);
}

function GM_getValue(key) {
  return localStorage.getItem(key);
}
