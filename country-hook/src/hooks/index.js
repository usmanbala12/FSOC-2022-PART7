import { useEffect, useState } from "react";
import axios from "axios";


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

export const useCountry = (countryName) => {

    const [country, setCountry] = useState(null)

    useEffect(() => {
       const findCountry = async () => {
        if(countryName){
            const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
            console.log(response.data)
            setCountry(response.data[0])
        }
       }
       findCountry()
    }, [countryName])

    return country
}

