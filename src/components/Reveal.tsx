import { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
}

export const Reveal = ({ children, width = "fit-content", delay = 0 }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update state based on intersection status
                // This creates the "every scroll" effect: 
                // - Fades in when entering
                // - Fades out (resets) when leaving, so it can fade in again next time
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref} style={{ width, position: "relative", overflow: "hidden" }}>
            <div
                style={{
                    transform: isVisible ? "translateY(0)" : "translateY(75px)",
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
                }}
            >
                {children}
            </div>
        </div>
    );
};
