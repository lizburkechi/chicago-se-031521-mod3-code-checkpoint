const url = 'http://localhost:3000/images/1'
const imageCommentsUl = qs('ul.comments')

// - See the image received from the server, including its title, likes and comments when the page loads

function getImageDetails() {
fetch(url)
.then(response => response.json())
.then(imageObject => displayImageDetails(imageObject))
}

function displayImageDetails(imageObject) {
const img = qs('img.image')
img.src = imageObject.image
img.alt = imageObject.title

const imageTitle = qs('h2.title')
imageTitle.textContent = imageObject.title

const imageLikes = qs('span.likes')
imageLikes.textContent = `${imageObject.likes} Likes`

imageObject.comments.forEach(imageComment => {
    const li = ce('li')
    li.textContent = imageComment.content
    imageCommentsUl.append(li)
})
}

// - Click on the heart icon to increase image likes, and still see them when I reload the page (*fetch/patch)

const likeBtn = qs('button.like-button')
likeBtn.addEventListener('click', event => {
    const imageLikes = qs('span.likes')
    const newLikes = parseInt(imageLikes.textContent) + 1

    fetch(url, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },

    body: JSON.stringify({ likes: newLikes })

    })
    .then(response => response.json())
    .then(updatedLikes => {
        imageLikes.textContent = `${updatedLikes.likes} Likes`
    })
})

// - Add a comment (no persistance needed)(no fetch)
const newCommentForm = qs('form.comment-form')
newCommentForm.addEventListener('submit', event => {
    event.preventDefault()

    const newCommentInput = event.target.comment.value
    const li = qs('li')
    li.textContent = newCommentInput

    imageCommentsUl.append(li)

    event.target.reset()
})




/*******************Helper Functions********************/
function eid(id) {
    return document.getElementById(id)
}

function qs(selector) {
    return document.querySelector(selector)
}

function ce(element) {
    return document.createElement(element)
}

/***********INIT*************/
getImageDetails()