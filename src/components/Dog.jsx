import * as Three from "three"
import { OrbitControls,useGLTF,useTexture,useAnimations } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React,{useEffect} from 'react'
import { normalMap, texture } from 'three/tsl'

const Dog = () => {
  const model=useGLTF("/models/dog.drc.glb")
  useThree(({scene,camera,gl})=>{
     camera.position.z=0.55;
     gl.toneMapping=Three.ReinhardToneMapping
     gl.outputColorSpace=Three.SRGBColorSpace
  })
 const {actions}= useAnimations(model.animations,model.scene)
 useEffect(()=>{
  actions["Take 001"].play()
 },[actions])
  // const textures=useTexture({
  //   normalMap:"/dog_normals.jpg",
  //   sampleMatCap:"/matcp/mat-2.png"
  // })
  const [normalMap,sampleMatCap]=(useTexture(["/dog_normals.jpg","/matcp/mat-2.png"])).map(texture =>{
    texture.flipY=false
    texture.colorSpace=Three.SRGBColorSpace
    return texture
  })
  model.scene.traverse((child)=>{
        if(child.name.includes("DOG")){
          child.material=new Three.MeshMatcapMaterial({
            normalMap:normalMap,
            matcap:sampleMatCap
          })
        }
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