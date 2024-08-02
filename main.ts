// todo list project

import inquirer from 'inquirer';

interface Todo {
    task: string;
    completed: boolean;
}

let todos: Todo[] = [];

async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View To-Do List', 'Add To-Do', 'Complete To-Do', 'Exit']
        }
    ]);

    switch (answers.action) {
        case 'View To-Do List':
            viewTodos();
            break;
        case 'Add To-Do':
            addTodo();
            break;
        case 'Complete To-Do':
            completeTodo();
            break;
        case 'Exit':
            process.exit();
            break;
    }
}

function viewTodos() {
    console.log('\nTo-Do List:');
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. [${todo.completed ? 'x' : ' '}] ${todo.task}`);
    });
    mainMenu();
}

async function addTodo() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'task',
            message: 'Enter the new to-do:'
        }
    ]);

    todos.push({ task: answer.task, completed: false });
    console.log('To-Do added.');
    mainMenu();
}

async function completeTodo() {
    if (todos.length === 0) {
        console.log('No to-dos to complete.');
        return mainMenu();
    }

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'taskIndex',
            message: 'Select a to-do to mark as complete:',
            choices: todos.map((todo, index) => ({
                name: todo.task,
                value: index.toString()
            }))
        }
    ]);

    const index = parseInt(answer.taskIndex, 10);
    todos[index].completed = true;
    console.log('To-Do marked as complete.');
    mainMenu();
}

mainMenu();