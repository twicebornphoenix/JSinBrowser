'use strict';

function showComments(list) {
    const commentsContainer = document.querySelector('.comments');
    console.log(commentsContainer)
    const comments = document.createDocumentFragment();

    console.log(list, comments)
    
    list.forEach(c => {
        comments.appendChild(createComment(c));
    });

    commentsContainer.appendChild(comments);
}
// function createComment(comment) {
//   return `<div class="comment-wrap">
//     <div class="photo" title="${comment.author.name}">
//       <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
//     </div>
//     <div class="comment-block">
//       <p class="comment-text">
//         ${comment.text.split('\n').join('<br>')}
//       </p>
//       <div class="bottom-comment">
//         <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
//         <ul class="comment-actions">
//           <li class="complain">Пожаловаться</li>
//           <li class="reply">Ответить</li>
//         </ul>
//       </div>
//     </div>
//   </div>`
// }

function createComment(comment) {
    const element = document.createElement('div');
    const photoBlock = document.createElement('div');
    const photoAvatar = document.createElement('div');
    const commentBlock = document.createElement('div');
    const commentText = document.createElement('p');
    const commentBottom = document.createElement('div');
    const commentDate = document.createElement('div');
    const actionList = document.createElement('ul');
    const complainItem = document.createElement('li');
    const replyItem = document.createElement('li');

    element.className = 'comment-wrap';
    photoBlock.className = 'photo';
    photoBlock.title = comment.author.name;
    photoAvatar.className = 'avatar';
    photoAvatar.style.backgroundImage = `url(${comment.author.pic})`;
    commentBlock.className = 'comment-block';
    commentText.className = 'comment-text';
    commentBottom.className = 'bottom-comment';
    commentDate.className = 'comment-date';
    commentDate.textContent = new Date(comment.date).toLocaleString('ru-Ru');
    actionList.className = 'comment-actions';
    complainItem.className = 'complain';
    replyItem.className = 'reply';
    complainItem.textContent = 'Пожаловаться';
    replyItem.textContent = 'Ответить';

    let msg =  comment.text.split('\n').join("<br>");
    let msgResult = msg.replace(/<h1>/gi, '<xmp><h1>').replace(/<\/h1><br>/gi, '</h1>\n').replace(/<\/blockquote>/gi, '</blockquote></xmp>');
    
    commentText.innerHTML = msgResult;
    console.log(msgResult)

    element.appendChild(photoBlock);
    element.appendChild(commentBlock);

    commentBlock.appendChild(commentText);
    commentBlock.appendChild(commentBottom);

    // commentText.appendChild(getMsg(comment));

    photoBlock.appendChild(photoAvatar);

    commentBottom.appendChild(commentDate);
    commentBottom.appendChild(actionList);

    actionList.appendChild(complainItem);
    actionList.appendChild(replyItem);

      console.log(element)
    return element;
}

fetch('https://neto-api.herokuapp.com/comments')
    .then(res => res.json())
    .then(showComments);