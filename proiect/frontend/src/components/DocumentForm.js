import React,{Component} from 'react'

class DocumentForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      documentName : '',
      documentDescription : ''
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  render(){
    return (<div>
      Name : <input type="text" name="documentName" onChange={this.handleChange}/>
      Description : <input type="text" name="documentDescription" onChange={this.handleChange} />
      <input type="button" value="add" onClick={() => this.props.onAdd({name : this.state.documentName, description : this.state.documentDescription})} />
    </div>)
  }
}

export default DocumentForm


