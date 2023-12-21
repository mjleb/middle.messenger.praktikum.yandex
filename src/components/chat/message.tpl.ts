const tpl: string = `
    <div>{{content}}</div>
    {{#if file}} <img src="https://ya-praktikum.tech/api/v2/resources{{file}}" /> {{/if}}
    
    <div class="date">
    {{time}}
        <div>
            <span class="material-symbols-outlined {{#if is_read}}read{{/if}} "> {{#if is_read}}done_all{{else}}done{{/if}} </span>
        </div>
        
    </div>
`;

export default tpl;
