/**
 * No-Op Implementation for AITracing
 *
 * Used when @mastra/observability package is not installed.
 * Provides all the interface methods but performs no actual tracing.
 */

import { noopLogger } from '../../logger';
import type { IMastraLogger } from '../../logger';
import { NoOpAISpan } from '../spans/no-op';
import type {
  TracingConfig,
  AISpan,
  AISpanType,
  AITracingExporter,
  AISpanProcessor,
  StartSpanOptions,
  AITracing,
} from '../types';
import { SamplingStrategyType } from '../types';

export class NoOpAITracing implements AITracing {
  private config: Required<TracingConfig>;
  private logger: IMastraLogger = noopLogger;

  constructor(config: TracingConfig) {
    // Apply defaults for optional fields
    this.config = {
      serviceName: config.serviceName,
      name: config.name,
      sampling: config.sampling ?? { type: SamplingStrategyType.NEVER },
      exporters: config.exporters ?? [],
      processors: config.processors ?? [],
      includeInternalSpans: config.includeInternalSpans ?? false,
      runtimeContextKeys: config.runtimeContextKeys ?? [],
    };
  }

  getConfig(): Readonly<Required<TracingConfig>> {
    return this.config;
  }

  getExporters(): readonly AITracingExporter[] {
    return [];
  }

  getProcessors(): readonly AISpanProcessor[] {
    return [];
  }

  getLogger(): IMastraLogger {
    return this.logger;
  }

  startSpan<TType extends AISpanType>(options: StartSpanOptions<TType>): AISpan<TType> {
    return new NoOpAISpan<TType>(options, this);
  }

  async shutdown(): Promise<void> {
    // No-op: nothing to shut down
  }

  __setLogger(logger: IMastraLogger): void {
    this.logger = logger;
  }
}
