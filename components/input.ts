import {html, css, LitElement} from 'https://cdn.skypack.dev/lit';
import {customElement, property, state} from 'https://cdn.skypack.dev/lit/decorators.js';
import {ifDefined} from 'https://cdn.skypack.dev/lit/directives/if-defined.js';
import {classMap} from 'https://cdn.skypack.dev/lit/directives/class-map.js';

export const isValidEmail = (value :string) => value.indexOf("@") > 0 && value.indexOf(".") > 0 && value.length > 5 && value.indexOf(".") < value.length - 2 && value.indexOf("@") < value.lastIndexOf(".") - 1;



@customElement('gw-input')
export class GInput extends LitElement {
  static styles = css`
    * {box-sizing: border-box;}
    :host {margin:0;padding:0;display:inline-flex;flex-wrap:wrap;flex-direction:column;}    
    input {border: 1px solid var(--color-border, lightgray);padding: 5px 10px;border-radius: var(--border-radius, 0);line-height: calc(var(--form-line-height, 40px) - 2*var(--form-border-size, 1px) - 10px)}
    input:focus {outline: 2px solid lightcyan}
    input.invalid {border-color: var(--color-error, lightcoral)}
    .g-input__container {display:flex;flex-wrap:wrap;position:relative;flex-direction: column;}
    .g-input__required {position:absolute;right:4px;top:2px;display:inline-block;font-size:18px;}
    .g-input__element{display: grid;grid-template-areas: "input";align-items: center;}
    .g-input__input{grid-area:input;}
    .g-input__label{grid-area:input;padding-left: 5px;transition: var(--transition, all 0.1s ease-in-out);color:var(--color-placeholder, gray);font-size:var(--form-placeholder-size, 13px); font-family: var(--form-font-family, sans-serif)}
    .g-input__label span{background: #fff;padding: 0 5px;}
    .focused .g-input__label{transform: translateY(-20px);}
    .disabled .g-input__label span {background: transparent;}
  `;

  @property() name?: string;
  @property() value: string = "";
  @property() type: string = "text";
  @property() placeholder?: string;
  @property() label?: string;
  @property({type: Boolean}) required: boolean = false;
  @property({type: Boolean}) disabled: boolean = false;
  @property({type: Boolean}) readonly: boolean = false;
  @property({type: Boolean, reflect: true}) invalid: boolean = false;
  @state({type:Boolean}) focused: boolean = false;

  onInput = (e: Event) => {    
    this.value = (e.target as HTMLInputElement).value;    
  }

  onChange = (e: Event) => {   
    this.invalid = this.type === "email" && this.value !== "" ? !isValidEmail(this.value) : this.required && this.value === "";    
  }
  onBlur = (e: Event) => {
    this.focused = this.value !== "";
  }

  onFocus = (e: Event) => {
    this.focused = true;
  }

  render() {
    const classes = { invalid: this.invalid};
    const elementClasses = {focused: this.focused, disabled: this.disabled};
    return html`
      <div class="g-input__container">
      ${this.required ? html`<span class="g-input__required">*</span>`: null} 
      <div class="g-input__element ${classMap(elementClasses)}">
        <input type="text" id='${this.name}__id' class='g-input__input ${classMap(classes)}' .value=${this.value} placeholder=${ifDefined(this.placeholder)} ?required=${this.required} ?disabled=${this.disabled} ?readonly=${this.readonly} @input=${(e: Event)=>this.onInput(e)} @change=${(e: Event) => this.onChange(e)} @blur=${(e: Event) => this.onBlur(e)} @focus=${(e: Event)=>this.onFocus(e)} />
        ${this.label ? html`<label class="g-input__label" for='${this.name}__id'><span>${this.label}</span></label>`: null}
      </div> 
      <input type="hidden" name=${ifDefined(this.name)} .value=${this.value} />
      </div>
      `
  }
}