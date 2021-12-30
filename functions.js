//////////////////////////////////////////////////////////////////////  Show Reply box ////////////////////////////////////////////////////////////////////////

function showReplyBox(repyTo,currentUserImg,id){
    const commmentContainer = document.getElementById(id);
    const hiddenBox= document.getElementById('hiddenbox');

    if(hiddenBox){
        hiddenBox.parentNode.removeChild(hiddenBox);      
    }

    commmentContainer.insertAdjacentHTML('afterend',
    `<div class="hiddenbox" id="hiddenbox">
    <img src="${currentUserImg}" class="avtar">
    <textarea class="textcomm">@${repyTo}</textarea>
    <input type="submit" value="REPLY" class="submit">
    </div>`)
   
}



////////////////////////////////////////////////////////////////////// Delete ////////////////////////////////////////////////////////////////////////

const deleteBox = document.getElementById('deletebox');
function deleteComment(id){
    
    deleteBox.style.display="flex";
    deleteBox.innerHTML =`<div class="delete-comment">
                            <h3>Delete comment</h3>
                            <p> Are you sure you want to delete this comment?
                            this will remove the comment and can't be undone.
                            </p>
                            <div class="delete-options">
                                <button id="no" onclick="No()">no,cancel</button>
                                <button id="yes" onclick="Yes('${id}')">yes,delete</button>
                            </div>
                          </div>
                          `;

}

function No(){
    deleteBox.style.display="none";
}

function Yes(id){
    const comment = document.getElementById(id);
    comment.parentNode.removeChild(comment);
    deleteBox.style.display="none";
}

////////////////////////////////////////////////////////////////////// Edit ////////////////////////////////////////////////////////////////////////

function editComment(id){
    const p = document.getElementById(`pcom${id}`);
    const textarea = document.getElementById(`editbox${id}`);
    const updateBtn = document.getElementById(`up${id}`);

    textarea.value = p.innerHTML;

    p.style.display = "none";
    updateBtn.style.display = "block"; 
    textarea.style.display = "block";

    const allBtns = document.querySelectorAll(`#com${id} .reply-btn`);
    allBtns.forEach(element=>{
        element.style.display = "none";
    })
    
}


////////////////////////////////////////////////////////////////////// Update ////////////////////////////////////////////////////////////////////////

function updateComment(id){
    const textarea = document.getElementById(`editbox${id}`);
    const p = document.getElementById(`pcom${id}`);
    const updateBtn = document.getElementById(`up${id}`);

    p.textContent = textarea.value;

    p.style.display = "block";
    updateBtn.style.display = "none"; 
    textarea.style.display = "none";

    const allBtns = document.querySelectorAll(`#com${id} .reply-btn`);
    allBtns.forEach(element=>{
        element.style.display = "flex";
    })
}
