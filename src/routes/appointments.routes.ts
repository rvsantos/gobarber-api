import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

// repositories
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

// variables
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate)
    return response
      .status(400)
      .json({ error: 'This appointment is already booked.' });

  const appointment = appointmentRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
