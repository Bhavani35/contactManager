import React from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.jpg'

function ContactDetail(props) {
    const { name, email } = props.location.state.contact;
    return (
        <div className="container">
            <div className="container text-center p-5">
                <img src={user} className=" img-thumbnail rounded"  alt="user" width= "500px" height= "500px" />
                <h3><strong className="text-dark ">{name}</strong> <br></br></h3>
                <span> {email} </span>
            </div>
            <div className="container text-center">
                <Link to ="/">
                 <button type="submit" className="btn btn-primary">Back to Contact List</button>
                </Link>
            </div>
        </div>
    )
}

export default ContactDetail
