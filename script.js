document.addEventListener('DOMContentLoaded', function () {

const accessKey = "R_WAAK--Xt3s8Lidwky2FwCIw8MwePLd0_9bBWvpaJs";

const formEl = document.querySelector(".form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-button");

let id = "";
let pg = 1;

async function searchimg() {
    id = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${pg}&query=${id}&client_id=${accessKey}`;

    try {
        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
        }

        const d = await resp.json();
        console.log('API Response:', d);

        const results = d.results;

        if (pg === 1) {
            searchResults.innerHTML = "";
        }

        results.map((result) => {
            console.log('Result:', result);
            const resultWrapper = document.createElement('div');
            resultWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imagelink = document.createElement('a');
            imagelink.href = result.links.html;
            imagelink.target = "_blank";
            imagelink.textContent = result.alt_description;

            resultWrapper.appendChild(image);
            resultWrapper.appendChild(imagelink);
            searchResults.appendChild(resultWrapper);
        });

        pg++;

        if (pg > 1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    pg = 1;
    searchimg();
});

showMore.addEventListener("click", () => {
    searchimg();
});
});