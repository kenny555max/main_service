import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { AuthRegisterI } from 'src/database/interfaces/authI';

export class UserInterceptors implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(
        (data) => {
          //console.log(data);
          return plainToInstance(AuthRegisterI, data);
        },
        //data.map((user) => plainToInstance(AuthRegisterDTO, user)),
      ),
    );
  }
}
