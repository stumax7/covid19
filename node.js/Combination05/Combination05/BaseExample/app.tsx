declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

class Dbget extends React.Component {
    state = {
        dbdata: []
    }

    componentDidMount() {
        fetch('/api/getdata')
            .then(res => res.json())
            .then(res => this.setState({ dbdata: res }));
    }

    render() {
        console.log('5 dbdata: ' + JSON.stringify(this.state.dbdata));
        return (<h2>data {JSON.stringify(this.state.dbdata)} </h2>);
    }

}


class Dbresult extends React.Component {
    render() {
        return (
            <div>
                <h1>What is my data?</h1>
                <Dbget />
            </div>
        );
    }
}

ReactDOM.render(<Dbresult />, document.getElementById('root'));