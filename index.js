import Kanban from "./kanban.js";

console.log("Fetching the data");
console.log(Kanban.getAllTasks());
const todoCards = document.querySelector(".cards.todo");
const pendingCards = document.querySelector(".cards.pending");
const completedCards = document.querySelector(".cards.completed");

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


todoCards.innerHTML = fillUpTaskBoxes(0);
pendingCards.innerHTML = fillUpTaskBoxes(1);
completedCards.innerHTML = fillUpTaskBoxes(2);
//Kanban.insertTasks(0, "Leslie Feist concerts");

//console.log(todoCards.innerHTML);