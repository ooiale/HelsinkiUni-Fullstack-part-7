import {useState, useEffect} from 'react'
import axios from 'axios'

export const useField = (type) => {
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

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      if (!name) {return undefined}
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
          setCountry({data: response.data, found: true})
        } catch (error) {
          console.log('error fetching data', error)
          setCountry({found: null})
        }
      }
      fetchData()
    },[name])
  
    return country
  }