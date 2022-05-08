import { Vector } from '@src/vector'
import { GradPair } from '@src/types'

export function SGD({
  targets,
  alpha = 1e-2,
}: {
  targets: Iterable<GradPair>
  alpha?: number
}) {
  return function* () {
    for (const { x, gx } of targets) {
      yield Vector.sub(x, Vector.mul(alpha, gx))
    }
  }
}
