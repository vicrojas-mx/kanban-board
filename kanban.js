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

    static insertTasks(columnId, content){
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
        return task;
    }

    static updateTask(taskId, updatedInformation) {

    }

    static deletTask(taskId){
        const data = read();
        for(const column of data) {
            let task = column.tasks.find((element, idx) => {
                return element.taskId == taskId
            });
            if (task) {
                column.tasks.splice(column.tasks.indexOf(task), 1);
            }
        } 
        save(data);
    }

    static getAllTasks() {
        const data = read() ;
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