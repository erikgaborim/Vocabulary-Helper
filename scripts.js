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
        let countSign = 0
        Signs.all.forEach(sign => {
            countSign++
        });
        if(countSign == 0){
            alert("Please, enter a word before drawing (on the button 'add words to draw list')")
        }else{
            DOM.isTheFirstWord = false
            DOM.wordDrawn = Raffle.draw()
            DOM.showWord()
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
            alert("Draw a word before it! (click on the red button)")
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
        </tr>
        `
        return html
    }
}

const List = {
    eachSign(){
        let count = 0;

        Signs.all.forEach(sign => {
            DOMWordsList.addSignToList(sign)
            count++
        });
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
        List.eachSign()
    },

    reload(){
        DOM.drawAgain()
    }
}

App.init()

/*PARA CONCLUIR:

- Trazer os botões de adicionar arquivo e mostrar lista de palavras para a tela principal;
- Fazer o sistema de adicionar um arquivo com palavras;
- Arrumar o botão de fechar da lista de palavras;
- Possibilitar o usuário deletar palavras adicionadas;
- Conferir todas as mensagens em inglês;
- Responsividade.

*/