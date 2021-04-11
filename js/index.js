//array that holds the todo items
let toDoItemsArray = []

//TODO: Storage > Name for the list via input by user provides key for storage
//TODO: Priority buttons: red yellow green

//class for an ToDoItem
class ToDoItem {
    constructor(content, priority, createDate) {
        this._id = ToDoItem.incrementId();
        this._content = content;
        this._priority = priority;
        this._createDate = createDate; //date of creation >> new Date().tolocalString
        this._complete = false; //>>boolean for complete (true) or not complete (false >> default), represent as a button, when you click, value changes (red to green)
        this._subItems = []
    }

    //static method for the individual id of an object of class ToDoItem
    static incrementId() {
        if (!this.latestId) {
            this.latestId = 1
        } else {
            this.latestId++
        }
        return this.latestId
    }

    /*dueDate: dueDate, //right date format?
    position: position, //user should be able to move things within the priority div, array +1*/
    add() {
        itemsList.appendChild(this.setUpHTML())
        this.removeEditFunctionality()
    }

    setUpHTML() { //add to html method
        //create list element and content
        let li = document.createElement('li')
        li.id = this._id
        let divItem = document.createElement('div')
        divItem.className = "divItem"
        let divCheck = document.createElement('div')
        divCheck.className = "form-check form-switch"
        let checkBox = document.createElement('input')
        checkBox.setAttribute("type", "checkbox")
        checkBox.className = "form-check-input"
        divCheck.appendChild(checkBox)
        divItem.appendChild(divCheck)
        let divText = document.createElement('div')
        let textLi = document.createTextNode(this._content)
        divText.appendChild(textLi)
        divItem.appendChild(divText)
        //create radion buttons for priority
        // let radio1 = document.createElement('input');
        // radio1.setAttribute("type", "radio");
        // radio1.setAttribute("id", "high");
        // radio1.setAttribute("name", "priority");
        // radio1.setAttribute("value", "high");
        // radio1.setAttribute("checked", "checked")
        // let label1 = document.createElement('label')
        // label1.setAttribute("for", "high")
        // let radio2 = document.createElement('input');
        // radio2.setAttribute("type", "radio");
        // radio2.setAttribute("id", "medium1");
        // radio2.setAttribute("name", "priority");
        // radio2.setAttribute("value", "medium1");
        // let label2 = document.createElement('label')
        // label2.setAttribute("for", "medium1")
        // let radio3 = document.createElement('input');
        // radio3.setAttribute("type", "radio");
        // radio3.setAttribute("id", "medium2");
        // radio3.setAttribute("name", "priority");
        // radio3.setAttribute("value", "medium2");
        // let label3 = document.createElement('label')
        // label3.setAttribute("for", "medium2")
        // let radio4 = document.createElement('input');
        // radio4.setAttribute("type", "radio");
        // radio4.setAttribute("id", "low");
        // radio4.setAttribute("name", "priority");
        // radio4.setAttribute("value", "low");
        // let label4 = document.createElement('label')
        // label4.setAttribute("for", "low")
        // li.append(radio1, label1, 'High', radio2, label2, 'Medium1', radio3, label3, 'Medium2', radio4, label4, 'Low')
        //create edit button
        let buttonDiv = document.createElement('div')
        let buttonEdit = document.createElement('button')
        buttonEdit.id = 'edit' + this._id
        buttonEdit.className = "btn btn-secondary"
        let textEdit = document.createTextNode('Edit')
        buttonEdit.appendChild(textEdit)
        buttonEdit.id = 'edit' + this._id
        buttonDiv.appendChild(buttonEdit)
        divItem.appendChild(buttonDiv)
        //create remove button
        let removeDiv = document.createElement('div')
        let buttonRemove = document.createElement('button')
        buttonRemove.id = 'remove' + this._id
        buttonRemove.className = "btn btn-secondary"
        let textDel = document.createTextNode('Remove')
        buttonRemove.appendChild(textDel)
        removeDiv.appendChild(buttonRemove)
        divItem.appendChild(removeDiv)
        li.appendChild(divItem)
        let bar = document.createElement('hr')
        li.append(bar)
        // //create empty sublist
        // let subList = document.createElement('ul')
        // subList.id = 'subList' + this._id
        // li.appendChild(subList)
        return li
    }

