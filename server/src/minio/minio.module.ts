import { Module } from '@nestjs/common';
import { MinioController } from '@app/minio/minio.controller';
import { MinioService } from '@app/minio/minio.service';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import { DemoRestrictionGuard } from '@app/auth/guards/demoRestriction.guard';

@Module({
  imports: [],
  controllers: [MinioController],
  providers: [MinioService, AuthGuard, DemoRestrictionGuard],
  exports:[MinioService]
})
export class MinioModule {}
