const tpl: string = `
{{{modalAdd}}}
{{{modalDelete}}}
{{{modalAvatar}}}
{{#if chatTitle }}
    <div class="user">
         {{chatTitle}}
        <div class="dropdown">
            <div class="dropbtn">
                    <span class="material-symbols-outlined">
                    more_vert
                    </span>
            </div>
            <div class="dropdown-content">
                <div>
                    {{{useradd}}}
                    {{{userdelete}}}
                    {{{chatavatar}}}
                </div>
            </div>
        </div>
    </div>
{{/if}}
<div class="posts"> 
    {{#if messages }}
        {{#each messages}}
            {{{this}}}
        {{/each}}
    {{else}}
        <div class="nodata">Выберите чат чтобы отправить сообщение</div> 
    {{/if}}
 </div>
{{#if chatTitle }}
    <div class="input-message">
        <div class="button-img-add"> 
        <span class="material-symbols-outlined">
            attach_file
        </span>
        </div>
        {{{formMessage}}}
    </div>
{{/if}}
 
`;

export default tpl;
