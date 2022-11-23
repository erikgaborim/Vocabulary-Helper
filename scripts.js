const Modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    },
}

const ModalList = {
    open(){
        document.querySelector('.modal-list-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-list-overlay').classList.remove('active')
    }
}

const ModalHardWordsList = {
    open(){
        document.querySelector('.modal-list-overlay.hard-words').classList.add('active')
    },
    close(){
        document.querySelector('.modal-list-overlay.hard-words').classList.remove('active')
    }
}

const ModalFile = {
    open(){
        document.querySelector('.modal-file-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-file-overlay').classList.remove('active')
    },
}

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("wordMeaning")) || []
    },

    set(wordsMeanings){
        localStorage.setItem("wordMeaning", JSON.stringify(wordsMeanings))
    },

    getClassify(){
        return JSON.parse(localStorage.getItem("difficultWords")) || []
    },

    setClassify(difficultWords){
        localStorage.setItem("difficultWords", JSON.stringify(difficultWords))
    }
}

const Signs = {
    all: Storage.get(),
    all2: [],
    allDifficultWords: Storage.getClassify(),

    add(sign){
        Signs.all.push(sign)
        App.init()
    },

    remove(count){
        Signs.all.splice(count, 1)
        App.init()
    },

    removeHardWord(count){
        Signs.allDifficultWords.splice(count, 1)
        App.init()
    },

    removeAllHardWords(){
        const sure = confirm('Do you really want to delete all words in the hard words list?')
        if(sure){
            Signs.allDifficultWords = []
            App.init()
        }
    },

    removeAll(){
        const sure = confirm('Do you really want to delete all words in the list?')
        if(sure){
            Signs.all = []
            App.init()
        }
    },

    swapValues(){
        let arraySign = Signs.all
        arraySign.forEach(sign => {
            let wordValue = sign.wordValue
            let meaningValue = sign.meaningValue

            sign.wordValue = meaningValue
            sign.meaningValue = wordValue
        });

        Signs.all = arraySign
        App.init()
        alert("Words and meanings have been reversed.")
    },

    addClassify(sign){
        if(Signs.allDifficultWords.includes(sign)){
            alert("This word has already been added to the hard words list. You can't do it again")
        }else{
            Signs.allDifficultWords.push(sign)
            alert('The word has been added to the hard words list')
            App.init()
        }
    },

    drawHardWords(){
        if(Signs.all = []){
            alert("You can't do it because your main list is void")
        } else{
            if(Signs.all != Signs.allDifficultWords){
                Signs.all2 = Signs.all
            }
            Signs.all = Signs.allDifficultWords
            alert("Now just words classified as 'hard words' are going to be drawn. To change it and draw all words, click on the blue button 'draw all words'")
            App.init()
        }
    },

    drawRegularWords(){
        if(Signs.all = []){
            alert("You can't do it because your main list is void")
        }else{
            if(Signs.all2 == [] || Signs.all == Signs.all2){
                alert("Regular words are already selected")
            }else{
                console.log(Signs.all2)
                Signs.all = Signs.all2
                alert("Now all words are going to be drawn")
                App.init()
            }
        }
    }
}

const Raffle = { 
    draw(){
        const anySign = Math.floor(Math.random() * Signs.all.length);
        const randomSign = Signs.all[anySign]; // resultado aleatório
        return randomSign
    },
}

const DOM = {
    wordPlace: document.querySelector('#word-place'),
    wordDrawn: Raffle.draw(),
    isTheFirstWord: true,

    click(){
        let countSign = 0
        Signs.all.forEach(sign => {
            countSign++
        });
        if(countSign == 0){
            alert("Please type a word before drawing (in the 'Add words to main list' button).")
        }else{
            DOM.isTheFirstWord = false
            DOM.wordDrawn = Raffle.draw()
            DOM.showWord()
        }
    },

    classifyWords(){
        if(this.wordPlace.innerHTML == 'WORD'){
            alert('Draw a word before it')
        }else{
            Signs.addClassify(this.wordDrawn)
        }
        
    },

    makeDivWord(){
        document.querySelector('#word-box').style.backgroundColor = "#0000ff"

        let textTop = document.querySelector('.top-warning')
        textTop.innerHTML = "Word drawn"

        let textBottom = document.querySelector('.bottom-warning')
        textBottom.innerHTML = "Tap to know the meaning"
    },

    makeDivMeaning(){
        document.querySelector('#word-box').style.backgroundColor = "#009700"

        let textTop = document.querySelector('.top-warning')
        textTop.innerHTML = "Meaning"

        let textBottom = document.querySelector('.bottom-warning')
        textBottom.innerHTML = `${DOM.wordDrawn.wordValue}`
    },

    showWord(){
        DOM.wordPlace.innerHTML = DOM.wordDrawn.wordValue
        DOM.makeDivWord()
    },

    showMeaning(){
        if(DOM.isTheFirstWord){
            alert("Draw a word before it! (click on the red button).")
        }else{
            DOM.wordPlace.innerHTML = DOM.wordDrawn.meaningValue
            DOM.makeDivMeaning()
        }
    }
}

