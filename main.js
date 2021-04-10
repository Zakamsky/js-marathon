import Pokemon from "./pokemon.js";
import { pokemons }from "./pokemons.js";
import { createEl, random, $getElById, $getElBySelector, $getElBySelectorAll } from "./util.js";


const $control = $getElBySelector('.control')
const $startBtn = $getElBySelector('.btn-start')

// $startBtn.addEventListener('click', Game.startGame())

// player.attacks.map(item => {
//     const btnInnerText = `${item.name} (${item.minDamage}-${item.maxDamage})`
//     const $btn = createEl( 'button', 'button', btnInnerText )
//     $btn.dataset.counter = item.maxCount
//     const btnCounter = countButton(item.maxCount, $btn)
//     $btn.addEventListener('click', () => {
//
//         enemy.changeHP(random( item.maxDamage, item.minDamage), function(count, looser) {
//             generatedLog( enemy, player, count, looser )
//             if(looser) {
//                 looser = false
//                 enemy = initEnemy( pokemons[random(pokemons.length -1)] )
//             }
//         })
//
//         btnCounter()
//
//         player.changeHP(random( enemy.attacks[0].maxDamage, enemy.attacks[0].minDamage), function(count, looser) {
//
//             if(looser) {
//                 playerLoose(looser)
//             } else {
//                 generatedLog( player, enemy, count, looser )
//             }
//         } )
//
//     })
//     $control.appendChild($btn)
// })

class Game {
    constructor() {

    }
    startGame() {
        this.player = this.initPokemon(pokemons[random(pokemons.length -1)], 1)
        this.enemy = this.initPokemon(pokemons[random(pokemons.length -1)], 2)
        this.cleanControls()
        // this.createPlayers()
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
            $btn.addEventListener('click', () => {
                this.enemy.changeHP(random( item.maxDamage, item.minDamage), function(count, looser, thisObj) {

                    generatedLog( newGame.enemy, newGame.player, count, looser )
                    if(looser) {
                        looser = false
                        newGame.enemy = newGame.initPokemon( pokemons[random(pokemons.length -1)] )
                    }
                })

                btnCounter()

                newGame.player.changeHP(random( this.enemy.attacks[0].maxDamage, this.enemy.attacks[0].minDamage), function(count, looser) {

                    if(looser) {
                        playerLoose(looser)
                    } else {
                        generatedLog( newGame.player, newGame.enemy, count, looser )
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

let newGame = {}
$startBtn.addEventListener('click', () => {
    // newGame = new Game(pokemons[random(pokemons.length -1)], pokemons[random(pokemons.length -1)])
    newGame = new Game()
    newGame.startGame()
})

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
