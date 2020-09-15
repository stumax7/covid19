import React, { Component } from 'react';
import './App.css';
import Table from './Table';

class App extends Component {
  constructor(props){
    super(props);
 
  this.state = {
    response: '',
    post: '',
    responseToPost: '',
    data: []
  } 
};
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const apiHelloBody = await response.json();
    if (response.status !== 200) throw Error(apiHelloBody.message);
     console.log("Response received" + JSON.stringify(apiHelloBody));
      // this.setState({responseToPost: JSON.stringify(apiHelloBody)});
      this.setState({data: apiHelloBody})
     return apiHelloBody;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
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
        <Table x={this.state.data}/>
      </div>
    );
  }
}

export default App;
