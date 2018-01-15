import React, { Component } from 'react'
import './App.css'
import CategoryList from './components/CategoryList'
import GooglePicker from './react-google-picker';

const CLIENT_ID = '456250320376-osmso8gsqddofju85icnn0t0oj228tr6.apps.googleusercontent.com';
const DEVELOPER_KEY = 'AIzaSyCtATWodivWrzYdrYbunx2-qQSinDHRhik';
const SCOPE = ['https://www.googleapis.com/auth/drive.readonly'];
var numeFisier;
var doc;
/*global google*/
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 id='title'>Electronic Library</h1>
        </header>
        <CategoryList />
       <div className="container">
      <GooglePicker clientId={CLIENT_ID}
                    developerKey={DEVELOPER_KEY}
                    scope={SCOPE}
                    onChange={function(data){ doc=data[google.picker.Response.DOCUMENTS][0];
                                      numeFisier = doc[google.picker.Document.NAME];}}
                    multiselect={true}
                    navHidden={true}
                    authImmediate={false}
                    mimeTypes={['application/xml', 'application/pdf', 'text/html', '	application/vnd.ms-powerpoint', '	application/msword']}
                    viewId={'DOCS'}>
        <span id="driveOpener">Or click here to select from Google Drive</span>
        <div className="google"></div>
      </GooglePicker>
       
            <div id="detailsDriveFile">
            {numeFisier}
            </div>

    </div>
      </div>
    )
  }
}

export default App
