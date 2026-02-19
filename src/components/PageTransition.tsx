import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) {
            setTransitionStage("fadeOut");
        }
    }, [location, displayLocation]);

    const onAnimationEnd = () => {
        if (transitionStage === "fadeOut") {
            setTransitionStage("fadeIn");
            setDisplayLocation(location);
        }
    };

    return (
        <div
            className={`transition-opacity duration-700 ease-in-out ${transitionStage === "fadeIn" ? "opacity-100" : "opacity-0"
                }`}
            onTransitionEnd={onAnimationEnd}
        >
            {children}
        </div>
    );
};

export default PageTransition;
