

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
  var options = {};

  function sortByDate(element) {
    return element.getAttribute('data-created');
  }

  function sortByTitle(element) {
    return element.getAttribute('data-title').toLowerCase();
  }

  if (value === 'date-created') {
    options = {
      reverse: true,
      by: sortByDate,
    };
  } else if (value === 'title') {
    options = {
      by: sortByTitle,
    };
  }

  this.shuffle.sort(options);
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
            var row = '<div class="file">'
            			+ displayColumns(value)
        				+ '</div>';
        		if(value.id==3){
            $('#grid #left').append(row);
        		}
        });
    });
}



function displayColumns(value) {
  if(value.category_id==1){
    return 	'<div class="docimg" id="doc_img"></div>'+'<div class="detalii_doc"><div class="nume">'+value.name+'</div>'+'<div class="descriere">'+value.description+'</div>'
    +'<div class="autor">'+value.author+'</div><div class="pret">'+value.price+'</div>'+'</div>';
  }
  if(value.category_id==2){
    return 	'<div class="docimg" id="html_img"></div>'+'<div class="detalii_doc"><div class="nume">'+value.name+'</div>'+'<div class="descriere">'+value.description+'</div>'
    +'<div class="autor">'+value.author+'</div><div class="pret">'+value.price+'</div>'+'</div>';
  }
  if(value.category_id==3){
    return 	'<div class="docimg" id="xls_img"></div>'+'<div class="detalii_doc"><div class="nume">'+value.name+'</div>'+'<div class="descriere">'+value.description+'</div>'
    +'<div class="autor">'+value.author+'</div><div class="pret">'+value.price+'</div>'+'</div>';
  }
  if(value.category_id==4){
    return 	'<div class="docimg" id="pdf_img"></div>'+'<div class="detalii_doc"><div class="nume">'+value.name+'</div>'+'<div class="descriere">'+value.description+'</div>'
    +'<div class="autor">'+value.author+'</div><div class="pret">'+value.price+'</div>'+'</div>';
  }
  if(value.category_id==5){
    return 	'<div class="docimg" id="ppt_img"></div>'+'<div class="detalii_doc"><div class="nume">'+value.name+'</div>'+'<div class="descriere">'+value.description+'</div>'
    +'<div class="autor">'+value.author+'</div><div class="pret">'+value.price+'</div>'+'</div>';
  }
  
}





