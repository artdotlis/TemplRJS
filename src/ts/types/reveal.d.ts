declare global {
    interface RevealT {
        initialize(): Promise<void>;
        on(type: string, callback: () => void): void;
        slide(indexh: number, indexv: number, indexf: number): void;
        sync(): void;
        isFirstSlide(): boolean;
        isLastSlide(): boolean;
        getCurrentSlide(): SlideElement;
        addKeyBinding(binding: object, callback: () => void): void;
    }
    interface SlideElement extends HTMLElement {
        slideBackgroundElement: HTMLElement;
    }
    interface PluginRJS {
        id: string;
        init?: (deck: RevealT) => Promise<void>;
        destroy?: () => void;
    }
}

export {};
