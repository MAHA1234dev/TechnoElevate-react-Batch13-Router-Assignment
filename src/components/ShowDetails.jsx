 import React, { Component } from 'react';
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

 export default class ShowDetails extends Component {
    state = {
        accounts: [],
        show: false,
        Name:"",
        pid:"",
        rate:"",
        brnd:"",
        date:"",
        pwd:"",
      };
    
      componentDidMount() {
        axios
          .get("https://product-app-5c7c1-default-rtdb.firebaseio.com/accounts.json")
          .then((resp) => {
            const fetchedAccounts = [];
    
            for (const key in resp.data) {
              console.log(resp.data[key]);
              fetchedAccounts.push({
                id: key,
                ...resp.data[key],
              });
            }
    
            console.log(fetchedAccounts);
            this.setState((data) => {
              console.log(data);
              return {
                accounts: fetchedAccounts,
              };
            });
    
            console.log(this.state);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    
      removeAccount = (account) => {
        console.log(account);
        const url = `https://product-app-5c7c1-default-rtdb.firebaseio.com/accounts/${account.id}.json`;
        axios
          .delete(url)
          .then((resp) => {
            console.log(resp.status);
            const updatedAccounts = this.state.accounts.filter((acc) => {
              if (acc.id === account.id) {
                return false;
              } else {
                return true;
              }
            });

            this.setState({
                accounts: updatedAccounts,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        };
      
        handleClose = () => {
          this.setState({
            show: false,
          });
        };
      
        updateAccount = (account) => {
          console.log(account);
          this.setState({
            ...account,
            show: true,
          });
        };
      
        handleChange = (event) => {
          this.setState({
            [event.target.name]: event.target.value,
          });
        };
        update = () => {
            console.log(this.state);
            const url = `https://product-app-5c7c1-default-rtdb.firebaseio.com/accounts/${this.state.id}.json`;
            const { Name, PID, rate,brnd, date, pwd } = this.state;
            const acc = {  Name, PID, rate,brnd, date, pwd };
        
            axios
              .put(url, acc)
              .then((resp) => {
                console.log(resp);
                const updatedData = resp.data;
        
             const updatedRecords =  this.state.accounts.map((acc)=>{
                    if ( acc.id === this.state.id ) {
                        return {
                            id:this.state.id,
                            ...updatedData
                        }
                    }else{
                        return acc;
                    }
                })
                this.setState({
                    show:false,
                    accounts : updatedRecords
                })
              })
              .catch((err) => {
                console.log(err);
              });
          };
    
     render() {
         return (
             <div>
                 <h1>Product Details</h1>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">SI.NO</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Id</th>
              <th scope="col">Product Price</th>
              <th scope="col">Validation</th>
              <th scope="col">Brand</th>
              <th></th> 
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.accounts.map((account, index) => {
              return (
                <tr key={account.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{account.Name}</td>
                  <td>{account.pid}</td>
                  <td>{account.rate}</td>
                  <td>{account.date}</td>
                  <td>{account.brnd}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        this.updateAccount(account);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.removeAccount(account);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
  
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
  
            <Modal.Body>
              <form className="container card-body">
                <div className="form-group ">
                  <label htmlFor="user">Product Name</label>
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
              </form>
            </Modal.Body>
  
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  this.handleClose();
                }}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  this.update();
                }}
              >
                Save changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }


                



       

         
     
 
