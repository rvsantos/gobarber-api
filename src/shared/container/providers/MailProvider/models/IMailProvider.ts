import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendEmailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
