

/*
 *  Shuffle.js for Search, Catagory filter and Sort
 */

// Initiate Shuffle.js
var Shuffle = window.shuffle;

var bookList = function(element) {
  this.element = element;

  this.shuffle = new Shuffle(element, {
    itemSelector: '.book-item',
  });

  this._activeFilters = [];
  this.addFilterButtons();
  this.addSorting();
  this.addSearchFilter();
  this.mode = 'exclusive';
};

bookList.prototype.toArray = function(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
};

// Catagory Filter Functions
// Toggle mode for the Catagory filters
bookList.prototype.toggleMode = function() {
  if (this.mode === 'additive') {
    this.mode = 'exclusive';
  } else {
    this.mode = 'additive';
  }
};

// Filter buttons eventlisteners
bookList.prototype.addFilterButtons = function() {
  var options = document.querySelector('.filter-options');
  if (!options) {
    return;
  }
  var filterButtons = this.toArray(options.children);

  filterButtons.forEach(function(button) {
    button.addEventListener('click', this._handleFilterClick.bind(this), false);
  }, this);
};

// Function for the Catagory Filter
bookList.prototype._handleFilterClick = function(evt) {
  var btn = evt.currentTarget;
  var isActive = btn.classList.contains('active');
  var btnGroup = btn.getAttribute('data-group');

  if (this.mode === 'additive') {
    if (isActive) {
      this._activeFilters.splice(this._activeFilters.indexOf(btnGroup));
    } else {
      this._activeFilters.push(btnGroup);
    }

    btn.classList.toggle('active');
    this.shuffle.filter(this._activeFilters);

  } else {
    this._removeActiveClassFromChildren(btn.parentNode);

    var filterGroup;
    if (isActive) {
      btn.classList.remove('active');
      filterGroup = Shuffle.ALL_ITEMS;
    } else {
      btn.classList.add('active');
      filterGroup = btnGroup;
    }

    this.shuffle.filter(filterGroup);
  }
};

// Remove classes for active states
bookList.prototype._removeActiveClassFromChildren = function(parent) {
  var children = parent.children;
  for (var i = children.length - 1; i >= 0; i--) {
    children[i].classList.remove('active');
  }
};

// Sort By
// Watching for the select box to change to run
bookList.prototype.addSorting = function() {
  var menu = document.querySelector('.sort-options');
  if (!menu) {
    return;
  }
  menu.addEventListener('change', this._handleSortChange.bind(this));
};

// Sort By function Handler runs on change
bookList.prototype._handleSortChange = function(evt) {
  var value = evt.target.value;
  var sorting=document.getElementById('#sorting');
  var option=sorting.options[sorting.selectedIndex].text;

  function sortByDate(element) {
    return element.getAttribute('data-created');
  }

  function sortByTitle(element) {
    return element.getAttribute('data-title').toLowerCase();
  }

  if (option=="Alphabetical"){
    
  }
};




/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/documents/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<div class="file" data-date-created="'+value.createdAt+'" data-title="'+value.name+'">'
            			+ displayColumns(value)
        				+ '</div>';
        		if(value.id%2!=0){
            $('#grid #left').append(row);
        		}else{
        		  $('#grid #right').append(row);
        		}
        });
    });
}



function displayColumns(value) {
  if(value.category_id==1){
    return 	'<div class="docimg" id="doc_img"></div>'+'<div class="detalii_doc"><div class="nume detalii">'+value.name+'</div>'+'<div class="descriere detalii">'+value.description+'</div>'
    +'<div class="autor detalii">'+value.author+'</div><div class="pret detalii">'+value.price+'</div>'+'</div>'
    +'<div class="linkuri"><button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button><button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button></div>';
  }
  if(value.category_id==2){
    return 	'<div class="docimg" id="html_img"></div>'+'<div class="detalii_doc"><div class="nume detalii">'+value.name+'</div>'+'<div class="descriere detalii">'+value.description+'</div>'
    +'<div class="autor detalii">'+value.author+'</div><div class="pret detalii">'+value.price+'</div>'+'</div>'
    +'<div class="linkuri"><button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button><button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button></div>';
  }
  if(value.category_id==3){
    return 	'<div class="docimg" id="xls_img"></div>'+'<div class="detalii_doc"><div class="nume detalii">'+value.name+'</div>'+'<div class="descriere detalii">'+value.description+'</div>'
    +'<div class="autor detalii">'+value.author+'</div><div class="pret detalii">'+value.price+'</div>'+'</div>'
    +'<div class="linkuri"><button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button><button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button></div>';
  }
  if(value.category_id==4){
    return 	'<div class="docimg" id="pdf_img"></div>'+'<div class="detalii_doc"><div class="nume detalii">'+value.name+'</div>'+'<div class="descriere detalii">'+value.description+'</div>'
    +'<div class="autor detalii">'+value.author+'</div><div class="pret detalii">'+value.price+'</div>'+'</div>'
    +'<div class="linkuri"><button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button><button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button></div>';
  }
  if(value.category_id==5){
    return 	'<div class="docimg" id="ppt_img"></div>'+'<div class="detalii_doc"><div class="nume detalii">'+value.name+'</div>'+'<div class="descriere detalii">'+value.description+'</div>'
    +'<div class="autor detalii">'+value.author+'</div><div class="pret detalii">'+value.price+'</div>'+'</div>'
    +'<div class="linkuri"><button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button><button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button></div>';
  }
  
}

