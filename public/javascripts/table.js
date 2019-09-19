
var table // table needs to be global
var row // need the row to set up edit
var formDisplayStyle
var addButtonDisplayStyle

const clearForm = function() {
  document.querySelector( '#title' ).value = ""
  document.querySelector( '#author' ).value = ""
  document.querySelector( '#genre' ).value = ""
}

const displayTable = function( json ) {

  var col = [];
  for (var i = 0; i < json.length; i++) {
    for (var key in json[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  // CREATE DYNAMIC TABLE.
  table.innerHTML = ""

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
  var tr = table.insertRow(-1)                   // TABLE ROW.

  for (var i = 0; i < col.length; i++) { // change this 
    var th = document.createElement( "th" )      
    th.innerHTML = col[i]
    tr.appendChild(th)
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < json.length; i++) {
    tr = table.insertRow(-1)

    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1)
          tabCell.innerHTML = json[i][col[j]]
    }
    var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");

    x.onclick = function() {
      row = this.parentNode
      var inputs = document.getElementsByTagName("input");
      for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type == "checkbox") {
          inputs[i].checked = false; 
        }  
      }
      this.checked= true;
      document.getElementById( "editEntryButton" ).style.display = "block"
    }
    tr.append(x)
  }

  var divContainer = document.getElementById( "table" )
  divContainer.innerHTML = ""
  divContainer.appendChild(table)
}

const submit = function( e ) { 
  // prevent default form action from being carried out
  e.preventDefault()

  //close form
  document.getElementById( "formDisplay" ).style.display = "none"
  document.getElementById( "addNewEntry" ).style.display = "block"

  const title = document.querySelector( '#title' ),
        author = document.querySelector( '#author' ),
        genre = document.querySelector( '#genre' ),
        json = { 'title':title.value,
                  'author':author.value,
                  'genre':genre.value,
                },
        body = JSON.stringify( json )

  // clear form
  //document.querySelector( '#title' ).value = ""
  //document.querySelector( '#author' ).value = ""
  //document.querySelector( '#genre' ).value = ""
  clearForm()

  fetch( '/data/add', {
    method:'POST',
    body, 
    headers: {'Content-Type':'application/json'}
  })
  .then( function( response ) {
    console.log( response )
    return response.json()
  }).then( function( json ) {
    displayTable( json )
  })
  return false
}

const getData = function() {
  fetch('/data', {
    method: 'GET'
  })
  .then( function( response ) {
    console.log( response )
    return response.json()
  }).then( function( json ) {
    displayTable( json )
  })
  return false
}

const submitEdit = function() {

  // close form
  document.getElementById( "formDisplay" ).style.display = "none"
  document.getElementById( "addNewEntry" ).style.display = "block"
  document.getElementById( "editEntryButton" ).style.display = "none"



  const entryKey = row.firstElementChild.innerHTML,
        title = document.querySelector( '#title' ),
        author = document.querySelector( '#author' ),
        genre = document.querySelector( '#genre' ),
        json = { 'title': entryKey,
                 'newEntry': 
                 {
                    'title':title.value,
                    'author':author.value,
                    'genre':genre.value,
                  }
                },
        body = JSON.stringify( json )


  //clear form      
  //document.querySelector( '#title' ).value = ""
  //document.querySelector( '#author' ).value = ""
  //document.querySelector( '#genre' ).value = ""  
  clearForm()     

  fetch('/data/edit', {
    method: 'POST',
    body,
    headers: {'Content-Type':'application/json'}
  })
  .then( function ( response ) {
    console.log( response )
    return response.json()
  })
  .then (function( json ) {
    displayTable( json );
  })
  return false
}

const submitDelete = function() {
  const entryKey = row.firstElementChild.innerHTML,
        json = { 
                'title': entryKey,
               },
        body = JSON.stringify( json )
    
    
      //clear form
  document.querySelector( '#title' ).value = ""
  document.querySelector( '#author' ).value = ""
  document.querySelector( '#genre' ).value = ""    
  clearForm()

  fetch('/data/delete', {
    method: 'POST',
    body,
    headers: {'Content-Type':'application/json'}
  })
  .then( function ( response ) {
    console.log( response )
    return response.json()
  })
  .then (function( json ){
    displayTable( json );
  })
  return false
}

const editData = function() {
  document.querySelector( '#title' ).value = row.children[0].innerHTML
  document.querySelector( '#author' ).value = row.children[1].innerHTML
  document.querySelector( '#genre' ).value = row.children[2].innerHTML 

  // display edit form
  document.getElementById( "deleteEntryButton" ).style.display = "block"
  document.getElementById( "formDisplay" ).style.display = "block"
  document.getElementById( "editEntryButton" ).style.display = "none"
  document.getElementById( "addNewEntry" ).style.display = "none"

  const deleteButton = document.getElementById( 'deleteEntryButton' )
    deleteButton.onclick = function() {

      //close form
      document.getElementById( "formDisplay" ).style.display = "none"
      document.getElementById( "editEntryButton" ).style.display = "none"
      document.getElementById( "addNewEntry" ).style.display = "block"


      submitDelete()
    }
    const cancelButton = document.getElementById( 'cancelEditButton' )
    cancelButton.onclick = function() {
      console.log("clicked")

      // close form maintain edit
      document.getElementById( "formDisplay" ).style.display = "none"
      document.getElementById( "addNewEntry" ).style.display = "block"

      document.getElementById( "editEntryButton" ).style.display = "block"

      //clear form
      //document.querySelector( '#title' ).value = ""
      //document.querySelector( '#author' ).value = ""
      //document.querySelector( '#genre' ).value = ""    
      clearForm() 
    }
    const button = document.getElementById( 'button1' )
    button.onclick = submitEdit
  }
  
  const displayForm = function() {

    //show form for new entry
    document.getElementById( "addNewEntry" ).style.display = "none"
    document.getElementById( "formDisplay" ).style.display = "block"
    document.getElementById( "deleteEntryButton" ).style.display = "none"
    document.getElementById( "editEntryButton" ).style.display = "none"

    //clears check boxes
    var inputs = document.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].type == "checkbox") {
        inputs[i].checked = false; 
      }  
    }

    const cancelButton = document.getElementById( 'cancelEditButton' )
    cancelButton.onclick = function() {

      
      // hide form 
      document.getElementById( "formDisplay" ).style.display = "none"
      document.getElementById( "addNewEntry" ).style.display = "block"  



    }
    const button = document.getElementById( 'button1' ) 
    button.onclick = submit
  }

  window.onload = function() {
    const newEntryButton = document.getElementById( 'addNewEntry' )
    newEntryButton.onclick = displayForm

    const editEntryButton = document.getElementById( 'editEntryButton' )

    //first condition
    document.getElementById( "editEntryButton" ).style.display = "none"
    document.getElementById( "formDisplay" ).style.display = "none"

    editEntryButton.onclick = editData
    table = document.createElement( "table" )

    getData()
    
  }