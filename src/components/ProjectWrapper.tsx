import { useEffect, useRef } from "react";
type Props = {
    children: React.ReactNode;
}

export function ProjectWrapper(props: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current!;
        let lastFrameTime = performance.now();
        let currentScrollTop = 0;
        let frameId = requestAnimationFrame(onUpdate);
        let timeoutId: number | undefined;

        function onUpdate() {
            const now = performance.now();
            const deltaTime = now - lastFrameTime;

            currentScrollTop += deltaTime * 0.05;
            wrapper.scrollTop = Math.round(currentScrollTop);
            lastFrameTime = now;
            frameId = requestAnimationFrame(onUpdate);
        }

        function onScroll() {
            if (Math.round(currentScrollTop) === wrapper.scrollTop) {
                return;
            }

            currentScrollTop = wrapper.scrollTop;
            cancelAnimationFrame(frameId);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastFrameTime = performance.now();
                frameId = requestAnimationFrame(onUpdate);
            }, 1000);
        }

        wrapper.addEventListener("scroll", onScroll);


        return () => {
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div ref={wrapperRef} className="project-wrapper grid grid-cols-2 w-1/2 gap-x-[40px] overflow-y-scroll">
            {props.children}
        </div>
    )
}