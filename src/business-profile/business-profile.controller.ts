import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessProfileService } from './business-profile.service';
import { BusinessProfileDto } from 'src/database/dtos/business-profile.dto';
import { BusinessProfileI } from 'src/database/interfaces/business-profile';
import { BusinessProfileInterceptors } from 'src/interceptors/business-profile.interceptors';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';

@Controller('/api/v1/business-profile')
export class BusinessProfileController {
  constructor(
    private readonly businessProfileService: BusinessProfileService,
  ) {}

  @Post('create-business-profile')
  @UseInterceptors(BusinessProfileInterceptors)
  async create(
    @Body() payload: BusinessProfileDto,
  ): Promise<{ message: string; data: BusinessProfileI }> {
    return this.businessProfileService.create_business_profile_info(payload);
  }

  @Put(':id')
  @UseInterceptors(BusinessProfileInterceptors)
  async update(
    @Param() profileId: number,
    @GetCurrentUserId() userId: number,
    @Body() payload: BusinessProfileDto,
  ): Promise<{ message: string; data: BusinessProfileI }> {
    return this.businessProfileService.update_business_profile_info(
      profileId,
      payload,
      userId,
    );
  }

  @Get()
  @UseInterceptors(BusinessProfileInterceptors)
  async get_user_business_profile(
    @GetCurrentUserId() userId: number,
  ): Promise<{ message: string; data: BusinessProfileI }> {
    return this.businessProfileService.getBusinessProfileWithUser(userId);
  }
}
