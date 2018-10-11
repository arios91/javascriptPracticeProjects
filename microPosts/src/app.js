import { http } from './http';
import { ui } from './ui';

//get posts on dom load
document.addEventListener('DOMContentLoaded', getPosts);
//listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);
//listen for delete post using event delegation
document.querySelector('.posts').addEventListener('click', deletePost);
//listen for edit post using event delegation
document.querySelector('.posts').addEventListener('click', enableEdit);
//listen for cancel edit post using event delegation
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(error => console.log(error));
}

function submitPost(e){
  const id = document.querySelector('#id').value;
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  
  if(title === '' || body === ''){
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  }else{
    //create data var
    const data = {
      title,
      body
    }
    console.log(data);

    //check for id, if blank, create new post, else update
    if(id === ''){
      //create post
      http.post('http://localhost:3000/posts', data)
      .then(res => {
        ui.showAlert('Successfully added new post', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
    }else{
      //update post
      console.log(`updating id: ${id}`);
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(res => {
        ui.showAlert('Successfully updated post', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));

    }
  }
  e.preventDefault();
}

function deletePost(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure you want to delete this post')){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post successfully deleted', 'alert alert-success');
        getPosts();
      })
      .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const data = {id, title, body};
    //fill form with current post
    ui.fillForm(data);
  }
  e.preventDefault();
}

function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add');
  }
  e.preventDefault();
}