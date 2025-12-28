import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule , RouterLink],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs implements AfterViewInit {

  ngAfterViewInit(): void {
    this.animateCounters();
  }

  animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target')!;
      const speed = 200;

      const updateCount = () => {
        const current = +counter.innerHTML;
        const increment = Math.ceil(target / speed);

        if (current < target) {
          counter.innerHTML = `${current + increment}`;
          setTimeout(updateCount, 20);
        } else {
          counter.innerHTML = `${target}+`;
        }
      };

      updateCount();
    });
  }
}
