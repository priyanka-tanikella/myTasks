import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {task, tag} = taskDetails

  return (
    <li className="task-list-item">
      <p className="task">{task} </p>
      <p className="tag-btn">{tag}</p>
    </li>
  )
}
export default TaskItem