//Add new document
var addDoc=$('#addDoc');
addDoc.on('click',function(){
   $('#id').val('');
    $('#category_id').val('');
    $('#name').val('');
    $('#description').val('');
    $('#author').val('');
    $('#price').val('');
    
    $('#myModalLabel').html('Add New Product');
});
function viewRecord(id) {
    var url = "/documents/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#category_id').val(data.category_id);
        $('#name').val(data.name);
        $('#description').val(data.description);
        $('#author').val(data.author);
        $('#price').val(data.price);
        $('#id').val(id);

        $('#myModalLabel').html('Edit Product');
        
        $('#add_new_record_modal').modal('show');
    });
}
function saveRecord() {
    //get data from the html form
    var formData = $('#record_form').serializeObject();
    
    //decide if it's an edit or create
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/documents/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#articles').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/documents/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.category_id').html(formData.category_id);
            $('#row_id_'+formData.id+'>td.name').html(formData.name);
            $('#row_id_'+formData.id+'>td.description').html(formData.description);
            $('#row_id_'+formData.id+'>td.author').html(formData.author);
            $('#row_id_'+formData.id+'>td.price').html(formData.price);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}
function deleteRecord(id) {
    $.ajax({
        url: '/documents/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}

//implementare Google Drive

(function() {
	/**
	 * Initialise a Google Driver file picker
	 */
	
	var FilePicker = window.FilePicker = function(options) {
		// Config
		this.apiKey = options.apiKey;
		this.clientId = options.clientId;
		
		// Elements
		this.buttonEl = options.buttonEl;
		
		// Events
		this.onSelect = options.onSelect;
		this.buttonEl.addEventListener('click', this.open.bind(this));		
	
		// Disable the button until the API loads, as it won't work properly until then.
		this.buttonEl.disabled = true;

		// Load the drive API
		gapi.client.setApiKey(this.apiKey);
		gapi.client.load('drive', 'v2', this._driveApiLoaded.bind(this));
		google.load('picker', '1', { callback: this._pickerApiLoaded.bind(this) });
	}

	FilePicker.prototype = {
		/**
		 * Open the file picker.
		 */
		open: function() {		
			// Check if the user has already authenticated
			var token = gapi.auth.getToken();
			if (token) {
				this._showPicker();
			} else {
				// The user has not yet authenticated with Google
				// We need to do the authentication before displaying the Drive picker.
				this._doAuth(false, function() { this._showPicker(); }.bind(this));
			}
		},
		
		/**
		 * Show the file picker once authentication has been done.
		 * @private
		 */
		_showPicker: function() {
			var accessToken = gapi.auth.getToken().access_token;
			this.picker = new google.picker.PickerBuilder().
				addView(google.picker.ViewId.DOCUMENTS).
				setAppId(this.clientId).
				setOAuthToken(accessToken).
				setCallback(this._pickerCallback.bind(this)).
				build().
				setVisible(true);
		},
		
		/**
		 * Called when a file has been selected in the Google Drive file picker.
		 * @private
		 */
		_pickerCallback: function(data) {
			if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
				var file = data[google.picker.Response.DOCUMENTS][0],
					id = file[google.picker.Document.ID],
					request = gapi.client.drive.files.get({
						fileId: id
					});
					
				request.execute(this._fileGetCallback.bind(this));
			}
		},
		/**
		 * Called when file details have been retrieved from Google Drive.
		 * @private
		 */
		_fileGetCallback: function(file) {
			if (this.onSelect) {
				this.onSelect(file);
			}
		},
		
		/**
		 * Called when the Google Drive file picker API has finished loading.
		 * @private
		 */
		_pickerApiLoaded: function() {
			this.buttonEl.disabled = false;
		},
		
		/**
		 * Called when the Google Drive API has finished loading.
		 * @private
		 */
		_driveApiLoaded: function() {
			this._doAuth(true);
		},
		
		/**
		 * Authenticate with Google Drive via the Google JavaScript API.
		 * @private
		 */
		_doAuth: function(immediate, callback) {	
			gapi.auth.authorize({
				client_id: this.clientId + '.apps.googleusercontent.com',
				scope: 'https://www.googleapis.com/auth/drive.readonly',
				immediate: immediate
			}, callback);
		}
	};
}());



