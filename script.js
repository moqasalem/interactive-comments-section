fetch('./data.json')
  .then(response => response.json())
  .then(data => mainFunction(data))


function mainFunction(data) {
  const comm = data.comments;
  const commentsList = document.getElementById('comm-list');

  //check if the current user is the same user who wrote the comment and give him some options
  var options = ``;
  var youSpan = '';
  function check(current, writer, comId) {
    if (current == writer) {
      options = `<span class="reply-btn">
                    <span class="delete" onclick="deleteComment('com${comId}')"><img src="images/icon-delete.svg" alt="Delete"> Delete</span>
                    <span class="edit" onclick="editComment(${comId})"><img src="images/icon-edit.svg" alt="Edit"> Edit</span>
                    </span>`;
      youSpan = '<span class="you">you</span>';
    }
    else {
      options = `<span class="reply-btn" onclick="showReplyBox('${writer}','${data.currentUser.image.png}','com${comId}')">
                    <img src="./images/icon-reply.svg" alt="Reply"> <strong>Reply</strong>`;
      youSpan = '';
    }
  }

  //comments
  comm.forEach(element => {
    check(data.currentUser.username, element.user.username, element.id)

    commentsList.insertAdjacentHTML('beforeend',
      `<div class="comment" id="com${element.id}">
        <div class="scores desktop-screen">
          <img src="images/icon-plus.svg" alt="">
          <strong>${element.score}</strong>
          <img src="images/icon-minus.svg" alt="">
        </div>

        <div class="comment-body">
          <div class="hero">
            <div class="details">
            <img src="${element.user.image.png}" alt="" class="avtar">
            <strong>${element.user.username}</strong>
            ${youSpan}
            <span class="time">${element.createdAt}</span>
            </div>
             <span class="desktop-screen">${options}</span>
            </div>  
         <div class="text">
            <p id="pcom${element.id}">${element.content}</p>
         </div>
         <textarea class="editbox" id="editbox${element.id}" style="display:none;"></textarea>
         <div><button class="submit update"  id="up${element.id}" onclick="updateComment('${element.id}')">UPDATE</button></div>
         

         <div class="downbar mobile-screen">
          <div class="scores">
            <img src="images/icon-plus.svg" alt="">
            <strong>${element.score}</strong>
            <img src="images/icon-minus.svg" alt="">
          </div>

          ${options}

         </div>

         </div>
        </div>`)

    // sub reply on comments
    if (element.replies.length > 0) {
      element.replies.forEach(reply => {
        check(data.currentUser.username, reply.user.username, reply.id)
        commentsList.insertAdjacentHTML('beforeend',
          `<div class="comment reply" id ="com${reply.id}">
                <div class="scores desktop-screen">
                    <img src="images/icon-plus.svg" alt="">
                    <strong>${reply.score}</strong>
                    <img src="images/icon-minus.svg" alt="">
                </div>

        <div class="comment-body">
          <div class="hero">
            <div class="details">
            <img src="${reply.user.image.png}" alt="" class="avtar">
            <strong>${reply.user.username}</strong>
            ${youSpan}
            <span class="time">${reply.createdAt}</span>
            </div>
            
            <span class="desktop-screen">${options}</span>
            </div>  
         <div class="text">
            <p id="pcom${reply.id}">${reply.content}</p>
         </div>

          <textarea class="editbox" id="editbox${reply.id}" style="display:none;"></textarea>
          <div class="updatediv"><button class="submit update"  id="up${reply.id}" onclick="updateComment('${reply.id}')">UPDATE</button></div>

         <div class="downbar mobile-screen">
          <div class="scores">
            <img src="images/icon-plus.svg" alt="">
            <strong>${reply.score}</strong>
            <img src="images/icon-minus.svg" alt="">
          </div>
          
          ${options}
         </div>

         </div>
         </div>
        </div>`)
      })
    }
  });

  const currentUser = data.currentUser;
  const addCommentContainer = document.getElementById('addcontainer');
  addCommentContainer.insertAdjacentHTML('afterbegin',
    `<img src="${currentUser.image.png}" class="avtar" alt="${currentUser.username}"></img>`)

}