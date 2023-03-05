import { ServerRespond } from './DataStreamer';

export interface Row {
  timestamp: Date,
  price_abc : number,
  price_def : number,
  ratio : number,
  upper_bound : number,
  lower_bound : number,
  trigger_alert : number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const price_ABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price_DEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = price_ABC / price_DEF;
    const upperBound = 1 + 0.1;
    const lowerBound = 1 - 0.1;

    return {
      price_abc: price_ABC,
      price_def : price_DEF,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      upper_bound : upperBound,
      lower_bound : lowerBound,
      trigger_alert: (ratio > upperBound) || (ratio < lowerBound) ? ratio : undefined,
    };
  }
}