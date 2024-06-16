import React ,{ createContext,useState,useContext } from 'react';

 const MyContext = createContext(null);
const getCart = () =>{
    const resp = localStorage.getItem("cart");
 if (resp) {
    return JSON.parse(resp)
 }
 else return []
}
 
const getWishList = () =>{
    const resp = localStorage.getItem("wishlist");
 if (resp) {
    return JSON.parse(resp)
 }
 else return []
 }
const MyContextProvider =({children})=>
{
    const [carts, setCarts] = useState(getCart()); 
    const [wishlist, setWishList] = useState(getWishList()); 
    const [search, setSearch] = useState(""); 
   const [showCard, setShowCard] = useState(""); 
   const [dbWishList, setDbWishList] = useState([]);
    const[user,setUser]=useState("")
    
   
return< MyContext.Provider value={{carts,setCarts,search,setSearch,showCard,setShowCard,user,setUser,wishlist, setWishList,dbWishList, setDbWishList}}>
{children}
</MyContext.Provider>
}
export default MyContextProvider

export const useCartContext=()=>useContext(MyContext);