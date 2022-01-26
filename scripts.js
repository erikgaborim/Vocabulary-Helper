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
    },

    showMeaning(){
        alert('mostrar significado')
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
        }catch(error){
            alert(error.message)
        }
    }
}

const App = {
    init(){
        Storage.set(Signs.all)
    }
}

App.init()