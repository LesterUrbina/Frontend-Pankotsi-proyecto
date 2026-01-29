import { parseISO } from "date-fns";

export class DateUtil
{

  static now(){
    return new Date();
  }

  static parseISO(date:string){
    return parseISO(date);
  }

}
