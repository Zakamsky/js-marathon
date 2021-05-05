class Selectors {
    constructor(name) {
        this.elName = document.getElementById(`name-${name}`)
        this.elImg = document.querySelector(`.${name} .sprite`)
        this.elHP = document.getElementById(`health-${name}`)
        this.elProgressBar = document.getElementById(`progressbar-${name}`)
    }
}

class Pokemon extends Selectors{
    constructor({ name, id, hp, type, img, selectors, attacks = [] }) {
        super(selectors)
        this.name = name
        this.id = id
        this.hp = {
            current: hp,
            total: hp,
        }
        this.img = img
        this.type = type,
        this.attacks = attacks,
        this.renderPokemon()
    }

    renderPokemon = () => {
        this.renderHPLife()
        this.renderProgressBar()
        this.renderFaceName()
    }

    renderHPLife = () => {
        const {elHP, hp: {current, total}} = this
        elHP.innerText = current + ' / ' + total
    }

    renderProgressBar = () => {
        const {hp: {current, total}, elProgressBar} = this
        let progressWidth = current / (total / 100)
        elProgressBar.style.width = progressWidth + '%'
        if (progressWidth < 60 && progressWidth > 20 ) {
            elProgressBar.classList.add('low')
        } else if (progressWidth <= 20) {
            elProgressBar.classList.add('critical')
        } else {
            elProgressBar.classList.remove('low', 'critical')
        }

        //В методе renderProgressbarHP допиши условия, если жизней меньше 60 но больше 20 то добавляй класс .low, если меньше 20 то класс .critical
    }
    renderFaceName = () => {
        const { elName, elImg } = this
        elName.innerText = this.name
        elImg.src = this.img
    }

    changeHP = (count, cb) => {
        this.hp.current -= count
        let looser = false

        if (this.hp.current <= 0) {
            this.hp.current = 0
            looser = this.name
        }
        this.renderPokemon()
        cb && cb(count, looser)
    }
}

export default Pokemon