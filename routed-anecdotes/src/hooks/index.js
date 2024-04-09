import {useState} from 'react'

export const useAnecdote = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: 1
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: 2
        }
      ])

      const addAnecdote = (anecdote) => {
        setAnecdotes(anecdotes.concat(anecdote))
      }

      return {anecdotes, addAnecdote}

}

export const useNotification = () => {
    const [notification, setNotification] = useState('')

    return {notification, setNotification}
}

export const useField = (type, name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    const fieldProps ={type, name, value, onChange}

    return {
        fieldProps,
        reset
    }
}