let selectedGroup;
let selectedPrefecture;
let selectedSystemName;
let selectedSystemId;
let univChecked;
let libraries = {};
let prefectures = [];

document.addEventListener('DOMContentLoaded', async (e) => {
  updateNews();
  libraries = await getLibraries();
  prefectures = Object.keys(libraries);
  updateUi();
});

document.querySelector('#update_link').addEventListener('click', (e) => {
  e.preventDefault();
  showSelect();
});

document.querySelector('#cancel_link').addEventListener('click', (e) => {
  e.preventDefault();
  hideSelect();
});

document.querySelector('#save').addEventListener('click', (e) => {
  e.preventDefault();
  setValue("selectedGroup", document.querySelector('#library_select option:checked').parentNode.label);
  setValue("selectedPrefecture", document.querySelector('#prefecture_select').value);
  setValue("selectedSystemId", document.querySelector('#library_select').value);
  setValue("selectedSystemName", document.querySelector('#library_select option:checked').text);
  setValue("univChecked", univChecked);

  updateUi();
  hideSelect();

  reloadAmazonTabs();
});

document.querySelector('#prefecture_select').addEventListener('change', () => {
  selectedPrefecture = document.querySelector('#prefecture_select').value;
  updateLibrarySelect();
});

document.querySelector('#univ_checkbox').addEventListener("change", function(){
  univChecked = document.querySelector('#univ_checkbox').checked;
  updateLibrarySelect();
});

const showSelect = () => {
  document.querySelector('#info').style.display = 'none';
  document.querySelector('#select_box').style.display = 'block';
}

const hideSelect = () => {
  document.querySelector('#info').style.display = 'block';
  document.querySelector('#select_box').style.display = 'none';
}

const updateNews = async () => {
  const response = await fetch("https://libron.net/news.txt");
  const news = await response.text();
  document.querySelector('#news').innerHTML = news;
}

const getLibraries = async () => {
  const librariesResponse = await fetch("https://champierre.github.io/libron-api/libraries.json");
  const librariesText = await librariesResponse.text();
  return JSON.parse(librariesText);
}

const setupPrefectureSelect = () => {
  document.querySelector("select#prefecture_select").innerHTML = prefectures.map(prefecture => {
    return `<option value='${prefecture}'${prefecture === selectedPrefecture ? ' selected' : ''}>${prefecture}</option>`;
  }).join("\n");
}

const updateUi = () => {
  getValue("selectedGroup", (value) => {
    selectedGroup = value || '図書館(広域)';
    getValue("selectedSystemName", (value) => {
      selectedSystemName = value || '東京都立図書館';
      getValue("selectedSystemId", (value) => {
        selectedSystemId = value || 'Tokyo_Pref';
        getValue("selectedPrefecture", (value) => {
          selectedPrefecture = value || '東京都';
          getValue("univChecked", async (value) => {
            univChecked = value || false;
            document.querySelector('#univ_checkbox').checked = univChecked;
            setupPrefectureSelect();
            updateLibrarySelect();
            document.querySelector("#info span").innerHTML = `[${selectedPrefecture}]${selectedSystemName}で検索`;
          });
        });
      });
    });
  });
}

const updateLibrarySelect = () => {
  let optgroups = "";
  for (const group in libraries[selectedPrefecture]) {
    const options = libraries[selectedPrefecture][group].map(library => {
      return `<option value='${library.value}'${isSelected(group, library) ? ' selected' : ''}>${library.name}</option>`;
    }).join("\n");
    if (group !== '図書館(大学)' || univChecked) {
      optgroups += `<optgroup label='${group}'>${options}</optgroup>`;
    }
  }
  document.querySelector('#library_select').innerHTML = optgroups;
}

const isSelected = (group, library) => {
  return library.value === selectedSystemId && library.name === selectedSystemName && group === selectedGroup
}

const setValue = (key, value) => {
  chrome.runtime.sendMessage({
    contentScriptQuery: "setValue",
    key: key,
    value: value
  });
}

const getValue = async (key, callback) => {
  chrome.runtime.sendMessage({
    contentScriptQuery: "getValue",
    key: key
  }).then(value => {
    callback(value);
  });
}

const reloadAmazonTabs = async () => {
  const tabs = await chrome.tabs.query({
    url: [
      "https://www.amazon.co.jp/*",
      "http://www.amazon.co.jp/*"
    ],
  });
  tabs.map(tab => chrome.tabs.reload(tab.id));
}
