import React,{Component} from 'react'

class DocumentForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      documentName : '',
      documentDescription : '',
      documentAuthor : '' ,
      documentPrice : ''
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
      Author: <input type="text" name="documentAuthor" onChange={this.handleChange}/>
      Price: <input type="text" name="documentPrice" onChange={this.handleChange}/>
      <input type="button" value="add" onClick={() => this.props.onAdd({name : this.state.documentName, description : this.state.documentDescription, author : this.state.documentAuthor, price : this.state.documentPrice})} />
    </div>)
  }
}

export default DocumentForm


