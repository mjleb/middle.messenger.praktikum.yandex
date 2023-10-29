import { HelperOptions } from 'handlebars';

export default function modal(this: Object, { fn, hash }: HelperOptions): string {
    return `

    <div class="modal" id="modal-${hash.id}" >
    <div class="modal-dialog-centered">
        <div class="modal-content">
            <div class="button-close" id="modal-${hash.id}-close">X</div>
            <h1>${hash.title}</h1>
            ${fn(this)}

        </div>
    </div>
</div>
<script  src="../../partials/modal/modal.js"></script>
    `;
}