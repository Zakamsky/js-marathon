class Pokefetch {
    constructor(url){
        this.url = url
    }
    getPokemonRandom = async () => {
        return await fetch(`${this.url}pokemons?random=true`).then(res => res.json())
    }
    getPokemonByID = async (id) => {
        return await fetch(`${this.url}pokemons?id=${id}`).then(res => res.json())
    }
    getPokemonByName = async (name) => {
        return await fetch(`${this.url}pokemons?name=${name}`).then(res => res.json())
    }
    getPokemonsAll = async () => {
        return await fetch(`${this.url}pokemons`).then(res => res.json())
    }
    getFight = async (player1id, attackId, player2id) => {
        return await fetch(`${this.url}fight?player1id=${player1id}&attackId=${attackId}&player2id=${player2id}`).then(res => res.json())
    }
}

const pokeFetch = new Pokefetch("https://reactmarathon-api.netlify.app/api/")
export default pokeFetch