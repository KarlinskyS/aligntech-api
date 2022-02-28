import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ImagesController } from "./images/images.controller";
import { ImagesService } from "./images/images.service";

@Module({
  providers: [ImagesService],
  controllers: [ImagesController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
  ],
  exports: [ImagesService],
})
export class AppModule {}
