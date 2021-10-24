import { getRandomInt } from './rand.js';
import { TimeDate } from './timedate.js';

export class Background {
  constructor() {
    // https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/afternoon/02.jpg
    this.url = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
    this.current = 0;
    this.min = 1;
    this.max = 20;
    const time_date = new TimeDate;
    this.partdate = time_date.getPartDateName();
  }

  getRandUrlImg(){
    let rand = 0;
    while(this.current === rand){
      rand = getRandomInt(this.min, this.max + 1);
    }
    this.current = rand;
    if(rand < 10) rand = '0' + rand;
    return this.url + this.partdate + '/' + rand + '.jpg'
  }

  getNextUrlImg(){
    let current = this.current + 1;
    if( current > this.max ) current = 1;
    this.current = current;
    if(current < 10) current = '0' + current;
    return this.url + this.partdate + '/' + current + '.jpg'
  }

  getPrevUrlImg(){
    let current = this.current - 1;
    if( current < this.min ) current = this.max;
    this.current = current;
    if(current < 10) current = '0' + current;
    return this.url + this.partdate + '/' + current + '.jpg'
  }

}
