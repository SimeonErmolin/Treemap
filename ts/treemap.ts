import { getCoinData } from './network';
import { CoinCategory } from './interfaces';
import {renderVisualization} from "./visualization";

getCoinData().then((data: CoinCategory[]) => {
  renderVisualization(data)

  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.style.position = 'absolute';
  tooltip.style.display = 'none';
  tooltip.style.pointerEvents = 'none';
  document.body.appendChild(tooltip);

  const leafElements = document.querySelectorAll('g');

  leafElements.forEach((leaf: any) => {
    leaf.addEventListener('mouseover', (event: any) => {
      const d = event.target.__data__;
      const icons = d.data.top_3_coins;
      const mouseX = event.pageX;
      const mouseY = event.pageY;

      tooltip.innerHTML = '';

      icons.forEach((icon: any) => {
        const img = document.createElement('img');
        img.src = icon;
        img.width = 30;
        img.height = 30;
        img.style.marginRight = '5px';
        tooltip.appendChild(img);
      });

      tooltip.style.left = mouseX + 'px';
      tooltip.style.top = mouseY + 'px';
      tooltip.style.display = 'block';
    });

    leaf.addEventListener('mousemove', (event: any) => {
      const mouseX = event.pageX;
      const mouseY = event.pageY;

      tooltip.style.left = mouseX + 'px';
      tooltip.style.top = mouseY + 'px';
    });

    leaf.addEventListener('mouseout', () => {
      tooltip.style.display = 'none';
    });
  });
});
