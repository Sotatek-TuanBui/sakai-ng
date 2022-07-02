import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    constructor(private messageService: MessageService) {}

    error(res: any): void {
        const errors = res.error.error;
        if (typeof res.error.error === 'string') {
            this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: res.error.error
            })
            return;
        }
        const errorMessages = [];
        Object.entries(errors).forEach(el => {
            errorMessages.push({
                severity: 'error',
                summary: el[0],
                detail: el[1][0]
            })
        })
        this.messageService.addAll(errorMessages);
    }

    success(res: any): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Message',
            detail: res.message
        })
    }
}
