/**
 * No-Op Observability Registry
 *
 * Used when @mastra/observability package is not installed.
 * Provides warning messages when observability config is used without the package.
 */

import type {
  AITracing,
  ConfigSelectorOptions,
  ConfigSelector,
  ObservabilityRegistryConfig,
} from './types';

/**
 * No-Op Registry - all operations do nothing
 */
class NoOpAITracingRegistry {
  private hasWarned = false;

  /**
   * Show warning if user provides config without having observability package
   */
  private warnIfConfigProvided(config?: ObservabilityRegistryConfig): void {
    if (this.hasWarned) return;

    if (config && (config.default?.enabled || config.configs || config.configSelector)) {
      console.warn(
        '[Mastra] Observability configuration detected but @mastra/observability package is not installed.\n' +
          'To enable AI tracing, install the package:\n' +
          '  npm install @mastra/observability\n' +
          'Then import it in your application:\n' +
          '  import "@mastra/observability"',
      );
      this.hasWarned = true;
    }
  }

  register(_name: string, _instance: AITracing, _isDefault = false): void {
    // No-op
  }

  get(_name: string): AITracing | undefined {
    return undefined;
  }

  getDefault(): AITracing | undefined {
    return undefined;
  }

  setSelector(_selector: ConfigSelector): void {
    // No-op
  }

  getSelected(_options: ConfigSelectorOptions): AITracing | undefined {
    return undefined;
  }

  unregister(_name: string): boolean {
    return false;
  }

  async shutdown(): Promise<void> {
    // No-op
  }

  clear(): void {
    // No-op
  }

  getAll(): ReadonlyMap<string, AITracing> {
    return new Map();
  }

  setup(config?: ObservabilityRegistryConfig): void {
    this.warnIfConfigProvided(config);
  }

  has(_name: string): boolean {
    return false;
  }
}

const noOpRegistry = new NoOpAITracingRegistry();

// ============================================================================
// No-Op Registry Management Functions
// ============================================================================

/**
 * Register an AI tracing instance globally (No-Op)
 */
export function registerAITracing(name: string, instance: AITracing, isDefault = false): void {
  noOpRegistry.register(name, instance, isDefault);
}

/**
 * Get an AI tracing instance from the registry (No-Op - always returns undefined)
 */
export function getAITracing(name: string): AITracing | undefined {
  return noOpRegistry.get(name);
}

/**
 * Get the default AI tracing instance (No-Op - always returns undefined)
 */
export function getDefaultAITracing(): AITracing | undefined {
  return noOpRegistry.getDefault();
}

/**
 * Set the AI tracing config selector (No-Op)
 */
export function setSelector(selector: ConfigSelector): void {
  noOpRegistry.setSelector(selector);
}

/**
 * Get the selected AI tracing instance based on options (No-Op - always returns undefined)
 */
export function getSelectedAITracing(options: ConfigSelectorOptions): AITracing | undefined {
  return noOpRegistry.getSelected(options);
}

/**
 * Unregister an AI tracing instance (No-Op - always returns false)
 */
export function unregisterAITracing(name: string): boolean {
  return noOpRegistry.unregister(name);
}

/**
 * Shutdown all AI tracing instances and clear the registry (No-Op)
 */
export async function shutdownAITracingRegistry(): Promise<void> {
  await noOpRegistry.shutdown();
}

/**
 * Clear all AI tracing instances without shutdown (No-Op)
 */
export function clearAITracingRegistry(): void {
  noOpRegistry.clear();
}

/**
 * Get all registered AI tracing instances (No-Op - always returns empty map)
 */
export function getAllAITracing(): ReadonlyMap<string, AITracing> {
  return noOpRegistry.getAll();
}

/**
 * Check if AI tracing is available and enabled (No-Op - always returns false)
 */
export function hasAITracing(name: string): boolean {
  return noOpRegistry.has(name);
}

/**
 * Setup AI tracing from the ObservabilityRegistryConfig (No-Op with warning)
 */
export function setupAITracing(config?: ObservabilityRegistryConfig): void {
  noOpRegistry.setup(config);
}
