import React, { Component } from 'react'

class AddContact extends Component {

    state = {
        name: "",
        email: ""
    }

     add = (e) =>{
         e.preventDefault();
        if(this.state.name === "" || this.state.email === ""){
            alert("All the fields are mandatory!")
            return
        }
        this.props.addContactHandler(this.state);
        this.setState({name: "", email: ""});
        this.props.history.push("/");
    }
    render() {
        return (
            <div className="container">
                <br></br>
                <h1>Add Contact</h1>
                <form onSubmit={this.add}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Name" 
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" placeholder="Email" 
                        value={this.state.email}
                        onChange={(e) => this.setState({email: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        )
    }
}

export default AddContact
