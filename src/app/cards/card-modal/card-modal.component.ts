import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit {

  cardForm !: FormGroup;
  showSpinner: boolean = false;


  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private dialogRef: MatDialogRef<CardModalComponent>,
    private snackBarService:SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) { }

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [this.data?.title || '', [Validators.required, Validators.maxLength(225)]],
      phone: [this.data?.phone || '', [Validators.required, Validators.maxLength(20)]],
      email: [this.data?.email || '', [Validators.email, Validators.maxLength(50)]],
      address: [this.data?.address || '', Validators.maxLength(225)]
    });
  }

  addCard(): void {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value).subscribe((res: any) => {
      this.getSuccess('Karvizit başarıyla eklendi!');  
    }, (err :any) => {
      this.getError(err.message ||'Kartvizit eklenirken bir hata oluştu.')
    });
    
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardForm.value, this.data.id).subscribe((res: any) => {
      this.getSuccess('Kartvizit başarıyla güncellendi!');
    }, (err :any) => {
      this.getError(err.message ||'Kartvizit güncellenirken bir hata oluştu.')
    });
    
  }

  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id).subscribe((res: any) => {
      this.getSuccess(' Kartvizit başarıyla silindi!');
    }, (err :any) => {
      this.getError(err.message ||'Kartvizit silinirken bir hata oluştu.')
    });
    
  }

  getSuccess(message: string): void {
    this.snackBarService.createSnackBar('success', message , 9999);
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message : string){
    this.snackBarService.createSnackBar('error' , message, 99999);
    this.showSpinner =false;
  }
}
