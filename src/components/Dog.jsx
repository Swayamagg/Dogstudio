import { OrbitControls,useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React from 'react'

const Dog = () => {
  const model=useGLTF("/models/dog.drc.glb")
  useThree(({scene,camera,gl})=>{
     camera.position.z=0.55;
  })
  return (
    <>
        <primitive object={model.scene} position={[0.25,-0.55,0]} rotation={[0,Math.PI/3.9,0]} />
        <directionalLight position={[0,5,5]} color={0xFFFFFF} intensity={10}/>
        <OrbitControls/>
    </>
  )
}

export default Dog