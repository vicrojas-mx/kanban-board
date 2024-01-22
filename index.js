import Kanban from "./kanban.js";

/* const todoCards = document.querySelector(".cards.todo");
const pendingCards = document.querySelector(".cards.pending");
const completedCards = document.querySelector(".cards.completed");
 */ 
function fillUpTaskBoxes(columnId) {
    let taxBoxCardsContent = "";
    try {
        Kanban.getTasks(columnId).forEach(element => {
            taxBoxCardsContent += 
            `<form class="card">
            <input type="text" name="task" autocomplete="off" disabled="disabled" value="${element.content}">
            <div>
                <span class="task-id">${element.taskId}</span>
                <span>
                    <button class="bi bi-pencil edit" data-id=""></button>
                    <button class="bi bi-check-lg update hide" data-id=""></button>
                    <button class="bi bi-trash3 delete" data-id=""></button>
                </span>
            </div>
        </form>
        `
        });
    }
    catch (error) {
        console.error(`Column number out of index --- ${error}`);
    }
    return taxBoxCardsContent;
}

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
        taskbox[index].innerHTML += `<form class="card" draggable="true">
             <input type="text" name="task" autocomplete="off" disabled="disabled" value="${task.content}">
             <div>
                <span class="task-id">${task.taskId}</span>
                <span>
                   <button class="bi bi-pencil edit" data-id=""></button>
                   <button class="bi bi-check-lg update hide" data-id=""></button>
                   <button class="bi bi-trash3 delete" data-id=""></button>
                </span>
             </div>
            </form>`
}

Kanban.getAllTasks().forEach((tasks, index) => {
            tasks.forEach(task => {
                addTask(task, index); 
   });
});
