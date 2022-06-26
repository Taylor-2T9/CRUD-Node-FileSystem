const fs = require('fs')
const crud = {
    posts: [{ id: 1, content: "Ola Ola", owner: "Taylor" }, { id: 2, content: "Oba", owner: "Taylor" }],
    create({ content, owner }) {
        const dados = { id: crud.posts.length + 1, content, owner }
        crud.posts.push(dados)
        fs.writeFileSync('./db.json', JSON.stringify(crud.posts), { encoding: 'utf-8' })
    },
    read() {
        crud.posts = JSON.parse(fs.readFileSync('./db.json', { encoding: 'utf-8' }))
        return crud.posts
    },
    update({ id, newContent }) {
        const index = crud.posts.findIndex((post) => {
            return id === post.id
        })
        crud.posts[index].content = newContent
        fs.writeFileSync('./db.json', JSON.stringify(crud.posts), { encoding: 'utf-8' })
    },
    delete(id) {
        const index = crud.posts.findIndex((post) => {
            return id === post.id
        })
        crud.posts.splice(index, 1)
    },
}

//Create
crud.create({ content: 'Opa', owner: 'Taylor' })
//Read
console.log(crud.read())
//Update
crud.update({ id: 2, newContent: "Olá, Olá" })
//Delete
crud.delete(1)

//Teste após todas as operações
console.log(crud.read())