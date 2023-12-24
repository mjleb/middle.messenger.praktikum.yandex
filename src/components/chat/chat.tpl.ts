const tpl: string = `
<div>
    <span class="img">
    {{#if avatar}}
        <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" />
    {{/if}}
 
    </span>
</div>
<div class="content">
    <div class="title">
        <span class="name">{{this.title}} </span>
        <span class="datelast">{{datetime}}</span>
    </div> 
    <div class="message">
        <div class="text">{{#if lastMessage}}{{lastMessage.content}}{{else}}нет сообщений{{/if}} </div>
        <div class="badge">{{#if unread}}<span >{{unread}}</span>{{/if}}</div>
        </div>
</div>
 
`;

export default tpl;
