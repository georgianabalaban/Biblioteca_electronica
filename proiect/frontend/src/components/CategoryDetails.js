import React, {Component} from 'react'
import Document from './Document'
import DocumentForm from './DocumentForm'
import DocumentsStore from '../stores/DocumentsStore'
import {EventEmitter} from 'fbemitter'

const ee = new EventEmitter()
const store = new DocumentsStore(ee)


class CategoryDetails extends Component{
  constructor(props){
    super(props)
    this.state = {
      documents : [],
      detailsFor : -1
    }
    this.cancelSelection = () => {
      this.setState({
        detailsFor : -1
      })
    }
    this.addDocument = (document) => {
      store.addOne(this.props.category.id, document)
    }
    this.deleteDocument = (id) => {store.deleteOne(id)}
    this.saveDocument = (id, document) => {store.saveOne(id, document)}
  }
  componentDidMount(){
    store.getAll(this.props.category.id)
    ee.addListener('DOCUMENT_LOAD', () => {
      this.setState({
        documents : store.content
      })
    })
  }
  render(){
    if (this.state.detailsFor === -1){
    return (
      <div>
        <div class="titleDetails">
          Category {this.props.category.name}
          <h3>These are the documents from the category:</h3>
        </div>
        {
          this.state.documents.map((m) => <Document document={m} onDelete={this.deleteDocument} key={m.id} onSave={this.saveDocument} />)
        }
        <h3>Add me another one:</h3>
        <DocumentForm onAdd={this.addDocument}/>
      </div>  
    )
    }
  }
}

export default CategoryDetails





