import { clip as clipScalar } from '@src/utils'

export type Vector = number[]

type BinaryOperator = (e1: number, e2: number) => number

function binary(v1: Vector | number, v2: Vector | number, op: BinaryOperator): Vector | number {
  if (typeof v1 === 'number') {
    if (typeof v2 === 'number') {
      return op(v1, v2)
    }
    return binary(v2, v1, op)
  }
  if (typeof v2 === 'number') {
    return v1.map((e) => op(e, v2))
  }
  return v1.map((e, i) => op(e, v2[i]))
}

export namespace Vector {
  export function add(v1: Vector, v2: Vector): Vector
  export function add(v: Vector, s: number): Vector
  export function add(s: number, v: Vector): Vector
  export function add(s1: number, s2: number): number

  export function add(v1: any, v2: any): any {
    return binary(v1, v2, (e1, e2) => e1 + e2)
  }

  export function sub(v1: Vector, v2: Vector): Vector
  export function sub(v: Vector, s: number): Vector
  export function sub(s: number, v: Vector): Vector
  export function sub(s1: number, s2: number): number

  export function sub(v1: any, v2: any): any {
    return binary(v1, v2, (e1, e2) => e1 - e2)
  }

  export function mul(v1: Vector, v2: Vector): Vector
  export function mul(v: Vector, s: number): Vector
  export function mul(s: number, v: Vector): Vector
  export function mul(s1: number, s2: number): number

  export function mul(v1: any, v2: any): any {
    return binary(v1, v2, (e1, e2) => e1 * e2)
  }

  export function div(v1: Vector, v2: Vector): Vector
  export function div(v: Vector, s: number): Vector
  export function div(s: number, v: Vector): Vector
  export function div(s1: number, s2: number): number

  export function div(v1: any, v2: any): any {
    return binary(v1, v2, (e1, e2) => e1 / e2)
  }

  export function dot(v1: Vector, v2: Vector): number {
    return v1.reduce((acc, e, i) => acc + e * v2[i], 0)
  }

  export function sum(v: Vector): number {
    return v.reduce((acc, e) => acc + e, 0)
  }

  export function size(v: Vector): number {
    return Math.sqrt(dot(v, v))
  }

  export function clip(v: Vector, option: { min?: number; max?: number }): Vector {
    return v.map((e) => clipScalar(e, option))
  }

  export function constants(value: number, length: number): Vector {
    return Array.from(new Array(length), () => value)
  }

  export function zeros(length: number): Vector {
    return constants(0, length)
  }

  export function ones(length: number): Vector {
    return constants(1, length)
  }
}
