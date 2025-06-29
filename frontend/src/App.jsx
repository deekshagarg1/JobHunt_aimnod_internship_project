
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import { Home } from './components/Home'
import Navbar from './components/Navbar'
import { About } from './components/About'
// import { Job } from './components/Job'
// import { Description } from './components/Description'
import { Login } from './components/Login'
import { Sign } from './components/Sign'
import { Admin } from './components/Admin'
// import { Profile } from './components/Profile'
import Home from './components/Home'
import Profile from './components/Profile'
import Job from './components/Job'
import LikedJobs from './components/LikedJobs'
import JobDescription from './components/JobDescription'
import Privacypolicy from './components/Privacypolicy'
import { TermsOfService } from './components/TermsOfService'
import Footer from './components/Footer'

function App() {


  return (
    <>
<BrowserRouter>
<Navbar/>
<Routes>
  <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
      <Route path='/job' element={<Job/>}/>
        <Route path='/admin' element={<Admin/>}/>
          <Route path='/job/:id' element={<JobDescription/>}/>
            <Route path="/liked-jobs" element={<LikedJobs />} />
        {/* <Route path="/job/:id" element={<JobDescription />} /> */}
            <Route path='/login' element={<Login/>}/>
              <Route path='/sign' element={<Sign/>}/>
                <Route path='/profile' element={<Profile/>}/>
                  {/* <Route path='/' element={</>}/> */}
<Route path='/PrivacyPolicy' element={<Privacypolicy/>}/>
<Route path='/TermsAndServices' element={<TermsOfService/>}/>


</Routes>
<Footer/>
</BrowserRouter>

    </>
  )
}

export default App
