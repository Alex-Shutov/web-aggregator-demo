import { forwardRef, Module } from '@nestjs/common';
import { ProjectWebSocket } from '@app/websocket/websocket';
import { GradeModule } from '@app/grade/grade.module';
import { EventModule } from '@app/event/event.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    forwardRef(() => GradeModule),
    forwardRef(() => EventModule),
    forwardRef(() => UserModule),
  ],
  providers: [ProjectWebSocket],
  exports: [ProjectWebSocket],
})
export class WebSocketModule {}
