import React from 'react'

const IPInfo = () => {
  const data = {
    ipAddress: '1.1.1.1',

    city: {
      name: 'Sheboygan',

      population: 123456,
    },

    country: {
      name: 'USA',

      population: 123456,
    },
  }

  return (
    <main className="App">
      <h1>Howdy!</h1>

      <p>Your IP Address is {data.ipAddress}</p>

      <p>
        {`Your city, ${data.city.name}, has a current population of

        ${data.city.population}`}
      </p>

      <p>
        {`Your Country, ${data.country.name}, has a current population of

        ${data.country.population}`}
      </p>

      <p>Cool, huh?</p>
    </main>
  )
}

export default IPInfo
