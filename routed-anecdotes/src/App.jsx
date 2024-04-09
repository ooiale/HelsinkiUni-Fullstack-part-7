import About from './components/About'
import SingleAnecdote from './components/SingleAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import { useAnecdote, useNotification } from './hooks'


const App = () => {

  const anecdotesHook = useAnecdote()
  const notificationHook = useNotification()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    anecdotesHook.addAnecdote(anecdote)
  }

 /*const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }*/

  

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <div>{notificationHook.notification}</div>
        <Routes>
          <Route path='/' element = {<AnecdoteList anecdotes={anecdotesHook.anecdotes}/>}/>
          <Route path='/about' element = {<About />} />
          <Route path='/create' element = {<CreateNew addNew={addNew} setNotification={notificationHook.setNotification}/>
            }/>
          <Route path='/:id' element = {<SingleAnecdote anecdotes={anecdotesHook.anecdotes}/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
