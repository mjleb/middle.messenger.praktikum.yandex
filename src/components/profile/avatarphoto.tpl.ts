const tpl: string = `

<div>
    <div class="linkphoto" id={{id}}>
       
            Поменять аватар
      
    </div>

    <div class="photo">
    
        {{#unless user.avatar}}
            <span class="material-symbols-outlined">imagesmode</span>
        {{/unless}}
        
        {{#if user.avatar}}
            <img src="https://ya-praktikum.tech/api/v2/resources{{user.avatar}}" />
        {{/if}}
    </div>

    <h1>{{user.login}}</h1>
 </div>

 
 
    
`;

export default tpl;
