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

  function filterTopicList(array, filterInputValue) {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
      var unfiltered = array[i];
      if (unfiltered.topic.toLowerCase().includes(filterInputValue.toLowerCase())) {
        filtered.push(unfiltered);
      }
    }
    return filtered;
  }

  function filterCodeLangList(array, filterInputValue) {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
        var unfiltered = array['code-language'][i];
        if (unfiltered.code-language.toLowerCase().includes(filterInputValue.toLowerCase())) {
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
    const nameField = document.querySelector("#Name");
    const topicField = document.querySelector("#Topic")
    const codeLangField = document.querySelector("#Coding-Lang")

    const currentPage = window.location.pathname;
    console.log(currentPage);

    await fetchData();
    if (currentPage === '/jnguye79/portfolio.html') {
      displayList(data_global.portfolio);
    } else if (currentPage === '/jnguye79/posts.html') {
      displayList(data_global.posts);
    }


    /* Event Listeners for Portfolio */
    nameField.addEventListener("input", (event) => {
    console.log("input", event.target.value);
    const newList = filterTitleList(data_global.portfolio, event.target.value);
    console.log("Loading New List...");
    displayList(newList);
    })

    if (topicField) {
      topicField.addEventListener("input", (event) => {
        console.log("input", event.target.value);
        const newList = filterTopicList(data_global.portfolio, event.target.value);
        console.log("Loading New List...");
        displayList(newList);
      })
    }

    codeLangField.addEventListener("input", (event) => {
      console.log("input", event.target.value);
      const newList = filterCodeLangList(data_global.portfolio, event.target.value);
      console.log("Loading New List...");
      displayList(newList);
    })

    /* Event Listeners for Posts */
    if (titleField) {
      titleField.addEventListener("input", (event) => {
          console.log("input", event.target.value);
          const newList = filterTitleList(data_global.posts, event.target.value);
          console.log("Loading New List...");
          displayList(newList);
      })
    }

    if (typeField) {
      typeField.addEventListener("input", (event) => {
          console.log("input", event.target.value);
          const newList = filterTypeList(data_global.posts, event.target.value);
          console.log("Loading New List...");
          displayList(newList);
      })
    }
}

/* Update display content here... */
const displayList = (data) => {
    console.log(data);
    const currentPage = window.location.pathname;

    if (currentPage == '/jnguye79/portfolio.html') {
      const dataHTMLString = data.map((dataList) =>
      `
        <li>
            <div class="card"><a href="info_page.html">
            <img src="${dataList.thumbnail}" title="${dataList.alt}">
            <div class="container">
            <h4><b>${dataList.title}</b></h4>
            <p>${dataList.topic}</p>
            ${dataList.caption}
            </div>
            </a></div>
        </li>
      `
      ).join("");
      data_show.innerHTML = dataHTMLString;
    } else if (currentPage == '/jnguye79/posts.html') {
      const dataHTMLString = data.map((dataList) =>
      `
        <li>
            <div class="card"><a href="info_page.html">
            <img src="${dataList.thumbnail}" title="${dataList.alt}">
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
    }

  };

  document.addEventListener("DOMContentLoaded", async () => mainEvent());