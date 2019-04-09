let GPIO = require('onoff').Gpio
if (!GPIO.accessible) GPIO = require('./gpio-mock')



/**
 * Driver adapter
 * Implementation of all low-level driver functioning...
 */
class Driver {
    /**
     * Driver privite properties init
     * 
     * @typedef Options
     * @type {object}
     * @property {number} id - driver id for debugging reasons
     * @property {number} stepPin - GPIO pin for step 
     * @property {number} dirPin - GPIO pin for direction
     * @property {number} dir - initial direction - [0|1]
     * @property {number} delay - delay after steps in ms
     * 
     * @param {Options} options - driver setup options from predefined cart's scheme 
     */
    constructor(options) {
        if (!options.dirPin || !options.stepPin) throw new Error('You should specify id as a both dirPin and stepPin while setting up driver.')

        console.log(`[driver] ~~~ Driver #${options.id} setup`, JSON.stringify(options, null, 2))

        this.id = options.id

        // stepPin and step state (impulse level)
        this._stepPin = options.stepPin
        this._step = 0

        this._dirPin = options.dirPin
        // TODO: Reverse direcion logic; We need to encapsulate direction to simply set direcion along x,y - axis avoiding driver's side
        this._reversed = options.reversed || false
        this._dir = options.dir || 0
        if (this._reversed) this._dir = this._dir ^ 1

        this._delay = options.delay || 10

        this.setup()
    }

    /**
     * GPIO initialization and direction setting up 
     */
    setup() {
        this.STEP = new GPIO(this._stepPin, 'out')

        this.DIR = new GPIO(this._dirPin, 'out')
        this.DIR.write(this._dir)
    }



    makeStep() {
        this.STEP.write(this._step)
            .then(() => {
                this._step = this._step ^ 1
            })
            .catch(error => {
                console.error('An error occured while making step in a driver:')
                console.error(error)
            })
    }

    setDir(dir = 0) {
        if (this._reversed) dir = dir ^ 1

        console.log(`[driver] ~~~ Setting up direction in #${this.id} to ${dir} (${this._reversed ? this._dir ^ 1 : this._dir} on axis)`)

        if (this._dir != dir) {
            this._dir = dir

            return this.DIR.write(this._dir)
        } else return Promise.resolve()
    }

    changeDir() {
        console.log(`[driver] ~~~ Changing direction in #${this.id} to ${this._dir ^ 1} (${this._reversed ? this._dir ^ 1 : this._dir} on axis)`)

        this._dir = this._dir ^ 1

        return this.DIR.write(this._dir)
    }



    move(steps) {
        return new Promise((resolve, reject) => {
            console.log(`[driver] ~~~ Moving #${this.id} for ${steps} steps`)
            let timestamp = Date.now()

            let interval = setInterval(() => {
                if (steps > 0) {
                    this.makeStep()
                    steps--
                } else {
                    clearInterval(interval)
                    resolve(Date.now() - timestamp)
                }
            }, this._delay)
        })
    }
}



module.exports = Driver