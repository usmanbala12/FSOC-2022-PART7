import axios from 'axios'
import { useState, useEffect } from 'react'

let token = null

export const setToken = newToken => {
  token = `bearer ${newToken}`
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        const getAll = async () => {
            const response = await axios.get(baseUrl)
            setResources(response.data) 
        }
        getAll()
    }, [baseUrl])

    

    const create = async newObject => {
    
    const response = await axios.post(baseUrl, newObject)
        return response.data
    }

    const service = {
        create
    }

    return [resources, service]
}

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const fieldreset = () => {
        setValue('')
    }
  
    return {
      type,
      value,
      onChange,
      fieldreset
    }
}

