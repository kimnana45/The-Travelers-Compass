import React from "react";

const Jumbotron = (props) => {
    return (
        <div 
            className="jumbotron jumbotron-fluid" 
            {...props}
        >
            <div className="container">{props.children}</div>
        </div>
    )
}


export default Jumbotron;