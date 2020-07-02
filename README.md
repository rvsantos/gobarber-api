# Recuperação de senha

**RF (requisitos funcionais)**

  - O usuário deve poder recuperar sua senha informando o seu e-mail;
  - O usuário deve receber um e-mail com instrução de recuperação de senha;
  - O usuário deve poder resetar sua senha;

**RNF (requisitos não funcionais)**
 
  - Utilizar o Mailtrap para testar envios em ambiente de dev;
  - Utilizar Amazon SES para envios em produção;
  - O envio de e-mails deve acontecer em segundo plano (background job);

**RN (regras de negocio)**

  - O link enviado por email para resetar senha, deve expirar em 2h;
  - O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização de serviçoes

**RF (requisitos funcionais)**

  - O usuário deve poder atualizar seu nome, email e senha;

**RN (regras de negocio)**
 
  - O usuário não pode alterar seu email para um email já utilizado;
  - Para atualizar sua senha, o usuário deve informar a senha antiga;
  - Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF (requisitos funcionais)**

  - O usuário deve poder listar todos prestadores de serviço cadastrados;
  - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador.
  - O usuário deve poder listar horários disponíveis em um dia especifico de um prestador;
  - O usuário deve poder realizar um novo agendamento com um prestador;

**RNF (requisitos não funcionais)**

  - A listagem de prestadores deve ser armazenada em cache;

**RN (regras de negocio)**

  - Cada agendamentos deve durar 1h exatamente;
  - Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
  - O usuário não pode agendar em um horário já ocupado;
  - O usuário não pode agendar em um horário que já passou;
  - O usuário não pode agendar serviços consigo mesmo;

# Agendamento de serviços

**RF (requisitos funcionais)**

  - O usuário deve poder listar seus agendamentos de um dia específico;
  - O prestador deve receber uma notificação sempre que houver um novo agendamentos;
  - O prestador deve poder visualizar as notificações não lidas;

**RNF (requisitos não funcionais)**

  - Os agendamentos do prestador no dia devem ser armazenadas em cache;
  - As notificações do prestador devem ser armazenadas no MongoDB;
  - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RN (regras de negocio)**

  - A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;
