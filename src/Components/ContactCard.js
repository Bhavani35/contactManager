import React from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png'

function ContactCard(props) {
    const { id, name, email } = props.contact
    return (
        <div className="container">
            <div className="row border">
                <img src={user} style={{width: "60px", padding: "10px"}} alt="user" />
                
                <div className="col-8 pt-2">
                <Link to = {{pathname:`/contact/${id}`, state:{contact: props.contact}}} className="text-decoration-none">
                   
                    <strong className="text-dark">{name}</strong> <br></br>
                    <span>{email}</span>
                </Link>
                </div>
                
                <div className="col-2 pt-3">
                    <i className="far fa-trash-alt text-danger float-end" type="button" style={{ marginLeft: "20px", fontSize: "25px" }}
                    onClick={() => props.clickHandler(id)}></i>

                <Link to = {{pathname:`/edit`, state:{contact: props.contact}}} className="text-decoration-none">
                    <i className="fas fa-edit text-primary float-end" type="button" style={{ fontSize: "25px" }}
                    ></i>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default ContactCard
