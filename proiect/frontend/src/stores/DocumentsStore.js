import axios from 'axios'
const SERVER = 'https://biblioteca-electronica-georbalaban.c9users.io'

class DocumentsStore{
  constructor(ee){
    this.ee = ee
    this.content = []
  }
  getAll(categoryId){
    axios(SERVER + '/categories/' + categoryId + '/documents')
      .then((response) => {
        this.content = response.data
        this.ee.emit('DOCUMENT_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(categoryId, document){
    axios.post(SERVER + '/categories/' + categoryId + '/documents', document)
      .then(() => this.getAll(categoryId))
      .catch((error) => console.warn(error))
  }
  deleteOne(categoryId, documentId){
    axios.delete(SERVER + '/categories/' + categoryId + '/documents/' + documentId)
      .then(() => this.getAll(categoryId))
      .catch((error) => console.warn(error))
  }
  saveOne(categoryId, documentId, document){
    axios.put(SERVER + '/categories/' + categoryId + '/messages/' + documentId, document)
      .then(() => this.getAll(categoryId))
      .catch((error) => console.warn(error))
  }
  getOne(categoryId,documentId){
    axios(SERVER + '/categories/' + categoryId + '/documents/' + documentId)
      .then((response) => {
        this.selected = response.data
        this.ee.emit('SINGLE_DOCUMENT_LOAD')
      })
      .catch((error) => console.warn(error))
  }
}

export default DocumentsStore
