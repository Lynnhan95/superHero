import React, {Component} from 'react'
import { Card, Image } from 'semantic-ui-react'
import { connect } from "react-redux";

function mapStateToProps(state) {
    return {
        select: state.heros
    }
}

class GenerateList extends Component {

    render () {
        {console.log(this.props.select)}
        let selectList = null
        if(this.props.select.length !== 0) {
            const data = this.props.select.heros
            selectList =  data.map((d, i) => {
                return (
                    <p key={`seleted-${i}`}>{ d.name }</p>
                )
            })
        }
        return (
            <div>
                <p>{selectList}</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(GenerateList)