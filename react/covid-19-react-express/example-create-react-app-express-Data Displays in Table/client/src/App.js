import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import Graph from './Graph';
import CallApi from './CallApi';
import Modal1 from './Modal1';
import Modal2 from './Modal2';

//Creates object from CallApi class  
const callApi = new CallApi();

class App extends Component {
  constructor(){
    super();

    //Sets initial state to empty array
    this.state = {
      post: '',
      responseToPost: '',
      data: [],
      show1: false,
      show2: false
    }

    //Object of class CallApi receives data object and sets the state equal to that object
    callApi.on('response', (data) => {
      console.log('data: ', JSON.stringify(data));
      this.setState({ data: data });
    });
  };

  
  showModal1 = () => {
    this.setState({ show1: true });
  };

  hideModal1 = () => {
    this.setState({ show1: false });
  };

  showModal2 = () => {
    this.setState({ show2: true });
  };

  hideModal2 = () => {
    this.setState({ show2: false });
  };

  //When user clicks button, request event is sent to CallApi
  updateTable = () => {
    callApi.emit('request');
  }

  //POST request places user input in SQL SELECT statement on backend
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
      
    });
    const body = await response.json();

    console.log(body);

    this.setState({ data: body });
  };

render() {
    return (
      <div className="App">
        <h1>Covid-19 Stats</h1>
        <Modal1 show={this.state.show1} handleClose={this.hideModal1}>
          <p>Creating a substantiative project is the best way to demonstrate one’s skills.  This project shows my journey thus far towards becoming a full stack developer. The journey started with a JAVA coding bootcamp that ended in the height of the lockdown. Subsequently, I have continued to expand my skills as shown in this project. </p>
          <ul>
          <li>Node/Express backend</li>
          <li>React frontend</li>
          <li>React-Table</li>
          <li>React-Vis</li>
          <li>SQL database</li>
          <li>Python for data loading / slicing</li>
          <li>GitHub for source control</li>
          <li>Jira for Agile management</li>
          <li>A bit of Linux command line</li>
          <li>A bit of Azure</li>
          </ul>
        </Modal1>
        <button type="button" onClick={this.showModal1}>
          My journey toward full-stack development
        </button>
        <Modal2 show={this.state.show2} handleClose={this.hideModal2}>
         <p>CURRENT STATE = MVS proving technical architecture. See backlog in Jira for stories left to be completed. While bits of COVID-19 data are everywhere, it is hard for the data scientist to combine that data into larger datasets for analysis. The project’s goal is the aggregation of all state / county COVID 19 data since record keeping started in January 2020 so the data scientist can select large and small sets for use in analytics tools. React-Table was selected because it provides a on-screen view and the ability to simultaneously scrape the data into an Excel spreadsheet. React-Vis is used to help the data scientist quickly understand the data selected.</p>
        </Modal2>
        <button type="button" onClick={this.showModal2}>
          Project Delivers
        </button>
        <p>This app provides Covid-19 data for all fifty U.S. states in a table (top of the page) and a bar graph (bottom of the page). Simply type the name of the state you wish to view in the form below and click submit.</p>
        <p>All data comes from <a href="https://coronavirus.jhu.edu/map.html">Johns Hopkins Coronavirus Resource Center</a>.</p>
        {/* Pass method reference to give button functionality */}
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Enter U.S. state:</strong>
          </p>
          <input
            type="text"
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        {/* Pass data object as property of table component */}
        <Table data = {this.state.data}/>
        <p></p>
        <Graph data = {this.state.data} />
        {/* Pass method reference to give button functionality */}
        {/* <button type= "button" onClick={this.updateTable}>Load Data For All Fifty States</button> */}
      </div>
    );
  }
}

export default App;
