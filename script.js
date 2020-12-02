//UI vars

const form=document.querySelector("#addTaskForm");
const input=document.querySelector("#txtTaskName");
const btnDeleteAll=document.querySelector("#btnDeleteAll");
const taskList=document.querySelector("#task-list");

var items;


loadItems();
eventListeners();

function loadItems (){

    items=getItemsFromLS();

    items.forEach(function(item){
        createNewItem(item);
    });
}

//lOCAL STORAGEDEN VERİ ALMA
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items=[];
    }else{
        items=JSON.parse(localStorage.getItem('items')); 
    }
    return items;


}
//LS 'DEKİ TÜM DATALARI SİLME



//LOCAL STORAGE VERİ ATMA
function setItemToLS(text){
    items=getItemsFromLS(); //Kayıt edilmiş listeyi önce al
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items)); //köşeli parantezleri ekler 
}
//local storage temizleme
function deleteItemFromLS(text){

    items=getItemsFromLS();
    items.forEach(function(item,index){
        if(item===text){
        items.splice(index,1);
        }
    });
    //Elemanı sildik şimdi listeyi LocalStorage a kaydetmek gerekiyor.
    localStorage.setItem('items',JSON.stringify(items));

}

function eventListeners(){

    //add new item
    form.addEventListener('submit',addNewItem);

    //delete an item
    taskList.addEventListener('click',deleteAnItem);

    //deleteAllItems
    btnDeleteAll.addEventListener('click',deleteAllItems)
}

function createNewItem(text){
    //Yeni bir li elementi oluşturacağız.
    let li=document.createElement('li');
    li.setAttribute('class','list-group-item list-group-item-secondary');
    li.innerText=text;
    // a elememti oluşturulur
    let a=document.createElement('a');
    a.setAttribute('href','#');
    a.setAttribute('class','delete-item float-right');
    a.innerHTML='<i class="fas fa-times"></i>';
    li.appendChild(a);
    //li elementi ul ye atılır.
    taskList.appendChild(li);
}

function addNewItem(e){
    
    if(input.value==''){
    alert('Lütfen bir görev giriniz !')
    }
    else{
        createNewItem(input.value);
        setItemToLS(input.value);
        input.value='';
        //local storage a da ekleyelim
        
    }

    
    e.preventDefault();

}

function deleteAnItem(e){
    if(e.target.className==='fas fa-times'){
        if(confirm(e.target.parentElement.parentElement.textContent+" görevi silinecek emin misiniz ?")){
        e.target.parentElement.parentElement.remove();
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }else{
            alert('Silme işlemi iptal edildi.');
        }
    }

    e.preventDefault();

}

function deleteAllItems(e){
    
    if(confirm('Tüm görevler silinecek, emin misiniz ?')){
        
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();    

    }else{
        alert('Silme işlemi iptal edildi.');
    }

    
}