const DOMWordsList = {
    tableBody: document.querySelector('.modal-list tbody'),

    addSignToList(sign){
        const newSign = document.createElement('tr')
        newSign.innerHTML = DOMWordsList.innerHTMLSign(sign);
        DOMWordsList.tableBody.appendChild(newSign)
    },

    innerHTMLSign(sign){
        const html = `
        <tr>
            <td>${sign.wordValue}</td>
            <td>${sign.meaningValue}</td>
            <td><img onclick="Signs.remove(${List.count})" src="./images/minus.svg" id="remove-words-button"></td>
        </tr>
        `
        return html
    },

    clearTable(){
        this.tableBody.innerHTML = ""
    }
}

const List = {
    count: 0,

    eachSign(){
        this.count = 0;
        Signs.all.forEach(sign => {
            DOMWordsList.addSignToList(sign)
            this.count++
        });
    }
}

const DOMHardWordsList = {
    tableBody: document.querySelector('.modal-list.hard-words tbody'),

    addSignToList(sign){
        const newSign = document.createElement('tr')
        newSign.innerHTML = DOMHardWordsList.innerHTMLSign(sign);
        DOMHardWordsList.tableBody.appendChild(newSign)
    },

    innerHTMLSign(sign){
        const html = `
        <tr>
            <td>${sign.wordValue}</td>
            <td>${sign.meaningValue}</td>
            <td><img onclick="Signs.removeHardWord(${HardWordsList.count})" src="./images/minus.svg" id="remove-words-button"></td>
        </tr>
        `
        return html
    },

    clearTable(){
        this.tableBody.innerHTML = ""
    }
}

const HardWordsList = {
    count: 0,

    eachSign(){
        this.count = 0;
        Signs.allDifficultWords.forEach(sign => {
            DOMHardWordsList.addSignToList(sign)
            this.count++
        });
    }
}

const File = {
    file: document.querySelector('#input-file'),
    isFirstTime: true,
    arrayWords: [],

    readFile(){
        if(this.isFirstTime){
            let files = this.file.files

            if(files.length == 0) return;

            const file = files[0]

            let reader = new FileReader()

            reader.onload = (e) => {
                const file = e.target.result
                this.arrayWords = file.split('\n')
            }

            reader.onerror = (e) => alert(e.target.error.name)
            reader.readAsText(file)

            alert("The file has been selected. Click the green button to add it to the list.")

            this.isFirstTime = false;
        }else{
            alert("Click the 'add' button before selecting other file.")
        }
    },

    handleArray(){
        let count = 0;
        this.arrayWords.forEach(sign => {
            if(sign != ""){
                const array = sign.split(" - ")
                const wordMeaning = {
                    wordValue: array[0],
                    meaningValue: array[1]
                }
                Signs.add(wordMeaning)
            }
        });
    },

    submit(event){
        event.preventDefault()
        try{            
            this.handleArray()
            ModalFile.close()
        }catch(error){
            alert(error.message)
        }
    }
 }

const Form = {
    word: document.querySelector('input#word'),
    meaning: document.querySelector('input#meaning'),

    //pegar dados
    //ver se estão vazios
    //guardá-los no localStorage

    clearFields(){
        Form.word.value = ""
        Form.meaning.value = ""
    },

    getValues(){
        return{
            wordValue: Form.word.value, 
            meaningValue: Form.meaning.value
        }
    },

    isVoid(){
        const { wordValue, meaningValue } = Form.getValues()

        if(wordValue.trim() === "" || meaningValue.trim() === ""){
            throw new Error("You need to fill in all fields!")
        }
    },

    submit(event){
        event.preventDefault()
        try{
            Form.isVoid();
            Signs.add(Form.getValues())
            Form.clearFields()
            alert('The word has been added.')
        }catch(error){
            alert(error.message)
        }
    }
}

const App = {
    init(){
        Storage.set(Signs.all)
        Storage.setClassify(Signs.allDifficultWords)
        DOMWordsList.clearTable()
        DOMHardWordsList.clearTable()
        List.eachSign()
        HardWordsList.eachSign()
    }
}

App.init()

/* PARA FAZER:

- lista de palavras classificadas como difíceis;
- fazer uma seção de sorteio só para palavras difíceis;

*/