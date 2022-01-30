export class Posts {
    constructor({ title = '', content = '', coffe = 0 , color = '', user = ''}, id ='') {
        this.title = title;
        this.content = content;
        this.coffe = coffe;
        this.color = color,
        this.user = user,
        this.id = id
    }
}