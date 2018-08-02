'use strict';

function showComments(list) {
    const commentsContainer = document.querySelector('.comments');
    const comments = document.createDocumentFragment();
    
    list.forEach(c => {
        comments.appendChild(createComment(c));
    });

    commentsContainer.appendChild(comments);
}

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
    const fragment = document.createDocumentFragment();

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

    let msg =  comment.text.split('\n');

    if (msg.length > 1) {
      for (let i = 0; i < msg.length - 1; i++) {
        msg[i] ? fragment.append(msg[i], document.createElement('br')) : fragment.append(document.createElement('br'));
      }
    } else {
      commentText.append(msg);
    }
    
    commentText.appendChild(fragment)

    element.appendChild(photoBlock);
    element.appendChild(commentBlock);

    commentBlock.appendChild(commentText);
    commentBlock.appendChild(commentBottom);

    photoBlock.appendChild(photoAvatar);

    commentBottom.appendChild(commentDate);
    commentBottom.appendChild(actionList);

    actionList.appendChild(complainItem);
    actionList.appendChild(replyItem);

    return element;
}

fetch('https://neto-api.herokuapp.com/comments')
    .then(res => res.json())
    .then(showComments);