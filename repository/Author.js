class Author {

    #id
    #name
    #surname
    #age
    #alias
    #avatar

    constructor({id, name, surname, age, alias, avatar}){
        this.#id = id
        this.#name = name
        this.#surname = surname
        this.#age = age
        this.#alias = alias
        this.#avatar = avatar
    }

    get data(){
        return {
            id: this.#id,
            name: this.#name,
            surname: this.#surname,
            age: this.#age,
            alias: this.#alias,
            avatar: this.#avatar
        }
    }

    get id(){
        return this.#id
    }

    set id(id){
        if(!id) throw new Error('"id" es un campo obligatorio.')
        this.#id = id
    }


    get name(){
        return this.#name
    }

    set name(name){
        if(!name) throw new Error('"name" es un campo obligatorio.')
        this.#name = name
    }


    get surname(){
        return this.#surname
    }

    set surname(surname){
        if(!surname) throw new Error('"surname" es un campo obligatorio.')
        this.#surname = surname
    }


    get age(){
        return this.#age
    }

    set age(age){
        if(!age) throw new Error('"age" es un campo obligatorio.')
        this.#age = age
    }


    get alias(){
        return this.#alias
    }

    set alias(alias){
        if(!alias) throw new Error('"alias" es un campo obligatorio.')
        this.#alias = alias
    }


    get avatar(){
        return this.#avatar
    }

    set avatar(avatar){
        if(!avatar) throw new Error('"avatar" es un campo obligatorio.')
        this.#avatar = avatar
    }

}

export default Author