import React, { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const NeuralSphere = memo(() => {
    const groupRef = useRef();
    const plexusRef = useRef();
    const nodesRef = useRef();

    // Create absolute stable geometry
    const geometry = useMemo(() => {
        const geo = new THREE.IcosahedronGeometry(2, 3);
        const positionAttribute = geo.getAttribute('position');
        for (let i = 0; i < positionAttribute.count; i++) {
            const jitter = 0.12;
            positionAttribute.setXYZ(
                i,
                positionAttribute.getX(i) + (Math.random() - 0.5) * jitter,
                positionAttribute.getY(i) + (Math.random() - 0.5) * jitter,
                positionAttribute.getZ(i) + (Math.random() - 0.5) * jitter
            );
        }
        return geo;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.1;
        }
        if (plexusRef.current && plexusRef.current.material) {
            // Use standard opacity instead of additive blending for extreme stability
            plexusRef.current.material.opacity = 0.4 + Math.sin(time * 1.5) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* 1. Luminous Core (AI Text) */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <Text
                    fontSize={0.8}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.03}
                    outlineColor="#4f46e5"
                >
                    AI
                </Text>
                <mesh>
                    <sphereGeometry args={[0.45, 16, 16]} />
                    <meshBasicMaterial
                        color="#4f46e5"
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </Float>

            {/* 2. Stabilized Neural Plexus */}
            <mesh ref={plexusRef} geometry={geometry}>
                <meshBasicMaterial
                    color="#4f46e5"
                    wireframe
                    transparent
                    opacity={0.5}
                    depthWrite={false}
                />
            </mesh>

            {/* 3. Stabilized Nodes */}
            <points geometry={geometry}>
                <pointsMaterial
                    size={0.08}
                    color="#ffffff"
                    transparent
                    opacity={0.8}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </points>

            {/* 4. Crystal Glass Shell */}
            <mesh>
                <sphereGeometry args={[2.06, 32, 32]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.05}
                />
            </mesh>

            <ambientLight intensity={1.5} />
        </group>
    );
});

export default NeuralSphere;
