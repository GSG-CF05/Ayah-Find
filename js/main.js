const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const ayahsCount = document.querySelector(".results .count");
const ayahsContainer = document.querySelector(".ayahs-container");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if(searchInput.value.trim()) {
    ayahsContainer.innerHTML = "";
    const searchText = searchInput.value;
    getAyahs(searchInput.value);    
    searchInput.value = "";
  }
});


async function getAyahs(text) {
  const response = await fetch(`https://api.alquran.cloud/v1/search/${text}/all/quran-simple-clean`);
  const data = await response.json();
  const ayahsObj = data["data"];
  setAyahsCount(ayahsObj["count"]);
  displayAyahs(ayahsObj["matches"]);
}

function setAyahsCount(count) {
  ayahsCount.innerText = count;
}

function displayAyahs(ayahsArray) {
  ayahsArray.forEach((ayah) => appendAyahToPage(ayah));
}

function appendAyahToPage(ayahObj) {
  const ayahContainer = document.createElement("div");
  ayahContainer.className = "ayah-container";
  const ayahText = document.createElement("p");
  ayahText.className = "ayah-text";
  ayahText.innerText = `{${ayahObj["text"]}}`;

  const ayahDescription = document.createElement("div");
  ayahDescription.className = "ayah-description";
  const surahName = document.createElement("div");
  surahName.className = "surah-name";
  surahName.innerText = ayahObj["surah"]["name"];
  ayahDescription.appendChild(surahName);
  const ayahNumber = document.createElement("div");
  ayahNumber.className = "ayah-number";
  ayahNumber.innerText = ` رقم الآية: ${ayahObj["number"]}`;
  ayahDescription.appendChild(ayahNumber);

  ayahContainer.appendChild(ayahText);
  ayahContainer.appendChild(ayahDescription);

  ayahsContainer.appendChild(ayahContainer);
}