    removeEditFunctionality() {
        let deleteButton = document.getElementById('remove' + this._id)
        let liAdd = document.getElementById(this._id)
        deleteButton.addEventListener('click', () => {
            liAdd.remove()
            toDoItemsArray.splice(toDoItemsArray.findIndex(item => item._id === this._id), 1)
            console.log(toDoItemsArray)
        })

        let editButton = document.getElementById('edit' + this._id)
        editButton.addEventListener('click', () => {
            let editLi = document.createElement('li')
            editLi.id = 'edit' + this._id
            let editInput = document.createElement('input')
            editInput.value = this._content
            editLi.appendChild(editInput)
            // let subButton = document.createElement('button')
            // subButton.id = 'sub' + this.id
            // let textSub = document.createTextNode('Add subitem')
            // subButton.appendChild(textSub)
            // editLi.appendChild(subButton)
            let doneButton = document.createElement('button')
            doneButton.id = 'done' + this._id
            doneButton.className = "btn btn-secondary"
            let textDone = document.createTextNode('Done')
            doneButton.appendChild(textDone)
            editLi.appendChild(doneButton)
            let parentUl = liAdd.parentNode
            parentUl.replaceChild(editLi, liAdd)
            // let subList = document.createElement('ul')
            // subList.id = 'subList' + this._id
            // editLi.appendChild(subList)

            // subButton.addEventListener('click', () => {
            //     let subLi = document.createElement('li')
            //     let subLiInput = document.createElement('input')
            //     subLi.appendChild(subLiInput)
            //     let subList = document.getElementById('subList' + this._id)
            //     subList.appendChild(subLi)
            //     //need edit and remove functionality for this one, too!!
            // })

            editInput.addEventListener("keyup", event => {
                // Number 13 is the "Enter" key on the keyboard
                if (event.key === 'Enter') {
                    // Trigger the button element with a click
                    doneButton.click();
                }
            });

            doneButton.addEventListener('click', () => {
                this._content = editInput.value
                parentUl.replaceChild(this.setUpHTML(), editLi)
                this.removeEditFunctionality()
                console.log(toDoItemsArray)
            })
        })



    }
    //let contentEdit = toDoItemsArray.filter(item.content => item._id === this._id)

    //here i have to get the content text from the object, put it as a value into an input field, get the new input and store it in the same object
    //let liDelete = document.getElementById(this._id)

    //add methods here: delete(), edit(), mark()
    //these probably go into the class methods!!!
    //will i need getter methods?


}

// const toDo = new ToDoItem('bla', 'high', 'now')
// console.log(toDo._id)


//getting the add-button to being able to listen to it
let buttonAdd = document.getElementById('addButton')
//getting the input that the user writes into the input-form
let inputToDo = document.getElementById('input')
//getting the list
let itemsList = document.getElementById('itemsList')

//method for adding
const addItem = () => {
    const toDoItem = new ToDoItem(inputToDo.value, 'high', new Date())
    toDoItemsArray.push(toDoItem)
    toDoItem.add()
    inputToDo.value = ''
}

//adding event listeners to the radio buttons
// for (let i = 0; i < radioPriority.length; i++) {
//     radioPriority[i].addEventListener('click', (e) => {

//     })
// } //TODO: has to go into the list!!!

inputToDo.addEventListener("keyup", event => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === 'Enter') {
        // Trigger the button element with a click
        buttonAdd.click();
    }
});



buttonAdd.addEventListener('click', () => {
    addItem()
})





/*problem here: 1) naming of the variables (we don't know them in advance)
2) remove object from array > via (find and) filter*/
