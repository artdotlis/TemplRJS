import '@fortawesome/fontawesome-free';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function initFontAwesome(): void {
    library.add(faSearch);
    config.autoReplaceSvg = true;
    config.observeMutations = true;
}

export default initFontAwesome;
