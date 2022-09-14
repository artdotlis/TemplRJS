import { ChartConf } from '../interfaces/configuration';
import ChartRJS from './plugin/ChartRJS';
import getChartData from './fun/charts';

class ChartsJs {
    private readonly root: string;

    private readonly chartsConf: ChartConf[];

    private readonly plugCon: PluginRJS[];

    constructor(chartsConf: ChartConf[], root: string) {
        this.root = root;
        this.chartsConf = chartsConf;
        this.plugCon = this.initPlugins();
    }

    private initPlugins(): PluginRJS[] {
        const con: PluginRJS[] = [];
        for (const conf of this.chartsConf) {
            con.push(
                new ChartRJS(
                    conf.id,
                    conf.type,
                    getChartData(conf.id, this.root, conf.data),
                    conf.options
                )
            );
        }
        return con;
    }

    public get plugins(): PluginRJS[] {
        return this.plugCon;
    }
}

export default ChartsJs;
