module.exports.square = async (cart, length, times = 1) => {
    while (times-- > 0) {
        console.log(`[template->square] ~~~ Making square`)

        await cart.moveX(1, length)
        await cart.moveY(1, length)
        await cart.moveX(0, length)
        await cart.moveY(0, length)
    }
}

module.exports.snake = async (cart, height, length, times = 2) => {
    while (times-- > 0) {
        console.log(`[template->snake] ~~~ Making snake turn`)

        await cart.moveX(1, height)
        await cart.moveY(1, length)
        await cart.moveX(0, height)
        await cart.moveY(1, length)
    }
}