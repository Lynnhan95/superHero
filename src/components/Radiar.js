import React, {Component} from 'react' 
import { connect } from "react-redux";
import './style.css'
import { Popup } from 'semantic-ui-react'


class RadarChart extends Component {
    constructor(props) {
    super(props);
    }

    //Add class when hover to hightlight DOM element
    handleHover = (data, e) => {
        e.target.classList.add('hovered')
    }

    handleOut = (data, e) => {
        e.target.classList.remove('hovered')
    }

    render () {
        
        // Receive data from GenerateList and process data for vis
        let data = this.props.radiar.heros.map((d) => {
            return d.powerstats
        })

        // Config bar chart SVG settings
        const chartSize = 560;
        const numberOfScales = 4;
        const padding = 10
        const colorPlate = ["#edc951", "#BD3745", "#1E9BA3", "#853660", "#6EAB20", "#EC5512"]
        const scale = value => {

        // Apply different width to circle axis 
        let lineWidth = null
        switch(value) {
            case 4:
                lineWidth = 1
                break;
            default:
                lineWidth = 0.2 
        }

        // Return multiple circle as radiar axis 
        return (
        <circle
            key={`scale-${value}`}
            cx={0}
            cy={0}
            r={((value / numberOfScales) * (chartSize-padding)) / 2}
            stroke="#eee"
            fill="transparent"
            strokeWidth={lineWidth}
        />
        )

        };

        // Calculate position with angle and axis
        const polarToX = (angle, distance) => Math.cos(angle - Math.PI / 2) * distance;
        const polarToY = (angle, distance) => Math.sin(angle - Math.PI / 2) * distance;

        // Return path function for hexagon
        const pathDefinition = points => {
        let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
        for (let i = 1; i < points.length; i++) {
            d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
        }
        return d + 'z';
        };

        //Draw shape and map pop up 
        const shape = columns => (chartData, i) => {
        const data = chartData;

        return (
            <Popup
                key = {`popover-${i}`}
                style = { {opacity : 0.75} }
                position = 'top left'
                trigger = {
                <path
            key={`shape-${i}`}
            d={pathDefinition(
                columns.map(col => {
                const value = data[col.key]/ 100;
                return [
                    polarToX(col.angle, (value * (chartSize-padding)) / 2),
                    polarToY(col.angle, (value * (chartSize-padding)) / 2)
                ];
                })
            )}
            stroke={ i < 6 ? colorPlate[i] : '#edc951' }
            strokeWidth = "3.2"
            fill= { i < 6 ? colorPlate[i] : '#edc951' }
            fillOpacity=".3"
            onMouseOver = {this.handleHover.bind(this, data)}
            onMouseOut = {this.handleOut.bind(this, data)}
            data = {data}
            />
            } 
            >
            <Popup.Header>Power Stats</Popup.Header>
            <Popup.Content>
                <p>Intelligence: {data.intelligence}, Strength: {data.strength}, Speed: {data.speed}, Durability: {data.durability}, Power: {data.power}, Combat: {data.combat}</p>
            </Popup.Content>
        </Popup>

        );
        };

        // Draw axis
        const points = points => {
        return points
            .map(point => point[0].toFixed(4) + ',' + point[1].toFixed(4))
            .join(' ');
        };
        const axis = () => (col, i) => (
        <polyline
            key={`poly-axis-${i}`}
            points={points([
            [0, 0],
            [polarToX(col.angle, (chartSize-padding) / 2), polarToY(col.angle, (chartSize-padding) / 2)]
            ])}
            stroke="#555"
            strokeWidth="0.5"
        />
        );

    const groups = [];
    const scales = [];
    for (let i = numberOfScales; i > 0; i--) {
        scales.push(scale(i));
    }

    const middleOfChart = (chartSize / 2).toFixed(4);

    let captions = null
    if (data.length !== 0) {
    captions = Object.keys(data[0]);
    }

    let columns = null 
    if (captions) {
    columns = captions.map((key, i, all) => {
        return {
            key,
            angle: (Math.PI * 2 * i) / all.length
        };
        });
    }

    //Draw text caption
    const caption = () => col => (
        <text
            key={`caption-of-${col.key}`}
            x={polarToX(col.angle, (chartSize / 2) * 0.95 - padding*1.35).toFixed(4)}
            y={polarToY(col.angle, (chartSize / 2) * 0.95).toFixed(4)}
            dy={10 / 2}
            fill="#fff"
            fontWeight="400"
            textshadow="1px 1px 0 #fff"
        >
            {col.key}
        </text>
        );
    // Conditional render hexagon according to props ( state) data 
    if (columns) {
        groups.push(<g key={`scales`}>{scales}</g>);
        groups.push(<g key={`group-axes`}>{columns.map(axis())}</g>);
        groups.push(<g key={`groups}`}>{data.map(shape(columns))}</g>);
        groups.push(<g key={`group-captions`}>{columns.map(caption())}</g>);
    }else {
        groups.push(<g key={`scales`}>{scales}</g>);
    }

    // Draw SVG element
    return (
        <div className = "visWrapper">
        <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            width={chartSize}
            height={chartSize}
            viewBox={`0 0 ${chartSize} ${chartSize}`}
        >
            <g transform={`translate(${middleOfChart},${middleOfChart})`}>{groups}</g>
        </svg>
        </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        radiar: state.heros
    }
}

export default connect(mapStateToProps)(RadarChart);