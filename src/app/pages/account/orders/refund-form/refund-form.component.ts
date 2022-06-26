import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRefund } from './refund.model';
import { OrdersService } from './../orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-refund-form',
  templateUrl: './refund-form.component.html',
  styleUrls: ['./refund-form.component.scss']
})
export class RefundFormComponent implements OnInit {

  refundFormGroup: FormGroup;
  fileUpload: any;

  constructor(
    private fb: FormBuilder, 
    private orderService: OrdersService,
    public dialogRef: MatDialogRef<any>,
    public snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public data: {orderId: number}) { }

  ngOnInit(): void {
    this.refundFormGroup = this.fb.group({
      reason: ['', Validators.required],
      file: [{
      "fieldName": "",
      "filename": "",
      "fileExtension": "",
      "fileData": ""
      }, Validators.required]
    })
  }

  // Valid base64
  validBase64(value: any): any {
    return value.substr(value.indexOf(',') + 1);
  }

  // ** Upload file  
  onFileSelect(e) {
    const file: File = e.target.files[0]; // e.target.files => group of files uploaded

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        this.fileUpload = file.name;
        // ** convert file to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {   
          const imgBase = reader.result
          // ** update file when upload
          this.refundFormGroup.patchValue({
            file: {
              "fieldName": "image",
              "filename": file.name,
              "fileExtension": file.type.split('/')[1], // file.type
              "fileData": this.validBase64(imgBase)
            }
          }); 
          };
      }      
        
  }
  
  // ** create refund on order
  createRefundOrders() {
    console.log(this.refundFormGroup.value);
    
    if (this.refundFormGroup.valid) {
      // http request
      let refundData: IRefund = {
        oredrId: this.data.orderId,
        reason: this.refundFormGroup.value.reason,
        status: 0,
        file: this.refundFormGroup.value.file,
      }
      this.orderService.createRefundOrder(refundData)
      .subscribe(response => {
        console.log('reponse data', response);
        if(response['statusCode'] === 200) {
          this.snackBar.open('Refund Created', '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              duration: 5000,
            });
          this.dialogRef.close();
        } else {
          this.snackBar.open(response['arrayMessage'][0], '×', {
              panelClass: 'error',
              verticalPosition: 'top',
              duration: 5000,
            });
        }
      })
    }
  }

}
