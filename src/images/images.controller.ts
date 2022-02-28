import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Image } from "./entities/image.entity";
import { ImagesService } from "./images.service";

@Controller("images")
export class ImagesController {
  constructor(private roleService: ImagesService) {}

  @ApiOperation({ summary: "Giving random images" })
  @ApiResponse({
    status: 200,
    description: "serves 5 random images",
    type: Image,
  })
  @Get("/")
  getImages() {
    return this.roleService.getImages();
  }
}
