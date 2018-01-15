import React, { Component } from 'react'
import './App.css'
import CategoryList from './components/CategoryList'
import GooglePicker from 'https://apis.google.com/js/api.js?onload=loadPicker';

const CLIENT_ID = '456250320376-osmso8gsqddofju85icnn0t0oj228tr6.apps.googleusercontent.com';
const DEVELOPER_KEY = 'AIzaSyCtATWodivWrzYdrYbunx2-qQSinDHRhik';
const SCOPE = ['https://www.googleapis.com/auth/drive.readonly'];

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
                    onChange={data => console.log('on change:', data)}
                    multiselect={true}
                    navHidden={true}
                    authImmediate={false}
                    mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
                    viewId={'DOCS'}>
        <span>Click me!</span>
        <div className="google"></div>
      </GooglePicker>
        <br/>
        <hr/>
        <br/>
        <GooglePicker clientId={CLIENT_ID}
                      developerKey={DEVELOPER_KEY}
                      scope={SCOPE}
                      onChange={data => console.log('on change:', data)}
                      multiselect={true}
                      navHidden={true}
                      authImmediate={false}
                      viewId={'FOLDERS'}
                      createPicker={ (google, oauthToken) => {
                          const googleViewId = google.picker.ViewId.FOLDERS;
                          const docsView = new google.picker.DocsView(googleViewId)
                              .setIncludeFolders(true)
                              .setMimeTypes('application/vnd.google-apps.folder')
                              .setSelectFolderEnabled(true);

                          const picker = new window.google.picker.PickerBuilder()
                              .addView(docsView)
                              .setOAuthToken(oauthToken)
                              .setDeveloperKey(DEVELOPER_KEY)
                              .setCallback(()=>{
                                console.log('Custom picker is ready!');
                              });

                          picker.build().setVisible(true);
                      }}
        >
            <span>Click to build a picker which shows folders and you can select folders</span>
            <div className="google"></div>
        </GooglePicker>

    </div>
      </div>
    )
  }
}

export default App
