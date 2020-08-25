import React from "react";

const Jumbotron = (props) => {
    return (
        <div 
            className="jumbotron jumbotron-fluid" 
            style={{
                backgroundColor:"black", height:"400px", 
                color: "white"
            }}
            {...props}>
            <div className="container">{props.children}</div>
        </div>
    )
}


export default Jumbotron;