import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { ERROR_MESSAGE, IMAGES_EMPTY_MESSAGE } from "src/utils/constants";

@Injectable()
export class ImagesService {
  data: any = {
    images: [],
    isInitial: true,
  };

  constructor() {}

  private async getInitialImages() {
    const { data } = await axios.get(
      process.env.BASE_URL + "/v2/list?page=1&limit=100"
    );
    this.data = {
      images: data,
      isInitial: false,
    };
    return data;
  }

  private getRandomImage() {
    const images = this.data.images;
    const length = images.length;
    return images[Math.floor(Math.random() * length)];
  }

  private deletedUsed(id) {
    const deleteUsed = this.data.images.filter((item) => item.id !== id);
    return deleteUsed;
  }
  private async setImages() {
    const randomData = this.data.images.map((image, i) => {
      if (i < 5) {
        const randomImage = this.getRandomImage();
        this.data.images = this.deletedUsed(randomImage.id);
        return randomImage;
      } else {
        return null;
      }
    });
    const images = randomData.filter((image) => image);
    if (images.length) {
      return images;
    } else {
      return IMAGES_EMPTY_MESSAGE;
    }
  }

  async getImages() {
    try {
      const isEmpty = this.data.images.length === 0;
      const isInitial = this.data.isInitial;
      isEmpty && isInitial && (await this.getInitialImages());
      const result = await this.setImages();
      return result;
    } catch (error) {
      throw new HttpException(ERROR_MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
