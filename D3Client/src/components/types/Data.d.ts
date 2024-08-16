export type D3NodeInit = {
    id: string,
    level: number,
    index: number,
    x: number,
    y: number,
    vy: number,
    vx: number
}

export type NodeInit = {
    id: string,
    group: number,
    label: string,
    level: number
}

export type LinkInit = {
    target: D3NodeInit | string,
    source: D3NodeInit | string,
    strength: number
}