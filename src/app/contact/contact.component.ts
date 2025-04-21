import {Component, signal} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CardModule} from "primeng/card";
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    MessagesModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent{
  contactForm: FormGroup;
  submitted = signal(false);
  characterCount = signal(0);
  messages: Message[] = [
    { severity: 'success', summary: 'Succès', detail: 'Demande de contact envoyée avec succès.' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  updateCharCount(): void {
    const messageLength = this.contactForm.get('message')?.value?.length || 0;
    this.characterCount.set(messageLength);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched || this.submitted()) : false;
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.contactForm.valid) {
      console.log('Formulaire soumis:', this.contactForm.value);
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitted.set(false);
    this.characterCount.set(0);
  }
}
