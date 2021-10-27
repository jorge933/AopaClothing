import { next, prev, dots } from "./scripts/carousel.js";
import { InitItems } from "./scripts/init-items.js";

const $next = document.querySelector('main section.carousel div.buttons-slide .buttons button.next');
const $prev = document.querySelector('main section.carousel div.buttons-slide .buttons button.prev');
const $dots = document.querySelectorAll('main section.carousel div.buttons-slide div.dots div');

$next.addEventListener('click', () => {next($next)});
$prev.addEventListener('click', () => {prev($prev)});
dots($dots);

InitItems()