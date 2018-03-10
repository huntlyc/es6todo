/**
 * Simple wee @TODO app
 **/
const todoForm = document.querySelector( 'form' );
const todoInput = document.querySelector( '#todo-input' );

initFromDataStore();

todoForm.addEventListener( 'submit', uiAddTodo, false );
todoInput.focus();

function initFromDataStore ( ) {
    var todoItems = JSON.parse( localStorage.getItem( 'todoItems' ) );
    if( Array.isArray( todoItems ) ) {
        todoItems.forEach( function( item ) {
            addTodoItem( item );
        } );
    }
}

function uiAddTodo ( e ) {
    e.preventDefault( );

    addTodoItem( todoInput.value );

    // Clear out input and refocus
    todoInput.value = '';
    todoInput.focus();


    saveList(); // New item potenitally added, save list
}

function addTodoItem (itemText = '') {

    if( itemText !== '' ) {

        // Create remove link and setup event listener on it
        const removeLink = document.createElement( 'a' );
        removeLink.setAttribute( 'href', '#remove' );
        removeLink.title = 'Remove this @todo';
        removeLink.innerHTML = '&times';
        removeLink.addEventListener( 'click', function( e ) {
            e.preventDefault();

            // Target is the a tag, remove the parent li node
            e.target.parentNode.remove();

            saveList(); // List updated, so save it
        });

        // Create the new list item with text & remove link
        const todoHtml = document.createElement( 'li' );
        todoHtml.textContent = itemText;
        todoHtml.appendChild( removeLink );

        // Add new list item to the list
        const todoList = document.querySelector( '#todo-items' );
        todoList.appendChild( todoHtml );
    }
}

function saveList () {
    const todoUl = document.querySelector( '#todo-items' );
    const todoList = [];

    // From the ul list of items, create an array of text items
    Array.from( todoUl.children ).forEach( function( item ) {
        todoList.push( item.childNodes[0].textContent );
    } );

    // Save text items into local storage
    localStorage.setItem( 'todoItems', JSON.stringify( todoList ) );
}
