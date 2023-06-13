/* Script used in Posts.html and Portfolio.html */

let data_global = null;

/* 'Posts' Page Functions */
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
    if (unfiltered.type.includes(filterInputValue)) {
      filtered.push(unfiltered);
    }
  }
  return filtered;
}

/* 'Portfolio' Page Functions */
function filterNameList(array, filterInputValue) {
  var filtered = [];
  for (var i = 0; i < array.length; i++) {
    var unfiltered = array[i];
    if (unfiltered.name.toLowerCase().includes(filterInputValue.toLowerCase())) {
      filtered.push(unfiltered);
    }
  }
  return filtered;
}

function filterTopicList(array, filterInputValue) {
  var filtered = [];
  for (var i = 0; i < array.length; i++) {
    var unfiltered = array[i];
    if (unfiltered.topic.toLowerCase().includes(filterInputValue)) {
      filtered.push(unfiltered);
    }
  }
  return filtered;
}

function filterCodeLangList(array, filterInputValue) {
  var filtered = [];
  for (var i = 0; i < array.length; i++) {
      var unfiltered = array['code-language'];
      for (let j = 0; j < unfiltered.length; j++) {
        if (unfiltered[j].lowerCase.includes(filterInputValue.toLowerCase())) {
          filtered.push(unfiltered);
        }
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
      const urlParams = new URLSearchParams(window.location.search);
      const contentId = urlParams.get('id');

      if (contentId) {
        displayContent(data_global.portfolio)
      } else {
        displayList(data_global.portfolio);
      }
    } else if (currentPage === '/jnguye79/posts.html') {
      const urlParams = new URLSearchParams(window.location.search);
      const contentId = urlParams.get('id');

      if (contentId) {
        displayContent(data_global.posts)
      } else {
        displayList(data_global.posts);
      }
    } else if (currentPage === '/jnguye79/content.html') {
      displayContent(data)
    }


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
    /* Event Listeners for Portfolio */
    if (nameField) {
    nameField.addEventListener("input", (event) => {
    console.log("input", event.target.value);
    const newList = filterNameList(data_global.portfolio, event.target.value);
    console.log("Loading New List...");
    displayList(newList);
    })
    }
    if (topicField) {
    topicField.addEventListener("input", (event) => {
      console.log("input", event.target.value);
      const newList = filterTopicList(data_global.portfolio, event.target.value);
      console.log("Loading New List...");
      displayList(newList);
    })
    }
    if (codeLangField) {
    codeLangField.addEventListener("input", (event) => {
      console.log("input", event.target.value);
      const newList = filterCodeLangList(data_global.portfolio, event.target.value);
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
    const data_show = document.getElementById('data-show');
    const dataHTMLString = data.map((dataList) =>
    `
      <li>
        <div class="card"><a href="portfolio.html?id=${dataList.id}">
          <img src="${dataList.gallery[0]}" title="${dataList.alt}">
          <div class="container">
            <h4><b>${dataList.name}</b></h4>
            <p>${dataList.topic}</p>
            ${dataList.caption}
            <p style="background-color: white">${dataList['code-language']}</p>
            Read More
          </div></a>
        </div>
      </li>
    `
    ).join("");
    data_show.innerHTML = dataHTMLString;
  } else if (currentPage == '/jnguye79/posts.html') {
    const data_show = document.getElementById('data-show');
    const dataHTMLString = data.map((dataList) =>
    `
      <li>
        <div class="card"><a href="posts.html?id=${dataList.id}">
          <img src="${dataList.gallery[0]}" title="${dataList.alt}">
          <div class="container">
            <h4><b>${dataList.title}</b></h4>
            <p>${dataList.type}</p>
            ${dataList.caption}
            Read More
          </div></a>
        </div>
      </li>
    `
    ).join("");
    data_show.innerHTML = dataHTMLString;
  }
};

const displayContent = (data) => {
  // Get the post ID from the URL query parameter
  console.log(data);
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  const contentId = Number(urlParams.get('id'));
  console.log('This is the ID that was found: ' + contentId);

  // Find the post with the matching ID
  const post = data.find(post => post.id === contentId);
  console.log(post);
  
  if (post) {
    document.getElementById('filter-options').textContent = "";
    document.getElementById('card-container').textContent = "";
    document.getElementById('notice').innerHTML = `For more information, you can find the <a href="${post.links[0]}">github repository here!</a>`;
    if (post.links[1]) {
      document.getElementById('notice').innerHTML += ` You can also find the <a href="${post.links[1]}">relevant post here!</a>`;
    }


    /* Table-Content */
    /* table_content = document.getElementById('table-content');
    let tocHTMLString = 
      `
        <h1>Table of Contents</h1>
        <ul>
          <li>About</li>
          <li>Experience</li>
          <li>What Was Learned</li>
        </ul>
      `;
      
    table_content.innerHTML = tocHTMLString; */

    /* Page-Content */
    let dataHTMLString = ``;
    let content_show = document.getElementById('content-show');
    let section_headers = post['section-headers'];
    const contentCount = 5;

    if (post.name) {
      dataHTMLString += `<h1>${post.name}</h1>`;
    } else {
      dataHTMLString += `<h1>${post.title}</h1>`;
    }
    /* Page-Content -> Gallery */
    if (post.gallery) {
      dataHTMLString += `<img src="${post.gallery[0]}"></img>`;
    }

    /* Page-Content -> Content */
    for (let i = 0; i <= contentCount; i++) {
      let contentList = `content-${i}`;
      let contentItems = post[contentList];

      if (contentItems && (contentItems.length > 0) ) {
        dataHTMLString += `<h3>${section_headers[i]}</h3>`;

        for (let j = 0; j < contentItems.length; j++) {
          dataHTMLString += `<p>&nbsp;&nbsp;&nbsp;&nbsp;${contentItems[j]}</p>`;
        }
      }

    }
    
    dataHTMLString = dataHTMLString.slice(0, -4);
    /* Remember to getElement of 'content_show' later to initialize it in HTML page as content-show. Same for 'data_show'.*/
    content_show.innerHTML = dataHTMLString;
  } else {
    console.log('Post not found');
  }
}

  document.addEventListener("DOMContentLoaded", async () => mainEvent());