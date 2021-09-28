const postsList =  document.querySelector(".posts-list");
const form = document.querySelector(".add-post-form");
const title = document.querySelector("#title-value");
const content = document.querySelector("#content-value");
const btnSubmit = document.querySelector(".btn-submit");
let htmls = '';
const url = 'http://localhost:3000/posts';

function render(data){
    data.data.forEach(post => {
        htmls += `
            <div class="card col-md-4" style="margin-right:1rem" id="${post.id}"  >
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.content}</p>
                    <a href="#" class="btn btn-primary edit-btn" id="edit">Edit</a>
                    <a href="#" class="btn btn-primary delete-btn" id="delete">Delete</a>
                </div>
            </div>
        `;
    });
    postsList.innerHTML = htmls;
}
//Get
axios.get(url)
  .then(function (data) {
    // handle success
    console.log(data)
    render(data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  //create post
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(title.value && content.value){
        axios.post(url, {
            title: title.value,
            content:content.value
          })
          .then(function (data) {
            const arr = [];
            arr.push(data);
            render(arr);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    title.value = "";
    content.value= "";
})  

//delete post and update post
postsList.addEventListener("click", (e)=>{
    e.preventDefault();
    let deleteBtnPressed = e.target.id=="delete";
    let editBtnPressed = e.target.id=="edit";
    let id = e.target.parentElement.parentElement.id;
    //delete
    if(deleteBtnPressed){
        axios.delete(url+'/'+id)
            .then(function (data) {
                // handle success
                console.log(data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    //update
    if(editBtnPressed){
        const parentE = e.target.parentElement;
        let cartTitle = parentE.childNodes[1].textContent;
        let cartText =parentE.childNodes[3].textContent;
        title.value = cartTitle;
        content.value = cartText;
    }
    btnSubmit.addEventListener('click',(e)=>{
        e.preventDefault();
        axios.patch(url+'/'+id, {
            title: title.value,
            content:content.value
          })
          .then(function (data) {
            location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    })
})