import React, {memo, useCallback, useState} from "react";
import {Card} from "../Card/Card";
import {ThreeEvent} from "@react-three/fiber";

const Deck = memo(() => {
    const [selected, setSelected] = useState<null | number>(null)

    const moveHandler = useCallback((e: ThreeEvent<PointerEvent>) => {
        const cord = e.uv?.x;

        if(cord){
            setSelected(Math.round((cord * 7)))
        }
    }, []);

    const leaveHandler = useCallback(() => setSelected(null),[])


    return (
        <group>
            <mesh position={[0, -2, 0]}  onPointerMove={moveHandler} onPointerLeave={leaveHandler} onPointerDown={moveHandler}>
                <planeGeometry args={[3.5, 4]}/>
                <meshPhongMaterial color="#303030" opacity={0} transparent />
            </mesh>
            {new Array(7).fill(null).map((v, i) => <Card key={i} index={i} isSelected={i === selected}/>)}

        </group>
    )

})

export {Deck}