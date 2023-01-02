let selectedPrefecture;
let selectedSystemName;
let selectedSystemId;
let univChecked;
let libraries = {};

document.addEventListener('DOMContentLoaded', async (e) => {
  updateNews();
  updateInfo();
});

document.querySelector('#update_link').addEventListener('click', (e) => {
  e.preventDefault();
  showSelect();
});

document.querySelector('#cancel_link').addEventListener('click', (e) => {
  e.preventDefault();
  updateInfo();
  hideSelect();
});

document.querySelector('#save').addEventListener('click', (e) => {
  e.preventDefault();

  setValue("selectedPrefecture", document.querySelector('#prefecture_select').value);
  setValue("selectedSystemId", document.querySelector('#library_select').value);
  setValue("selectedSystemName", document.querySelectorAll('#library_select option:checked')[0].text);
  setValue("univChecked", univChecked);

  updateInfo();
  hideSelect();
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

const setupPrefectureSelect = (prefectures) => {
  document.querySelector("select#prefecture_select").innerHTML = prefectures.map(prefecture => {
    return `<option value='${prefecture}'${prefecture === selectedPrefecture ? ' selected' : ''}>${prefecture}</option>`;
  }).join("\n");
}

const updateInfo = () => {
  getValue("selectedSystemName", (value) => {
    selectedSystemName = value || '東京都立図書館';
    getValue("selectedSystemId", (value) => {
      selectedSystemId = value || 'Tokyo_Pref';
      getValue("selectedPrefecture", (value) => {
        selectedPrefecture = value || '東京都';
        getValue("univChecked", async (value) => {
          univChecked = value || false;
          document.querySelector('#univ_checkbox').checked = univChecked;
          libraries = await getLibraries();
          const prefectures = Object.keys(libraries);
          setupPrefectureSelect(prefectures);
          updateLibrarySelect();
          document.querySelector("#info span").innerHTML = `[${selectedPrefecture}]${selectedSystemName}で検索`;
        });
      });
    });
  });
}

const updateLibrarySelect = () => {
  let optgroups = "";
  for (const group in libraries[selectedPrefecture]) {
    const options = libraries[selectedPrefecture][group].map(library => {
      return `<option value='${library.value}'${library.value === selectedSystemId && library.name === selectedSystemName ? ' selected' : ''}>${library.name}</option>`;
    }).join("\n");
    if (group !== '図書館(大学)' || univChecked) {
      optgroups += `<optgroup label='${group}'>${options}</optgroup>`;
    }
  }
  document.querySelector('#library_select').innerHTML = optgroups;
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