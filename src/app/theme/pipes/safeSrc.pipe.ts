import { PipeTransform, Pipe } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: "sanitizeHtml"
})
export class SanitizeHtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);

    }
}