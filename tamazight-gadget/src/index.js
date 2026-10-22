import buildUI from './ui/formBuilder';
import attachEvents from './ui/events';

export default function initGadget() {
    if (typeof mw === 'undefined') {
        console.error('MediaWiki is not available.');
        return;
    }
    
    const articleId = mw.config.get('wgArticleId');
    const action = mw.config.get('wgAction');

    if (action !== 'edit' && action !== 'submit') {
        return;
    }

    if (document.getElementById('zgh-entry-form')) {
        return;
    }   
    const contentArea =
        document.getElementById('mw-content-text');

    if (!contentArea) {
        console.error('Could not find the MediaWiki content area.');
        return;
    }

    try {    
        const ui = buildUI();

        if (!ui) {
            console.error('The form could not be created.');
            return;
        }

        ui.id = 'zgh-entry-form';
        contentArea.prepend(ui);

        attachEvents();

        console.log('Tamazight Wiktionary gadget initialized.');
    } catch (error) {
        console.error('Gadget initialization failed:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGadget, {
        once : true
    });
} else {
    initGadget();
}
