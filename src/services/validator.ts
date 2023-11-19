import { Iobj, ItextContent } from '@/types.ts';

export default class InputValidator {
  Patterns;

  constructor() {
    this.Patterns = [
      {
        class: 'string',
        pattern: /^[A-ZА-Я][a-zа-я]*(?:-[A-ZА-Я][a-zа-я]*)*$/,
        text: 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
      },
      {
        class: 'login',
        pattern: /^(?![_\d-]*$)[a-zA-Z\d_-]{3,20}$/,
        text: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
      },
      {
        class: 'email',
        pattern: /^[a-zA-Z\d._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
        text: 'латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
      },
      {
        class: 'password',
        pattern: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
        text: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      },
      {
        class: 'phone',
        pattern: /^\+?\d{10,15}$/,
        text: 'от 10 до 15 символов, состоит из цифр, может начинается с плюса',
      },
      {
        class: 'message',
        pattern: /.+$/,
        text: 'не должно быть пустым',
      },
    ];
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.Patterns.forEach((obj: Iobj) => {
      const inputsString = document.querySelectorAll(`.validator-${obj.class}`);
      inputsString.forEach((input) => {
        input.addEventListener('blur', (event) => {
          const inputElement = event.target as HTMLInputElement;
          if (inputElement) this.validate(input.id, inputElement.value, obj);
        });
      });
    });
  }

  validate(id: string, value: string, obj: Iobj) {
    const errorElement: ItextContent = document.getElementById(`${id}-error`);
    const helpElement: ItextContent = document.getElementById(`${id}-help`);
    if (errorElement) errorElement.textContent = '';
    if (helpElement) helpElement.textContent = '';
    if (errorElement)
      if (helpElement)
        if (value.trim() === '') {
          errorElement.textContent = 'Пожалуйста, заполните это поле.';
          helpElement.textContent = obj.text;
          return;
        }
    if (!obj.pattern.test(value)) {
      if (errorElement)
        if (helpElement) {
          errorElement.textContent = 'Пожалуйста, введите корректные данные';
          helpElement.textContent = obj.text;
        }
    }
  }
}
