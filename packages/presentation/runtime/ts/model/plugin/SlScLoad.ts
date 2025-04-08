class SlScLoad implements PluginRJS {
    public id = 'SlScLoad';

    private readonly body: HTMLElement;

    public constructor() {
        this.body = document.body;
    }

    public async init(): Promise<void> {
        for (const section of document.getElementsByTagName('section')) {
            for (const scriptEl of section.getElementsByTagName('script')) {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.innerHTML = scriptEl.innerHTML;
                this.body.appendChild(script);
            }
        }
    }
}

export default SlScLoad;
