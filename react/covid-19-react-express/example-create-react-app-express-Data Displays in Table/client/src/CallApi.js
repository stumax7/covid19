const EventEmitter = require('events');

class CallApi extends EventEmitter {
    constructor() {
        super();
        this.on('request', async () => {
            const data = await this.callApi();
            this.emit('response', data);
        });
    }

    callApi = async () => {
        console.log('0: callApi fires')
        const response = await fetch('/api/hello');
        const apiHelloBody = await response.json();
        if (response.status !== 200) throw Error(apiHelloBody.message);
        console.log("1: Response received" + JSON.stringify(apiHelloBody));
        // this.setState({responseToPost: JSON.stringify(apiHelloBody)});
        // this.setState({data: apiHelloBody})
        return apiHelloBody;
    };
}

export default CallApi;