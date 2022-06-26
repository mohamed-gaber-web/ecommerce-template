import { Injectable } from '@angular/core';
import { StorageService } from './shared/services/storage.service';

export class Settings {
    constructor(public name: string,
                public theme: string,
                public rtl: boolean,
                public lang: string,
                
                ) { }
}

@Injectable()
export class AppSettings {
    constructor(public storageService: StorageService){}
    public settings = new Settings(
        'SDEX E-commerce',  // theme name
        'blue',     // green, blue, red, pink, purple, grey
        this.storageService.getLangDirection(),     // true = rtl, false = ltr
        'en'
        
    )
}