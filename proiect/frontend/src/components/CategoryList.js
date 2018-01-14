import React, {Component} from 'react'
import {EventEmitter} from 'fbemitter'
import Category from './Category'
import CategoryForm from './CategoryForm'
import CategoryDetails from './CategoryDetails'
import CategoriesStore from '../stores/CategoriesStore'

const ee = new EventEmitter()
const store = new CategoriesStore(ee)

function addCategory(category){
  store.addOne(category)
}

function deleteCategory(id){
  store.deleteOne(id)
}

function saveCategory(id, category){
  store.saveOne(id, category)
}

class CategoryList extends Component{
  constructor(props){
    super(props)
    this.state = {
      categories : [],
      detailsFor : -1,
      selected : null
    }
    this.cancelSelection = () => {
      this.setState({
        detailsFor : -1
      })
    }
    this.selectCategory = (id) => {
      store.getOne(id)
      ee.addListener('SINGLE_CATEGORY_LOAD', () => {
        this.setState({
          detailsFor : store.selected.id,
          selected : store.selected
        })
      })
    }
  }
  componentDidMount(){
    store.getAll()
    ee.addListener('CATEGORY_LOAD', () => {
      this.setState({
        categories : store.content
      })
    })
  }
  render(){
    if (this.state.detailsFor === -1){
      return (<div>
        {
          this.state.categories.map((e) => <Category category={e} onDelete={deleteCategory} key={e.id} onSave={saveCategory} onSelect={this.selectCategory} />)
        }
        <CategoryForm handleAdd={addCategory}/>
      </div>)      
    }
    else{
      return (
        <div>
          <CategoryDetails category={this.state.selected} />
          <input type="button" value="back" onClick={() => this.cancelSelection()}/>
        </div>  
      )
    }
  }
}

export default CategoryList



