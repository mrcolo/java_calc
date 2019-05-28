import React, { Component } from 'react';
import './App.css';

import {Header, Grid, Button, Segment, Checkbox, Modal, Input} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const op_map = {"PLUS": "+", "SUBTRACT": "-", "MULTIPLY": "*", "DIVIDE": "/"}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: false,
      curr: "0",
      op: "",
      prev: "",
      line_points: [{y: 1},{y: 1},{y: 1},{y: 1},{y: 1},
                    {y: 1},{y: 1},{y: 1},{y: 1},{y: 1},
                    {y: 1},{y: 1},{y: 1},{y: 1},{y: 1},
                    {y: 1},{y: 1},{y: 1},{y: 1},{y: 1}],
      m_line: 1,
      b_line: 0
    }

  }

  handleToggle = () => {
    this.setState({
      mode: !this.state.mode
    })
  }
  handleSimpleOp = (o) => {
    const {curr, prev} = this.state
    prev === "" ?
    this.setState({
      prev: curr,
      curr: "",
      op: o
    }) :  this.setState({ op: o})

  }

  handleComplexCompute = async (o) => {
    const {curr} = this.state
    const rawResponse = await fetch("http://javacalc.hmri.pagekite.me/calc?exp=_" + o + '!' + curr)
    const json = await rawResponse.json()
    this.setState({
      curr: json.result
    })
  }

  handleSimpleCompute = async () =>{
    const {curr, prev, op} = this.state;
    const rawResponse = await fetch("http://javacalc.hmri.pagekite.me/calc?exp=" + prev + '!' + op + "$" + curr)
    const json = await rawResponse.json()
    this.setState({
      curr: json.result, 
      prev: "",
      op: ""
    })
  }

  handleMLine = e => { this.setState({m_line: e.target.value});}
  handleBLine = e => { this.setState({b_line: e.target.value});}

  handleLine = async () => {
    const {m_line, b_line} = this.state;
    const rawResponse = await fetch("http://javacalc.hmri.pagekite.me/linetool?m=" + m_line + '&b=' + b_line)
    const json = await rawResponse.json()
    let new_array = []
    
    for (let i in json.result){
      new_array.push({y: json.result[i]})
    }

    this.setState({
      line_points: new_array
    })
  }

  handleNumber = (n) => {
    const {curr} = this.state;
    if (curr !== "0"){
      this.setState({
        curr: curr + n 
      })
    }
    else {
      this.setState({
        curr: n
      })
    }
  }

  render() {
    const {curr, prev, op, mode, line_points} = this.state
    return (
      <div className="App">
        <Segment size="massive" >
          <Header>{prev !== "" ? prev + " " + op_map[op] + " " + curr : curr}</Header>
        </Segment>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <div style={{padding: 10}}>
                <Button size="massive" onClick={() => {this.handleNumber("1")}} fluid>1</Button>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={{padding: 10}}>
                <Button size="massive" onClick={() => {this.handleNumber("2")}} fluid>2</Button>
              </div>       
            </Grid.Column>
            <Grid.Column>
              <div style={{padding: 10}}>
                <Button size="massive" onClick={() => {this.handleNumber("3")}} fluid>3</Button>
              </div>   
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <div style={{padding: 10}}>
                <Button size="massive" onClick={() => {this.handleNumber("4")}} fluid>4</Button>
              </div>  
            </Grid.Column>
            <Grid.Column>
              <div style={{padding: 10}}>
                <Button size="massive" onClick={() => {this.handleNumber("5")}} fluid>5</Button>
              </div>             
            </Grid.Column>
            <Grid.Column>
              <div style={{padding: 10}}>
                <Button size="massive" onClick={() => {this.handleNumber("6")}} fluid>6</Button>
              </div>      
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <div style={{padding: 10}}>
                <Button size="massive" onClick={() => {this.handleNumber("7")}} fluid>7</Button>
              </div>  
            </Grid.Column>
            <Grid.Column>
              <div style={{padding: 10}}>
                <Button size="massive" onClick={() => {this.handleNumber("8")}} fluid>8</Button>
              </div>              
            </Grid.Column>
            <Grid.Column>
              <div style={{padding: 10}}>
                <Button size="massive" onClick={() => {this.handleNumber("9")}} fluid>9</Button>
              </div> 
            </Grid.Column>
            
          </Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <div style={{padding: 10}}>
                <Button size="massive" onClick={() => {this.handleNumber("0")}} fluid>0</Button>
              </div>
            </Grid.Column>
            <Grid.Column>
            <div style={{padding: 10}}>
                <Button onClick={()=> {this.setState({curr: "0", prev: ""})}} color="red" size="massive" fluid>CANC</Button>
              </div>
            </Grid.Column>
        </Grid>
        <Segment>
        <Checkbox toggle onClick={this.handleToggle} />
        { !mode && <Grid style={{paddingTop: 20}} columns={4}>
          <Grid.Row>
              <Grid.Column>
                <Button fluid color="red" onClick={() => {this.handleSimpleOp("PLUS")}} >+</Button>
              </Grid.Column>
              <Grid.Column>
                <Button fluid color="yellow" onClick={() => {this.handleSimpleOp("SUBTRACT")}}>-</Button>           
              </Grid.Column>
              <Grid.Column>
                <Button fluid onClick={() => {this.handleSimpleOp("MULTIPLY")}} color="blue">*</Button>   
              </Grid.Column>
              <Grid.Column>
                <Button fluid onClick={() => {this.handleSimpleOp("DIVIDE")}} color="green">/</Button>   
              </Grid.Column>
          </Grid.Row>
        </Grid>
        }
        {mode && prev !== "" && <Header> Darn! You can't access complex functions when working on an expression.</Header>}
        { (mode && prev === "") && <Grid style={{paddingTop: 20}} columns={4}>
          <Grid.Row>
              <Grid.Column>
                <Button fluid onClick={() => {this.handleComplexCompute("SIN")}} color="red">sin</Button>
              </Grid.Column>
              <Grid.Column>
                <Button fluid onClick={() => {this.handleComplexCompute("COS")}} color="yellow">cos</Button>            
              </Grid.Column>
              <Grid.Column>
                <Button fluid onClick={() => {this.handleComplexCompute("TAN")}} color="blue">tan</Button>   
              </Grid.Column>
              <Grid.Column>
                <Button fluid onClick={() => {this.handleComplexCompute("LOG")}} color="green">log</Button>   
              </Grid.Column>
          </Grid.Row>
          <Grid.Row>
              <Grid.Column>
                <Button fluid onClick={() => {this.handleComplexCompute("SQUARE")}} color="violet">x^2</Button>
              </Grid.Column>
              <Grid.Column>
                <Button fluid onClick={() => {this.handleComplexCompute("CUBE")}} color="brown">x^3</Button>            
              </Grid.Column>
              <Grid.Column>
                <Button fluid onClick={() => {this.handleComplexCompute("SQRT")}} color="pink">sqrt</Button>   
              </Grid.Column>
              <Grid.Column>
              <Modal trigger={<Button fluid color="grey">line tool</Button>} closeIcon>
                <Header icon='options' content='Line Utility' />
                <Modal.Content>
                <Grid style={{paddingTop: 20}} columns={3}>
                  <Grid.Row>
                    <Grid.Column>
                      <Input onChange={this.handleMLine} placeholder='Coefficient' />
                    </Grid.Column>
                    <Grid.Column>
                      <Input onChange={this.handleBLine}  placeholder='Bias' />     
                    </Grid.Column>
                    <Grid.Column>
                      <Button fluid onClick={this.handleLine} color="red">Compute Line</Button> 
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                  <LineChart
                    className="App"
                    style={{paddingTop: 20}}
                    width={600}
                    height={300}
                    data={line_points}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="y" stroke="#f4440e" activeDot={{ r: 8 }} />
                  </LineChart>
                </Modal.Content>
              </Modal>
              
              </Grid.Column>
              </Grid.Row>
          </Grid>
        }
        </Segment>
        
        <div style={{padding: 10}}>
          <Button size="massive" onClick={this.handleSimpleCompute} color="teal" fluid>=</Button>
        </div>
      </div>
    )
  }
}

