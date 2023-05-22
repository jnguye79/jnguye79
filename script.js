/* Script used in Posts.html and Portfolio.html */

let data_global = null;

function filterTitleList(array, filterInputValue) {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
      var unfiltered = array[i];
      if (unfiltered.title.toLowerCase().includes(filterInputValue.toLowerCase())) {
        filtered.push(unfiltered);
      }
    }
    return filtered;
  }

  function filterTypeList(array, filterInputValue) {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
      var unfiltered = array[i];
      if (unfiltered.type.toLowerCase().includes(filterInputValue.toLowerCase())) {
        filtered.push(unfiltered);
      }
    }
    return filtered;
  }

/* Rework to add fetch and catch to handle errors during asynchronous moments. Understand the concept!... */
const fetchData = () => {
    return fetch('data.json')
       .then((response) => /*{
        if (!response.ok) {
          throw new Error('Error fetching data: ' + response.status);
        }
        return*/ response.json()
      )
      .then((data) => {
        data_global = data;
        return data;
      })
      /*.catch((error) => {
        console.log('Error fetching data:', error);
      });*/
  };

async function mainEvent() {
    const titleField = document.querySelector("#Title");
    const typeField = document.querySelector("#Type");
    const NameField = document.querySelector("#Name");
    const TopicField = document.querySelector("#Topic")
    const CodeLangField = document.querySelector("#Coding-Lang")

    await fetchData();
    if (currentPage === 'https://jnguye79.github.io/jnguye79/portfolio.html') {
      displayList(data_global);
    } else if (currentPage === 'https://jnguye79.github.io/jnguye79/posts.html') {
      displayList(data_global);
    }

    titleField.addEventListener("input", (event) => {
        console.log("input", event.target.value);
        const newList = filterTitleList(data_global.posts, event.target.value);
        console.log("Loading New List...");
        displayList(newList);
    })

    typeField.addEventListener("input", (event) => {
        console.log("input", event.target.value);
        const newList = filterTypeList(data_global.posts, event.target.value);
        console.log("Loading New List...");
        displayList(newList);
    })
}

/* Update display content here... */
const displayList = (data) => {
    console.log(data);
    const dataHTMLString = data.map((dataList) =>
    `
        <li>
            <div class="card"><a href="info_page.html">
            <img src="${dataList.thumbnail}" title="${dataList.thumbnail}">
            <div class="container">
            <h4><b>${dataList.title}</b></h4>
            <p>${dataList.type}</p>
            ${dataList.caption}
            </div>
            </a></div>
        </li>
    `
    ).join("");
    data_show.innerHTML = dataHTMLString;
  };

  document.addEventListener("DOMContentLoaded", async () => mainEvent());