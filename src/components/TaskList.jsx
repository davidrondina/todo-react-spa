import React from 'react'
import { Link, Form } from 'react-router-dom'
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
    const dueTasks = [];
    const completedTasks = [];

    tasks.forEach((task) => {
        if (task.is_done) {
            completedTasks.push(<TaskItem key={task.id} task={task} />)
        } else {
            dueTasks.push(<TaskItem key={task.id} task={task} />)
        }
    });
    return (
        <>
            {tasks.length > 0 ? (
                <div>
                    <div className="space-y-6">
                        <ul className="bg-white rounded-lg">{dueTasks.length && dueTasks}</ul>
                        <ul className="bg-white rounded-lg">{completedTasks.length && completedTasks}</ul>
                    </div>
                </div>
            ) : (
                <p>You have no tasks.</p>
            )}
        </>
    )
}

export default TaskList