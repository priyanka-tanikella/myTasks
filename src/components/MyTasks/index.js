import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './index.css'

import TagItem from '../TagItem'
import TaskItem from '../TaskItem'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    tasksList: [],
    taskInput: '',
    taskTagId: tagsList[0].optionId,
    activeTag: '',
  }

  changeToSelectTag = tagName => {
    this.setState({activeTag: tagName})
  }

  onChangeTag = event => {
    this.setState({taskTagId: event.target.value})
  }

  onChangeInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onClickAddTaskBtn = event => {
    event.preventDefault()
    const {taskInput, taskTagId} = this.state

    const taskTag =
      tagsList[tagsList.findIndex(eachTag => eachTag.optionId === taskTagId)]
        .displayText
    const newTask = {
      id: uuid(),
      task: taskInput,
      tag: taskTag,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      taskInput: '',
      taskTagId: tagsList[0].optionId,
    }))
  }

  renderNoTasksView = () => (
    <div className="no-tasks-view-container">
      <p className="no-task-view-heading">No Tasks Added Yet</p>
    </div>
  )

  renderTasksListView = () => {
    const {tasksList, activeTag} = this.state
    let newTasksList

    if (activeTag === '') {
      newTasksList = tasksList
    } else {
      newTasksList = tasksList.filter(eachTask => eachTask.tag === activeTag)
    }
    return (
      <ul className="added-tasks-list">
        {newTasksList.map(eachTask => (
          <TaskItem key={eachTask.id} taskDetails={eachTask} />
        ))}
      </ul>
    )
  }

  render

  render() {
    const {tasksList, activeTag, taskInput, taskTagId} = this.state
    const showTasksList = tasksList.length > 0

    return (
      <div className="my-tasks-container">
        <div className="creating-a-task-container">
          <h1 className="create-a-task-heading">Create a task!</h1>
          <form onSubmit={this.onClickAddTaskBtn}>
            <div className="label-and-input-container">
              <label htmlFor="task" className="label">
                Task
              </label>
              <br />
              <input
                type="text"
                className="input"
                id="task"
                value={taskInput}
                placeholder="Enter the task here"
                onChange={this.onChangeInput}
              />
            </div>
            <div className="select-tasks-container">
              <label htmlFor="tag" className="label">
                Tags
              </label>
              <select
                className="select-container"
                value={taskTagId}
                id="tag"
                onChange={this.onChangeTag}
              >
                {tagsList.map(eachTag => (
                  <option
                    key={eachTag.optionId}
                    value={eachTag.optionId}
                    className="option"
                  >
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div className="btn-container">
              <button className="add-task-btn" type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="tags-and-tasks-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => (
              <TagItem
                key={eachTag.optionId}
                tagDetails={eachTag}
                changeToSelectTag={this.changeToSelectTag}
                isActive={activeTag === eachTag.displayText}
              />
            ))}
          </ul>
          <h1 className="tasks-heading">Tasks</h1>
          {showTasksList
            ? this.renderTasksListView()
            : this.renderNoTasksView()}
        </div>
      </div>
    )
  }
}
export default MyTasks
