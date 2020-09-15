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
    dbget: []
  } 
}
 
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.json()}))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    this.setState({response: await fetch('/api/hello')})
    console.log('0 response : ' + JSON.parse(response))
    const dbget = props.response.json();
    console.log('1 response : '+ JSON.stringify(dbget))
    return dbget;
    // dbset = () => {
    //   this.setState({dbdata: "blue"});
    // }

    //return dbget;
    // .then(json => json.dbget)
    //console.log('2 JSON :' + json)
    // .then(dbget => this.setState({ 'dbget': dbget }))
    //   const apiHelloBody = await response.json();
  //   if (response.status !== 200) throw Error(apiHelloBody.message);
  //    console.log("Response received" + JSON.stringify(apiHelloBody));
  //     this.setState({responseToPost: JSON.stringify(apiHelloBody)});
  //     // this.setState({data: apiHelloBody})
  //    return apiHelloBody;
 };
  
render() {
    return (
      <div className="App">
        <p>{JSON.stringify(this.state.dbget)}</p>
        {/* <button
          type="button"
          onClick={this.changeColor}
        >Change color</button> */}
        <Table dbget = {JSON.parse('{"Id":1,"ReportDate":"2020-07-01","FIPS":"45001","County":"Abbeville","ProvinceState":"South Carolina","CountryRegion":"US","LastUpdate":"2020-07-02 04:33:46","Lat":"34.22333378","Longi":"-82.46170658","Confirmed":113,"Deaths":0,"Recovered":0,"Active":113,"CombinedKey":"Abbeville, South Carolina, US","IncidenceRate":460.717,"CaseFatalityRatio":0}')} />
      </div>
    );
  }
}

export default App;
