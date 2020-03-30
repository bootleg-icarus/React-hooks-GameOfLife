import React from 'react'

const Button = (props) => {
    return (
        <button onClick={props.func} style={{
            margin: "0 0 10px 10px",
            height: "3em",
            width: "6em",
            border: 'none',
            backgroundColor: '#39ace7',
            color: 'white',
            fontSize: '1.2rem'
        }}>
            {props.text}
        </button>
    )
}
export default Button;