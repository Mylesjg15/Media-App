import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ContactService } from 'src/app/services/contact.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private builder: FormBuilder,
    private contactService: ContactService,
    private router: Router) { }

  ngOnInit(): void {
    this.contactForm = this.builder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      query: ['', Validators.required]
    })
  }

  handleSubmit() {
    
    let message = {
      email: this.contactForm.get("email").value, 
      query: this.contactForm.get("query").value
    } 
  
    this.contactService.sendEmail(message).subscribe(
      data => {
        let res: any = data;
        // alert("Email sent to "+ this.contactForm.get("email").value + "!");
        alert("Email has been sent to the support team, our representative will reach out to you soon!")
        this.router.navigate(['/home']);
      },
      err => {
        alert("Email failed to send.");
        console.log(err);
      }
    )
    
  }



}
 