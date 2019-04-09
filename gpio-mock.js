class GPIO {
    constructor(pin, direction) {
        console.log(`[gpio-mock] ~~~ Setting up GPIO on ${pin} ${direction}`)

        this._pin = pin
        this._direction = direction
    }

    write(value) {
        console.log(`[gpio-mock] ~~~ Writing ${value} in GPIO ${this._pin}`)

        return Promise.resolve()
    }
}

module.exports = GPIO