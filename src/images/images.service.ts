import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { ERROR_MESSAGE, RESIZE_URL } from "src/utils/constants";

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
        let randomImage = this.getRandomImage();
        this.data.images = this.deletedUsed(randomImage.id);
        const imgWidth = 900;
        const imgHeight = 600;
        const resizedUrl = `${RESIZE_URL}/${randomImage.id}/${imgWidth}/${imgHeight}`;
        const thumbUrl = `${RESIZE_URL}/${randomImage.id}/${imgWidth / 3}/${
          imgHeight / 3
        }`;
        randomImage.download_url = resizedUrl;
        randomImage.thumb_url = thumbUrl;
        return randomImage;
      } else {
        return null;
      }
    });
    const images = randomData.filter((image) => image);
    if (images.length) {
      return images;
    } else {
      return [];
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

  async getUpdatedImages() {
    try {
      await this.getInitialImages();
      const result = await this.setImages();
      return result;
    } catch (error) {
      throw new HttpException(ERROR_MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
