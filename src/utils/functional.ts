export function forEach<T>(
  iterable: Iterable<T>,
  cb: (value: T, index: number) => boolean | void,
) {
  let i = 0
  for (const v of iterable) {
    if (cb(v, i++)) return
  }
}

export function* map<T, R>(iterable: Iterable<T>, cb: (value: T, index: number) => R) {
  let i = 0
  for (const v of iterable) {
    yield cb(v, i++)
  }
}

export function* filter<T>(iterable: Iterable<T>, cb: (value: T, index: number) => boolean) {
  let i = 0
  for (const v of iterable) {
    if (cb(v, i++)) yield v
  }
}

export function reduce<T, R>(
  iterable: Iterable<T>,
  cb: (acc: R, value: T, index: number) => R,
  initialAcc: R,
) {
  let acc = initialAcc
  let i = 0
  for (const v of iterable) {
    acc = cb(acc, v, i++)
  }
  return acc
}
