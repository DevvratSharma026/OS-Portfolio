import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

function AuroraPlane() {
  const materialRef = useRef()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;

      float noise(vec2 p){
        return sin(p.x) * sin(p.y);
      }

      void main(){
        vec2 uv = vUv;

        float t = uTime * 0.25;

        float n = noise(vec2(uv.x * 8.0 + t, uv.y * 6.0));

        float glow = smoothstep(0.2,0.9,n);

        vec3 col1 = vec3(0.6,0.5,1.0);
        vec3 col2 = vec3(0.8,1.0,0.8);
        vec3 col3 = vec3(0.6,0.3,1.0);

        vec3 color = mix(col1,col2,glow);
        color = mix(color,col3,uv.y);

        gl_FragColor = vec4(color * glow, 0.55);
      }
    `,
    transparent: true
  })

  return (
    <mesh>
      <planeGeometry args={[10,10]} />
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  )
}

export default function AuroraShader() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none"
      }}
    >
      <Canvas camera={{ position: [0,0,2] }}>
        <AuroraPlane />
      </Canvas>
    </div>
  )
}