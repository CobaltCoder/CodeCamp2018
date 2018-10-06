import { timer } from 'rxjs';

import * as moment from 'moment';

import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({ selector: '[countdown]' })
export class CountDownDirective {

    private _eventDate: Date = new Date();
    
    constructor(public el: ElementRef, public renderer: Renderer) { }
    @Input() countdown: string;

    ngOnInit() {
        this._eventDate = new Date(this.countdown);
        
        let timer1 = timer(2000,1000);

        timer1.subscribe(t => this.tickerFunc(t));

        this.el.nativeElement.textContent = '';
    }

      tickerFunc(tick){
        let currDate = moment();

        let evtDate = moment(this._eventDate);

        let ms = evtDate.diff(currDate);

        this.el.nativeElement.textContent = moment.utc(ms).format("hh:mm:ss");
    }
}