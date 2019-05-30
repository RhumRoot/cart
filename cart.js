const Driver = require('./driver')



class Cart {
    constructor(scheme) {
        if (!Array.isArray(scheme)) throw new Error('You should specify cart scheme.')

        console.log(`[cart] ~~~ Cart setting up with the scheme:`, JSON.stringify(scheme, null, 2))

        this.driversX = []
        this.driversY = []

        scheme.forEach(options => {
            switch (options.axis) {
                case 'x':
                    this.driversX.push(new Driver(options))
                    break
                case 'y':
                    this.driversY.push(new Driver(options))
                    break
                default:
                    throw new Error(`You should specify an axis option on driver #${options.id}`)
            }
        })
    }

    moveX(dir, steps) {
        return new Promise((resolve, reject) => {
            console.log(`[cart] ~~~ Moving X with ${dir} for ${steps} steps`)

            this.driversX.forEach(driver => {
                driver.setDir(dir)
                    .then(() => {
                        return driver.move(steps)
                    })
                    .then(time => {
                        console.log(`[cart] ~~~ Moving X with #${driver.id} ${dir} for ${steps} steps is complited with time: ${time}ms`)
                        resolve()
                    })
                    .catch(error => {
                        console.error(`An error occured while moving along X at driver #${driver.id}:`)
                        console.error(error)
                        reject(error)
                    })
            })
        })
    }

    moveY(dir, steps) {
        return new Promise((resolve, reject) => {
            console.log(`[cart] ~~~ Moving Y with ${dir} for ${steps} steps`)

            this.driversY.forEach(driver => {
                driver.setDir(dir)
                    .then(() => {
                        return driver.move(steps)
                    })
                    .then(time => {
                        console.log(`[cart] ~~~ Moving Y with #${driver.id} ${dir} for ${steps} steps is complited with time: ${time}ms`)
                        resolve()
                    })
                    .catch(error => {
                        console.error(`An error occured while moving along Y at driver #${driver.id}:`)
                        console.error(error)
                        reject(error)
                    })
            })
        })
    }

    setXDir(dir) {
        this.driversX.forEach(driver => {
            driver.setDir(dir)
                .then(() => { })
                .catch(error => {
                    console.error(`[cart] ~~~ An error occured while setting X direction:`)
                    console.error(error)
                })
        })
    }

    setYDir(dir) {
        this.driversY.forEach(driver => {
            driver.setDir(dir)
                .then(() => { })
                .catch(error => {
                    console.error(`[cart] ~~~ An error occured while setting X direction:`)
                    console.error(error)
                })
        })
    }

    stepX() {
        return new Promise((resolve, reject) => {
            console.log(`[cart] ~~~ Stepping X`)

            this.driversX.forEach(driver => {
                driver.move(1)
                    .then(time => {
                        resolve()
                    })
            })
        })
    }

    stepY() {
        return new Promise((resolve, reject) => {
            console.log(`[cart] ~~~ Stepping Y`)

            this.driversY.forEach(driver => {
                driver.move(1)
                    .then(time => {
                        resolve()
                    })
            })
        })
    }
}



module.exports = Cart