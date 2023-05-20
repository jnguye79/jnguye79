/* Script used in Posts.html and Portfolio.html */

data_global = null;

/* Update fetch function here... */
const fetchData = () => {
  fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    
    // Access the 'posts' array
    const posts = data.posts;

    // Access the properties of each post
    posts.forEach((post) => {
      const id = post.id;
      const type = post.type;
      const startDate = post['date-start'];
      const endDate = post['date-end'];
      const dateCreated = post['date-created'];
      const title = post.title;
      const alt = post.alt;
      const thumbnail = post.thumbnail;
      const caption = post.caption;
      const description = post.description;
      const images = post.images;
      const links = post.links;

      // Perform any desired actions with the post data
      console.log(id, title, caption, images);
    });

    // Access the 'portfolio' array
    const portfolioItems = data.portfolio;

    // Access the properties of each portfolio item
    portfolioItems.forEach((item) => {
      // Access the properties of each portfolio item and perform actions
    });

    // Continue with your code logic here
  })
  .catch((error) => {
    console.log('Error fetching data:', error);
  });
};

async function mainEvent() {
    const nameField = document.querySelector("#Name");
    const typeField = document.querySelector("Type");

    fetchData();
    displayList();
    /* Continue edits here... */
    
/*
    nameField.addEventListener("input", (event) => {
        console.log("input", event.target.value);
        const newList = filterList(global_val, event.target.value);
        console.log("Loading New List...");
        display(newList);
    })

    typeField.addEventListener("input", (event) => {
        console.log("input", event.target.value);
        const newList = filterList(global_val, event.target.value);
        console.log("Loading New List...");
        display(newList);
    }) */
}

/* Update display content here... */
const displayList = (pokemon) => {
    console.log(pokemon);
    const dataHTMLString = pokemon.map((pokeman) =>
    `
        <li>
            <div class="card"><a href="info_page.html">
            <img src="${newList.thumbnail}" title="${newList.thumbnail}">
            <div class="container">
            <h4><b>${newList.title}</b></h4>
            ${newList.caption}
            </a></div>
        </li>
    `
    ).join("");
    data_show.innerHTML = dataHTMLString;
  };

  document.addEventListener("DOMContentLoaded", async () => mainEvent());