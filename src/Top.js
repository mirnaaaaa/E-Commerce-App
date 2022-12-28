import React from 'react'
import { Link } from "react-router-dom"
import { FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa'
import { AiOutlineUserAdd } from "react-icons/ai";
import {auth, db} from "./firebaseConfig"
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
export default function Top(props) {
const [name, setName] = React.useState("")
  const [ user ] = useAuthState(auth);
let navigate = useNavigate();
const handleLogout = () => {
  signOut(auth).then(() => {
    navigate("/Login")
    localStorage.clear();
    props.setIsAuth(false)
    props.setSearch(true)
  })
}
React.useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if(user.displayName === null) {
  const email = user.email.substring(0, user.email.indexOf("@"))
const makeTheName = email.charAt(0).toUpperCase()  + email.slice(1)
setName(makeTheName)
      }
      props.setIsAuth(true)
    } else {
      props.setIsAuth(false)
    }
  });
}, [])

//React.useEffect(() => {
  // const getInfo = async () => {
    //const  data = await getDocs(database)
   //setUsersName(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
   //}
   //getInfo()
//}, [])
//React.useEffect(() => {
  //auth.onAuthStateChanged((user) => {
    //if (user) {
      //setUserName(user.displayName)
    //}else {
    //  setUserName("")
   // }
  //})
//},)

const hideSearch = () => {
  props.setSearch(true)
}
  return (
    <div>
    <div className="nav">
      <div className="search" >
      <Link 
       to="/"
      className="titleNav"> Mirna's Shop </Link>
<div className="toCategory">
<Link to="/Category"
className='toCart' >
  <FaSearch
   className="fa-search"/>
    Category</Link>
    </div>
    <div className="cart">
<div className="heart">
{props.favIcon.length !== 0 ?
<div className='controlFav'>
<p 
className="favNumbers">
  {props.favIcon.length}
  </p>
  <Link to="/Fav"><FaHeart 
style={{color: 'red', fontSize: '30px'}}/> </Link>
</div>
: 
<Link to="/Fav"><FaRegHeart
 style={{color: 'red', fontSize: '30px'}}/></Link>
}
</div>      
      
  
      <div className='cartNumber'>
      <Link className='my' to="/Cart">
      {props.cart.length !== 0 && 
       <h1 
       className="number"
         >{props.sum}</h1>}
         <h1 className= "img">🛒</h1></Link>
         </div>
        {!props.isAuth && <Link
        onClick={hideSearch} 
        className='nextToCART'
        to="/Login" >LOGIN</Link>}
        {props.isAuth && 
        <div className="user-logOut">
          <h1  className='user'><AiOutlineUserAdd  className='hiUser'/> Hi,  {user.displayName ? user.displayName: name}</h1>
       <div className='btn-out'>
       <button 
       className='btn-logOut'
       onClick={handleLogout}>Log Out</button>
       </div>
       </div>}
      
         </div>
      </div>
      </div>
      <div className="in" >
      {!props.search && props.products.length === 0 && <input  className="input"
      placeholder='Search By Name Or Brand....'
       type="text"
       name={props.theName}
       value={props.theName}
       onChange={(e) => props.setTheName(e.target.value)}
       />}
       
       </div>
    </div>
  )
}
