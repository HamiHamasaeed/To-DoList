var taskStore = [];

var Task = function (id, taskText) {
  this.id = id;
  this.taskText = taskText;
};

function addToList(desc) {
  var newTask, ID;

  if (taskStore.length > 0) {
    ID = taskStore[taskStore.length - 1].id + 1;
  } else {
    ID = 0;
  }

  newTask = new Task(ID, desc);

  taskStore.push(newTask);

  return newTask;
}

function addContents(task) {
  
    var html, newHtml, element;

  html =
    '<div class="row text-center py-2 my-1 entire-row" id="%id%"><div class="item_description fs-5 col-8">%description%</div><div class="rightPart d-flex justify-content-evenly col-4 mt-1 float-end"><i class="fa-regular fa-circle-check checkBtn"></i><i class="fa-regular fa-circle-xmark crossBtn"></i></div></div>';

    newHtml = html.replace('%id%', task.id);
    newHtml = newHtml.replace('%description%', task.taskText);

    element = DOMString.theTaskContainer;
    element.insertAdjacentHTML('beforeend', newHtml);
}

var DOMString = {
  myAddBtn: document.querySelector("#addbtn"),
  addListText: document.querySelector("#textInput"),
  theTaskContainer: document.querySelector('.myTaskContainer'),
};

function ctrlTextInput() {
  var inputContent, inputValue, newTask;
  // get text value

  inputContent = DOMString.addListText;
  inputValue = inputContent.value;

  //check if empty
  if (inputValue) {
    //add to the store
    console.log(inputValue);
    newTask = addToList(inputValue);
    
    //add content to the HTML
    addContents(newTask);

    //clear textfield
    inputContent.value = '';
    inputContent.focus;

  } else {
    alert("Please write a task!");
  };
};

function ctrlDeletebtn(event){
    var taskId, doneBtn, checkForBtn, checked;

    taskId = event.target.parentNode.parentNode.id;
  
    doneBtn = "fa-regular fa-circle-check checkBtn"
    checked = "fa-regular fa-circle-check checkBtn done_btn_style";

    checkForBtn = event.target.className;

    console.log(checkForBtn);

    if(checkForBtn === doneBtn || checkForBtn === checked ){
      //changing UI
      checkTask(taskId);

    }else if(taskId){

     

        //delete task from the data structure 

        deleteTaskFromArray(taskId);

        //delete task from the UI

        deleteFromUI(taskId);

    }
};

DOMString.myAddBtn.addEventListener("click", ctrlTextInput);

document.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    ctrlTextInput();
  }
});


DOMString.theTaskContainer.addEventListener('click', ctrlDeletebtn);


function deleteTaskFromArray(id){

    var ids, index;

    ids =  taskStore.map(function (current){
        return current.id;
    });

    index = ids.indexOf(parseInt(id));

    if(index !== -1){
        taskStore.splice(index, 1);
    }

};

function deleteFromUI(selectorId){

    var el;

    el = document.getElementById(selectorId);

    el.remove();

};


function checkTask(selectorId){

  var el;

  el = document.getElementById(selectorId);

  el.firstElementChild.classList.toggle("done_style");
  el.children[1].children[0].classList.toggle("done_btn_style");


}