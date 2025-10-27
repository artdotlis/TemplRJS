import { z } from 'zod';

const DeckConfig = z.object({
    revealJs: z.object({
        defaultTiming: z.number().positive().optional(),
        totalTime: z.number().positive(),
    }),
    slides: z
        .array(
            z.object({
                md: z.string().min(1),
                dataSeparator: z.string().min(1),
                dataSeparatorVertical: z.string().min(1),
                dataSeparatorNotes: z.string().min(1),
            })
        )
        .nonempty(),
    charts: z.array(
        z.object({
            id: z.string().min(1),
            type: z.enum([
                'bar',
                'line',
                'scatter',
                'bubble',
                'pie',
                'doughnut',
                'polarArea',
                'radar',
            ]),
            data: z.string().min(1),
            options: z.any(),
        })
    ),
    citeJs: z.object({
        refsPerSection: z.array(z.number().min(1)),
        reference: z.string().min(1),
        language: z.string().min(1),
        style: z.string().min(1),
        template: z.string().min(1),
        local: z.string().min(1),
    }),
    footer: z.object({
        text: z.string().min(1),
        logoLeft: z.string(),
        logoRight: z.string(),
    }),
});

export default DeckConfig;
