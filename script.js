//UI vars

const form=document.querySelector("#addTaskForm");
const input=document.querySelector("#txtTaskName");
const btnDeleteAll=document.querySelector("#btnDeleteAll");
const taskList=document.querySelector("#task-list");

eventListeners();

function eventListeners(){

    form.addEventListener('submit',addNewItem)

}

function addNewItem(e){
    
    if(input.value==''){
    alert('Lütfen bir görev giriniz !')
    }
    else{
        //Yeni bir li elementi oluşturacağız.
        let li=document.createElement('li');
        li.setAttribute('class','list-group-item list-group-item-secondary');
        li.innerText=input.value;
        // a elememti oluşturulur
        let a=document.createElement('a');
        a.setAttribute('href','#');
        a.setAttribute('class','delete-item float-right');
        a.innerHTML='<i class="fas fa-times"></i>';
        li.appendChild(a);
        //li elementi ul ye atılır.
        taskList.appendChild(li);
        input.value='';
    }

    
    e.preventDefault();

}