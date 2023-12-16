const tpl: string = `
<div class="link-back ">
    <a href="{{{links.chat}}}" title="К чату">
        <span class="material-symbols-outlined"> arrow_back </span> 
    </a>
</div>

<div>
    {{{modal}}}
    {{{avatar}}}

    <div class="person-data">

    {{#if error}}<div class="alert alert-error">{{error}}</div>{{/if}}
    {{#if warning}}<div class="alert alert-warning">{{warning}}</div>{{/if}}
    {{#if succsess}}<div class="alert alert-succsess">{{succsess}}</div>{{/if}}

        {{{form}}}
 
        <nav>
        <ul class=" ">
            <li>{{{linkProfile}}}</li>
            <li>{{{linkProfileEdit}}}</li>
            <li>{{{linkLogout}}}</li>
        </ul>
    </nav>
    </div>
</div>
`;

export default tpl;
