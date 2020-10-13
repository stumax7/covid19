import EventEmitter from 'events';

class CallApi extends EventEmitter {
    constructor() {
        super();
        //Receives request from App, calls API, and emits response, the data object, back to App
        this.on('request', async () => {
            const data = await this.callApi();
            this.emit('response', data);
        });
    }

    //Asynchronous call to API awaits fetch, returns data object
    callApi = async () => {
        console.log('0: callApi fires')
        const response = await fetch('/api/hello');
        const data = await response.json();
        if (response.status !== 200) throw Error(data.message);
        console.log("1: Response received" + JSON.stringify(data));
        return data;
    };
}

export default CallApi;