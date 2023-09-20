import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import {Card} from "../Card/Card";
import {ThreeEvent} from "@react-three/fiber";

const Deck = memo(() => {
    const [selected, setSelected] = useState<null | number>(null);
    const selectedRef = useRef<null | number>(null)
    const [pushed, setPushed] = useState<null | number>(null);
    const prev = useRef<null | number>(null);
    const moveHandler = useCallback((e: ThreeEvent<PointerEvent>) => {
        const cord = e.uv?.x;

        if(cord){
            setSelected(Math.round((cord * 7)))
            selectedRef.current = Math.round((cord * 7))
        }
    }, []);

    const leaveHandler = useCallback((e: ThreeEvent<PointerEvent>) => setSelected(null),[])

useEffect(() => {
    if(pushed !== null){
        return () => void 0
    }
    const handler = (e: TouchEvent) => {
        const touch = e.touches[0];
        if(prev.current != null){
            if(prev.current - touch.clientY > 5){
                setPushed(selectedRef.current)
            }
        }

        prev.current = touch.clientY;
    }

    const endHandler = () => prev.current = null

    document.body.addEventListener('touchmove', handler);
    document.body.addEventListener('touchend', endHandler);
    return () => {
        document.body.removeEventListener('touchmove', handler);
        document.body.removeEventListener('touchend', endHandler);

    };
}, [pushed])

    return (
        <group>
            <mesh position={[0, -2, 0]}  onPointerMove={moveHandler} onPointerLeave={leaveHandler} onPointerDown={moveHandler}>
                <planeGeometry args={[3.5, 4]}/>
                <meshPhongMaterial color="#303030" opacity={0} transparent />
            </mesh>
            {new Array(7).fill(null).map((v, i) =>
                <Card key={i} index={i} isSelected={i === selected} isPushed={pushed === i}/>)}

        </group>
    )

})

export {Deck}