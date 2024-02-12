import * as React from 'react'
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, useTexture } from '@react-three/drei'
import { easing } from 'maath'
import { getImage } from "gatsby-plugin-image"

function Image({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const texture = useTexture(url)

  useFrame((state, delta) => {
    easing.damp(ref.current.material, 'distort', hovered ? 0.5 : 0, 0.25, delta)
    easing.damp(ref.current.material, 'speed', hovered ? 4 : 0, 0.25, delta)
    easing.dampE(ref.current.rotation, clicked ? [0, 0, Math.PI / 2] : [0, 0, 0], 0.5, delta)
    easing.damp3(ref.current.scale, clicked ? 15 : 10, 0.25, delta)
    easing.dampC(ref.current.material.color, hovered ? '#ef2060' : 'white', 0.25, delta)
  })
  
  return (
    <mesh
      ref={ref}
      onClick={(e) => (e.stopPropagation(), click(!clicked))}
      onPointerOver={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={(e) => (e.stopPropagation(), hover(false))}
      {...props}
      >
      <planeGeometry args={[1, 1, 64, 64]} />
      <MeshDistortMaterial map={texture} speed={4} toneMapped={false} />
    </mesh>
  )
} 

export default function Three_effect({ img }) {
  console.log(JSON.stringify(img))

  return (
    <Canvas camera={{ position: [0, 0, 12] }}>
      <ambientLight intensity={Math.PI} />
      <Image url={getImage(img.node)} position={[-4, -2, -2]} />
    </Canvas>
  )
}