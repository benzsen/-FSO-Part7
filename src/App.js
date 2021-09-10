//Complete Part 7.1-7.3

import React, { useState } from 'react'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom"
import { useField } from "./hooks/index.js"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}><Link to={"/anecdotes/"+anecdote.id}>{anecdote.cont}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const history = useHistory()

  const content = useField("content")
  const author = useField("author")
  const info = useField("info")

  const handleSubmit = (e) => {
    e.preventDefault()
    const contentValue = content.value
    const authorValue = author.value
    const infoValue = info.value

    props.addNew({
      contentValue,
      authorValue,
      infoValue,
      votes: 0
    })
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
          {...content}
          />
        </div>
        <div>
          author
          <input
          {...author}
          />
        </div>
        <div>
          url for more info
          <input
          {...info}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  )

}

const Anec = ({ anec }) => {
  return (
    <div>
      <h2>{anec.content}</h2>
      <div>{anec.author}</div>
    </div>
  )
}

const App = () => {
  const [notification, setNotification] = useState('')
  const [anecdotes, setAnecdotes] = useState([
    {
      cont: 'If it hurts, do it more often',
      aut: 'Jez Humble',
      inf: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      cont: 'Premature optimization is the root of all evil',
      aut: 'Donald Knuth',
      inf: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const addNew = (anecdote) => {
    console.log("anec", anecdote);
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log("anecs", anecdotes);
    setNotification(`Anecdote "${anecdote.contentValue}" saved`)

    setTimeout(() => {
      setNotification("")
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch("/anecdotes/:id")
  const anec = match
    ? anecdotes.find(anec => Number(anec.id) === Number(match.params.id))
    : null

  const Notification = () => {
    return <div>{notification}</div>
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification/>
      <Switch>
          <Route path="/anecdotes/:id">
            <Anec anec={anec} />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew}/>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>

      <Footer />
    </div>
  )
}

export default App;
