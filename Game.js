import {$getElById, $getElBySelectorAll, createEl, random} from "./util.js";
import {$control} from "./elements.js";
import Pokemon from "./pokemon.js";
import pokeFetch from "./Pokefetch.js"

export default class Game {
    constructor() {

    }
    startGame = async () => {
        this.player = this.initPokemon(await pokeFetch.getPokemonRandom(), 1)
        this.enemy = this.initPokemon(await pokeFetch.getPokemonRandom(), 2)
        this.cleanControls()
        this.createWeapons()
    }
    initPokemon = (pokemon, num = 2) => {
        return new Pokemon({
            ...pokemon,
            selectors: `player${num}`,
        })
    }

    createWeapons = () => {
        this.player.attacks.map(item => {
            const btnInnerText = `${item.name} (${item.minDamage}-${item.maxDamage})`
            const $btn = createEl( 'button', 'button', btnInnerText )
            $btn.dataset.counter = item.maxCount
            const btnCounter = countButton(item.maxCount, $btn)
            $btn.addEventListener('click', async () => {

                const {kick} = await pokeFetch.getFight(this.player.id, item.id, this.enemy.id)

                this.enemy.changeHP(kick.player2, async (count, looser, thisObj) => {

                    generatedLog( this.enemy, this.player, count, looser )
                    if(looser) {
                        looser = false
                        this.enemy = this.initPokemon( await pokeFetch.getPokemonRandom() )
                    }
                })

                btnCounter()

                this.player.changeHP(kick.player1, (count, looser) => {

                    if(looser) {
                        playerLoose(looser)
                    } else {
                        generatedLog( this.player, this.enemy, count, looser )
                    }
                } )

            })
            $control.appendChild($btn)
        })
    }
    cleanControls = () => {
        const $buttons = $getElBySelectorAll('.button')
        $buttons.forEach( $btn => $btn.remove() )
    }


}

function playerLoose(name) {
    const $buttons = $getElBySelectorAll('.button')
    $buttons.forEach( $btn => $btn.disabled = true)

    const $logs = $getElById('logs')
    const $h2 = document.createElement('h2')
    $h2.innerText = 'GAME OVER!!!'
    $logs.insertBefore($h2, $logs.children[0])

}

function countButton(count = 6, el) {
    el.dataset.counter = '' + count
    return function() {
        count--
        if (count === 0) {
            el.disabled = true
        }
        el.dataset.counter = '' + count
        return count
    }
}

function generatedLog (firstPerson, secondPerson, damage, looser) {
    const log = textGenLog(firstPerson, secondPerson, damage)
    const $logs = $getElById('logs')
    const $p = document.createElement('p')
    $p.innerText = log
    let $logItem = $p
    if (looser) {
        const $h2 = document.createElement('h2')
        $h2.innerText = 'Бедный ' + looser + ' проиграл!'
        $logItem = $h2
    }
    $logs.insertBefore($logItem, $logs.children[0])
}

function textGenLog(firstPerson, secondPerson, damage) {
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. Нанося ${damage} урона.`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. Нанося ${damage} урона.`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. Нанося ${damage} урона.`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. Нанося ${damage} урона.`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. Нанося ${damage} урона.`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. Нанося ${damage} урона.`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. Нанося ${damage} урона.`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника Нанося ${damage} урона.`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. Нанося ${damage} урона.`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. Нанося ${damage} урона.`,
    ];

    return logs[random(logs.length) - 1]
}