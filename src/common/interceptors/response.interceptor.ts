import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        return next.handle().pipe(
            map((data) => ({
                success: true,
                message: data?.message || 'Request successful',
                data: data?.data ?? data,
                statusCode: context.switchToHttp().getResponse().statusCode,
                timestamp: new Date().toISOString(),
                path: request.url,
            })),
        );
    }
}
