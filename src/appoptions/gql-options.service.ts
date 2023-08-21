import { Injectable, Logger } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GqlOptionsService implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    Logger.debug('Init', this.constructor.name);

    return {
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
      autoSchemaFile: this.config.env.GQL_SCHEMA_FILE,
      playground: this.config.env.GQL_PLAYGROUND,
      // debug: this.config.env.NODE_ENV !== 'production',
    };
  }
}
