import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayProvidersService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.query;

    const listProviderDayProviders = container.resolve(
      ListProviderDayProvidersService,
    );

    const availability = await listProviderDayProviders.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.status(200).json(availability);
  }
}
