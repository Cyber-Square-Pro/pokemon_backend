import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Favourite } from './favourite.model';
import { User } from 'src/users/user.model';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectModel('Favourite') readonly favouritesModel: Model<Favourite>,
  ) {}

  async getFavourites(user: User): Promise<string[]> {
    const favourites = await this.favouritesModel
      .findOne({ user: user.name })
      .exec();
    console.log(favourites);
    if (favourites) return favourites.pokemon;
    else return null;
  }
  async saveFavourite(user: User, favourite: string) {
    const doc = await this.favouritesModel.findOne({ user: user.name }).exec();
    if (doc!=null) {
      console.log(doc);
      console.log(favourite);
      doc.pokemon.push(favourite);
      return doc.save();
    } else {
      const doc = await this.favouritesModel.create({
        user: user.name,
        pokemon: [favourite],
      });
      return doc.save();
    }
  }

  async containsFavourite(user: User, fav: string): Promise<boolean> {
    const favourites = await this.favouritesModel.findOne({ user: user.name });
    if (!favourites) return false;
    else return favourites.pokemon.includes(fav);
  }

  async removeFavourite(user: User, fav: string) {
    try {
      let favourite = await this.favouritesModel.findOne({ user: user.name });
      favourite.pokemon = favourite.pokemon.filter((item) => item != fav);
      await favourite.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
