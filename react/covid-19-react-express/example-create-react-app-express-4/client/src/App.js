import React from 'react';
import './App.css';

async function App() {
  

  const data = [];

  let dbget = {};



  let dbresult = await fetch('http://localhost:1337/api/hello', { method: 'GET', mode: 'no-cors' });

  if (dbresult.ok) {

      dbget = await dbresult.text();

      console.log('A0: ' + JSON.stringify(dbget));

  } else {

      console.log('A0: ' + dbresult.status);

  }

 

  console.log('A1: ' + dbget);

  console.log('A2: ' + JSON.stringify(dbget));

}
export default App;
