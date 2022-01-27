const Modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("wordMeaning")) || []
    },

    set(wordsMeanings){
        localStorage.setItem("wordMeaning", JSON.stringify(wordsMeanings))
    }
}

const Signs = {
    all: Storage.get(),

    add(sign){
        Signs.all.push(sign)
        App.init()
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
        DOM.isTheFirstWord = false
        DOM.wordDrawn = Raffle.draw()
        DOM.showWord()
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
            alert("Draw a word before it! (click on the red button)")
        }else{
            DOM.wordPlace.innerHTML = DOM.wordDrawn.meaningValue
            DOM.makeDivMeaning()
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
            Modal.close()
            alert('The word has been added')
        }catch(error){
            alert(error.message)
        }
    }
}

const App = {
    init(){
        Storage.set(Signs.all)
    },

    reload(){
        DOM.drawAgain()
    }
}

App.init()