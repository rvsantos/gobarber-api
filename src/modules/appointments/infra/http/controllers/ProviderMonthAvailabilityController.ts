import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthProvidersService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthProviders = container.resolve(
      ListProviderMonthProvidersService,
    );

    const availability = await listProviderMonthProviders.execute({
      provider_id,
      month,
      year,
    });

    return response.status(200).json(availability);
  }
}
