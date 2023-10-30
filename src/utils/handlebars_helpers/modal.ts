import { HelperOptions } from 'handlebars';

export default function modal(this: Object, { fn, hash }: HelperOptions): string {
    return `
    <script type="module">
        import { modalOpen,modalClose } from "/src/partials/modal/modal.js";
        window.modalOpen = modalOpen;
        window.modalClose = modalClose;
    </script>
    <div class="modal" id="modal-${hash.id}" >
        <div class="modal-dialog-centered">
            <div class="modal-content">
                <div class="button-close" onclick="modalClose('${hash.id}')">X</div>
                <h1>${hash.title}</h1>
                ${fn(this)}
            </div>
        </div>
    </div>
    `;
}
