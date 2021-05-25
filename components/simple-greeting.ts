import {html, css, LitElement} from 'https://cdn.skypack.dev/lit';
import {customElement, property} from 'https://cdn.skypack.dev/lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  name = 'Somebody';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
