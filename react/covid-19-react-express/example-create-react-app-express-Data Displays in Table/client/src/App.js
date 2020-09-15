import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import CallApi from './CallApi';

//const EventEmitter = require('events');
//const eventEmitter = new EventEmitter();
const callApi = new CallApi();

class App extends Component {
  constructor(props){
    super();
 
  this.state = {
    // response: '',
    // post: '',
    // responseToPost: 'Hallo',
    data: []
  }

  callApi.on('response', (data) => {
    console.log('data: ', JSON.stringify(data));
    this.setState({ data: data });
  });
};
  
  // componentDidMount() { 
  // //  console.log(this.state.data) 
  // //  if(JSON.stringify(this.state.data) === '[]'){
  //   this.callApi()
  //   // .then(res => this.setState({ response: res.express }))
  //   // .catch(err => console.log(err));
  //     .then(apiHelloBody => this.setState({data: apiHelloBody}))
  //     .catch(err => console.log(err));
  //   // }
  // }
  
  // [App : synchronous]                              ||          [CallApi : asynchronous]
  //                                                  ||  
  //  .on('response', (body) => setState(body))       ||          .on('request', async () => await callApi())
  //                                                  ||
  //  .emit('request')      ---------------------- request -----> will callApi() and get the table data 
  //                                                  ||  
  //  will setState(body)   <--------------------- response ----- .emit('response', body)  
  //                                                  ||

  updateTable = () => {
    callApi.emit('request');
  }
    // callApi()
  //   .then(apiHelloBody => this.setState({data: apiHelloBody}))
  //   .catch(err => console.log(err));
  // }

  
  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/world', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
    
  //   this.setState({ responseToPost: body });
  // };
  
render() {
    return (
      <div className="App">
        <p>Hello world</p>
        {/* <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form> */}
        <p>{this.state.responseToPost}</p>
        <Table data = {this.state.data}/>
        <button type= "button" onClick={this.updateTable}>Update Table</button>
      </div>
    );
  }
}

export default App;
