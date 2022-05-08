import { AdaBound } from '@src/optimizer/adabound'
import { forEach } from '@src/utils'
import { Vector } from '@src/vector'

let test = [{ x: [0.5, 3.0] as Vector, gx: Vector.zeros(2) }]

function f(x: Vector): number {
  return x[0] ** 2 + x[1] ** 2 * (Math.sin(x[0]) + 1)
}

function gf(x: Vector): Vector {
  return [2 * x[0] + x[1] ** 2 * Math.cos(x[0]), 2 * x[1] * (Math.sin(x[0]) + 1)]
}

const run = AdaBound({
  targets: test,
})

let i = 0
let err = f(test[0].x)
while (err >= 1e-16) {
  test[0].gx = gf(test[0].x)

  forEach(run(), (x, i) => {
    test[i].x = x
  })

  err = f(test[0].x)

  console.log(`${i++}: ${err}`)
}
