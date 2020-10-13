import React from 'react';
import './Graph.css';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries} from 'react-vis';

const Graph = (props) => {
    
    //Map data array
    const dataArr = props.data.map((d)=> {
        return {x: d.ReportDate, 
        y: parseFloat(d.Confirmed/1000)}
    });

    //Return XYPlot, pass data array to XYPlot
    return (
        <div className="Graph">
            <XYPlot
                xType="ordinal"
                width={1000}
                height={500}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis title="Confirmed (thousands)" />
                    <VerticalBarSeries
                        data={dataArr}
                        barWidth={0.5}/>
            </XYPlot>
        </div>
    );
}

export default Graph;