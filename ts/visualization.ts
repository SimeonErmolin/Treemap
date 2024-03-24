import * as d3 from 'd3';
import { html, render } from 'lit';
import { CoinCategory } from './interfaces';

export function renderVisualization(data: CoinCategory[]): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;

    const treemap = (data: CoinCategory[]) =>
        d3.treemap().size([width, height])(
            d3
                .hierarchy({ children: data })
                .sum((d: any) => d.market_cap)
                .sort((a: any, b: any) => b.market_cap - a.market_cap)
        );

    const root = treemap(data);

    const template = (root: any) => html`
        <svg>
            ${root.leaves().map(
                    (d: any) => html`
                        <g transform="translate(${d.x0},${d.y0})">
                            <rect class="rect"
                                  fill="${d.data.market_cap_change_24h >= 0 ? '#008000' : '#ff0000'}"
                                  width="${d.x1 - d.x0}"
                                  height="${d.y1 - d.y0}"
                            ></rect>
                            <foreignObject
                                    width="${d.x1 - d.x0}"
                                    height="${d.y1 - d.y0}">
                                <div class="container"
                                     style="
                                                width: ${d.x1 - d.x0}px; 
                                                height: ${d.y1 - d.y0}px;">
                                    <span class="text">${d.data.name}</span>
                                </div>
                            </foreignObject>
                            <text class="text"
                                  x="${(d.x1 - d.x0) / 2}"
                                  y="${(d.y1 - d.y0) / 2 + Math.min(
                                          20,
                                          Math.min(d.x1 - d.x0, d.y1 - d.y0) / 8
                                  ) * 1.5}"
                                  text-anchor="middle"
                                  dominant-baseline="middle"
                            >
                                ${d.data.market_cap_change_24h !== null
                                        ? `${d.data.market_cap_change_24h.toFixed(2)}%`
                                        : ''}
                            </text>
                        </g>
                    `
            )}
        </svg>
    `;

    const container = document.body;

    const update = (root: any) => {
        render(template(root), container);
    };

    update(root);
}