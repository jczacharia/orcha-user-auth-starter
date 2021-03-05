/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { IQuery, ORCHA, ORCHA_DTO, ORCHA_FILES, ORCHA_QUERY, ORCHA_TOKEN } from '@orcha/common';
import { ValidationPipe } from '../pipes';
import { QueryValidationPipe } from '../pipes/query-validation.pipe';

export function ServerOrchestration(name: string | number): ClassDecorator {
  return function (target: Function) {
    if (!name) throw new Error('No orchestration name provided for @ServerOrchestration');
    Controller(`${ORCHA}/${name}`)(target);
  };
}

function transform(val: string) {
  try {
    return JSON.parse(val);
  } catch (error) {
    return undefined;
  }
}

export function ServerOperation<T, Q extends IQuery<T>>(options?: {
  /**
   * Whether the operation has singular or multiple file upload. Defaults to `singular`.
   */
  fileUpload?: 'singular' | 'multiple';
  /**
   * Validates the query object. If query object has extra fields in any of its objects,
   * compared to `validateQuery`, an unauthorized exception will be thrown.
   *
   * @remarks
   * It is highly recommended that you use this feature to prevent unauthorized access to data.
   */
  validateQuery?: Q;
}): MethodDecorator {
  return function <F>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<F>) {
    if (options?.validateQuery) {
      Body(ORCHA_QUERY, { transform }, new QueryValidationPipe<T, Q>(options?.validateQuery))(
        target,
        propertyKey,
        0
      );
    } else {
      Body(ORCHA_QUERY, { transform })(target, propertyKey, 0);
    }

    Body(ORCHA_TOKEN)(target, propertyKey, 1);
    Body(ORCHA_DTO, { transform }, new ValidationPipe())(target, propertyKey, 2);

    if (options?.fileUpload === 'multiple') {
      UploadedFiles()(target, propertyKey, 3);
      UseInterceptors(FilesInterceptor(ORCHA_FILES))(target, propertyKey, descriptor);
    } else {
      UploadedFile()(target, propertyKey, 3);
      UseInterceptors(FileInterceptor(ORCHA_FILES))(target, propertyKey, descriptor);
    }

    Post(propertyKey as string)(target, propertyKey, descriptor);
  };
}

export function ServerGateway(name: string): ClassDecorator {
  return function (target: Function) {
    WebSocketGateway({ namespace: name })(target);
  };
}

export function ServerSubscription(): MethodDecorator {
  return function <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) {
    ConnectedSocket()(target, propertyKey, 0);
    // TODO
    // MessageBody(ORCHA_QUERY)(target, propertyKey, 1);
    // MessageBody(ORCHA_DTO, new ValidationPipe())(target, propertyKey, 2);
    // MessageBody(ORCHA_TOKEN)(target, propertyKey, 3);
    MessageBody()(target, propertyKey, 1);
    MessageBody()(target, propertyKey, 2);
    MessageBody()(target, propertyKey, 3);

    const original = descriptor.value;
    if (original) {
      (descriptor as any).value = async function (...args: any[]) {
        try {
          return await (original as any).apply(this, args);
        } catch (error) {
          throw new WsException(error.message);
        }
      };
    }

    SubscribeMessage(propertyKey as string)(target, propertyKey, descriptor);
    return descriptor;
  };
}
