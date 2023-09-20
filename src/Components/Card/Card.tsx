import {memo, useEffect, useRef, useState} from "react";
import {useFrame, useStore} from "@react-three/fiber";
import {Color, PlaneGeometry} from "three";

interface ICardProps {
    index: number;
    isSelected: boolean;
}

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
]

const Card = memo<ICardProps>(({index, isSelected}) => {
    const geomRef = useRef<PlaneGeometry | null>(null)
    const [shift, setShift] = useState(0);

    const defaultRotation = (3 - index ) * (Math.PI / 10)

    const [rotateY, setRotateY] = useState(defaultRotation);

    console.log(defaultRotation)
    useEffect(() => {
        geomRef.current?.translate(0, 0.8, 0)
    }, []);

    useFrame(() => {
        if(isSelected){
            if(shift < 1){
                const max = 3;
                setShift((c) => c < max ? c + 0.1 : max);
            }

            //rotation to 0
            const min = 0.0001
            setRotateY((c) => Math.abs(c) > min ? c / 1.3 : 0)
        }else{
            if(shift > 0){
                setShift((c) => c > 0 ? c - 0.1 : 0);
            }

            setRotateY((current) => {
                const isBigger = Math.abs(defaultRotation) - Math.abs(current) <= 0;
                if(isBigger){
                    return defaultRotation
                }
                const dir = defaultRotation > 0 ? 1 : -1;
                return current + (0.1 * dir);
            })
        }
    })



    return (
        <mesh rotation={[0, 0, rotateY]} position={[0, -2.4 + shift, 0]}>
            <planeGeometry args={[0.71428571428 * 1.5, 1.5]} ref={geomRef}/>
            <meshBasicMaterial color={colors[index]}/>
        </mesh>
    )
})

export {Card}