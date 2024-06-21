import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { AuthRegisterI } from 'src/database/interfaces/authI';

export class BusinessProfileInterceptors implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(
        (data) => {
          return {
            message: data.message,
            data: {
              ...data.data,
              user: data?.data?.user
                ? plainToInstance(AuthRegisterI, data.data?.user)
                : {},
            },
          };
        },
        //data.map((user) => plainToInstance(AuthRegisterDTO, user)),
      ),
    );
  }
}
