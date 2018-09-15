import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const infinityScroll$ = fromEvent(window, 'scroll').pipe(
    debounceTime(275),
    map(e => ({
        scrollHeight: e.target.scrollingElement.scrollHeight,
        scrollTop: e.target.scrollingElement.scrollTop,
        clientHeight: e.target.scrollingElement.clientHeight
    })));

export default infinityScroll$;
