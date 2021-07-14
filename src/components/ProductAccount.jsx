import React, { Component } from 'react'
 import axios from "axios";

export default class ProductAccount extends Component {
    state = {
        Name:"",
        pid:"",
        rate:"",
        brnd:"",
        date:"",
        pwd:""
    }
     handleChange =(event)=>{
         this.setState({
             [event.target.name ]: event.target.value
         })
     }

     handleSubmit =(event)=>{
        event.preventDefault();
        console.log(this.state);

        const url = "https://product-app-5c7c1-default-rtdb.firebaseio.com/accounts.json"
        const data = {...this.state}

        axios.post(url , data ).then((resp)=>{
            console.log(resp);
            if (resp.status === 200) {
                alert("Data Stored Successfully")
                this.setState({
                    Name:"",
                    pid:"",
                    rate:"",
                    brnd:"",
                    date:"",
                    pwd:""
                   
                })

                 this.props.history.push("/details")
            }
        }).catch((err)=>{
            console.log(err);
        })
    }


    render() {
        return (
            <div className="container card col-md-10">
                <h1>Add product details</h1>
            <form className="container card-body" onSubmit={this.handleSubmit}>
            <div className="form-group ">
                <label htmlFor="Name">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  aria-describedby="emailHelp"
                   name="Name"
                   value={this.state.Name}
                   onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
            <label htmlFor="pid">Product Id</label>
            <input
              type="number"
              className="form-control"
              id="pid"
              aria-describedby="emailHelp"
               name="pid"
               value={this.state.pid}
               onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rate">Product Price</label>
            <input
              type="number"
              className="form-control"
              id="rate"
              aria-describedby="emailHelp"
               name="rate"
               value={this.state.rate}
               onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="brnd">Brand</label>
            <input
              type="text"
              className="form-control"
              id="brnd"
              aria-describedby="emailHelp"
       name="brnd"
       value={this.state.brnd}
       onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Validate in year</label>
            <input
              type="number"
              className="form-control"
              id="date"
               name="date"
               value={this.state.date}
               onChange={this.handleChange}
            />
          </div>
         <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
               name="pwd"
               value={this.state.pwd}
               onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    
        );
    }
}

        
    

