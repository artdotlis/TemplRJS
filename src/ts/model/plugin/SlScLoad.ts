import $, { Cash } from 'cash-dom';

class SlScLoad implements PluginRJS {
    public id = 'SlScLoad';

    private readonly body: Cash;

    public constructor() {
        this.body = $('body');
    }

    public async init(): Promise<void> {
        const scp = $('section script');
        for (const scpEl of scp) {
            const scr = $('<script></script>');
            scr.html(scpEl.innerHTML);
            this.body.append(scr);
        }
    }
}

export default SlScLoad;
