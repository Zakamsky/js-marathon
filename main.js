import Pokemon from "./pokemon.js";
import random from "./util.js";

const player = new Pokemon({
    name: 'Pickachu',
    type: 'electric',
    hp: 500,
    selectors: 'character',
})

const enemy = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 450,
    selectors: 'enemy',
})

console.log(player)
console.log(enemy)


const $getElById = (id) => document.getElementById(id);
const $getElBySelector = (selector) => document.querySelector(selector)
const $getElBySelectorAll = (selector) => document.querySelectorAll(selector)


const $btn = $getElById('btn-kick')
const $buttons = $getElBySelectorAll('.btn-kick')
const $logs = $getElById('logs')

$buttons.forEach( $btn => {

    const btnCounter = countButton(8, $btn)

    $btn.addEventListener('click', function() {

        let randPerson = random(10) % 2 === 0 ? player : enemy
        randPerson.changeHP(random(80, 20), function(count, looser) {
            if (randPerson === enemy) {
                generatedLog( enemy, player, count, looser )
            } else {
                generatedLog( player, enemy, count, looser )
            }
            if (looser) {
                $buttons.forEach(btn => {
                    btn.disabled = true
                })
            }
        })

         btnCounter()
    })
})

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
