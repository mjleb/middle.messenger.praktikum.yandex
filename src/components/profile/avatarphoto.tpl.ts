const tpl: string = `
<div class="linkphoto">
    <div class="icon">
        Поменять аватар
    </div>
</div>

<div class="photo">
 
    {{#unless user.avatar}}
        <span class="material-symbols-outlined">imagesmode</span>
    {{/unless}}
    
    {{#if user.avatar}}
        <img src="https://ya-praktikum.tech/api/v2/resources{{user.avatar}}" />
    {{/if}}
</div>

 
{{user.name}}
    
`;

export default tpl;
