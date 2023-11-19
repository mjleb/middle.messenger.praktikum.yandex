const tpl: string = `
    {{#if label}}
    <label for={{name}}>
        {{label}}
        {{#if required}}<span class="required">*</span>{{/if}}
    </label>
    {{/if}}
    <div class="inputItem">
        <input type="{{type}}" class="{{class}}{{#if status}}{{status}}{{/if}}" id="{{id}}" name="{{name}}" value="{{value}}"
            {{#if required}}required{{/if}} placeholder="{{placeholder}}" />
        <div class="helping-text">
          {{#if helpingText}}
            <span class="help-block {{#if status}}{{status}}{{/if}}">{{helpingText}}</span>
          {{/if}}
          <div id="{{name}}-error" class="error"></div>
          <div id="{{name}}-help" class="help-block"></div>
        </div>
    </div>
    

`;
export default tpl;
