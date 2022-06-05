import Author from "./Author.js"

class Message {

    #author
    #text
    #date
    #id


    constructor({author, text, date, id}){
        this.#author = new Author(author)
        this.#text = text,
        this.#date = date,
        this.#id = id
    }

    get data(){
        
        return {
            author: this.#author.data,
            text: this.#text,
            date: this.#date,
            id: this.#id
        }
    }

    get author(){
        return this.#author
    }

    set author(author){
        if(!author) throw new Error('"author" es un campo obligatorio.')
        this.#author = author
    }

    get text(){
        return this.#text
    }

    set text(text){
        if(!text) throw new Error('"text" es un campo obligatorio.')
        this.#text = textauthor
    }


    get date(){
        return this.#date
    }

    set date(date){
        if(!date) throw new Error('"date" es un campo obligatorio.')
        this.#date = date
    }

    

    get id(){
        return this.#id
    }

    set id(id){
        if(!id) throw new Error('"id" es un campo obligatorio.')
        this.#id = id
    }

}


export default Message