import React, { Component } from 'react'

class index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             list: []
        }
    }
    
    updateTask(task){
        const updatedResult = this.state.list.map((value, id) => {
            return (task === id) ? {task: value.task, status: 'done'} : value
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

        !(event.target[0].value === "") && this.setState({
            list : [...this.state.list, {task: event.target[0].value, status: ''}]
        })
    }

    render() {
        return (
            <div>
                <div className="add-task">
                    <form onSubmit={this.addTask}>
                        <input placeholder="Add task into TO-DO" name="taskName" className="task-input" />
                        <button type="submit" className="button add-button">ADD</button>
                    </form>
                </div>
                <div>
                    {this.state.list.length > 0 && <div>Your ToDo Tasks</div>}
                    {this.state.list.map((val, i) => {
                        return <div key={i} className="todo-list">
                            <div>{i+1}</div>
                            <div className={`task ${val.status === 'done' ? 'completed-task' : 'todo-task'}`}>{val.task}</div>
                            {val.status !== 'done' && <button onClick={() => this.updateTask(i)} className="button done-button">done</button>}
                            <button onClick={() => this.removeTask(i)} className="button remove-button">remove</button>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default index
