import {
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

  async getFavourites(user: User): Promise<any> {
    const favourites = await this.favouritesModel
      .find({ user: user._id })
      .exec();
    console.log(favourites);
    if (favourites) return favourites;
    else return null;
  }
  async saveFavourites(user: User, favourites: string[]) {
    const doc = await this.favouritesModel.findOne({ user: user._id }).exec();
    if (doc) {
      doc.pokemon = favourites;
    } else {
      const doc = await this.favouritesModel.create({
        user: user._id,
        pokemon: favourites,
      });
      return doc;
    }
    return doc.save();
  }
}
