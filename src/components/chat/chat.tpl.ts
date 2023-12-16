const tpl: string = `
<div>
    <span class="img"><img src="{{avatar}}" /> </span>
</div>
<div class="content">
    <div class="title">
        <span class="name">{{this.title}} </span>
        <span class="datelast">{{datetime}}</span>
    </div> 
    <div class="message">
        <div class="text">{{#if last_message}}{{last_message.content}}{{else}}нет сообщений{{/if}} </div>
        <div class="badge">{{#if unread}}<span >{{unread}}</span>{{/if}}</div>
        </div>
</div>
 
`;

export default tpl;
