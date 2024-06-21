import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BusinessProfileDto } from 'src/database/dtos/business-profile.dto';
import { BusinessProfileEntity } from 'src/database/entities/business-profile.entity';
import { BusinessProfileI } from 'src/database/interfaces/business-profile';
import { UserService } from 'src/user/user.service';
import { ErrorHandler } from 'src/utils/error-manager';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessProfileService {
  constructor(
    @InjectRepository(BusinessProfileEntity)
    private businessRepository: Repository<BusinessProfileEntity>,
    private userService: UserService,
    private cloudinary: CloudinaryService,
  ) {}

  async create_business_profile_info(
    payload: BusinessProfileDto,
  ): Promise<{ message: string; data: BusinessProfileI }> {
    console.log(payload);

    const pcnLicense = await this.cloudinary.uploadBase64Image(
      payload.pcnLicense,
    );

    const cacDocument = await this.cloudinary.uploadBase64Image(
      payload.cacDocument,
    );

    const profile = this.businessRepository.create({
      ...payload,
      pcnLicense,
      cacDocument,
    });

    const createdProfile = await this.businessRepository.save(profile);

    if (!createdProfile) {
      throw new ConflictException('Failed to create business profile');
    }

    return {
      message: 'Business profile created successfully',
      data: createdProfile,
    };
  }

  async update_business_profile_info(
    profileId: number,
    payload: BusinessProfileDto,
    userId: number,
  ): Promise<{ message: string; data: BusinessProfileI }> {
    try {
      console.log(userId);
      const checkIfProfileExist = await this.businessRepository.findOne({
        where: { id: profileId },
      });

      if (!checkIfProfileExist) {
        throw new NotFoundException('Profile not found');
      }

      const updatedProfile = await this.businessRepository.update(
        profileId,
        payload,
      );

      if (!updatedProfile) {
        throw new ConflictException('Unable to fetch updated profile');
      }

      const profile = await this.businessRepository.findOne({
        where: { id: userId },
        relations: ['user'], // Specify the relation name to include the related user
      });

      return {
        message: 'Business profile updated',
        data: profile,
      };
    } catch (error) {
      ErrorHandler.handleError('BusinessService.Update', error);
    }
  }

  async getBusinessProfileWithUser(
    userId: number,
  ): Promise<{ message: string; data: BusinessProfileI }> {
    const profile = await this.businessRepository.findOne({
      where: { id: userId },
      relations: ['user'], // Specify the relation name to include the related user
    });

    return {
      message: 'Profile data printed',
      data: profile,
    };
  }
}
