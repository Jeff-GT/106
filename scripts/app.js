function saveTask(){
   //get values
   const title=$("#txtTitle").val();
   const desc=$("#txtDescription").val();
   const color=$("#selColor").val();
   const date=$("#selDate").val();
   const status=$("#selStatus").val();
   const budget=$("#numBudget").val();
   console.log(title,desc,color,date,status,budget);
   //build an object
   let taskToSave=new Task(title,desc,color,date,status,budget);
   //save to server (post)
   console.log(taskToSave);

   $.ajax({
      url: "http://fsdiapi.azurewebsites.net/api/tasks/",// the URL to send the request to
      type: "POST", // the type of request (GET, POST, PUT, DELETE, PATCH, ...)
      data: JSON.stringify(taskToSave), //convert object to JSON
      contentType: "application/json",
      success: function(response) {
         console.log(response);
      },
      error: function(response) {
         console.log(response);
      },
   })

   //display the task (get)
   displayTask(taskToSave);
}

function displayTask(task){
   let syntax = `
      <div class="task-container" style="border-color:${task.color}">
         <div class="task">
            <div class="info">
               <h5>${task.title}</h5>
               <p>${task.description}</p>
            </div>
         
            <div class="status">${task.status}</div>

            <div class="date-budget">
               <span>${task.date}</span>
               <span>${task.budget}</spacn>
            </div>
         </div>
      </div>
   `
   $("#list").append(syntax);
}

function loadTask(){
   console.log("Load Task FUnction");

   $.ajax({
      url: "http://fsdiapi.azurewebsites.net/api/tasks/",// the URL to 
      type: "GET",
      success: function (response){
         let data = JSON.parse(response);
         console.log(("Data: ", data));

         for(let i=0; i<data.length;i++){
            let task = data[i];
            console.log("task: ", task);

            if( task.name==="Jeff")
               displayTask(task);
            
         }
         
      }
   })
}

function init(){
   $("#btnSave").click(saveTask);
   
   loadTask();
}
window.onload=init;


