import { IProvider } from "./base.provider";

export class ProviderRegistry {
  private providers: Map<string, IProvider> = new Map();

  registerProvider(provider: IProvider): void {
    this.providers.set(provider.name, provider);
  }

  getProvider(name: string): IProvider | undefined {
    return this.providers.get(name);
  }

  getAllProviders(): IProvider[] {
    return Array.from(this.providers.values());
  }

  getSortedProviders(): IProvider[] {
    return this.getAllProviders().sort((a, b) => b.priority - a.priority);
  }

  getEnabledProviders(): IProvider[] {
    return this.getSortedProviders().filter((provider) => provider.isEnabled);
  }

  disableProvider(name: string): void {
    const provider = this.providers.get(name);
    if (provider) {
      provider.isEnabled = false;
    }
  }

  enableProvider(name: string): void {
    const provider = this.providers.get(name);
    if (provider) {
      provider.isEnabled = true;
    }
  }
}

export const providerRegistry = new ProviderRegistry();
