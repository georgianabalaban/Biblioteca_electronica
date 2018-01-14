import axios from 'axios'
const SERVER = 'https://biblioteca-electronica-georbalaban.c9users.io'

class CategoriesStore{
  constructor(ee){
    this.ee = ee
    this.content = []
    this.selected = null
  }
  getAll(){
    axios(SERVER + '/categories')
      .then((response) => {
        this.content = response.data
        this.ee.emit('CATEGORY_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(category){
    axios.post(SERVER + '/categories', category)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  deleteOne(id){
    axios.delete(SERVER + '/categories/' + id)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  saveOne(id, category){
    axios.put(SERVER + '/categories/' + id, category)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  getOne(id){
    axios(SERVER + '/categories/' + id)
      .then((response) => {
        this.selected = response.data
        this.ee.emit('SINGLE_CATEGORY_LOAD')
      })
      .catch((error) => console.warn(error))
  }
}

export default CategoriesStore
