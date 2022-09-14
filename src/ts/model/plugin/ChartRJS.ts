import $ from 'cash-dom';
import { ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import KnownError from '../../constants/known_error';

class ChartRJS implements PluginRJS {
    public readonly id: string;

    private readonly ch_type: ChartType;

    private readonly data: Promise<string>;

    private readonly options: object;

    constructor(id: string, ch_type: ChartType, data: Promise<string>, options?: object) {
        this.id = id;
        this.ch_type = ch_type;
        this.data = data;
        this.options = options || {};
    }

    private getCanvas(): CanvasRenderingContext2D {
        const con = $(`#${this.id}`).get(0);
        if (!(con instanceof HTMLCanvasElement)) {
            throw new KnownError('container is not a canvas');
        }
        const ctx = con.getContext('2d');
        if (ctx === null) {
            throw new KnownError('canvas has no 2d context');
        }
        return ctx;
    }

    public async init(): Promise<void> {
        const res = await this.data;
        const config = {
            type: this.ch_type,
            data: JSON.parse(res),
            options: this.options,
        };
        (() => new Chart(this.getCanvas(), config))();
    }
}

export default ChartRJS;
