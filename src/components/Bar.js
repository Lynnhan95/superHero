import React, {Component} from 'react' 
import {  scaleBand,
          scaleLinear,
          max } from 'd3'
import './style.css'
import { Popup } from 'semantic-ui-react'

class BarChart extends Component {
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
        const selected = this.props.data.powerstats
        const data = []
        const category = ['Intelligence', 'Strength', 'Speed', 'Durability', 'Power', 'Combat']
        for (let property in selected) {
            data.push( parseInt(selected[property], 10) )
        }

        // Config bar chart SVG settings
        const chartWidth = 300, chartHeight = 150;
        const padding = 10
        const colorPlate = ["#edc951", "#BD3745", "#1E9BA3", "#853660", "#6EAB20", "#EC5512"]
        const x_w = (chartWidth - 5* padding) /6
        var x = scaleBand().range([0, chartWidth])
        var y = scaleLinear().range([chartHeight - padding * 2, 0])

        // Scale the range of the data in the domains
        x.domain(category)
        y.domain([0, max(data)]);
        
        // Return rects with map function
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
                onMouseOver = {this.handleHover.bind(this, data)}
                onMouseOut = {this.handleOut.bind(this, data)}
            />
            }
            >
            <Popup.Content>
            { category[i] }: {d}
            </Popup.Content>
            </Popup>
            )
        })

        // Draw SVG
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