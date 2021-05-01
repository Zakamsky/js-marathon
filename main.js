import Pokemon from "./pokemon.js";
import { pokemons }from "./pokemons.js";
import { createEl, random, $getElById, $getElBySelector, $getElBySelectorAll } from "./util.js";
import Game from "./Game.js";
import {$startBtn} from "./elements.js";



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



let newGame = {}
$startBtn.addEventListener('click', () => {
    // newGame = new Game(pokemons[random(pokemons.length -1)], pokemons[random(pokemons.length -1)])
    newGame = new Game()
    newGame.startGame()
})


