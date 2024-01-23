export default class Kanban {
    static getTasks(columnId) {
        const data = read().find(column => {
            return column.columId == columnId
          }
        );
        if (!data) {
            return [];
        }
        return data.tasks;
    }

    static insertTask(columnId, content){
        const data = read();
        const column = data.find(column => {
            return column.columId == columnId
          }
        );

        if (!column) {
            throw new Error(`Error: The column ${columnId} doesn't exists!`);
        }

        const  task = {
            taskId: Math.floor(Math.random() * 100000),
            content: content
        };
        column.tasks.push(task);
        save(data);
        updateColumnCount();
        return task;
    }

    static updateTask(taskId, updatedInformation) {
        const data = read();
    
        function findColumnTask(){
            for(const column of data) {
                let task = column.tasks.find((element) => {
                    return element.taskId == taskId
                });
                if (task) {
                    return[task, column];
                }
            }
            return [];
        }
        
        const [task, currentColumn] = findColumnTask();
        if (task) {
            console.log(task, updatedInformation.content);
            currentColumn.tasks.splice(currentColumn.tasks.indexOf(task),1);
            task.content = updatedInformation.content;
            const newColumn = data.find(column => column.columId == updatedInformation.columnId);
            newColumn.tasks.push(task);
            save(data);
            updateColumnCount();
        }
    }

    static deletTask(taskId){
        const data = read();
        for(const column of data) {
            let task = column.tasks.find((element) => {
                return element.taskId == taskId
            });
            if (task) {
                column.tasks.splice(column.tasks.indexOf(task), 1);
            }
        } 
        save(data);
        updateColumnCount();
    }

    static getAllTasks() {
        const data = read() ;
        updateColumnCount();
        return [data[0].tasks, data[1].tasks, data[2].tasks];
    }
}

function read() {
    const data = localStorage.getItem("data");

    if (!data) {
        return [{columId:0, tasks:[]}, {columnId:1, tasks: []}, {columnId:2, tasks:[]}];
    }
    return JSON.parse(data);
}


function save(data) {
    localStorage.setItem("data", JSON.stringify(data));
}

function updateColumnCount(){
    const data = read();
    const todoCount = document.querySelector(".todo");
    const pendingCount = document.querySelector(".pending");
    const completedCount = document.querySelector(".completed");

    todoCount.textContent = data[0].tasks.length;
    pendingCount.textContent = data[1].tasks.length;
    completedCount.textContent = data[2].tasks.length; 
}


/* todoCards.innerHTML = fillUpTaskBoxes(0);
pendingCards.innerHTML = fillUpTaskBoxes(1);
completedCards.innerHTML = fillUpTaskBoxes(2);
 */
//Kanban.deletTask(63861);
//console.log("second delete");
//Kanban.deletTask(15523);
//Kanban.insertTasks(0, "Leslie Feist concerts");

//Kanban.updateTask(123522, {
//    columnId: 2,
//   content: "Mr mr"
//    }
//);

//console.log(todoCards.innerHTML);