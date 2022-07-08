import { getRandomInt } from './rand.js';

export class Quote {
  constructor() {
    this.quotesList = {
      ru : [
        ['Наполеон Хилл, журналист и писатель' , 'Что разум человека может постигнуть и во что он может поверить, того он способен достичь.'],
        ['Альберт Эйнштейн', 'Стремитесь не к успеху, а к ценностям, которые он дает.'],
        ['Амелия Эрхарт','Сложнее всего начать действовать, все остальное зависит только от упорства.'],
        ['Федор Достоевский','Надо любить жизнь больше, чем смысл жизни.'],
        ['Джон Леннон','Жизнь - это то, что с тобой происходит, пока ты строишь планы.'],
        ['Альберт Эйнштейн','Логика может привести Вас от пункта А к пункту Б, а воображение — куда угодно.'],
        ['Борис Стругацкий','Начинать всегда стоит с того, что сеет сомнения.'],
        ['Стив Джобс','Ваше время ограничено, не тратьте его, живя чужой жизнью.'],
        ['Винс Ломбарди, тренер по американскому футболу','Победа - это еще не все, все - это постоянное желание побеждать.'],
        ['Генри Форд','Если вы думаете, что на что-то способны, вы правы; если думаете, что у вас ничего не получится - вы тоже правы.']
      ],
      en : [
        ['George Bernard Shaw','Success does not consist in never making mistakes but in never making the same one a second time.'],
        ['Leonardo di ser Piero da Vinci','Simplicity is the ultimate sophistication.'],
        ['Confucius','There are three things which the superior man guards against. In youth...lust. When he is strong...quarrelsomeness. When he is old...covetousness.'],
        ['Oscar Fingal O’Flahertie Wills Wilde','Always forgive your enemies; nothing annoys them so much.'],
        ['Steven Paul Jobs','Your time is limited, so don’t waste it living someone else’s life.'],
        ['Thomas Woodrow Wilson','No two persons ever read the same book.'],
        ['Lucius Annaeus Seneca','While we are postponing, life speeds by.'],
        ['Farrah GrayВикипедия','Build your own dreams, or someone else will hire you to build theirs.'],
        ['Charles Robert Darwin','It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.'],
        ['Bob Marley','Love the life you live, and live the life you love.'],
        ['Henry Wadsworth Longfellow','Music is the universal language of mankind.']
      ]
    }
    this.current = 0;
  };

  getRand(lang){
    if(lang !== 'ru' && lang !== 'en') lang = 'en';
    let rand = 0;
    while(this.current == rand){
      rand = getRandomInt(0, this.quotesList[lang].length);
    }
    this.current = rand;
    return this.quotesList[lang][rand];
  };
};
