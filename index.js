const scheme = require('./scheme')

const cart = new (require('./cart'))(scheme)

console.log('\n...Templates...\n')

cart.moveX(1, 5)
    .then(() => {
        return cart.moveY(1, 5)
    })
    .then(() => {
        return cart.moveX(0, 5)
    })
    .then(() => {

    })
    .catch(error => {

    })