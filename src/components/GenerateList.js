import React, {Component} from 'react'
import { connect } from "react-redux";
import { Grid, Card, Image} from 'semantic-ui-react'
import BarChart from './Bar'

function mapStateToProps(state) {
    return {
        select: state.heros
    }
}

class GenerateList extends Component {

    render () {
        let selectList = null
        if(this.props.select.length !== 0) {
            const data = this.props.select.heros
            selectList =  data.map((d, i) => {
                return (
                <Grid columns={3} divided verticalAlign='middle'>
                    <Grid.Column>
                        <Image src= {d.image.url} size="small" avatar/>
                        <p className = "listName" key={`seleted-${i}`}>{ d.name }</p>
                    </Grid.Column>
                    <Grid.Column>
                        <BarChart data= {d}/>
                    </Grid.Column>
                </Grid>
                )
            })
        }
        return (
            <div className="generateList">
                <h2 className="generateListTitle">Generated List</h2>
                {selectList}
            </div>
        )
    }
}

export default connect(mapStateToProps)(GenerateList)