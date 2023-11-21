const tpl: string = `

{{#each users}}
    <div class="user {{#if active}}active{{/if}}">
        <div>
            <span class="img"><img src="{{img}}" /> </span>
        </div>
        <div class="content">
            <div class="title">
                <span class="name">{{this.name}} </span>
                <span class="datelast">{{date}}</span>
            </div> 
            <div class="message">
                <div class="text">{{text}} </div>
                <div class="badge">{{#if numbermessages}}<span >{{number_messages}}</span>{{/if}}</div>
                </div>
        </div>
    </div>

{{/each}}

`;

export default tpl;
