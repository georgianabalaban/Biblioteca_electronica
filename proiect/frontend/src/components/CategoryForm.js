import React,{Component} from 'react'

class CategoryForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      categoryName : ''
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  render(){
    return (<div>
      Name : <input type="text" name="categoryName" onChange={this.handleChange}/>
      <input type="button" value="add" onClick={() => this.props.handleAdd({name : this.state.categoryName})} />
    </div>)
  }
}

export default CategoryForm