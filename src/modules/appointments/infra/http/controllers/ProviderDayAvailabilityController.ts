import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayProvidersService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const listProviderDayProviders = container.resolve(
      ListProviderDayProvidersService,
    );

    const availability = await listProviderDayProviders.execute({
      provider_id,
      month,
      year,
      day,
    });

    return response.status(200).json(availability);
  }
}
