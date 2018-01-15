import React,{Component} from 'react'

class Document extends Component{
   constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      document : this.props.document,
      documentName : this.props.document.name,
      documentDescription : this.props.document.description,
      documentAuthor : this.props.document.author,
      documentPrice : this.props.document.price
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      document : nextProps,
      documentName : this.props.document.name,
      documentDescription : this.props.document.description,
      documentAuthor : this.props.document.author,
      documentPrice : this.props.document.price,
      isEditing : false
    })
  }
  render(){
    if(this.state.isEditing){
      return (<div>
        <input type="text" name="documentName" value={this.state.documentName} onChange={this.handleChange}/> 
        <input type="text" name="documentDescription" value={this.state.documentDescription} onChange={this.handleChange}/>
        <input type="text" name="documentAuthor" value={this.state.documentAuthor} onChange={this.handleChange}/>
        <input type="text" name="documentPrice" value={this.state.documentPrice} onChange={this.handleChange}/>
        <input type="button" value="save" onClick={() => this.props.onSave(this.props.document.id, {name : this.state.documentName, description: this.state.documentDescription, author: this.state.documentAuthor, price: this.state.documentPrice})}/>
        <input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
      </div>)            
    }
    else{
      return (<div>
        <div class="bookToBeRead">
          <ul>
            <li>name: {this.state.documentName}</li>
            <li>description: {this.state.documentDescription}</li>
            <li>author: {this.state.documentAuthor}</li>
            <li>price: {this.state.documentPrice}</li>
          </ul>
        </div>
        <div class="buttons">
          <input type="button" value="delete" onClick={() => this.props.onDelete(this.state.document.id)}/>
          <input type="button" value="edit" onClick={() => this.setState({isEditing : true})} />
        </div>
      </div>)
    }
  }
}

export default Document