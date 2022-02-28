import { ApiProperty } from "@nestjs/swagger";

export class Image {
  @ApiProperty({
    example: "1",
    description: "The breed of the Cat",
  })
  id: number;

  @ApiProperty({
    example: "Ronnie Ganot",
    description: "Image author",
  })
  author: string;

  @ApiProperty({
    example: "2500",
    description: "Image width",
  })
  width: number;

  @ApiProperty({
    example: "1667",
    description: "Image height",
  })
  height: number;

  @ApiProperty({
    example: "https://unsplash.com/photos/your-awesome-photo",
    description: "URL link to image",
  })
  url: string;

  @ApiProperty({
    example: "https://picsum.photos/id/11/2500/1667",
    description: "URL to download link with sizes",
  })
  download_url: string;
}
