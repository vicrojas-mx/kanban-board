import Kanban from "./kanban.js";

console.log(Kanban.getAllTasks());
console.log("Fetching the data");
const todoCards = document.querySelector(".cards.todo");
const pendingCards = document.querySelector(".cards.pending");
const completedCards = document.querySelector(".cards.completed");


todoCards.innerHTML = "";
pendingCards.innerHTML = "";
completedCards.innerHTML = "";

const taskbox = [todoCards, pendingCards, completedCards];

console.log(Kanban.getAllTasks()[0]);

function addTask(task, index) {
    const element = document.createElement("form");
    element.className = "card";
    element.draggable = true;
    element.dataset.id = task.taskId;
    element.innerHTML = `
        <input type="text" name="task" autocomplete="off" disabled="disabled" value="${task.content}">
            <div>
                <span class="task-id">#${task.taskId}</span>
                <span>
                   <button class="bi bi-pencil edit" data-id="${task.taskId}"></button>
                   <button class="bi bi-check-lg update hide" data-id="${task.taskId}"></button>
                   <button class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
                </span>
             </div>
    `;
    taskbox[index].appendChild(element);
}

Kanban.getAllTasks().forEach((tasks, index) => {
            tasks.forEach(task => {
                addTask(task, index); 
   });
});
