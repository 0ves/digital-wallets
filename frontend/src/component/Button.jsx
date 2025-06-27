import react from "react"

 function Button(props){
    return(
        <button className="bg-red-400">{props.name}</button>
    )
}
export default Button;