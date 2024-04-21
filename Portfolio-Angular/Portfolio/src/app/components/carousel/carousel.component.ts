import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})

export class CarouselComponent implements OnInit, AfterViewInit {

  @ViewChild('prevButton') prevButtonRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('nextButton') nextButtonRef!: ElementRef<HTMLButtonElement>;
  @ViewChildren('carouselItem') carouselItemsRefs!: QueryList<ElementRef<HTMLDivElement>>;

  constructor() { }

  ngOnInit(): void {
    // Outras inicializações aqui...
  }

  ngAfterViewInit(): void {
    this.setupCarousel();
  }

  setupCarousel(): void {
    const prevButton = this.prevButtonRef.nativeElement;
    const nextButton = this.nextButtonRef.nativeElement;
    const carouselItems = this.carouselItemsRefs.map(ref => ref.nativeElement);

    let currentIndex = 0;
    const itemsPerPage = 3;

    updateVisibility();

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex -= itemsPerPage;
        updateVisibility();
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentIndex < carouselItems.length - itemsPerPage) {
        currentIndex += itemsPerPage;
        updateVisibility();
      }
    });

    function updateVisibility() {
      carouselItems.forEach((item: HTMLElement, index: number) => {
        // Calcule o índice inicial e final dos itens a serem exibidos
        const startIndex = currentIndex;
        const endIndex = Math.min(startIndex + itemsPerPage, carouselItems.length);

        // Defina o estilo de exibição com base no índice atual
        item.style.display = index >= startIndex && index < endIndex ? 'block' : 'none';
      });
    }
  }
}
