import { Vector } from '@src/vector'
import { GradPair } from '@src/types'
import { clip, map } from '@src/utils'
import { OptimizerState } from './types'

type AdaBoundState = OptimizerState<'m' | 'v' | 'eta'>

export function AdaBound({
  targets,
  alpha = 1,
  beta1 = 0.9,
  beta2 = 0.999,
  epsilon = 1e-8,
}: {
  targets: Iterable<GradPair>
  alpha?: number
  beta1?: number
  beta2?: number
  epsilon?: number
}) {
  let t = 1
  const bank = [
    ...map(
      targets,
      ({ x }: GradPair): AdaBoundState => ({
        eta: Vector.zeros(x.length),
        m: Vector.zeros(x.length),
        v: Vector.zeros(x.length),
      }),
    ),
  ]

  return function* () {
    const beta1t = beta1 / t
    const etaL = 0.1 - 0.1 / ((1 - beta2) * t + 1)
    const etaU = 0.1 + 0.1 / ((1 - beta2) * t)

    let i = 0
    for (const { x, gx } of targets) {
      const state = bank[i++]

      // m := beta1t * m + (1 - beta1t) * gx
      state.m = Vector.add(Vector.mul(beta1t, state.m), Vector.mul(1 - beta1t, gx))

      // v := beta2 * v + (1 - beta2) * gx^2
      state.v = Vector.add(
        Vector.mul(beta2, state.v),
        Vector.mul(1 - beta2, Vector.mul(gx, gx)),
      )

      const Vt = Vector.sum(state.v) + epsilon
      const eta = clip(alpha / Math.sqrt(Vt), { min: etaL, max: etaU }) / Math.sqrt(t)

      // x := x - eta * m
      yield Vector.sub(x, Vector.mul(eta, state.m))
    }

    t++
  }
}
