const scheme = require('./scheme')

const cart = new (require('./cart'))(scheme)
const template = require('./template')
const map = new (require('./map'))(cart, {
    xBorder: 1000,
    yBorder: 1000
})

console.log('\n...Templates...\n')

template.square(cart, 300, 3)
// template.snake(cart, 3, 3, 2)

/* cart.moveX(1, 5)
    .then(() => {
        return cart.moveY(1, 5)
    })
    .then(() => {
        return cart.moveX(0, 5)
    })
    .then(() => {

    })
    .catch(error => {

    }) */



/* console.log('\n...Map...\n')

let points = [{
    x: 3,
    y: 3
}, {
    x: 5,
    y: 4
}, {
    x: 0,
    y: 1000
}]

map.followMap(points) */