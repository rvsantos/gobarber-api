import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked.');

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
