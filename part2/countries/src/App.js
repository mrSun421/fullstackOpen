import axios from "axios";
import { useEffect, useState } from "react";
import { Countries } from "./components/Countries";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <form>
      <div>find countries:<input value={filter} onChange={handleFilterChange} /></div>
    </form>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled');
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
  }

  return (
    <div>
      <h1>Countries Search</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countriesToShow} setCountriesToShow={setCountriesToShow} />
    </div>
  )
}

export default App;
