import React, { Component } from 'react';
import {
    Row,
    Col,
    Button,
    Card,
  } from 'reactstrap';
import ImportGroup from './ImportGroup';
const gitDiff = require('git-diff');

class Body extends Component {
    constructor(props){
        super(props);
        this.state = {
            ContentLeft:"",
            ContentRight:"",
            compareResult:[],
        }
    }

    handleChange = (leftSide, content) => {
        if(leftSide){
            this.setState({ContentLeft:content});
        }else{
            this.setState({ContentRight:content});
        }
        console.log("handlechange has been excuted")
    }

    handleClick = () => {
        let diffObj = gitDiff(this.state.ContentLeft, this.state.ContentRight);
        if (!diffObj){
            diffObj = "No difference found!";
            console.log('a');
        } 
        let arr = diffObj.split('\n');
        let resultArr = [];
        arr.forEach(element => {
            if(element.charAt(0)==='+'){
                resultArr.push({added:true, value:element});
            }else if(element.charAt(0)==='-'){
                resultArr.push({removed:true, value:element});
            }else{
                resultArr.push({value:element});
            }
        });
        let arr2 = Array.from(resultArr);
        console.log(arr2)
        this.setState({compareResult:arr2});
    }

    render(){        
        console.log(this.state.ContentLeft)
        console.log(this.state.ContentRight)
        return(
            <div>
                <br></br>
                <Row>
                    <Col xs="1"></Col>
                    <Col xs="5">
                        <ImportGroup from={"Original contract"} leftSide={true} onChange={this.handleChange}/>
                    </Col>
                    <Col xs="5">
                        <ImportGroup from={"Framework contract"} leftSide={false} onChange={this.handleChange}/>
                    </Col>
                    <Col></Col>
                </Row>
                <Button color="success" onClick={this.handleClick}>Show me the differences</Button>
                <Row>
                    <Col xs="3"></Col>
                    <Col xs="6"><br></br>
                    <Card><pre>
                        <RenderResult compareResult={this.state.compareResult} /> 
                        </pre></Card>
                    </Col>
                    <Col xs="3"></Col>
                </Row>
            </div>
        )
    }
}

function RenderResult (props){
    let result = props.compareResult;
    return (
        <table>
            <tbody align='left'>
                {result.map((elem)=>{
                    console.log(elem)
                    return (<tr bgcolor={elem.added?'#e6ffed':elem.removed?'#ffeef0':'white'}>{elem.value}</tr>)
                })}                
            </tbody>
        </table>
    )
}

export default Body;