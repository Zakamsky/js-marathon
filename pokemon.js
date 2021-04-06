class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`)
        this.elProgressBar = document.getElementById(`progressbar-${name}`)
    }
}

class Pokemon extends Selectors{
    constructor({name, hp, type, selectors}) {
        super(selectors)
        this.name = name
        this.hp = {
            current: hp,
            total: hp,
        }
        this.type = type
        this.renderHealth()
    }

    renderHealth = () => {
        this.renderHPLife()
        this.renderProgressBar()
    }

    renderHPLife = () => {
        const {elHP, hp: {current, total}} = this
        elHP.innerText = current + ' / ' + total
    }

    renderProgressBar = () => {
        const {hp: {current, total}, elProgressBar} = this
        let progressWidth = current / (total / 100)
        elProgressBar.style.width = progressWidth + '%'
    }

    changeHP = (count, cb) => {
        this.hp.current -= count
        let looser = false

        if (this.hp.current <= 0) {
            this.hp.current = 0
            looser = this.name
        }
        this.renderHealth()
        cb && cb(count, looser)
    }
}

export default Pokemon