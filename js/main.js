// DOM ELEMENT
let elUserWrapper = document.querySelector("#user-wrapper");
let elPostWrapper = document.querySelector("#post-wrapper");
let elCommentWrapper = document.querySelector("#comment-wrapper");
let elSearchUser = document.querySelector("#search-user");
let elSearchPost = document.querySelector("#search-post");
let elSearchComment = document.querySelector("#search-commit");

let elUserTemplate = document.querySelector("#user-template").content
let elPostTemplate = document.querySelector("#user-post-template").content
let elCommentTemplate = document.querySelector("#user-client-comment-template").content


// user render
function renderUser(array, wrapper) {
    let newItem = document.createDocumentFragment();
    if (array) {
        array.forEach(item => {
            let postWrapper = elUserTemplate.cloneNode(true);
            postWrapper.querySelector("#user-name").textContent = item.name
            postWrapper.querySelector("#user-username").textContent = `Username: ${item.username}`
            postWrapper.querySelector("#user-email").textContent = `Email: ${item.email}`
            postWrapper.querySelector("#user-city").textContent = `City: ${item.address.city}`
            postWrapper.querySelector("#user-name").dataset.UserId = item.id
            newItem.appendChild(postWrapper);
        })
    wrapper.innerHTML = null;
    wrapper.appendChild(newItem);
    }else{
        wrapper.innerHTML = null
        alert("Ma'lumot kelmadi");
    }
    elSearchUser.textContent = `Count of users: ${array.length}`
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => renderUser(json, elUserWrapper));

 
// posts render
function renderUserPost(postArray, wrapper) {
    let newPostItem = document.createDocumentFragment();
    if (postArray) {
        postArray.forEach(item => {
            let postWrapper = elPostTemplate.cloneNode(true);
            postWrapper.querySelector("#user-post-title").textContent = item.title
            postWrapper.querySelector("#user-post-body").textContent = `Post: ${item.body}`
            postWrapper.querySelector("#user-post-title").dataset.userIdBek = item.userId
            newPostItem.appendChild(postWrapper);
        })
    wrapper.innerHTML = null;
    wrapper.appendChild(newPostItem);
    }else{
        wrapper.innerHTML = null
        alert("Ma'lumot kelmadi");
    }
    elSearchPost.textContent = `Count of posts: ${postArray.length}`
}


// comment render
function renderUserClientComment(commentArray, commentWrapper) {
    let newPostItem = document.createDocumentFragment();
    if (commentArray) {
        commentArray.forEach(item => {
            let clientCommentWrapper = elCommentTemplate.cloneNode(true);
            clientCommentWrapper.querySelector("#user-client-name").textContent = `Title: ${item.name}`
            clientCommentWrapper.querySelector("#user-client-email").textContent = `Email: ${item.email}`
            clientCommentWrapper.querySelector("#user-client-body").textContent = `Post: ${item.body}`
            newPostItem.appendChild(clientCommentWrapper);
        })
    commentWrapper.innerHTML = null;
    commentWrapper.appendChild(newPostItem);
    }else{
        commentWrapper.innerHTML = null
        alert("Ma'lumot kelmadi, biroz kuting kep qolar");
    }
    elSearchComment.textContent = `Count of comments: ${commentArray.length}`
}


elUserWrapper.addEventListener("click", (evt) => {
    let userTemplateId = evt.target.dataset.UserId
    fetch(`https://jsonplaceholder.typicode.com/user/${userTemplateId}/posts`)
    .then((response) => response.json())
    .then((json) => renderUserPost(json, elPostWrapper));
    elCommentWrapper.innerHTML = null
    elSearchComment.textContent = null
})

elPostWrapper.addEventListener("click", (evt) => {
    let userClientCommitId = evt.target.dataset.userIdBek
    fetch(`https://jsonplaceholder.typicode.com/posts/${userClientCommitId}/comments`)
    .then((response) => response.json())
    .then((json) => renderUserClientComment(json, elCommentWrapper));
})
