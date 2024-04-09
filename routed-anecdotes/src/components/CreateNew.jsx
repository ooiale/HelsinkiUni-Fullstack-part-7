import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({addNew, setNotification}) => {
    const {fieldProps: content, reset: resetContent} = useField('text', 'content')
    const {fieldProps: author, reset: resetAuthor} = useField('text', 'author')
    const {fieldProps: info, reset: resetInfo} = useField('text', 'info')
    
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      setNotification(`${content.value} was created`)
      setTimeout(() => setNotification(''), 5000)
      navigate('/')
    }

    const resetForm = () => {
        resetAuthor()
        resetInfo()
        resetContent()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content}/>
          </div>
          <div>
            author
            <input {...author}/>
          </div>
          <div>
            url for more info
            <input {...info}/>
          </div>
          <button type='submit'>create</button>
          <button type='button' onClick={resetForm}>reset</button>
        </form>
      </div>
    )
  }

export default CreateNew