import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name){
      axios.get("https://restcountries.eu/rest/v2/name/"+name+"?fullText=true")
        .then(response => {
          setCountry({
            data: response.data[0],
            found: true
          })
          console.log("response in hook", response);
        })
        .catch(error => setCountry({found: false}))
      }
    }, [name])

  return country
}

export default useCountry
