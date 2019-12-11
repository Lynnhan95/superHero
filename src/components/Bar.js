import React, {Component} from 'react' 
import { connect } from "react-redux";
import './style.css'
import {  scaleBand,
          scaleLinear,
          max } from 'd3'
import { Popup } from 'semantic-ui-react'

class BarChart extends Component {
    constructor(props) {
        super(props);
        }

    render () {
        const selected = this.props.data.powerstats
        const data = []
        const category = ['Intelligence', 'Strength', 'Speed', 'Durability', 'Power', 'Combat']
        for (let property in selected) {
            data.push( parseInt(selected[property], 10) )
        }
        
        const chartWidth = 300, chartHeight = 150;
        const padding = 10
        const colorPlate = ["#edc951", "#BD3745", "#1E9BA3", "#853660", "#6EAB20", "#EC5512"]
        const x_w = (chartWidth - 5* padding) /6
        var x = scaleBand().range([0, chartWidth])
        var y = scaleLinear().range([chartHeight - padding * 2, 0])

        // Scale the range of the data in the domains
        x.domain(category)
        y.domain([0, max(data)]);
        console.log(max(data))
        console.log(data)
        
        const rects = data.map((d, i) => {
            return (
            <Popup
            key = {`popover-${i}`}
            style = { {opacity : 0.75} }
            position = 'top left'
            trigger = {
            <rect 
                x = { x_w * i}
                y = { y(d) }
                width = { x.bandwidth() -20 }
                height = { chartHeight - y(d)}
                fill= { i < 6 ? colorPlate[i] : '#edc951' }
                fillOpacity=".3"
                strokeWidth = "1.6"
                stroke = { i < 6 ? colorPlate[i] : '#edc951' }
            />
            }
            >
            <Popup.Content>
            { category[i] }: {d}
            </Popup.Content>
            </Popup>
            )
        })

        return (
            <div>
            <svg 
                version="1"
                xmlns="http://www.w3.org/2000/svg"
                width={chartWidth}
                height={chartHeight}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            >
            <g>{rects}</g>   
            </svg>
            </div>
        )
    }
}



export default BarChart;