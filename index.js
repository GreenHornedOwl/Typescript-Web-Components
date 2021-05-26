import "./components/input";
import "./components/select";

document.querySelector("form").addEventListener("submit",e=>{
  e.preventDefault();
  console.log(Object.fromEntries(new FormData(e.currentTarget)));
})