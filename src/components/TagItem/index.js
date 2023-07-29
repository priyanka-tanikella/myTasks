import './index.css'

const TagItem = props => {
  const {tagDetails, changeToSelectTag, isActive} = props
  const {displayText} = tagDetails

  const tagClassName = isActive ? 'active-tag ' : 'tag'

  const onClickTag = () => {
    changeToSelectTag(displayText)
  }

  return (
    <li className="tag-list-item">
      <button type="button" className={tagClassName} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}
export default TagItem
