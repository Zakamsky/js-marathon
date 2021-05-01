class Pokefetch {
    constructor(url){
        this.url = url
    }
    // getPokemons({name, id, random}) {
    getPokemons = (options) => {
        let fetchUrl = this.url + 'pokemons'

        if (options.name) { fetchUrl += `` }
        if (name || id || random) {        }
        if (name || id || random) {        }
        return fetch()
        console.log(options, '## options: ', this.url, '# url' );
    }
    getPOkemonsAll = async () => {
        return await fetch(`${this.url}pokemons`).then(res => res.json())
    }
}

const pokeFetch = new Pokefetch("https://reactmarathon-api.netlify.app/api/")
export default pokeFetch