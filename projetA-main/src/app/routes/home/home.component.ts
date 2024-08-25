import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  text = "Vous êtes plutôt ?";
  typingSpeed = 300; // Vitesse de frappe en millisecondes
  index = 0;
  blinkInterval: Subscription | undefined;

  @ViewChild('typingText', { static: false }) typingTextRef!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.startTypingAnimation();
  }

  startTypingAnimation(): void {
    const typingTextElement = this.typingTextRef.nativeElement;

    // Utilisation de RxJS pour ajouter chaque caractère au texte avec un délai
    this.blinkInterval = interval(this.typingSpeed).subscribe(() => {
      if (this.index < this.text.length) {
        this.renderer.setProperty(typingTextElement, 'textContent', this.text.substr(0, this.index + 1));
        this.index++;
      } else {
        this.stopBlinkingAnimation();
      }
    });

    // Ajouter la classe pour le clignotement
    this.renderer.addClass(typingTextElement, 'typing-text-blink');
  }

  stopBlinkingAnimation(): void {
    if (this.blinkInterval) {
      this.blinkInterval.unsubscribe();
    }
  }
}
