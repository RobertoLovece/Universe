import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin);

export function cssInit() {

    const border = CSSRulePlugin.getRule('.content:before');
    const h1 = document.querySelector('h1');
    const p = document.querySelector('p');
    const u = document.querySelector('u')
    const tl = gsap.timeline();

    tl.from(border, { delay: 1, duration: 4, cssRule: { scaleX: 0 } })
    tl.to(h1, { duration: 2, clipPath: 'polygon( 0 0, 100% 0, 100% 100%, 0% 100% )', y: '30px' }, "-=3")
    tl.to(p, { duration: 4, clipPath: 'polygon( 0 0, 100% 0, 100% 100%, 0% 100% )', y: '30px' }, "-=2")
    tl.to(u, { duration: 4, clipPath: 'polygon( 0 0, 100% 0, 100% 100%, 0% 100% )', y: '30px' }, "-=2")
}

export function showText() {
    setVisible('h1', true);
    setVisible('u', true);
    setVisible('p', true);
}

const setVisible = (elementOrSelector, visible) =>
    (typeof elementOrSelector === 'string'
        ? document.querySelector(elementOrSelector)
        : elementOrSelector
    ).style.display = visible ? 'block' : 'none';
