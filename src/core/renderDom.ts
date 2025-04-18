/* eslint-disable */
// @ts-nocheck

import Block from './block';

export default function renderDOM(block: Block) {
  const root = document.querySelector('#app');

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}

export function render(query: string, block) {
  const root = document.querySelector(query) as HTMLElement;

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
