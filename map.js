const async = require('async')

class Map {
    constructor(cart, options) {
        if (!cart) throw new Error('You should specify cart.')

        console.log(`[map] ~~~ Map init with options:`, JSON.stringify(options, null, 2))

        this.x = 0
        this.y = 0

        this.xBorder = options.xBorder
        this.yBorder = options.yBorder

        this.cart = cart
    }

    followMap(points) {
        console.log(`[map -> followMap()] ~~~ Points:`, JSON.stringify(points, null, 2))

        async.eachSeries(points, (point, callback) => {
            if (!this.checkPoint(point)) return false

            this.followPoint(point, () => {
                callback()
            })
        }, error => {
            console.error(`[map -> followMap()] ~~~ error while iterating`)
            console.error(error)
        })
    }

    checkPoint(point) {
        if ((point.x < 0 || point.x > this.xBorder) || (point.y < 0 || point.y > this.yBorder)) {
            console.log(`[map -> checkPoint()] ~~~ Point exceed borders:`, JSON.stringify(point, null, 2))
            return false
        }

        console.log(`[map -> checkPoint()] ~~~ OK`)

        return true
    }

    followPoint(point, cb) {
        console.log(`\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n`)
        console.log(`[map -> followPoint()] ~~~ following to point:`, JSON.stringify({ from: { x: this.x, y: this.y }, to: point }, null, 2))


        // Defining a vector relative to our x,y position 
        let vector = {
            x: point.x - this.x,
            y: point.y - this.y
        }

        let direction = {
            x: vector.x >= 0 ? 1 : 0,
            y: vector.y >= 0 ? 1 : 0
        }

        // Defining max number of steps to make this move
        let steps = Math.abs(vector.x) > Math.abs(vector.y) ? Math.abs(vector.x) : Math.abs(vector.y)

        // Speed per step
        let speed = {
            x: Math.abs(vector.x) / steps,
            y: Math.abs(vector.y) / steps
        }

        // Values to check readiness to make the discrete step
        let interim = {
            x: 0,
            y: 0
        }

        this.cart.setXDir(direction.x)
        this.cart.setYDir(direction.y)

        console.log(`[map -> followPoint()] ~~~ Settings:`, JSON.stringify({ vector, direction, steps, speed }, null, 2), '\n')

        async.times(steps, (n, next) => {
            interim.x += speed.x
            interim.y += speed.y

            if (interim.x >= 1) {
                interim.x -= 1

                this.cart.stepX()
                direction.x ? this.x++ : this.x--
            }


            if (interim.y >= 1) {
                interim.y -= 1

                this.cart.stepY()
                direction.y ? this.y++ : this.y--
            }

            console.log(`[map -> followPoint()] ~~~ Stepping ${n}:`, JSON.stringify({ position: { x: this.x, y: this.y }, interim }, null, 2), '\n')

            next()
        }, () => {
            cb()
        })
    }
}



module.exports = Map