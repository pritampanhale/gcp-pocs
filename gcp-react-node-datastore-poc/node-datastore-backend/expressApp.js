const express = require('express');
const app = express();
const { Datastore } = require('@google-cloud/datastore');
const { PubSub } = require('@google-cloud/pubsub');
var uuid = require('uuid');
const datastore = new Datastore();
const cors = require('cors');

const PORT = 5555;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/task', async (req, res, next) => {
    const tasks = await listTasks();
    res.status(200).send(tasks);
});

app.post('/task', async (req, res, next) => {
    const body = req.body;
    const taskId = await createTask(body);
    res.status(200).send(taskId);
});

app.put('/task', async (req, res, next) => {
    const body = req.body;
    const taskId = await merge(body);
    res.status(200).send(taskId);
});

app.get('/task/:taskId', async (req, res, next) => {
    const task = await getTask(req.params.taskId);
    res.status(200).send(task);
});

app.use(cors({
    origin: '*'
}));

async function createTask(body) {
    const kind = 'Task';
    const ID = uuid.v1();
    const taskKey = datastore.key([kind, ID]);
    const task = {
        key: taskKey,
        data: {
            taskName: body.taskName,
            created: new Date().toString(),
            started: '',
            completed: ''
        },
    };

    await datastore.save(task);
    console.log(`Saved ${task.key.name}`);
    return ID;
}

async function merge(taskToUpdate) {
    const taskKey = datastore.key(['Task', taskToUpdate.taskId]);
    const task = {
        taskName: taskToUpdate.taskName,
    };
    if (taskToUpdate.started != undefined && taskToUpdate.started == true) {
        task.started = new Date().toString();
    }

    if (taskToUpdate.completed != undefined && taskToUpdate.completed == true) {
        task.completed = new Date().toString();
    }

    try {
        await datastore.merge({
            key: taskKey,
            data: task,
        });
        console.log(`Task ${taskId} description updated successfully.`);
    } catch (err) {
        console.error('ERROR:', err);
    }
}

async function getTask(taskId) {
    const taskKey = datastore.key(['Task', taskId]);

    let task = await datastore.get(taskKey);
    console.log(`Task ${taskId}`, task);
    return task;
}

async function listTasks() {
    const query = datastore.createQuery('Task').order('created');
    const [tasks] = await datastore.runQuery(query);
    console.log('Tasks:');
    const tasksToReturn = [];
    for (const task of tasks) {
        const taskKey = task[datastore.KEY];
        console.log('--->', taskKey.name, task);
        task.ID = taskKey.name;
        tasksToReturn.push(task);
    }
    return tasksToReturn;
}

module.exports = {
    app
};