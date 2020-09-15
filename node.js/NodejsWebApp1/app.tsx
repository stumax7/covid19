import DataTable from "./NodejsWebApp1/DataTable";

declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
    this.fetchTable();
}

    fetchTable = () => {
        fetch('http://localhost:1337/')
            .then(response => response.json())
            .then(response => this.handleSuccessResponse(response))
            .catch(error => this.handleErrorResponse(error));
    };

    handleSuccessResponse = response => {
        this.setState({ data: [...response.content] });
    };

    handleErrorResponse = error => {
        console.log('Error while fetching data: ', error);
    }

    render() {
        return (
            <div>
                <DataTable data={this.state.data} />
            </div>
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));