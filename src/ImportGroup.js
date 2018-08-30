import React, { Component } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    FormGroup,
    Label,
  } from 'reactstrap';
import axios from 'axios';

export default class ImportGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            content:[null],
            inputURL:"",
            contractName:"",
        }
    }

    handleChange=(event)=>{
        this.setState({inputURL: event.target.value});
    };

    handleTextChange=(props, value)=>{
        console.log("handleTextChange has been excuted"+value)
        this.setState({content: value});
        props.onChange(props.leftSide, value);
    }
    
    changeURL=(oldURL)=>{
        if(oldURL){
            let arr = oldURL.split('/');
            let head = arr[0];//usually this is 'https:'
            let host = "//raw.githubusercontent.com/"
            let rest = arr.slice(3)
            let newURL = head + host + rest.reduce((a,b)=>`${a}/${b}`)
            let arr2 = newURL.split('/blob');
            //get contract name and update state
            this.setState({contractName: arr[arr.length-1]})
            return arr2[0] + arr2[1];
        }else{
            return null
        }
    }

    handleClickImport= async (props,url)=>{
        let newURL = this.changeURL(url);
        await axios.get(newURL)
        .then(res =>{ 
            console.log(this.state.inputURL)
            this.setState({content:res.data.trim().split('\n').reduce((a,b)=>`${a}\n${b}`)});
        })
        .catch(e => console.log(e));
        console.log(this.state.content)
        this.handleTextChange(props, this.state.content);
    }

    render(){
        return(
            <div>
                <InputGroup>
                    <InputGroupAddon>{this.props.from}</InputGroupAddon >
                    <Input placeholder="@Github" onChange={this.handleChange}/>
                    <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={
                        ()=>this.handleClickImport(this.props, this.state.inputURL)
                    }>Import</Button>
                    </InputGroupAddon>
                </InputGroup><br></br>

                <FormGroup>
                    <Label>{this.state.contractName}</Label>
                    <Input type="textarea" rows='15' name="text"
                        value={this.state.content}
                        onChange={(e)=>this.handleTextChange(this.props, e.target.value)}
                    >
                    </Input>
                </FormGroup>
            </div>
        )
    }   
}