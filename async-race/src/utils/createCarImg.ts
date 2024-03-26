
export default function createCarImg(color: string, width: string, height: string): SVGSVGElement {
    const carImg: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    
    use.setAttribute('href', '../assets/sprite-car.svg#car');
    carImg.append(use);
    carImg.setAttribute('fill', color);
    carImg.setAttribute('width', width);
    carImg.setAttribute('height', height);
    return carImg;
}
