import React,{Component} from 'react'

class Document extends Component{
  render(){
    return (
      <div>
        <h4>{this.props.document.name}</h4>
        {this.props.document.description}
      </div>
    )
  }
}

export default Document