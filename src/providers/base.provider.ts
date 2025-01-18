import { IWatchGetParams } from "@src/features/watch/watch.schema";

export enum ProviderPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export interface IProvider {
  name: string;
  priority: ProviderPriority;
  isEnabled: boolean;
  providerUrl: string;

  // Method to fetch data - generic type T for flexibility
  fetch(params: IWatchGetParams): Promise<string>;
}

// Abstract class that implements the interface
export abstract class BaseProvider implements IProvider {
  constructor(
    public readonly name: string,
    public readonly priority: ProviderPriority,
    public isEnabled: boolean,
    public readonly providerUrl: string
  ) {}

  abstract fetch(params: IWatchGetParams): Promise<string>;
}
