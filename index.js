const scheme = require('./scheme')

const cart = new (require('./cart'))(scheme)
const template = require('./template')

console.log('\n...Templates...\n')

// template.square(cart, 3, 2)
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