let postsEl = document.getElementById("blog-posts");
const formEl = document.getElementById("form");
const postBtn = document.getElementById("post-btn");
const inputTitle = document.getElementById("post-title");
const inputBody = document.getElementById("post-body");

let postsArr = [];

function renderPosts() {
    let myHtml = "";
    for(let post of postsArr) {
        myHtml += `
            <div class="blog-post flex-container card">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-body">${post.body}</p>
            </div>
        `
    }
    postsEl.innerHTML= myHtml;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(response => response.json())
    .then(data => {
        postsArr = data.slice(0, 5);
        renderPosts();
    });

formEl.addEventListener("submit", event => {
    event.preventDefault();
    
    const postTitle = inputTitle.value;
    const postBody = inputBody.value;

    const data = {
        "title": postTitle,
        "body": postBody
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(post => {
            postsArr.unshift(post);
            renderPosts();
            inputTitle.value = "";
            inputBody.value = "";
        })
})
