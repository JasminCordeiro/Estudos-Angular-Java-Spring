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

  private currentIndex = 0;
  private itemsPerPage = 3;

  constructor() { }

  ngOnInit(): void {
    // Outras inicializações aqui...
  }

  ngAfterViewInit(): void {
    this.setupCarousel();
    window.addEventListener('resize', this.setupCarousel.bind(this));
  }

  setupCarousel(): void {
    const prevButton = this.prevButtonRef.nativeElement;
    const nextButton = this.nextButtonRef.nativeElement;

    prevButton.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        this.currentIndex -= this.itemsPerPage;
        this.updateVisibility();
      }
    });

    nextButton.addEventListener('click', () => {
      const carouselItems = this.carouselItemsRefs.toArray(); // Corrigido: Convertido para array
      if (this.currentIndex < carouselItems.length - this.itemsPerPage) {
        this.currentIndex += this.itemsPerPage;
        this.updateVisibility();
      }
    });

    this.updateItemsPerPage(); // Corrigido: Chamada inicial para definir o número correto de itens por página
  }
  updateItemsPerPage(): void {
    if (window.innerWidth <= 768) { // Para telas menores ou iguais a 768 pixels de largura (mobile)
      this.itemsPerPage = 1; // Apenas um item por página no mobile
    } else {
      this.itemsPerPage = 3; // Três itens por página para telas maiores que 768 pixels de largura (desktop)
    }
    this.updateVisibility(); // Atualiza a visibilidade dos itens após a alteração do número de itens por página
  }

  updateVisibility(): void {
    const carouselItems = this.carouselItemsRefs.toArray(); // Corrigido: Convertido para array
    carouselItems.forEach((item: ElementRef<HTMLDivElement>, index: number) => {
      // Calcule o índice inicial e final dos itens a serem exibidos
      const startIndex = this.currentIndex;
      const endIndex = Math.min(startIndex + this.itemsPerPage, carouselItems.length);

      // Defina o estilo de exibição com base no índice atual
      item.nativeElement.style.display = index >= startIndex && index < endIndex ? 'block' : 'none';
    });
  }
}
