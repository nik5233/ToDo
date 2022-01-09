import React, { Component } from 'react'
import moment from 'moment';

import './index.css'
class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             list: []
        }
    }
    
    updateTask(task){
        const updatedResult = this.state.list.map((value, id) => {
            return (task === id) ? {task: value.task, status: 'done', createdAt: value.createdAt} : value
        })
        this.setState({list: updatedResult})
    }

    removeTask(task){
        this.setState({
            list: this.state.list.filter((value, id) => {return task !== id})
        })
    }

    addTask = (event) =>{
        event.preventDefault();
        !(event.target[1].value === "") && this.setState({
            list : [...this.state.list, {task: event.target[1].value, status: 'new', createdAt: new Date()}]
        }, ()  => {console.log("added to list", this.state.list);event.target.reset();})
    }

    emitChange = (event, taskId) => {
        event.preventDefault();
        // console.log(event.target.innerText, taskId)
        const updatedResult = this.state.list.map((value, id) => {
            return (taskId === id) ? {task: event.target.innerText, status: 'updated', createdAt: value.createdAt} : value
        })
        this.setState({list: updatedResult})

    }

    render() {
        return (
            <div>
                <h1 className="title">To-Do Application</h1>
                <form onSubmit={this.addTask}>
                    <fieldset className="fieldInput">
                        <input className="form-input" type="text" name="taskName" placeholder="Add task into TO-DO" />
                        <button type="submit" className="form-submit">+</button>
                    </fieldset>
                </form>
                {/* <div className="add-task">
                    <form onSubmit={this.addTask}>
                        <input placeholder="Add task into TO-DO" name="taskName" className="task-input" />
                        <button type="submit" className="button add-button">ADD</button>
                    </form>
                </div> */}
                <div>
                    {this.state.list.length > 0 && <div>
                        <h2>Your ToDo Tasks</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.list.map((val, i) => {
                                return <tr key={i} >
                                    {/* className="todo-list" */}
                                    <td>{i+1}</td>
                                    <td contentEditable={true} suppressContentEditableWarning={true} 
                                        onInput={(event) => this.emitChange(event, i)} 
                                        onBlur={(event) => this.emitChange(event, i)} 
                                        className={`task ${val.status === 'done' ? 'completed-task' : 'todo-task'}`}>{val.task}</td>
                                    <td>{val.status}</td>
                                    <td>{moment(val?.createdAt).startOf('minute').fromNow()}</td>                                    
                                    <td>
                                        {val.status !== 'done' && <button onClick={() => this.updateTask(i)} className="button done-button">Done</button>}
                                        <button onClick={() => this.removeTask(i)} className="button remove-button">Remove</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    </div>}


                    {/* {this.state.list.map((val, i) => {
                        return <div key={i} className="todo-list">
                            <div>{i+1}</div>
                            <div className={`task ${val.status === 'done' ? 'completed-task' : 'todo-task'}`}>{val.task}</div>
                            <abbr>{val.createdAt.getDate()}</abbr>
                            {val.status !== 'done' && <button onClick={() => this.updateTask(i)} className="button done-button">done</button>}
                            <button onClick={() => this.removeTask(i)} className="button remove-button">remove</button>
                        </div>
                    })} */}
                </div>
            </div>
        )
    }
}

export default index
