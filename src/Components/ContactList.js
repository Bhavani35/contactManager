import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import ContactCard from './ContactCard'

function ContactList(props) {
    // console.log(props)
    const inputEl = useRef("");
    const deleteContactHandler = (id) =>{
        props.getContactId(id)
    }
    
    const renderContactList = props.contacts.map((contact) => {
        return (
            <div >
                <ContactCard contact={contact} clickHandler = {deleteContactHandler} key={contact.id} />
            </div>
        )
    })

    const getSearchTerm = () =>{
        props.searchKeyword(inputEl.current.value)
    }

    return (
        <div className="container">
            <br></br>
            <h1>Contact List
                <Link to="/add">
                <button type="submit" className="btn btn-primary" style={{float: "right"}} >Add Contact</button> 
                </Link>
            </h1>
            
            <div className="input-group mb-3">
                <input ref={inputEl} type="search" className="form-control" placeholder="Search Contacts" value={props.term} onChange={getSearchTerm} />
                <span className="input-group-text"><i className="fas fa-search"></i></span>
            </div>

            <div>
                {renderContactList.length > 0 ? renderContactList : "No Contacts Available"}
            </div>

        </div>
    )
}

export default ContactList
