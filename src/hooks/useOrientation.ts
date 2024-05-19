import { useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export enum Orientation {
    PORTRAIT = "PORTRAIT",
    LANDSCAPE = "LANDSCAPE",
}

export const useOrientation = () => {
    const [currentOrientation, setCurrentOrientation] = useState<Orientation>(Orientation.PORTRAIT);

    const getOrientation = async () => {
        const orientation = await ScreenOrientation.getOrientationAsync();
        switch (orientation) {
            case ScreenOrientation.Orientation.PORTRAIT_UP:
            case ScreenOrientation.Orientation.PORTRAIT_DOWN:
                return Orientation.PORTRAIT;
            case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
            case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
                return Orientation.LANDSCAPE;
            default:
                return Orientation.PORTRAIT;
        }
    };

    const handleOrientationSet = async () => {
        const orientation = await getOrientation();
        setCurrentOrientation(orientation);
    };

    useEffect(() => {
        handleOrientationSet();
        
        const subscription = ScreenOrientation.addOrientationChangeListener(async () => {
            const orientation = await getOrientation();
            setCurrentOrientation(orientation);
        });

        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        };
    }, []);
    
    return { currentOrientation };
};
