/// <reference types="vite/client" />

export type NodeInit = {
    id: string,
    group: number,
    label: string,
    level: number
}

export type LinkInit = {
    target: string,
    source: string,
    strength: number
}