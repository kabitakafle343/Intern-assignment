import React, { useState } from 'react'

import Items from './Pages/Items'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Specificpage from './Pages/Specificpage';


const App = () => {
  const [data,setdata]=useState([]);
  const[query,setquery]=useState('')
  return (
   
<>


<BrowserRouter>
  <Routes>
  <Route path='/' element={<Items data={data} setdata={setdata}  query={query} setquery={setquery} />}>     </Route>
    <Route path='/specificpage/:id' element={<Specificpage/>}>
      
    </Route>
  </Routes>
</BrowserRouter>


</>
  )
}

export default App
