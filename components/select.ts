import {html, css, LitElement} from 'https://cdn.skypack.dev/lit';
import {customElement, property, state} from 'https://cdn.skypack.dev/lit/decorators.js';
import {ifDefined} from 'https://cdn.skypack.dev/lit/directives/if-defined.js';
import {classMap} from 'https://cdn.skypack.dev/lit/directives/class-map.js';
// import "./../css/select.sass"

@customElement('gw-option')
export class GOption extends LitElement {
  @property({type: Boolean, reflect: true}) selected?: boolean;  
  @property({type: String}) value?: "";
  @property({type: String}) label?: "";
  static styles = css`
  :host * {box-sizing: border-box}
  :host {display: flex; flex-wrap: wrap; align-items:center; cursor: pointer;}
  .g-option {padding: 10px 10px; width: 100%;}
  .g-option:hover {background: var(--gw-option-hover, whitesmoke);}
  ` 

  render() {
    return html`
     <div class="g-option"><slot></slot></div>
    `
  }
}  

const closedIcon = () => html`<div class="ico"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg></div>`;
const openedIcon = () => html`<div class="ico"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 328l144-144 144 144'/></svg></div>`;

@customElement('gw-select')
export class GSelect extends LitElement {

  static styles=css`
    :host * {box-sizing: border-box}
    :host { display: inline-flex;flex-wrap: wrap;align-items: center;}
    .g-select {display: grid;grid-template-columns: 1fr var(--form-line-height, 40px); grid-template-rows: calc( var(--form-line-height, 40px) - 2 * var(--form-border-size, 1px)) auto; grid-template-areas: "value icon" "list list";border-radius: var(--border-radius, 0);border: var(--form-border-size, 1px) solid var(--form-border-color, var(--color-border,lightgray));align-items: center;position: relative;}
    .g-select__value {grid-area: value;}
    .g-select__icon {grid-area: icon; display: flex; align-items: center; justify-content: center;}
    .g-select__icon .ico {width: var(--gw-select-icon, 16px);height: var(--gw-select-icon, 16px); }
    .g-select__list {display:none; position: absolute; top: calc(100%  + var(--form-border-size, 1px)); left: calc(0px - var(--form-border-size, 1px));width: calc(100% + 2*var(--form-border-size, 1px)); background: var(--gw-select-list-bg, #fff);color: var(--gw-select-list-color, #000);border:var(--form-border-size, 1px) solid var(--form-border-color, var(--color-border,lightgray));border-top: none;}
    .g-select__list.opened {display: flex; flex-wrap: wrap; flex-direction: column;}
  `

  static get formAssociated() {return true;}

  @property() internals = this.attachInternals(); 
  @property({type: Array, attribute: false}) innerContent: any[] = Array.from(this.children as HTMLCollection);
  @property({type: String}) selected: string | null = null;
  @property({type: String}) name?: string  = "";
  @property({type: String, reflect: true}) value: string = "";
  @state({type: String}) selectedOption?: Node | null;
  @state() opened: boolean = false;
  
  firstUpdated() {    
    this.selectedOption = [...this.innerContent].filter(el=>el.selected)[0].cloneNode(true) ?? null;   
    this.value = [...this.innerContent].filter(el=>el.selected)[0].value ?? ""
  }

  updated(changed: any) {    
    if(changed.has('value')) {       
      this.internals.setFormValue(this.value)
    }

    //super.update(changed);
  }

  render() {
    const listClasses = {opened: this.opened};
    return html`
    <div class="g-select">
      <div class="g-select__value">${this.selectedOption}</div>
      <div class="g-select__icon" @click=${()=>this.opened = !this.opened}>${this.opened ? openedIcon() : closedIcon()}</div>
      <div class="g-select__list ${classMap(listClasses)}">
       <slot></slot>
      </div>
    </div>
    `
  }
}