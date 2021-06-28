import './App.css';
import React, {useState, useEffect} from 'react';
import { uuid } from "uuidv4"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import api from './api/contacts';
import Header from './Components/Header';
import AddContact from './Components/AddContact';
import ContactList from './Components/ContactList';
import ContactDetail from './Components/ContactDetail';
import EditContact from './Components/EditContact';

function App() {
  // const LOCAL_STORAGE_KEY = "contacts"
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //RetriveContacts
  const retriveContacts = async () =>{
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async(contact) =>{
    console.log(contact);
    const request = {
      id: uuid,
      ...contact
    }

    const response = await api.post("/contacts", request)
    console.log(response)
    setContacts([...contacts, response.data])

    // const response = api.post("/contacts", request)
    // setContacts([...contacts, response.data])
  }

  const updateContactHandler = async (contact) =>{
    const response = await api.put(`/contacts/${contact.id}`, contact)
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) =>{
      return contact.id === id ? {...response.data} : contact;
      })
    );
  };


  const removeContactHandler = async(id) =>{
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) =>{
      return contact.id !== id;
    })

    setContacts(newContactList)
  }

  const searchHandler = (searchTerm) =>{
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) =>{
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retriveContacts) setContacts(retriveContacts)

    const getAllContacts = async () =>{
      const allContacts = await retriveContacts();
      if(allContacts) setContacts(allContacts)
    };

    getAllContacts();
  }, [])

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className="container-fluid">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact 
          render={(props) =>(<ContactList {...props} 
            contacts={ searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} 
            term={searchTerm} searchKeyword={searchHandler}
          />)} />

          <Route path="/add" 
          render={(props) => (<AddContact {...props} addContactHandler={addContactHandler} />)}/>

          <Route path="/edit" 
          render={(props) => (<EditContact {...props} updateContactHandler={updateContactHandler} />)}/>
          
          <Route path="/contact/:id" component={ContactDetail} />
          {/* <AddContact addContactHandler={addContactHandler} />
          <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
