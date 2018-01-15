import React,{Component} from 'react'

class Category extends Component{
  constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      category : this.props.category,
      categoryName : this.props.category.name
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      category : nextProps,
      categoryName : this.props.category.name,
      isEditing : false
    })
  }
  render(){
    if(this.state.isEditing){
      return (<div>
        <input type="text"  name="categoryName" value={this.state.categoryName} onChange={this.handleChange}/> 
        <input type="button" value="save" onClick={() => this.props.onSave(this.props.category.id, {name : this.state.categoryName})}/>
        <input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
      </div>)            
    }
    else{
      return (<div>
        <div class="Product">
          <p>
            {this.state.categoryName}
          </p>
          <div class="buttons">
            <input type="button" value="delete" onClick={() => this.props.onDelete(this.state.category.id)}/>
            <input type="button" value="edit" onClick={() => this.setState({isEditing : true})} />
            <input type="button" value="details" onClick={() => this.props.onSelect(this.props.category.id)}/> 
          </div>
        </div>
      </div>)
    }
  }
}

export default Category