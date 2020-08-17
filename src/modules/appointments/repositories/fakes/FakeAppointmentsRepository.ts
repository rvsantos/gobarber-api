import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAlInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAlInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAlInMonthFromProviderDTO): Promise<Appointment[]> {
    return this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });
  }

  async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAlInDayFromProviderDTO): Promise<Appointment[]> {
    return this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });
  }
}
