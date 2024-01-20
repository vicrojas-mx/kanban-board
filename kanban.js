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
        localStorage.setItem("data", JSON.stringify(data));
        
        return task;
    }

    static updateTask(taskId, updatedInformation) {

    }

    static deletTask(taskId){

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


function save() {

}