class UI{
    constructor(){
        this.post = document.querySelector('.posts');
        this.postContainer = document.querySelector('.postsContainer');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.titleInput = document.querySelector('#title');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.cardForm = document.querySelector('.card-form');
        this.forState = 'add';
    }

    showPosts(posts){
        let output = '';

        posts.forEach(post => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href='#' class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a>
                        <a href='#' class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
                    </div>
                </div>
            `;
        });

        this.post.innerHTML = output;
    }

    fillForm(data){
        this.idInput.value = data.id;
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.changeFormState('edit');
    }

    showAlert(message, classList){
        this.clearAlert();
        //create div
        const div = document.createElement('div');
        //add classes
        div.className = classList;
        //add text
        div.appendChild(document.createTextNode(message));
        //insert alert div
        this.postContainer.insertBefore(div, this.post);

        //set timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }

    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    changeFormState(newState){
        if(newState === 'edit'){
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';
            
            //create cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));
            this.cardForm.insertBefore(button, document.querySelector('.form-end'));
        }else{
            this.postSubmit.textContent = 'Submit';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';
            //remove cancelButton if there
            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }

            //clear id from hidden field
            this.clearIdInput();
            this.clearFields();
        }
    }

    clearIdInput(){
        this.idInput.value = '';
    }
}

export const ui = new UI();