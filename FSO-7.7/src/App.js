import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = async (name) => {
  const [country, setCountry] = useState(null)

  // const countrySearch = async (name) => {
  //   const response = await axios.get("https://restcountries.eu/rest/v2/name/"+name+"?fullText=true")
  //   return response.data
  // }

  //???
  // const countrySearch = (name) => {
  //   const request = axios.get("https://restcountries.eu/rest/v2/name/"+name+"?fullText=true")
  //   return request
  //     .then(response => response.data)
  // }

  //???
  //useEffect(() => {setCountry(countrySearch(name))}, [name])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/name/"+name+"?fullText=true")
      .then(response=> setCountry(response.data))
  }, [name])

  console.log("country", country);
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')

  const fetch = async (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  const country = useCountry(name)

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
