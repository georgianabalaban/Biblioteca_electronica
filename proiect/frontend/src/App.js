import React, { Component } from 'react'
import './App.css'
import CategoryList from './components/CategoryList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to EasyBib-Quote-App</h1>
        </header>
        <CategoryList />
      </div>
    )
  }
}

export default App
